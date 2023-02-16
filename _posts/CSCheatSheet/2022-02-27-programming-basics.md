---
layout: post
title: Programming Basics
tags: CSCheatSheet
date: 2022-02-27 00:00 +0900
toc: true
categories: ComputerScienceCheatSheet
hidden: true
---

Collection of some basics in programming.

## Procedural Programming vs Object-Oriented Programming
### Procedural Programming
***Procedural Programming*** is a programming model that uses **top-down approach**. It is based upon the concept of calling **functions**. A function is also known as procedure, routine, or subroutine. The program follows step-by-step instructions provided by the functions. Examples of procedural programming languages are Cobol, Fortran, and C.

### Object-Oriented Programming
***Object-Oriented Programming*** is a programming model based upon the concept of **objects**. An **object** is a component of a program that consists of data called **attributes** and code called **methods**. The program relies on the interaction between objects or different components of the program to achieve its goal.

## Fundamentals of Object-Oriented Programming
There are four fundamental concepts of Object-Oriented Programming: **Encapsulation**, **Abstraction**, **Polymorphism**, and **Inheritance**.

### Encapsulation
***Encapsulation*** is a concept of bundling related variables and methods into an object. This restricts direct access to some of the object's components which protect them from being modified incorrectly. Refer to the diagram below.

![animal.png](https://kwangjong.github.io/CSCheatSheet/img/animal.png)

Animal class bundles its attributes and actions into an object. It restricts direct read-and-write access to its attributes 'name' and 'food', but it is used during the execution of the class's methods.

### Abstraction
In Object-Oriented Programming, an object shows only essential elements. This property is called ***Abstraction***. ***Abstraction*** makes the interface of an object simpler. In the Animal class, method digest() and consume_food() are hidden. These methods are called inside other methods. Only public methods like eat() and walk() are visible to any external class. This allows more intuitive and simpler interface.

### Inheritance
***Inheritance*** is the procedure in which one class inherits the attributes and methods of another class. The class whose properties and methods are inherited is known as the **Parent class**. And the class that inherits the properties from the parent class is the **Child class**. In addition to the properties inherited by the **parent class**, **child class** can have additional methods and attributes. **Child class** can also override methods inherited from **parent class**.

![inheritance.png](https://kwangjong.github.io/CSCheatSheet/img/inheritance.png)

Dog and Cat are children of Animal class. In addition to the methods inherited from Animal, Dog and Cat have new methods called woof() and meow().

### Polymorphism
***Polymorphism*** is a property where one entity can have many different forms. One example of polymorphism is **subtyping** or **subclassing**. Let's use Animal class and its child classes as an example. Dog and Cat have constructors with their name in string as the only argument. Code snippets below are written in Java.
```java
Animal[] animal = new Animal[2];
animal[0] = new Dog("Buddy");
animal[1] = new Cat("Kitty");

animal[0].get_name(); // prints "My name is Buddy"
animal[1].get_name(); // prints "My name is Kitty"
```
the array of animal accepts both Dog and Cat as its elements, because Dog and Cat are subtype of Animal.

**Overloading** is also an example of polymorphism. It allows multiple methods with varying arguments to have the same name. This helps programmers to implement methods that achieve the same goal with different arguments.
```java
public static void print_sum(int a, int b) {
  System.out.println(a + b);
}
public static void print_sum(int a, int b, int c) {
  System.out.println(a + b + c);
}
public static void print_sum(String a, String b){
  int a_int = Integer.parseInt(a);
  int b_int = Integer.parseInt(b);
	System.out.println(a_int + b_int);
}
```
```java
print_sum(1,2); // 3
print_sum(1,2,3); // 6
print_sum("1","2")); // 3
```
The goal of print_sum methods are printing the sum of given arguments. The code above achieves the goal with two interger arguments, three interger arugments, and two string arguments.

The last common example of **polymorphism** is **parametric polymorphism** or, in some languages, **generics**. Generics enables data types to be a parameter when defining a class. This allows data structures in Java's library to accept different data types.
```java
class List<T> {
    class Node<T> {
        T elem;
        Node<T> next;
    }
    Node<T> head;
    int length() { ... }
}
```

[Implementation](https://github.com/Kwangjong/CSCheatSheet/blob/main/implementation/OOP.java)


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