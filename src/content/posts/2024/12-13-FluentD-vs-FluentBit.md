---
title: FluentD vs FluentBit
tags: [ "logging", "observability" ]
date: 2024-12-13 11:35:05 +09:00
visibility: public #private unlisted
---



https://docs.fluentbit.io/manual/about/fluentd-and-fluent-bit
https://signoz.io/blog/fluentd-vs-fluentbit/

#### History
- fluentd was created in 2011
- fluentBit was introduced in 2015
- fluentbit is a lightweight C implementation for resource-contained environments and edge computing.

#### Key Differences

>The choice between FluentD and FluentBit often comes down to specific use cases and infrastructure requirements.


>1. **Language and Architecture**:
>    - **FluentD**: Written in Ruby with some C extensions
>    - **FluentBit**: Implemented entirely in C
>
>2. **Resource Consumption**:  
>    - **FluentD**: Higher memory footprint (typically 30-40MB)
>    - **FluentBit**: Significantly lower memory usage (usually < 1MB)    
>
>3. **Scalability**:  
>    - **FluentD**: Designed for high-throughput, complex log processing at scale
>    - **FluentBit**: Optimized for lightweight deployments but can scale with proper configuration
>
>4. **Plugin Ecosystem**:  
>    - **FluentD**: Extensive plugin ecosystem with over 1000 community-contributed plugins
>    - **FluentBit**: Smaller but growing plugin set, focused on core functionalities
