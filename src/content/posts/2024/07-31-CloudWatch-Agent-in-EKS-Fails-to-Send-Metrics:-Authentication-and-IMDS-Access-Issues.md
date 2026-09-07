---
title: "CloudWatch Agent in EKS Fails to Send Metrics: Authentication and IMDS Access Issues"
tags: [ "cloud", "observability", "troubleshooting" ]
date: 2024-07-31 17:36:36 +09:00
visibility: public #private unlisted
---
Recently, while working with Amazon EKS, I encountered a challenge while setting up monitoring using the CloudWatch Observability add-on. This add-on deploys Fluent Bit for sending application logs to CloudWatch and the CloudWatch Agent to monitor pods, providing CloudWatch Container Insights.

You can read more about this setup in the official [AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Observability-EKS-addon.html).

## The Problem

I tried installing the CloudWatch Observability add-on using a Helm chart, but I discovered that although it sent logs successfully, the CloudWatch Agent wasn't sending metrics data to CloudWatch. 

## The Investigation

he CloudWatch Agent error logs displayed the following message:

```
W! {"caller":"batchprocessor@v0.98.0/batch_processor.go:263","msg":"Sender failed","kind":"processor","name":"batch/containerinsights","pipeline":"metrics/containerinsights","error":"SharedCredsLoad: failed to load shared credentials file\ncaused by: FailedRead: unable to open file\ncaused by: open /root/.aws/credentials: no such file or directory"}
```

Instead of using IAM Roles for Service Accounts (IRSA) as suggested by the AWS documentation, the CloudWatch Agent was trying to authenticate using `/root/.aws/credentials`, which did not exist in the CloudWatch Agent pod. This led me to investigate further, and I found an issue thread on GitHub:

[GitHub Issue #1101](https://github.com/aws/amazon-cloudwatch-agent/issues/1101)

The issue creator had the same problem and suggested solving it by setting the `RUN_WITH_IRSA` environment variable to `true`. However, setting it to `true` didn't work for me. After checking the CloudWatch Agent source code, I found that the correct value for this variable is `"True"` (with a capital "T"):

[CloudWatch Agent Source Code](https://github.com/aws/amazon-cloudwatch-agent/blob/b63ec240653afb35d5691f2bfe41842191613229/cfg/envconfig/envconfig.go#L37)

## The Next Issue

Even after setting the `RUN_WITH_IRSA` environment variable correctly, I encountered another issue:

```
2024-03-25T14:14:10Z I! {"caller":"host/ec2metadata.go:78","msg":"Fetch instance id and type from ec2 metadata","kind":"receiver","name":"awscontainerinsightreceiver","data_type":"metrics"}
2024-03-25T14:14:11.425Z DEBUG aws@v0.0.0-20231208183748-c00ca1f62c3e/imdsretryer.go:45 imds error : {"shouldRetry": true, "error": "RequestError: send request failed\ncaused by: Put \"http://169.254.169.254/latest/api/token\": context deadline exceeded (Client.Timeout exceeded while awaiting headers)"}
```

For enhanced container insights to run properly, the agent needed to fetch the instance ID from the Instance Metadata Service (IMDS), which is blocked to pods by default. The relevant documentation on this restriction can be found [here](https://docs.aws.amazon.com/whitepapers/latest/security-practices-multi-tenant-saas-applications-eks/restrict-the-use-of-host-networking-and-block-access-to-instance-metadata-service.html).

## The Solution Options

The issue creator recommended three options:

1. **Increase IMDSv2 hop limit to 2:** This allows all pods to access IMDS and use the node IAM role.
2. **Increase IMDSv2 hop limit and add Kubernetes NetworkPolicy:** This option blocks access to `169.254.0.0/16`, but it's cumbersome as you need to add it to all namespaces (since there is no GlobalNetworkPolicy in vanilla Kubernetes) and there's no explicit deny either.
3. **Keep IMDSv2 hop limit at 1 and run the CloudWatch Agent DaemonSet with `pod.spec.hostNetwork = true`:** You need to enforce that untrusted pods do not use host networking using admission controllers.

## My Solution

Adding a Kubernetes NetworkPolicy to each namespace and creating a launch template that sets the IMDS hop limit to 2 for all EKS nodes was cumbersome. Therefore, I decided to use the third option.

### Modifying the DaemonSet

I added the following lines to `cloudwatch-agent-daemonset.yaml`:

```yaml
spec:
  hostNetwork: true
env:
  - name: RUN_WITH_IRSA
    value: "True"
```

### Enhancing Security with Gatekeeper

Since using host networking poses security concerns, I deployed Gatekeeper to ensure only the CloudWatch Agent can use host networking.

#### Installing Gatekeeper

I used argoCD to deploy Gatekeeper Helm Chart. [link](https://github.com/open-policy-agent/gatekeeper/tree/master/charts/gatekeeper)

#### Defining a ConstraintTemplate

I created a ConstraintTemplate to allow host networking only for the CloudWatch Agent:

```yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: k8sallowedhostnetworking
spec:
  crd:
    spec:
      names:
        kind: K8sAllowedHostNetworking
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8sallowedhostnetworking

        default allow = false

        allow {
          input.review.object.metadata.labels["app.kubernetes.io/name"] == "cloudwatch-agent"
        }

        violation[{"msg": msg}] {
          not allow
          input.review.object.spec.hostNetwork == true
          msg := "Host network is not allowed for this pod"
        }
```

#### Creating a Constraint

I created a Constraint to enforce the policy:

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: K8sAllowedHostNetworking
metadata:
  name: allowed-host-networking
spec:
  match:
    kinds:
      - apiGroups: [""]
        kinds: ["Pod"]
```

## Conclusion

Through this process, I successfully set up the CloudWatch Observability add-on in EKS, ensuring the CloudWatch Agent can fetch instance metadata while maintaining security by restricting host networking to trusted pods only. Although this is a temporary fix, it reinforced the importance of thorough investigation and the utility of tools like OPA Gatekeeper in managing Kubernetes security policies effectively. Ultimately, AWS needs to provide a more robust and permanent solution to address this issue.

## Links:
* https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/install-CloudWatch-Observability-EKS-addon.html
* https://github.com/aws/amazon-cloudwatch-agent/issues/1101
* https://github.com/aws/amazon-cloudwatch-agent/blob/b63ec240653afb35d5691f2bfe41842191613229/cfg/envconfig/envconfig.go#L37
