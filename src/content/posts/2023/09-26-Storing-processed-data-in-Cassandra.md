---
title: Storing processed data in Cassandra
tags: [ 'cassandra', 'data-pipeline', 'distributed system' ]
date: 2023-09-25 19:52:52 -05:00 
---

<img src="https://miro.medium.com/v2/resize:fit:1400/1*JcjYN7VgCa9QGOBSJbiYmQ.png" alt="cassandra" width="800" style="background-color:white;"/>

# What is Cassandra?

Apache Cassandra is a distributed NoSQL database designed for high availability, scalability, and fault tolerance. It is an ideal choice for managing large volumes of data across multiple servers.

# Setting up Cassandra

Pull the latest Cassandra Docker image:
```shell
docker pull cassandra:latest
```
Create a Docker network for Cassandra to communicate within:
```shell
docker network create cassandra
```
Start a Cassandra container:
```shell
docker run --rm --name cassandra --hostname cassandra --network cassandra cassandra
```

# Run interactive CQLsh

Once Cassandra is running, you can interact with it using CQL shell (CQLsh). Open a new terminal and execute the following commands:
```shell
docker exec -it cassandra cqlsh
```

You'll now be inside the CQL shell, where you can execute Cassandra queries.
```shell
cqlsh> describe tables;
```
This command lists all keyspaces and their tables.

# Using a CQL script

You can use CQL scripts to set up your Cassandra keyspace and tables. Create a file named cassandra-setup.cql with the following content:

`cassandra-setup.cql`:
```sql
CREATE KEYSPACE IF NOT EXISTS coinbase
    WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

USE coinbase;

CREATE TABLE IF NOT EXISTS coinbase_prices (
    sequence BIGINT,
    product_id TEXT,
    price FLOAT,
    low_24h FLOAT,
    high_24h FLOAT,
    time TIMESTAMP,
    PRIMARY KEY(product_id, time)
) WITH CLUSTERING ORDER BY (time DESC);
```

# Building a Cassandra Image with Setup File

To use your setup file, you'll need to create a Docker image that includes it. Create a Dockerfile with the following content:

```shell
FROM cassandra:latest

COPY ./cassandra-setup.cql /cassandra-setup.cql
```

Build the image:

```shell
docker build . -t cassandra
```

# Running Cassandra with Setup

Now, you can start Cassandra with the new image. Wait until Cassandra is up and running. Then, load the setup file:

```shell
docker exec cassandra cqlsh cassandra -f cassandra-setup.cql
```

# Querying the Table

After the setup is complete, you can query your new table using the interactive CQL shell:

```sql
cqlsh> SELECT * FROM coinbase.coinbase_prices;

 product_id | time | high_24h | low_24h | price | sequence
------------+------+----------+---------+-------+----------

(0 rows)
```

# Writing Spark Stream to Cassandra

Here's how to write a data stream in Spark to Cassandra:

```java
import org.apache.spark.sql.streaming.{OutputMode, Trigger}
...
    // Create a SparkSession
    val spark = SparkSession.builder
    .appName("StreamProcessor")
    .config("spark.master", "local")
    .config("spark.cassandra.connection.host", "cassandra") // Cassandra ip
    .config("spark.cassandra.connection.port", "9042") // Cassandra port
    .getOrCreate()
...
    // Write the results to Cassandra
    parsedStream
    .writeStream
    .foreachBatch { (batchDF: DataFrame, batchId: Long) =>
         batchDF
             .write
             .format("org.apache.spark.sql.cassandra")
             .options(Map("table" -> "coinbase_prices", "keyspace" -> "coinbase")) // Cassandra table>
             .mode("append")
             .save()
    }
    .trigger(Trigger.ProcessingTime("5 seconds"))
    .outputMode(OutputMode.Append())
    .start()
    .awaitTermination()
...
```

Also, add this to `build.sbt`:
```python
libraryDependencies += "com.datastax.spark" %% "spark-cassandra-connector" % "3.4.1",
```
# Conclusion

In this quick start guide, you've learned how to set up Cassandra using Docker, create keyspaces and tables, and load data into Cassandra using CQL scripts. Cassandra is a powerful NoSQL database that can handle large-scale data storage and retrieval, making it a valuable tool for various applications.

# Links
* [Official Cassandra Quick Start](https://cassandra.apache.org/_/quickstart.html)
* [Cassandra Docker Hub](https://hub.docker.com/_/cassandra)
