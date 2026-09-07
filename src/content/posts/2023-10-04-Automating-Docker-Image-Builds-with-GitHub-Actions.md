---
title: "Automating Docker Image Builds with GitHub Actions"
tags: [ 'cicd', 'data-pipeline' ]
date: 2023-10-04 15:16:50 -05:00 
visibility: public
---

![diagram](https://i.imgur.com/LU2iYUF.png)

In today's world of rapid software development, automation is key. One critical aspect of this is the seamless creation and distribution of Docker images, a fundamental building block for containerized applications. GitHub Actions, a powerful CI/CD (Continuous Integration/Continuous Deployment) platform, can simplify and automate this process. In this blog post, we'll explore how to set up GitHub Actions to automatically build and push Docker images to Docker Hub every time a developer pushes code to the repository.

## What is CI/CD, and Why Is It Important?

Before diving into the technical details, let's clarify what CI/CD is and why it's crucial. CI/CD stands for Continuous Integration and Continuous Deployment. It's a set of principles and practices that help development teams deliver code changes more frequently and reliably.

Continuous Integration (CI) involves automatically integrating code changes from multiple contributors into a shared repository. This integration triggers automated tests to ensure that the new code doesn't break existing functionality. The goal is to detect and address issues early in the development process.

Continuous Deployment (CD) takes CI a step further by automatically deploying code changes to production or staging environments after passing the CI tests. This reduces the time and effort required to release new features or bug fixes.

By implementing CI/CD, development teams can:

- **Speed up development**: Automated testing and deployment save time and reduce manual errors.
- **Improve code quality**: CI ensures that code changes don't introduce bugs or regressions.
- **Enable frequent releases**: CD makes it easier to release new features and fixes to users.

## Setting Up GitHub Actions for Docker

GitHub Actions allows you to automate various tasks, and one of its powerful use cases is building and pushing Docker images. Here are the steps to set up this automation:

### Step 1: Create a Workflow File

In your GitHub repository, create a directory named `.github/workflows` if it doesn't already exist. Inside this directory, add a YAML file that defines your workflow. You can name it something like `ci.yml`.

### Step 2: Define the Workflow

In your workflow file, define the steps required to build and push your Docker image. Here's a simplified example:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}

    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        context: /my-app-dir
        push: true
        tags: username/my-app:latest
```

This workflow does the following:

- It triggers on every push to the `main` branch.
- It runs on the latest version of Ubuntu.
- It checks out your repository's code.
- It logs in to Docker Hub using your credentials stored as GitHub secrets.
- It builds and pushes a Docker image from your code.

### Step 3: Configure Secrets

To securely store your Docker Hub credentials, you need to add them as secrets in your GitHub repository. Navigate to your repository on GitHub, go to "Settings", "Secrets and variables", then "Actions" and add two secrets: `DOCKERHUB_USERNAME` (your Docker Hub username) and `DOCKERHUB_PASSWORD` (your Docker Hub password or access token).

### Step 4: Trigger the Workflow

Now, whenever a developer pushes code to the `main` branch of your repository, this GitHub Actions workflow will automatically build a Docker image and push it to Docker Hub.

## Conclusion

Automating Docker image builds with GitHub Actions streamlines your development process, making it faster, more reliable, and less error-prone. With this setup in place, you can focus on writing code, knowing that your Docker images are automatically built, tested, and ready for deployment whenever you make changes. It's a powerful step toward modernizing your development workflow.

## Further Reading
- [My ci.yml for coinbase-real-time-data-pipeline](https://github.com/kwangjong/coinbase-real-time-data-pipeline/blob/main/.github/workflows/ci.yml)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Hub](https://hub.docker.com/)
- [Build and Push Docker Images](https://github.com/marketplace/actions/build-and-push-docker-images)
