---
title: "AWS Load Balancers: ALB vs NLB"
tags: [ 'cloud', 'infra' ]
date: 2024-06-30 23:49:24 +09:00
visibility: public
---

#### Routing
- **ALB**: Operates at the application layer (Layer 7) of the OSI model. This allows it to make routing decisions based on URL paths, hostnames, HTTP headers, and HTTP methods, offering fine-grained control over traffic distribution.
- **NLB**: Operates at the transport layer (Layer 4) of the OSI model, handling TCP and UDP traffic. This enables high performance and low latency.

#### Scaling
- **ALB**: Can automatically scale to handle increases in traffic, though this dynamic scaling may introduce some latency during scaling events (scaling overhead).
- **NLB**: Automatically scales to handle varying levels of traffic without user intervention, ensuring consistent performance and typically offering lower latency due to its simpler operation.

#### IPs
- **ALB**: Requires a minimum of 8 IP addresses for deployment. ALBs do not offer static IP addresses, but AWS Global Accelerator can be used if a static IP is needed.
- **NLB**: Provides one or more static IP addresses for each availability zone they are deployed in, which is beneficial for applications that require fixed IP addresses.

#### Deployment
- **ALB**: Deployed on AWS infrastructure and managed by AWS, abstracting the underlying VM instances from users.
- **NLB**: Also managed by AWS and runs on AWS infrastructure but offers simpler operation at the network layer.

#### Health Checks
- **ALB**: Supports both HTTP and HTTPS health checks at the application layer.
- **NLB**: Supports TCP, HTTP, and HTTPS health checks, typically using simpler TCP checks compared to ALB.

#### SSL Termination
- **ALB**: Supports SSL termination, meaning it can decrypt incoming traffic and distribute it to backend instances.
- **NLB**: Can pass through encrypted traffic (SSL/TLS) directly to backend instances but does not support SSL termination directly. This must be handled at the target instances.

#### WebSocket and HTTP/2 Support
- **ALB**: Supports WebSocket and HTTP/2, making it ideal for modern web applications requiring these protocols.
- **NLB**: Does not natively support WebSocket or HTTP/2, as it operates at a lower layer compared to ALB.

#### Target Types
- **ALB**: Can target instances, IP addresses, and AWS Lambda functions, providing flexibility in traffic routing.
- **NLB**: Primarily targets instances and IP addresses.

### Summary

Choosing between ALB and NLB depends on your specific use case:

- **Application Load Balancer (ALB)**: Best suited for HTTP/HTTPS applications that require advanced routing capabilities, SSL termination, and support for WebSocket/HTTP/2. Ideal for modern web applications needing detailed traffic management.

- **Network Load Balancer (NLB)**: Ideal for high-performance, low-latency applications requiring static IP addresses and TCP/UDP routing. Suitable for workloads needing simple, fast, and reliable load balancing at the transport layer.

By understanding these key differences, you can select the load balancer that best fits your application's needs, ensuring optimal performance, scalability, and reliability in your AWS environment.
