---
title: "Observability in Modern Application Design"
tags: [ "observability" ]
date: 2024-08-08 14:15:28 +09:00
visibility: public #private unlisted
---

In today's fast-paced software development environment, the need for robust and responsive applications has never been greater. As systems become more complex, the shift from traditional monitoring to observability is crucial in ensuring that modern applications are resilient and efficient.

## Monitoring is Part of Observability

Traditional monitoring approaches have long focused on tracking predefined metrics and system states. Monitoring is essential for alerting teams to issues and requires a clear understanding of what to monitor in advance. However, monitoring alone can lead to tool sprawl and may not provide enough context to understand complex systems.

Observability, on the other hand, offers a comprehensive framework that provides insights into the internal states of systems. It involves gathering actionable data in a way that gives a holistic view of the entire system and helps teams diagnose and resolve issues quickly and effectively. By embracing observability, organizations can pinpoint where and why issues occur, enabling better decision-making and system optimization.

## Foundations of Observability

Observability is built on the foundation of telemetry data, which includes metrics, events, logs, and traces. This data provides a holistic view of the entire system, enabling teams to identify where and why issues occur. By leveraging observability, organizations can gain actionable insights that drive better decision-making and system optimization.

### Types of Telemetry Data

Telemetry data, often referred to as MELT, consists of four primary types:

- **Metrics:** Aggregated values representing events over a period of time, providing quantitative measurements of system performance.
- **Events:** Specific actions or occurrences at a given time, helping to track discrete state changes.
- **Logs:** Detailed records of events, offering insights into system behavior and potential issues.
- **Traces:** Interactions between microservices to fulfill a request, allowing teams to understand the flow and dependencies within distributed systems.

## Key Metrics for Observability

To effectively utilize observability, teams must focus on specific metrics that provide insights into system performance and health. Some of the critical metrics include:

- **RED Method (Request Oriented):**
  - **Rate:** Requests per second.
  - **Errors:** Failed requests.
  - **Duration:** Latency or transaction response time.

- **USE Method (Resource Oriented):**
  - **Utilization:** CPU and disk space usage percentages.
  - **Saturation:** Network queue length.
  - **Errors:** Disk write errors.

- **Four Golden Signals Method (RED + S):**
  - **Latency**
  - **Traffic (Throughput)**
  - **Errors**
  - **Saturation (Resources at 100 capacity)**

- Google's **Core Web Vitals**:
  - **Largest Contentful Paint (LCP):** Perceived page load speed.
  - **First Input Delay (FID):** Perceived responsiveness.
  - **Cumulative Layout Shift (CLS):** Perceived stability.

## DevOps Success Metrics

In the context of DevOps, success is often measured by the ability to quickly detect and resolve issues. Two critical metrics for assessing DevOps performance are:

- **Mean Time to Detection (MTTD):** The time taken to become aware of an issue after it starts.
- **Mean Time to Resolve (MTTR):** The time taken to fix an issue after it has been detected.

These metrics help DevOps teams ensure that applications maintain high availability and reliability by minimizing downtime and optimizing response strategies.

## Implementing Observability in Modern Applications

Effective observability requires understanding what to monitor and why. It involves the continuous collection and analysis of telemetry data to ensure systems remain reliable and performant. By focusing on observability, organizations can prevent tool sprawl and gain a unified view of their entire ecosystem.

## Methods of Metric Collection

The collection of metrics can be achieved through two primary methods:

- **Push Methods:** Applications and services proactively send metrics to a centralized endpoint, such as StatsD and Graphite.
- **Scrape Methods:** Tools like Prometheus scrape metrics from applications via APIs, ideal for real-time analysis and scalability.

The choice between these methods depends on the specific requirements of the systems and applications involved.

## Dashboard Best Practices
Dashboards are essential tools in observability, providing real-time insights and visualizations of system performance. Here are some best practices for designing effective dashboards:

**Browser Applications:**

![browser-app](https://i.imgur.com/a9Nw7SG.png)

**Application Performance Monitoring / Backend Services:**

![apm](https://i.imgur.com/ZdHaxVK.jpeg)

**Infrastructure:**

![infrastructure](https://i.imgur.com/vfK0u1o.jpeg)

**Synthetic Monitors:**

![system-monitors](https://i.imgur.com/OulQZCc.png)

**Business Metrics:**

![business-metrics](https://i.imgur.com/Cge9ma3.jpeg)

## Conclusion

Observability is a crucial component of modern application design, enabling teams to build resilient and responsive systems. By shifting from traditional monitoring to a more comprehensive observability approach, organizations can ensure their applications meet the demands of today's dynamic digital landscape. Through actionable insights and enhanced system visibility, observability empowers teams to deliver superior software experiences to their users.

## Links
- https://www.udemy.com/course/grafana-graphite-and-statsd-visualize-metrics/?couponCode=ST10MT8624
- https://github.com/euclid1990/google-sre-book/tree/master
- https://mattklein123.dev/2024/04/10/do-you-need-to-store-that-telemetry/
- https://horovits.medium.com/how-much-observability-is-enough-797eacda8f2d
