---
title: "Deploying a Real-time Data Pipeline in Minikube with Kubernetes"
tags: [ 'k8s', 'data-pipeline' ]
date: 2023-10-03 23:27:30 -05:00
visibility: public 
---

![architecture](https://i.imgur.com/LacnL5c.png)

During this blog post series, we have built a real-time cryptocurrency data pipeline using Kafka, Spark, Cassandra, and visualized it using Grafana. In this blog post, we'll go over how to use Kubernetes to deploy each component.

# What is Kubernetes? What is Minikube?

Kubernetes is a powerful open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. It allows you to easily manage and scale containerized applications in a clustered environment.

Minikube, on the other hand, is a tool that enables you to run a single-node Kubernetes cluster locally on your development machine. It provides a simplified way to learn and experiment with Kubernetes without the need for a full-scale cluster.

# Getting Started with Minikube

Before we dive into deploying our real-time data pipeline components, let's set up Minikube.

For Linux, you can follow these steps to install Minikube:

```shell
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

Once Minikube is installed, you can start your cluster using this command:

```shell
minikube start
```

# Interacting with Your Cluster

Now that Minikube is up and running, let's learn how to interact with your Kubernetes cluster using the `kubectl` command-line tool. Here are some basic commands to get you started:

To list all the pods in your cluster:
```shell
kubectl get pods
```

To view detailed information about a specific pod:
```shell
kubectl describe pod <pod-name>
```

To deploy, manage, and troubleshoot applications in Kubernetes, you can create and apply configuration files in YAML format.

# Deploying Components

## Deploying the Java Producer

Let's start with the Java producer, which generates real-time cryptocurrency data for our pipeline.  I used the official Maven Docker image to build the Java producer Docker image.

`Dockerfile`:

```shell
FROM maven:3.8.6-openjdk-11-slim
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN mvn package
CMD ["java", "-jar", "target/coinbase-producer-1.jar"]
```

`java-coinbase-producer.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: producer-service
spec:
  selector:
    app: producer
  clusterIP: None
  ports: []
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: producer
  labels:
    app: producer
spec:
  replicas: 1
  selector:
    matchLabels:
      app: producer
  template:
    metadata:
      labels:
        app: producer
    spec:
      containers:
      - name: producer
        image: kwangjong/java-coinbase-producer:latest
```

## Deploying Apache Kafka

Apache Kafka is a fundamental component of our data pipeline. To deploy kafaka in minikube, I am using bitnami/kafka and offical zookeeper docker images.

`kafka-broker.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kafka-service
spec:
  selector:
    app: kafka
  ports:
  - port: 9092
    targetPort: 9092
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kafka
  labels:
    app: kafka
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kafka
  template:
    metadata:
      labels:
        app: kafka
    spec:
      containers:
      - name: kafka
        image: bitnami/kafka
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 9092
        - containerPort: 9093
        env:
        - name: KAFKA_BROKER_ID
          value: "1"
        - name: KAFKA_ZOOKEEPER_CONNECT
          value: zookeeper-service:2181
        - name: KAFKA_LISTENERS
          value: PLAINTEXT://:9092,PLAINTEXT_HOST://:9093 
        - name: KAFKA_ADVERTISED_LISTENERS
          value: PLAINTEXT://kafka-service:9092,PLAINTEXT_HOST://localhost:9093
        - name: KAFKA_LISTENER_SECURITY_PROTOCOL_MAP
          value: PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
        - name: KAFKA_INTER_BROKER_LISTENER_NAME
          value: PLAINTEXT
```

`zookeeper.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: zookeeper-service
spec:
  selector:
    app: zookeeper
  ports:
  - port: 2181
    targetPort: 2181
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zookeeper
  labels:
    app: zookeeper
spec:
  replicas: 1
  selector:
    matchLabels:
      app: zookeeper
  template:
    metadata:
      labels:
        app: zookeeper
    spec:
      containers:
      - name: zookeeper
        image: library/zookeeper
        imagePullPolicy: IfNotPresent
        ports:
        - containerPort: 2181
        env:
        - name: ZOOKEEPER_CLIENT_PORT
          value: "2181"
        - name: ZOOKEEPER_TICK_TIME
          value: "2000"
```


## Deploying Spark

`Dockerfile`:

```shell
FROM sbtscala/scala-sbt:graalvm-ce-22.3.3-b1-java17_1.9.6_3.3.1
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN cd spark_stream_processor; sbt compile
CMD cd spark_stream_processor; sbt run
```

`spark-stream-processor.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: spark-service
spec:
  selector:
    app: spark
  clusterIP: None
  ports: []
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spark
  labels:
    app: spark
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spark
  template:
    metadata:
      labels:
        app: spark
    spec:
      containers:
      - name: spark
        image: kwangjong/spark-stream-processor
```

## Deploying Cassandra

For cassandra, you need to import copy .cql file and load it after cassandra has succesfully started.

`Dockerfile`:

```shell
FROM cassandra:latest

COPY ./cassandra-setup.cql /cassandra-setup.cql
RUN sed -i "s/rpc_address: localhost/rpc_address: 0.0.0.0/g" /etc/cassandra/cassandra.yaml
RUN sed -i "s/# broadcast_rpc_address: 1.2.3.4/broadcast_rpc_address: 1.2.3.4/g" /etc/cassandra/cassandra.yaml

RUN mkdir /home/cassandra
RUN chown cassandra:users /home/cassandra

USER cassandra
CMD cassandra -f | tee ~/cassandra.log & \
    echo waiting for cassandra to start && \
    tail -n 0 -F ~/cassandra.log | grep -q "Created default superuser role" && \
    echo cassandra is ready && \
    cqlsh 127.0.0.1 -f /cassandra-setup.cql && \
    echo loaded cassandra-setup.cql && \
    tail -f /dev/null
```

`cassandra.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: cassandra-service
spec:
  selector:
    app: cassandra
  ports:
  - port: 9042
    targetPort: 9042
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cassandra
  labels:
    app: cassandra
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cassandra
  template:
    metadata:
      labels:
        app: cassandra
    spec:
      containers:
      - name: cassandra
        image: kwangjong/cassandra
        ports:
        - containerPort: 9042
```

## Deploying Grafana 

`Dockerfile`:

```shell
FROM grafana/grafana:latest
# Install required plugin for cassandra
RUN grafana-cli plugins install hadesarchitect-cassandra-datasource

# Copy custom configuration files
COPY grafana.ini /etc/grafana/grafana.ini
COPY cassandra.yaml /etc/grafana/provisioning/datasources/cassandra.yaml
COPY dashboard.yaml /etc/grafana/provisioning/dashboards/dashboard.yaml
COPY dashboards /var/lib/grafana/dashboards
```

`grafana.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: grafana-service
spec:
  selector:
    app: grafana
  type: NodePort
  ports:
  - port: 3000
    targetPort: 3000
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  labels:
    app: grafana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
      - name: grafana
        image: kwangjong/grafana
        ports:
        - containerPort: 3000
```

# Connecting to Grafana

Once Grafana is deployed, you can connect to it using the following command:

```shell
minikube service grafana-service --url
```

This will provide you with a URL to access the Grafana web interface.

# Conclusion

In this blog post, we've introduced Kubernetes and Minikube and guided you through the process of setting up Minikube, deploying essential components of our real-time data pipeline, and connecting to Grafana for data visualization. This foundation will enable you to experiment with real-time data processing in a Kubernetes environment.

# Links
- [Github Repo](https://github.com/kwangjong/coinbase-real-time-data-pipeline/)
- [Minikube Installation Guide](https://minikube.sigs.k8s.io/docs/start/)
- [Kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
