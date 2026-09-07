---
title: Netflix Chaos Monkey
tags: [ "chaos engineering", "architecture"]
date: 2024-12-09 09:06:57 +09:00
visibility: public #private unlisted
---
https://principlesofchaos.org/ (2019)
https://www.reddit.com/r/devops/comments/1akzghq/is_chaos_engineering_still_a_thing/ (2024)
#### Chaos Engineering
>To specifically address the uncertainty of distributed systems at scale, Chaos Engineering can be thought of as the facilitation of experiments to uncover systemic weaknesses. These experiments follow four steps:
>
>1. Start by defining ‘steady state’ as some measurable output of a system that indicates normal behavior.
>2. Hypothesize that this steady state will continue in both the control group and the experimental group.
>3. Introduce variables that reflect real world events like servers that crash, hard drives that malfunction, network connections that are severed, etc.
>4. Try to disprove the hypothesis by looking for a difference in steady state between the control group and the experimental group.
>
>The harder it is to disrupt the steady state, the more confidence we have in the behavior of the system. If a weakness is uncovered, we now have a target for improvement before that behavior manifests in the system at large.

#### Chaos Engineering in 2024
- While the hype for Chaos Monkey and the term "Chaos Engineering" is gone, the principal is baked into current platforms and services.
- The concept was at its peak when most companies were using VMs-based computing resources. Move to containerization has reduced the frictions to making the infrastructure resilient.

#### Links
- [AWS Fault Injection Service](https://aws.amazon.com/ko/fis/)
- [Istio Fault Injection](https://istio.io/latest/docs/tasks/traffic-management/fault-injection/)
- [Google SRE: Lessons Learned from Other Industries](https://sre.google/sre-book/lessons-learned/)
