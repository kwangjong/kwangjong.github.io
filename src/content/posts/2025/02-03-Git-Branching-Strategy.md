---
title: Git Branching Strategy
tags: [ 'git' ]
date: 2025-02-03 22:22:58 +09:00
visibility: public #private unlisted
---

https://tech.mfort.co.kr/blog/2022-08-05-trunk-based-development/ (2022) <br>
https://www.atlassian.com/git/tutorials/comparing-workflows<br>
https://about.gitlab.com/blog/2023/07/27/gitlab-flow-duo/ (2024)<br>
https://trunkbaseddevelopment.com/

### Gitflow
- Uses two main branches, `main` and `develop`, plus long-lived `release` and `hotfix` branches
- Code merges from `feature` -> `develop` -> `release` ->  (eventually)  `main`
- Often considered overkill for many teams today, due to additional overhead of managing multiple long-lived branches

### Trunk-based
- Maintains one main "trunk" branch as the single source of truth
- Do not typically uses a permanent `develop` or `staging` branch -- everything flows in `main` branch 
- Commits and push either go directly to `main` or in short-lived branches that get merged back quickly
- Either tag the `main` branch at a given commit or create a short-lived release branch
 
### Github flow
-  `main` is always production-ready
- Short-lived `feature` branches are created off `main`, and merged via pull request back into `main`
- No persistent `develop` or `staging`
- Releases happen by tagging or simply deploying directly after merge (CI/CD)

#### Trunk-based vs Github flow
- In trunk-based development, devs may push to `main`. In Github flow, use pull requests from `feature` branches.
- Github flow puts more emphasis on utilizing pull request and code reviews, whereas Trunk-based does not strictly require a PR. It places more emphasis on keeping `main` as single source of truth.
