---
title: Deploying a Go API Server with Docker
tags: [ go, docker, blog-migration ]
date: 2023-09-20 14:49:45 -05:00 
---

## Introduction

In today's post, I'll take you through the process of deploying a Go API server using Docker, a powerful tool for creating, deploying, and running applications in containers. This deployment method brings a host of advantages, such as improved consistency, scalability, and ease of management.

## Why Docker?

Docker has become an essential tool in modern software development and deployment. In a previous blog post, I discussed deploying the API server using a straightforward "screen" command. While this approach might seem simple, it becomes challenging to manage dependencies when transitioning to different machines. Docker allows you to package your application along with its dependencies into a single container, ensuring consistency across different environments. This encapsulation simplifies deployment and reduces compatibility issues.


## Using the Golang Docker Image

For our deployment, we'll leverage the official [Golang Docker image](https://hub.docker.com/_/golang) available on Docker Hub. You can download this image using the following command:

```shell
$ docker pull golang
```

This official image provides a solid foundation for building and running Go applications in a containerized environment.

## Creating a Dockerfile

The first step in deploying a Go API server with Docker is creating a Dockerfile. This file provides instructions to Docker on how to build the container image for your application. Here's my Dockerfile:

```shell
FROM golang:1.21

WORKDIR /usr/src/app

COPY go.mod go.sum vendor/ ./
RUN go mod download && go mod verify

COPY . .
RUN mkdir -p /usr/local/bin
RUN go build -v -o /usr/local/bin/app .

CMD ["app"]
```

In this Dockerfile:
- We start from an official Go image from Docker Hub.
- Set the working directory to `/usr/src/app`.
- Pre-copy/cache go.mod for pre-downloading dependencies and only re-downloading them in subsequent builds if they change
- Copy the entire application code into the container.
- Build the Go application binary and place it in `/usr/local/bin`.
- Define the command to run our application when the container starts.

## Building the Docker Image

With the Dockerfile in place, you can now build the Docker image. 

```shell
$ docker build -t api-server .
```

## Running the Docker Container

Once the image is built, you can run the Docker container using the following command:

```shell
$ docker run -d -p 443:443 api-server
```
Here's a breakdown of the command:
- `-d`: Runs the container in detached mode, allowing it to run in when exited from ssh.
- `-p 443:443`: Maps port 443 on the host to port 443 in the container, ensuring that the API server is accessible over HTTPS.

# Conclusion

Deploying a Go API server with Docker simplifies the deployment process, ensuring that your application runs consistently across various environments. Docker's containerization provides isolation and scalability benefits, making it an excellent choice for deploying web services.
