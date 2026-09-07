---
title: K8s Ingress Strategies Without Service Mesh
tags: ["k8s", "ingress" ]
date: 2024-12-05 12:56:51 +09:00
visibility: public #private unlisted
---

Below are some common strategies for setting up **ingress** for kubernetes cluster without a service mesh.
### 1. Ingress Controller
Kubernetes built-in concept of **ingress** to manage HTTP/HTTPS traffic. Common options include: 
- [Kubernetes Ingress Nginx Controller (official)](https://github.com/kubernetes/ingress-nginx)
- [NGINX Ingress Controller](https://docs.nginx.com/nginx-ingress-controller/) (open-source or NGINX Plus)
- [Traefik](https://github.com/traefik/traefik) (lightweight and supports additional features like Let's Encrypt).
- [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts) (high performance and advanced features).

**Steps:**
1. Deploy an Ingress Controller in your cluster.
2. Create Ingress resources to define routing rules.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-service
            port:
              number: 80
```

**Pros:**
- Fine-grained control over routing.
- Can support TLS termination (e.g., using Let's Encrypt).
- Customizable annotations for features like rate-limiting and path rewrites.

**Cons:**
- The ingress controller itself needs to be deployed and managed.
- Requires additional configurations for advanced features.

### 2. Use a Load Balancer Service
Cloud providers like AWS, Azure, and Google offer native load balancer integrations.

**Steps:**
1. Deploy your applications as Kubernetes Services with type LoadBalancer.
2. Expose the services directly via cloud-managed load balancers.

**Example:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: my-app
```

**Pros:**
- Simplified setup.
- Direct integration with cloud-native load balancer features (e.g., AWS ALB, Azure Load Balancer, GCP External Load Balancer).
- High availability managed by the cloud provider.

**Cons:**
- Each service gets a separate load balancer, increasing costs.
- Limited customization compared to ingress controllers.


### 3. Cloud-Native Ingress Controllers
Some cloud providers offer specialized ingress solutions:
- **AWS EKS:** Use **AWS ALB Ingress Controller** for Application Load Balancer integration.
- **Azure AKS:** Use **Azure Application Gateway Ingress Controller** (AGIC).
- **GKE:** Use the **GKE Ingress Controller** with native integration for Google Cloud Load Balancer.

**Steps:**
1. Install the cloud-specific ingress controller in your cluster.
2. Define ingress resources as per your routing requirements.

**Pros:**
- Native cloud support.
- Simplified integration with cloud monitoring and logging tools.

**Cons:**
- May have limitations compared to community-driven ingress controllers.
- Cloud-specific solutions can reduce portability across providers.

### 4. Less Popular Approaches
#### 4.1 Manually Configure an External Load Balancer with NodePort
For simpler setups:
1. Expose your services as NodePort.
2. Configure an external cloud load balancer (e.g., AWS ALB, Azure LB) to direct traffic to the NodePort.

**Example:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  type: NodePort
  ports:
  - port: 80
    targetPort: 8080
    nodePort: 30001
  selector:
    app: my-app
```

**Pros:**
- Simple to set up without additional controllers.
- Works with any cloud-managed load balancer.

**Cons:**
- Requires manual management of load balancer configurations.
- Not dynamically updated when services or nodes change.

#### 4.2 Use a Reverse Proxy with Static IP
For more control over ingress:
1. Deploy a reverse proxy (e.g., NGINX, HAProxy) as a Deployment in your cluster.
2. Expose the proxy as a `LoadBalancer` or via external DNS.
3. Configure the proxy to route traffic to services.

**Steps:**
- Create a Deployment for the reverse proxy.
- Use ConfigMaps to manage routing rules dynamically.

**Example ConfigMap:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nginx-config
data:
  default.conf: |
    server {
      listen 80;
      location / {
        proxy_pass http://my-service:8080;
      }
    }
```

**Pros:**
- High configurability.
- Centralized ingress point for multiple services.

**Cons:**
- Requires expertise in managing reverse proxies.
- Manual scaling and failover configurations.
