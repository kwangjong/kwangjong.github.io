---
title: Configuring OpenID Connect in AWS
tags: [ "cloud", "cicd" ]
date: 2025-01-31 16:55:44 +09:00
visibility: public #private unlisted
---

**OpenID Connect (OIDC)** allows GitHub Actions workflows to access AWS resources securely. Previously, this required storing credentials as GitHub secrets, but OIDC offers a more dynamic and secure approach. In my case, I’m building a Terraform CI/CD pipeline to deploy AWS infrastructure using GitHub Actions.

### Create IAM OIDC identity provider
1. Go to **AWS IAM** -> **Identity providers**
2. Click **Add provider** -> **Provider type** -> **OpenID Connect**
3. Set the **Provider URL** and **Audience**
>	- For the **provider URL**: Use `https://token.actions.githubusercontent.com`
>	- For the **Audience**: Use `sts.amazonaws.com` if you are using the [official action](https://github.com/aws-actions/configure-aws-credentials).
4. Click **Add provider**
### Create IAM role
1. Go to **AWS IAM** -> **Roles**
2. Click **Create role** -> **Trusted entity type** -> **Web Identity**
3. Select `token.actions.githubusercontent.com` for **Identity provider**
	- For the **identity provider**, select `token.actions.githubusercontent.com`
	- For the **audience**, select `sts.amazonaws.com`
	- Fill in **GitHub organization**, **GitHub repository**, and **GitHub branch**.
4. Choose necessary policies to attach to the role.
5. Fill in **Role details** and click **Create role**

### Update GitHub Actions Workflow
Update workflow to assume the IAM role.
```yaml
jobs:
  plan: 
    name: Terraform Plan 
    runs-on: ubuntu-latest 
    permissions: 
      id-token: write
...
    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::12345678:role/github-oidc-role
          aws-region: ap-northeast-2
...
```
### Links
- https://docs.github.com/ko/enterprise-cloud@latest/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services
