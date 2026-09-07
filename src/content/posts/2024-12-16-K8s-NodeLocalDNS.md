---
title: K8s NodeLocalDNS
tags: [ "k8s" ]
date: 2024-12-16 21:44:23 +09:00
visibility: public #private unlisted
---

https://kubernetes.io/docs/tasks/administer-cluster/nodelocaldns/
### CoreDNS  
CoreDNS is the default DNS server in Kubernetes, responsible for resolving service names, pod communication, and external domains.

#### Steps to Configure CoreDNS
1. **Verify CoreDNS Deployment**:
   - Run: `kubectl get deployment -n kube-system`
   - Look for `coredns`.

2. **Check CoreDNS Service**:
   - Run: `kubectl get svc -n kube-system`
   - Look for `kube-dns`, the ClusterIP service for CoreDNS.

3. **Update CoreDNS Configuration**:
   - Edit the `Corefile`:
```bash
kubectl edit configmap coredns -n kube-system
```
   - Example: Forward external queries:
```plaintext
.:53 {
    forward . /etc/resolv.conf
    cache 30
    log
}
```

4. **Restart CoreDNS Pods**:
   - Run: `kubectl rollout restart deployment coredns -n kube-system`

5. **Test DNS Resolution**:
   - Run: `kubectl exec -it <pod-name> -- nslookup <service-name>`

### NodeLocalDNS
NodeLocalDNS improves DNS performance by caching queries on each node, reducing CoreDNS load and query latency.

#### Steps to Configure NodeLocalDNS
1. **Enable NodeLocalDNS in Kubernetes**:
   - Modify the kubelet configuration to use NodeLocalDNS.
   - Add the following in the `kubelet` `--cluster-dns` flag:
     ```plaintext
     --cluster-dns=169.254.20.10
     ```

2. **Deploy NodeLocalDNS DaemonSet**:
   - Download the NodeLocalDNS manifest:
```bash
curl -O https://raw.githubusercontent.com/kubernetes/kubernetes/master/cluster/addons/dns/nodelocaldns/nodelocaldns.yaml
```
   - Customize the IP and CIDR block as needed.

3. **Update ConfigMap for CoreDNS**:
   - Edit CoreDNS ConfigMap to forward requests to NodeLocalDNS:
```bash
kubectl edit configmap coredns -n kube-system
```
   - Example:
```plaintext
.:53 {
    forward . 169.254.20.10
    cache 30
    log
}
```

4. **Apply the NodeLocalDNS Manifest**:
   - Deploy NodeLocalDNS:
```bash
kubectl apply -f nodelocaldns.yaml
```

5. **Verify NodeLocalDNS**:
   - Check the NodeLocalDNS pods:
```bash
kubectl get pods -n kube-system -l k8s-app=NodeLocalDNS
```
   - Validate pod DNS queries:
```bash
kubectl exec -it <pod-name> -- nslookup <service-name>
```

### Quick Comparison

| **Feature**     | **CoreDNS**    | **NodeLocalDNS**         |
| --------------- | -------------- | ------------------------ |
| **Scope**       | Cluster-wide   | Node-local caching       |
| **Performance** | Higher latency | Lower latency            |
| **Deployment**  | Centralized    | DaemonSet on each node   |
| **Setup**       | Mandatory      | Optional but recommended |

### Why Not Just Make CoreDNS a DaemonSet?

Making **CoreDNS** a DaemonSet is an option for improving DNS resolution latency by placing DNS instances on each node. However, there are several **limitations** to this approach:

1. **Resource Overhead**: Running CoreDNS on every node as a DaemonSet would require more resources (CPU, memory, etc.) on each node, even though the DNS queries might be relatively low. This can become inefficient, especially in clusters with many nodes.
    
2. **Centralized Management**: CoreDNS is designed to be a **centralized DNS service** for the entire cluster. Running it as a DaemonSet would violate this principle and might introduce **management complexity** in terms of scaling, monitoring, and updating.
    
3. **Scaling**: CoreDNS needs to scale based on **query volume**, not just the number of nodes. A DaemonSet would require scaling the DNS service manually, while the NodeLocal DNSCache approach is much more **automatic** and efficient in handling per-node caching.
    
4. **Cache Mechanism**: The **NodeLocal DNS cache** is specifically optimized for **caching DNS records** locally. Even with a DaemonSet approach, caching on every node would not be as efficient as having a separate, specialized caching mechanism tailored for this use case.
