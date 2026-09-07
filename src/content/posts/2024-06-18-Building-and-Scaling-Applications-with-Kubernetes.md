---
title: Building and Scaling Applications with Kubernetes
tags: [ 'k8s' ]
date: 2024-06-18 21:27:50 +09:00
---

Kubernetes (k8s) is a powerful orchestration tool designed to manage containerized applications across multiple nodes, ensuring high availability, scalability, and efficiency. Understanding its components, management tools, and key concepts is essential for leveraging its full potential.

## Core Concepts and Architecture

**Nodes and Clusters**:
- **Nodes (Minions)**: These are VM instances that run containerized applications.
- **Cluster**: A set of nodes working together.
- **Master**: The central control unit responsible for orchestrating the nodes.

![cluster](https://i.imgur.com/wWXipzH.png)

**Components**:
- **API Server**: The frontend interface for managing the cluster.
- **etcd**: A distributed key-value store for configuration data.
- **Scheduler**: Assigns work to the nodes based on resource availability.
- **Controller**: Monitors the state of the cluster and makes adjustments as needed.
- **Container Runtime**: Software like Docker or containerd that runs containers.
- **kubelet**: An agent on each node that ensures containers are running as expected.

![kubelet](https://i.imgur.com/vWrZ7dN.png)

**Management Tool**:
- **kubectl**: Command-line tool used to interact with the Kubernetes API server.

## Docker vs. containerd

Originally, Kubernetes was designed to orchestrate Docker containers. Over time, the Container Runtime Interface (CRI) was introduced, allowing Kubernetes to support any OCI-compliant container runtime, such as containerd. Docker's compatibility is maintained via dockershim, but many developers prefer using containerd directly due to its native CRI compatibility.

![containerd](https://i.imgur.com/OaWmaqL.png)

**Command Line Tools**:
- **ctr, nerdctl**: CLI tools for containerd, with nerdctl offering Docker-like syntax.
- **crictl**: CLI for any CRI-compatible container runtime.

## Pods and YAML Configuration

A Pod is the smallest deployable unit in Kubernetes, typically running a single instance of an application. While a Pod can contain multiple containers, it's common to run just one container per Pod.

**Sample YAML Configuration**:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
    type: front-end
spec:
  containers:
  - name: nginx-container
    image: nginx
```

## ReplicaControllers and ReplicaSets

**ReplicaControllers**:
The ReplicaController is an older mechanism in Kubernetes used to ensure a specified number of pod replicas are running at any given time. It monitors the cluster and launches new pods if the desired state is not met. While still supported, ReplicaControllers are largely superseded by ReplicaSets, which offer more features and flexibility.

**ReplicaSets**:
Manage the replication and scaling of Pods. They ensure a specified number of replicas are running at all times.

**Sample ReplicaSet YAML**:
```yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myapp-replicaset
  labels:
    app: myapp
    type: front-end
spec:
  replicas: 3
  selector:
    matchLabels:
      type: front-end
  template:
    metadata:
      labels:
        app: myapp
        type: front-end
    spec:
      containers:
      - name: nginx-container
        image: nginx
```

## Labels and Selectors

**Labels**:
Labels are key-value pairs attached to Kubernetes objects, such as Pods. They are used to organize and select subsets of objects. For example, you might label Pods with `app: myapp` and `type: front-end` to identify them as part of a specific application and role.

**Selectors**:
Selectors are used to filter Kubernetes objects based on their labels. ReplicaSets and Deployments use selectors to determine which Pods they should manage. By using label selectors, you can ensure that only the Pods with the correct labels are controlled and scaled.

**Example with ReplicaSet**:
The ReplicaSet configuration includes a selector that matches labels specified in the Pod template. This ensures that the ReplicaSet only manages Pods with matching labels.
```yaml
spec:
  selector:
    matchLabels:
      app: myapp
      type: front-end
```

## Deployments

**Deployments**:
Build on ReplicaSets by adding features like rolling updates and rollbacks, making them ideal for managing application updates.

**Sample Deployment YAML**:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: nginx-container
        image: nginx
```

**Rollout and Versioning**:
- **kubectl rollout status deployment/myapp-deployment**: Check the status of a rollout.
- **kubectl rollout history deployment/myapp-deployment**: View the history of rollouts.
- **Deployment Strategies**:
  - **Recreate Strategy**: Takes down all old versions before deploying new ones, causing a short downtime.
  - **Rolling Update**: Gradually updates each instance, ensuring no downtime.
- **kubectl apply**: Triggers a rolling update.
- **Rollback**: `kubectl rollout undo deployment/myapp-deployment`


## Networking

Kubernetes creates a private network for each cluster, assigning IPs to each Pod. Networking tools like Calico, Cisco, Cilium, Flannel, and VMware NSX can be used for more complex configurations.

**Services**: Enable connectivity between different applications within the Kubernetes cluster.

![services](https://i.imgur.com/gXPrctE.png)

**Service Types**:
- **NodePort**: Exposes the service on a port on each node.
- **ClusterIP**: Creates a virtual IP within the cluster. Default service type.
- **LoadBalancer**: Integrates with cloud provider load balancers for external access.

![nodeport](https://i.imgur.com/63Tw410.png)

**Sample NodePort YAML**:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  type: NodePort
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30080
  selector:
    app: myapp
    type: front-end
```

**Sample ClusterIP Service YAML**:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: back-end
spec:
  #type: ClusterIP #default service
  ports:
    - port: 80
      targetPort: 80
  selector:
    app: myapp
    type: back-end
```

**LoadBalancer**:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-loadbalancer
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 80
  selector:
    app: myapp
    type: front-end
```

## Scaling

Scaling applications in Kubernetes is straightforward. You can either edit the ReplicaSet YAML and apply the changes or use kubectl commands to scale directly.

**Scaling Commands**:
- `kubectl scale --replicas=6 -f replicaset.yml`: Scale using the YAML file.
- `kubectl scale --replicas=6 replicaset myapp-replicaset`: Scale directly with kubectl.
- `kubectl scale replicaset new-replica-set --replicas=5`: Another scaling example.

## Links
- https://www.udemy.com/course/kubernetes-fundamentals-for-beginners/
