---
title: "Getting Started with Apache Kafka"
tags: [ 'data-pipeline' ]
date: 2023-09-23 20:37:57 -05:00 
visibility: public
---
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Apache_kafka_wordtype.svg/2560px-Apache_kafka_wordtype.svg.png" alt="kafka" width="800" style="background-color:white;"/>

In today's rapidly evolving data-driven landscape, handling real-time data streams efficiently is crucial. Apache Kafka, a powerful distributed streaming platform, is designed to address this challenge. In this blog post, we'll explore the steps to get started with Apache Kafka on Ubuntu 22.04, using Kafka version 3.5.0.

### Prerequisites
These are the software versions I used for this post:
- Ubuntu 22.04
- Apache Kafka 3.5.0
- Maven 3.9.4
- OpenJDK 21 

## Step 1: Obtain Kafka

First, download the Kafka distribution package from the [official Kafka website](https://kafka.apache.org/downloads). Once downloaded, extract the package using the following commands:

```shell
$ wget https://archive.apache.org/dist/kafka/3.5.0/kafka_2.13-3.5.0.tgz
$ tar -xzf kafka_2.13-3.5.0.tgz
$ cd kafka_2.13-3.5.0
```

## Step 2: Start Kafka and Zookeeper

Kafka relies on Zookeeper for distributed coordination. Start Zookeeper using the provided configuration file:

```shell
$ bin/zookeeper-server-start.sh config/zookeeper.properties
```

In another terminal session, start the Kafka server:

```shell
$ bin/kafka-server-start.sh config/server.properties
```

This setup initializes the Kafka broker, and you're now ready to interact with Kafka.

## Step 3: Create a Test Topic

Topics in Kafka are like message categories. Let's create a test topic named "test-topic" using the following command:

```shell
$ bin/kafka-topics.sh --create --topic test-topic --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

## Step 4: Produce Messages to the Topic

Now that you have a topic, let's send some test messages to it. A client application that publishes events to a Kafka cluster is called **producer**. Start a producer console with the following command:

```shell
$ bin/kafka-console-producer.sh --topic test-topic --bootstrap-server localhost:9092
```

This console allows you to type and send messages. Enter a few messages, like:

```
This is my first event
This is my second event
```

## Step 5: Consume Messages from the Topic

A client application that subscribes to events is called **consumer**.
To consume the messages you've published, open another terminal session and use the consumer console:

```shell
$ bin/kafka-console-consumer.sh --topic test-topic --from-beginning --bootstrap-server localhost:9092
```

You should see the messages you published earlier displayed in the console.

## Using Kafka with Java

While the command-line tools are useful for testing, Kafka is designed to be integrated into applications. Let's create a simple Java Kafka producer and consumer.

### Producer

Create a Maven project for your producer, and add the following code to your `Producer.java` class:

```java
package com.kwangjong.kafka;

import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.serialization.StringSerializer;

public class Producer {

    private static final String TOPIC = "test-topic";
    private static final String BOOTSTRAP_SERVERS = "localhost:9092";

    public static void main(String[] args) throws IOException, InterruptedException {
        // Create a Kafka producer.
        Properties props = new Properties();
        props.put("bootstrap.servers", BOOTSTRAP_SERVERS);
        props.put("key.serializer", StringSerializer.class.getName());
        props.put("value.serializer", StringSerializer.class.getName());

        KafkaProducer<String, String> producer = new KafkaProducer<>(props);

        // Send mock data every second.
        for (int i=0; i<10; i++) {
            producer.send(new ProducerRecord<>(TOPIC, "mock_data"));
            System.out.printf("sent %d\n", i);
            TimeUnit.SECONDS.sleep(1);
        }

        // Close the producer.
        producer.close();
    }
}
```

In your producer's Maven `pom.xml`, include the Kafka dependencies and configure the build to create an executable JAR file. You can view my pom.xml file [here](https://github.com/kwangjong/real-time-data-pipeline/blob/main/test/test-producer/pom.xml).

### Consumer

Similarly, create a Maven project for your consumer, and add the following code to your `Consumer.java` class:

```java
package com.kwangjong.kafka;

import java.util.Arrays;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.serialization.StringDeserializer;

public class Consumer {

    public static void main(String[] args) {
        // Create a Kafka consumer.
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("group.id", "test-group");
        props.put("key.deserializer", StringDeserializer.class.getName());
        props.put("value.deserializer", StringDeserializer.class.getName());

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

        // Subscribe to the Kafka topic.
        consumer.subscribe(Arrays.asList("test-topic"));

        try {
            while(true) {
                // Poll for new messages.
                ConsumerRecords<String, String> records = consumer.poll(100);
                // Print the messages.
                for (ConsumerRecord<String, String> record : records) {
                    System.out.println("Received message: " + record.value());
                }
            }
        } finally {
            // Close the consumer.
            consumer.close();
        }
    }
}
```

Configure the consumer's Maven `pom.xml` as you did for the producer. You can view my pom.xml file [here](https://github.com/kwangjong/real-time-data-pipeline/blob/main/test/test-consumer/pom.xml).

### Building and Running

For each consumer and producer, build the project using:

```shell
$ mvn clean package
```

You can run the generated JAR files using:

```shell
$ java -jar target/test-producer-1.jar
```

and

```shell
$ java -jar target/test-consumer-1.jar
```

Check the output of the consumer, which should print "mock-data" value published from the producer.

By following these steps, you've initiated your Kafka journey. You now have a working Kafka setup on Ubuntu 22.04, understand the basics of Kafka topics, and have created simple Java producers and consumers to interact with Kafka. This foundation will serve as a springboard for exploring more advanced Kafka features and building robust real-time data processing pipelines.

## Links
* [Apache Kafka Quickstart](https://kafka.apache.org/quickstart)
* [My Github repo](https://github.com/kwangjong/real-time-data-pipeline/tree/main/test)
