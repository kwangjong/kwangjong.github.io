---
title: Enhancing Real-Time Data Pipelines with HDFS and Kafka Consumer in Go
tags: [ data-pipeline, kafka, hdfs ]
date: 2024-06-24 01:14:34 +09:00
visibility: public
---

In our previous blog post, we explored the integration of Hadoop Distributed File System (HDFS) into a real-time data pipeline, enhancing its capabilities for scalable and reliable raw data storage. Today, we'll delve deeper into the Kafka consumer implementation in Go that captures data from Kafka and writes it directly into HDFS.

### Recap: Integrating HDFS into the Data Pipeline

In our existing data pipeline architecture, which utilizes technologies like Kafka, Apache Spark, Cassandra, and Grafana, we introduced HDFS primarily for its scalability, fault tolerance, and high throughput characteristics. This addition allowed us to efficiently store raw data streamed from Kafka, enabling robust data processing and analytics.

### Why Kafka and HDFS?

Kafka serves as a central message broker, managing data streams from various sources like the Coinbase API. It ensures reliable and real-time data transport, making it ideal for streaming applications. On the other hand, HDFS excels in storing large volumes of data reliably, making it a perfect fit for storing raw data in our pipeline.

### Kafka Consumer Implementation in Go

To bridge the gap between Kafka and HDFS, we use a Go application that acts as a Kafka consumer. This consumer reads messages from the "coin-data" topic in Kafka and writes them directly into HDFS. Below is the Go code snippet for our Kafka consumer:

```golang
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/confluentinc/confluent-kafka-go/kafka"
    "github.com/colinmarc/hdfs"
)

func main() {
    // Kafka configuration
    config := kafka.ConfigMap{
        "bootstrap.servers": "kafka-service:9092",
        "group.id":          "hdfs-writer-group",
        "auto.offset.reset": "earliest",
    }

    // Create Kafka consumer
    consumer, err := kafka.NewConsumer(&config)
    if err != nil {
        log.Fatalf("Failed to create consumer: %s", err)
    }
    defer consumer.Close()

    // Subscribe to the Kafka topic
    topic := "coin-data"
    err = consumer.Subscribe(topic, nil)
    if err != nil {
        log.Fatalf("Failed to subscribe to topic: %s", err)
    }

    // HDFS configuration
    hdfsClient, err := hdfs.New("hdfs-service:9000")
    if err != nil {
        log.Fatalf("Failed to create HDFS client: %s", err)
    }

    // Open HDFS file for writing
    hdfsFilePath := "/raw_data"
    hdfsFile, err := hdfsClient.Append(hdfsFilePath)
    if err != nil {
        hdfsFile, err = hdfsClient.Create(hdfsFilePath)
        if err != nil {
            log.Fatalf("Failed to create HDFS file: %s", err)
        }
    }
    defer hdfsFile.Close()

    // Context to manage message consumption
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    // Consume messages from Kafka
    for {
        select {
        case <-ctx.Done():
            fmt.Println("Stopping consumer")
            return
        default:
            msg, err := consumer.ReadMessage(-1)
            if err != nil {
                fmt.Printf("Consumer error: %v (%v)\n", err, msg)
                continue
            }

            // Write the raw data to HDFS
            _, err = hdfsFile.Write([]byte(msg.Value))
            if err != nil {
                log.Fatalf("Failed to write to HDFS file: %s", err)
            }

            // Print message to console (optional)
            fmt.Printf("Consumed message: %s\n", string(msg.Value))
        }
    }
}
```

### Explanation

- **Kafka Configuration:** Connects to the Kafka service running at `kafka-service:9092`.
- **Consumer Group:** Uses `hdfs-writer-group` to manage offsets and ensure reliable message delivery.
- **Topic Subscription:** Subscribes to the `coin-data` topic in Kafka to receive incoming messages.
- **HDFS Integration:** Utilizes the `colinmarc/hdfs` package to interact with HDFS at `hdfs-service:9000`.
- **Message Consumption:** Reads messages from Kafka indefinitely, writes them to the `/raw_data` file in HDFS, and logs each consumed message to the console.

![new-pipeline](https://i.imgur.com/w4dNGpx.png)

### Benefits of Using Go for Kafka Consumers

- **Concurrency:** Go's concurrency model enables efficient handling of multiple Kafka partitions and message processing.
- **Robustness:** Built-in error handling and logging capabilities ensure reliable operation in production environments.
- **Performance:** Go's performance characteristics make it well-suited for high-throughput data processing tasks.

### Conclusion

Integrating a Kafka consumer in Go to stream data into HDFS enhances our data pipeline's capabilities, providing scalable and reliable raw data storage. This setup supports our goal of building a robust infrastructure for real-time data processing and analytics. Stay tuned for more updates and detailed guides on enhancing data pipelines with modern technologies.

For detailed Docker and Kubernetes configurations used in this setup, visit the GitHub repository [here](https://github.com/kwangjong/coinbase-real-time-data-pipeline/).
