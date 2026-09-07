---
title: JVM Memory Management
tags: [ 'java' ]
date: 2024-12-24 15:17:03 +09:00
visibility: public #private unlisted
---

#### JVM Heap Structure

![jvm heap](https://i.imgur.com/3KNwCiG.png)

The JVM heap is divided into two parts: the **Young Generation (nursery)** and the **Old Generation**. The **Young Generation** is where new objects are allocated, consisting of three regions: **Eden** and two **Survivor Spaces**. Most new objects are placed in Eden, and when it fills up, a **Minor GC** moves surviving objects to one of the Survivor Spaces (S0, S1) or promotes them to the Old Generation after several cycles. The **Old Generation** holds long-lived objects and is cleaned up via **Major GC**, which is slower and occurs less frequently. Recent JVM versions introduced a **keep area** in the Young Generation to delay premature promotion of newly allocated objects, ensuring more efficient garbage collection.

#### Parameters:
- `-Xms`: initial heap size. heap 시작
- `-Xmx`: max heap size. heap 최대
- `-XX:MetaspaceSize`: initial Metaspace size. Perm/Meta 기본
- `-XX:MaxMetaspaceSize`: maximum Metaspace size. Perm/Meta 최대
- _Metaspace_: Stores class metadata (replaced `PermGen` in Java 8).

#### Behavior
- The JVM **starts** with the initial memory size and **grows dynamically** as needed, up to the maximum size.
- If memory usage reaches the maximum and cannot grow further, the JVM may throw an `OutOfMemoryError`
- example: `-Xms512m -Xmx1024m`:
	- The JVM starts with 512 MB of heap.
	- It can grow up to 1024 MB if needed

#### Tunning:
- Tune `-Xms` & `-Xmx` close to reduce resizing overhead.
- Adjust Metaspace for applications with heavy class loading (e.g., Spring/Hibernate).

#### Further Readings
- https://www.betsol.com/blog/java-memory-management-for-java-virtual-machine-jvm/
- https://www.digitalocean.com/community/tutorials/java-jvm-memory-model-memory-management-in-java
- https://docs.oracle.com/cd/E13150_01/jrockit_jvm/jrockit/geninfo/diagnos/garbage_collect.html
