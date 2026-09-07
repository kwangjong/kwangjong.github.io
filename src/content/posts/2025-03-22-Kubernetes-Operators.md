---
title: Kubernetes Operators
tags: [ "k8s" ]
date: 2025-03-22 18:22:13 +09:00
visibility: public #private unlisted
---

## What Are Kubernetes Operators?
A Kubernetes operator is a custom controller that extends the Kubernetes API. It embeds human operational knowledge into software to automate the management of complex, stateful applications.

## Imperative vs Declarative
- In an imperative system, a human operator manually observes the current state of the system and performs specific action to reach the desired state.
- In a declarative system, the operator defines the desired state, and the system takes care of transitioning from current state to the desired state.
- Kubernetes follows a declarative model. Controllers continuously watches each resources' desired state (`spec`) and actual state (`status`) and run  a reconciliation loop to make necessary changes and ensure the actual state matches the desired state.

![](https://imgur.com/7REpJ26.png)

## Operator SDK vs. Kubebuilder
- Both Operator SDK and Kubebulder help developers define and implement custom resources and their controllers.
- **Kubebuilder:**  
  - Provides minimal, Go-centric scaffolding using controller-runtime.  
  - Closely aligns with core Kubernetes patterns for custom resource and controller development.
- **Operator SDK:**  
  - Builds on Kubebuilder’s foundation with additional features, such as:  
    - **Multi-language Support:** Offers options to build operators using Helm or Ansible in addition to Go.  
    - **Enhanced Tooling:** Includes built-in scorecards, streamlined testing, and a polished CLI experience.  
    - **OLM Integration:** Simplifies deployment and upgrades in production environments through integration with the Operator Lifecycle Manager.

## Links 
- https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
- https://www.cecg.io/blog/things-to-know-operators/
- https://sdk.operatorframework.io/docs/faqs/
