---
layout: post
title: Blog Migration I
tags: Go, MongoDB, Vue.js, web, fullstack
date: 2023-02-26 23:50 -0500
---

Jekyll is a popular static site generator hosted on GitHub pages, making it a convenient option for bloggers with no need for a backend server. However, I decided to migrate my blog to a full-stacked website to learn and practice my web development skills. Building a full-stacked blog website will be a great opportunity to do so.

## Stack?

When it comes to choosing the stack, there are several conventional options, such as MEAN, MERN, MEVN, or LAMP. However, I decide to use an unconventional way. Go for the backend, MongoDB for the database, and Vue.js for the front end. I guess I'll call it GMV stack??

### Why Go?

Go is known for its fast and efficient runtime performance and development, making it an excellent choice for building high-performance web applications in a short period of time. Additionally, it has a solid standard library for handling HTTP requests and does not rely on another web framework. Last but not least, despite its popularity and strong community, I personally do not enjoy writing code in Javascript/typescript. They are such a pain to code...🤦‍♂️

### Why MongoDB?

MongoDB is a NoSQL database program that uses JSON-like documents. It employs a document model with a flexible schema compared to the rigid table of SQL with a fixed schema. MongoDB has a native Go driver, making it easy to work with and perfect for building modern web applications.

### Why Vue.JS?

I don't have any preference for a frontend framework, nor have I used Vue before. But, Vue is generally known for being suitable for smaller, less complex apps and is easier to learn from scratch compared to React or Angular. So I decided to give Vue a try.

## Server?

Me being a poor college student, I am using free servers only.
Free servers offered by cloud companies are:
[Oracle's Always Freee Resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
[GCP's Free Tier](https://cloud.google.com/free/docs/free-cloud-features#free-tier)
Oracle provided the most resources with `VM.Standard.A1.Flex` upto 4 CPUs and 24GB memory. But, due to shortage of servers, I wasn't able to aquire one. So, I had to choose GCP's `e2-micro` with 0.25~2 shared CPUs and 1GB memory. I am not expecting any traffic to my blog besides myself. So, I am hoping 1GB memory to work with my app. I will definitely migrate to Oracle later when it gets available.

For the database, I am using [Mongo DB's Free-Forever Cluster](https://www.mongodb.com/pricing) with 512MB which is small but enough for my blog (the current size of my blog is 561kb, including scripts and html&css).

Lastly, the frontend will be hosted on GitHub pages which is free.

## Conclusion
Migrating from Jekyll to a full-stacked blog website will be an excellent opportunity to learn and practice my web development skills. I hope for GMV stack and my server choices to work with my blog app. I will keep posting updates on my progress.
