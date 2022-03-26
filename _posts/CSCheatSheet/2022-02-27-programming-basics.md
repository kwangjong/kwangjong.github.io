---
layout: post
title: Programming Basics
tags: CSCheatSheet
date: 2022-02-27 00:00 +0900
toc: true
categories: ComputerScienceCheatSheet
hidden: true
---

Collection of some fundamental concepts in programming.

## Memory Regions
There are four different regions in a typical program's memory.

***Code***: the region where the instructions are stored.<br/>
***Static***: the region where static fields are allocated. The data in this region are allocated only once during the execution of the program.<br/>
***Stack***: a linear memory region where a function calls and its local variables are stored. It is allocated when the functions or methods are called and de-allocates when it returns. **Stack** expands downwards from high address to low address.<br/>
***Heap***: the memory region available for programmers to allocate and de-allocate freely. Data in the heap is accessible to all threads. When an object is created, the object is allocated in the **heap**, and the reference to the object is stored in the **stack**. **Heap** expands upwards from low address to high address. 

![memory-regions](https://kwangjong.github.io/CSCheatSheet/img/memory-regions.png)

### Garbage Collection
When heap memory is handled poorly by the programmer, issues like out-of-memory or memory leaks can happen. Most high-level languages use an automatic memory management mechanism called ***Garbage Collection***. It searches for unused data in heap and de-allocates them.

To determine which unnecessary data for **Garbage Collector** to de-allocate, the program needs to keep track of which objects are being used. Programming languages like Java and Python use a technique called ***reference counting***. 
The program keeps track of the number of reference variables that are currently referring to an object. If the reference count is zero the object is considered **unreachable object** which is freed by the **garbage collector**.

## Author
All implementations and visual aids are created by me.--If you find any mistakes (syntax, logic, or grammar), criticisms are always welcomed! Feel free to reach out to me.
