---
title: Structured Stream Processing with Scala Spark
tags: [ 'spark', 'scala', 'data-pipeline', 'distributed system' ]
date: 2023-09-24 23:50:18 -05:00 
---

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Apache_Spark_logo.svg/512px-Apache_Spark_logo.svg.png" alt="spark" style="background-color:white;"/>

Apache Spark is a powerful open-source data processing framework that provides high-level APIs for distributed data processing. One of its key components is Structured Streaming, which allows developers to process real-time data streams in a structured and declarative manner. In this guide, we will explore how to set up a structured stream processing application using Scala and Apache Spark.

# Why Scala?
Scala is a popular programming language for Apache Spark due to its compatibility with the Java Virtual Machine (JVM) and its concise, expressive syntax. Scala seamlessly integrates with Spark's APIs, making it a natural choice for building Spark applications.

# Getting Started
To get started with structured stream processing in Scala Spark, you'll need to install the Simple Build Tool (SBT), a popular build tool for Scala projects. Follow the installation instructions [here](https://www.scala-sbt.org/1.x/docs/Installing-sbt-on-Linux.html) to install SBT.

Once you have SBT installed, you can proceed to create your first Scala Spark project.

## Hello World in Scala
The [Scala-SBT reference manual](https://www.scala-sbt.org/1.x/docs/Hello.html) provides a simple guide to create your first "Hello World" Scala project using the `sbt new` command. Here's a quick summary:

```shell
$ sbt new sbt/scala-seed.g8
```

When prompted for the project name, type "hello."

```shell
$ cd hello
$ sbt
...
> run
...
```

# Understanding Structured Streaming
Structured Streaming is a high-level API for stream processing in Spark. It allows you to treat streaming data as a series of structured tables, making it easier to apply SQL-like operations on the data.

# Creating a Spark Session
To begin structured stream processing, create a Spark session in Scala as follows:

```java
val spark = SparkSession.builder
  .appName("StreamProcessor")
  .config("spark.master", "local")
  .getOrCreate()
```

# Subscribing to a Kafka Topic
In this example, we will subscribe to a Kafka topic. Configure your Spark session to read from Kafka as shown below:

```java
val kafkaStream = spark.readStream
  .format("kafka")
  .option("kafka.bootstrap.servers", "localhost:9092") // Kafka broker address
  .option("subscribe", "test-topic") // Kafka topic to subscribe to
  .load()
```

# Parsing JSON Data
Define a schema for your data, and then parse the incoming JSON messages accordingly:

```java
val schema = StructType(Seq(
    StructField("sequence", LongType, nullable = false),
    StructField("product_id", StringType, nullable = false),
    StructField("price", StringType, nullable = false),
    StructField("low_24h", StringType, nullable = false),
    StructField("high_24h", StringType, nullable = false),
    StructField("time", TimestampType, nullable = false)
))

val jsonStream = kafkaStream
  .selectExpr("CAST(value AS STRING)")
  .select(from_json(col("value"), schema).as("data"))
  .select("data.*")
```

Additionally, cast StringType columns to FloatType where necessary.

```java
val parsedDF = jsonStream
  .select(
    col("sequence"),
    col("product_id"),
    col("price").cast(FloatType).alias("price"),
    col("low_24h").cast(FloatType).alias("low_24h"),
    col("high_24h").cast(FloatType).alias("high_24h"),
    col("time")
  )
```

# Printing Output to the Console
Finally, you can print the processed data to the console as follows:

```java
val query = parsedDF
  .writeStream
  .outputMode("append")
  .format("console")
  .start()
```

# Conclusion
In this guide, we've explored the fundamentals of structured stream processing with Scala and Apache Spark. We've set up a Spark session, subscribed to a Kafka topic, parsed JSON data, and printed the results to the console. This is just the beginning of what you can achieve with structured streaming, as Spark offers a wide range of transformations and sinks for processing and outputting real-time data.

# Links
* [sbt Reference Manual](https://www.scala-sbt.org/1.x/docs/index.html)
* [Structured Streaming Programming Guide](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)
