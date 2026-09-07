---
title: "Transforming Data Pipelines with HDFS: A Scalable Solution for Raw Data Storage"
tags: [ "data-pipeline", "hdfs" ]
date: 2024-06-21 01:15:31 +09:00
---

In today's fast-paced data-driven world, handling large volumes of streaming data efficiently is crucial for real-time analytics and decision-making. To achieve this, it's essential to have a robust data pipeline architecture. Here, we explore enhancing an existing data pipeline with Hadoop Distributed File System (HDFS) to provide reliable and scalable raw data storage.

## Original Data Pipeline Overview

The original pipeline consists of several key components, as illustrated in the provided diagrams:

![pipeline](https://i.imgur.com/Be7RcI2.jpg)

1. **Data Source**: Coinbase API streams cryptocurrency market data.
2. **Data Ingestion**: A Java producer captures data from the API and sends it to Kafka.
3. **Message Broker**: Kafka manages the data streams and ensures reliable data transport.
4. **Data Processing**: Apache Spark processes the data in real-time.
5. **Processed Data Storage**: Cassandra stores the processed data.
6. **Data Visualization**: Grafana visualizes the stored data for analysis.

## Why HDFS?

Before diving into the updated pipeline, it's important to understand why HDFS was chosen as the raw data storage solution.

1. **Scalability**:
   - HDFS is designed to handle vast amounts of data by scaling out horizontally. This means that as your data grows, you can add more nodes to the cluster to increase storage capacity without any downtime.

2. **Fault Tolerance**:
   - Data in HDFS is replicated across multiple nodes. This replication ensures that data is preserved even if some nodes fail, making HDFS highly fault-tolerant.

3. **Cost-Effectiveness**:
   - HDFS runs on commodity hardware, which makes it a cost-effective solution for large-scale data storage compared to more specialized storage systems.

4. **High Throughput**:
   - HDFS is optimized for large, streaming reads and writes. It is ideal for handling large datasets, making it perfect for raw data storage in a streaming data pipeline.

5. **Integration with Hadoop Ecosystem**:
   - HDFS is a core component of the Hadoop ecosystem and integrates seamlessly with other Hadoop tools like MapReduce, Hive, and Pig, providing a robust framework for big data processing.

6. **Wide Adoption**:
   - Being a widely adopted technology in the big data community, HDFS has a large support base and extensive documentation, which helps in troubleshooting and getting support from the community.

## Challenges with HDFS Deployment on Kubernetes

Typically, deploying HDFS on Kubernetes, especially in a multi-node setting, can be quite challenging due to the complexity involved in maintaining stateful distributed systems. These challenges include:

- **Networking**: Ensuring proper communication between NameNodes and DataNodes can be tricky.
- **Persistence**: Managing persistent storage for the HDFS nodes requires careful configuration to avoid data loss.
- **Resource Management**: Efficiently allocating resources to HDFS nodes in a Kubernetes environment can be complex.
- **Scaling**: While Kubernetes is excellent for scaling stateless applications, scaling stateful applications like HDFS requires careful handling of state and data replication.

However, in this implementation, I am deploying HDFS on a single node. This simplifies many of the complexities associated with multi-node deployments, making it a feasible option for this use case.

## Updated Data Pipeline

With HDFS integrated, the updated pipeline flow is as follows:

1. **Data Source**: Data is streamed from Coinbase API.
2. **Data Ingestion**: A Java producer captures the data and sends it to Kafka.
3. **Message Broker**: Kafka continues to manage and stream data.
4. **Data Processing**: Spark Structured Streaming processes data in real-time, pulling raw data from Kafka. It stores the raw data in HDFS and processed data in Cassandra.
5. **Raw Data Storage**: Spark forwards the raw data to HDFS.
6. **Processed Data Storage**: Processed data is stored in Cassandra.
7. **Data Visualization**: Grafana visualizes the processed data for analytics.

## Integrating HDFS into the Pipeline

To enhance the pipeline, we introduce HDFS for raw data storage. HDFS is designed to store large amounts of data reliably and to scale out with ease. Here’s how we integrated HDFS into the existing pipeline:

### Docker Setup for HDFS:

We create Docker images for the HDFS NameNode and DataNode.

**hdfs.Dockerfile**:

```
FROM ubuntu:22.04
RUN apt-get update; apt-get install -y wget openjdk-11-jdk

# HDFS
RUN wget https://dlcdn.apache.org/hadoop/common/hadoop-3.4.0/hadoop-3.4.0.tar.gz; tar -xf hadoop-3.4.0.tar.gz; rm hadoop-3.4.0.tar.gz

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="${PATH}:/hadoop-3.4.0/bin"
ENV HADOOP_HOME=/hadoop-3.4.0
```

**hdfs-nn.Dockerfile**:

```
FROM kwangjong/hdfs

RUN hdfs namenode -format
CMD hdfs namenode \
    -D dfs.namenode.stale.datanode.interval=10000 \
    -D dfs.namenode.heartbeat.recheck-interval=30000 \
    -D dfs.namenode.datanode.registration.ip-hostname-check=false \
    -fs $HDFS_NAMENODE_URL
```

**hdfs-dn.Dockerfile**:

```
FROM kwangjong/hdfs

CMD hdfs datanode \
    -D dfs.datanode.data.dir=/var/datanode \
    -fs $HDFS_NAMENODE_URL
```

### Kubernetes Configuration:

We deploy the HDFS cluster using Kubernetes to ensure scalability and high availability.

**hdfs.yaml**:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: hdfs-service
spec:
  selector:
    app: hdfs-nn
  ports:
  - port: 9000
    targetPort: 9000
    name: ipc
  - port: 9870
    targetPort: 9870
    name: http
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hdfs-nn
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hdfs-nn
  template:
    metadata:
      labels:
        app: hdfs-nn
    spec:
      hostname: boss
      containers:
      - name: hdfs-nn
        image: kwangjong/hdfs-nn
        env:
        - name: HDFS_NAMENODE_URL
          value: "hdfs://0.0.0.0:9000"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hdfs-dn
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hdfs-dn
  template:
    metadata:
      labels:
        app: hdfs-dn
    spec:
      containers:
      - name: hdfs-dn
        image: kwangjong/hdfs-dn
        env:
        - name: HDFS_NAMENODE_URL
          value: "hdfs://hdfs-service:9000"
        ports:
        - containerPort: 9867
        - containerPort: 9866
```

## Benefits of Adding HDFS

- **Scalability**: HDFS can store petabytes of data and scale out seamlessly.
- **Reliability**: HDFS replicates data across multiple nodes, ensuring data durability.
- **Flexibility**: Separating raw data storage allows for more flexible data processing workflows.

## Conclusion

Integrating HDFS into our data pipeline has significantly enhanced our ability to handle large volumes of streaming data efficiently. By adding this robust and scalable storage solution, we've improved data reliability and processing flexibility, enabling more comprehensive real-time analytics and decision-making capabilities.

For a deeper dive into the implementation details, including Docker and Kubernetes configurations, refer to my repository below.

## Links:
- https://github.com/kwangjong/coinbase-real-time-data-pipeline/

