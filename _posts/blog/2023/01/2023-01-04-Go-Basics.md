---
layout: post
title: Go Basics I
tags: Go
date: 2023-01-04 16:05 -0500
---

Golang Basics

## Golang
* Released on Nov 2009
* **Go** is compiled, memory-managed, built for simplicity and performance.
* **Go** is built with concurrency in mind:
  * **Go** utilizes multiple **cores**.
  * Supports concurrency but it's not thread-safe by default (utilizes **channels** for multi-thread synchronization).
* **Go** is a Functional Language:
  * Building blocks: Types, functions, packages.
  * Has 3/4th OOP concepts.
  * No inheritance: use composition instead. 

### Pro
* Super fast build
* Low memory footprint
* Simple Syntax

### Cons
* Sometimes too simple

## Init & Build a go project
### Initialize a project

```
$ mkdir hello-go
$ cd hello-go 
$ go mod init example/kj/hello-go
go: creating new go.mod: module example/kj/hello-go
$ cat go.mod                     
module example/kj/hello-go

go 1.19
```

**go.mod**: required packages to run the project.

**go.sum**: locks versions for reproducible builds.

### `main.go`
```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, Go!")
}

```

### Build & Run
```
$ go build
$ ls
go.mod		hello-go	main.go
$ ./hello-go
Hello, Go!
```

\* building binary for different platforms:
```
$ GOOS=linux GOARCH=amd64 go build
$ ./hello-go
zsh: exec format error: ./hello-go
```

### Project structure
* Module: defined in go.mod
* Package:
  * main
  * All the rest (e.g, "logger", "config", "utils")
* Function and Variables starting with a capital letter are visible from another package (DoSomething() vs doSomething()). 

## Syntax

### Statements
* In Go, statements are seperated by ending a line or by semicolon.
* Semicolon are added implicitly to the end of each lines (does not show up in the source code).
* The left curly bracket `{` cannot come at the start of a line.

### Comments
* Single-line comments start with two forward slashes `//`.
* Multi-line comments start with `/*` and end with `*/`.

```go
// Single-line comments
fmt.Println("this line is not commented")

/* Multi-line comments
fmt.Println("this line is commented")
*/

fmt.Println("this line is not commented")
```

### Variables
```go
// 1. Using var keyword:
// var variableName type
// var variableName type = value
var a int
var b int = 0

// 2. Using the := sign
// no type needed
// the colon means we're declaring the variable; can't use := on the variable that had been already declared.
c := "katie"
// once a variable is declared use = 
c = "claire"

// if the initial value of a variable is known, Go can infer the variable type.
var student1 string = "john" // type is string
var student2 = "jane" // type is inferred
x := 1 // type is inferred

// if the a variable is declared without an initial value, the value is set to the default of its type.
var name string // ""
var age int // 0
var isStudent bool // false
```
### Difference between `var` and `:=`
* `var` can be used **inside** and **outside** of functions
* `:=` can only be used **inside** functions
* When using `:=`, variable declaration and value assignemnt must be done in the same line.

### Mulitple Variable Declaration
```go
// Declaring multiple variables with the same type
var a, b, c, d int = 1, 2, 3, 4

// Declaring multiple variables with the different types
var var aa, bb = 0, "hi"
cc, dd, := 1, "bye"

// Multiple variables declaration can be grouped into a block
var (
  aaa int
  bbb int = 1
  c string "hello"
 )
```

### Constant
```go
const A int = 1
const B = "bee"
```

### Array & Slice
* **Arrays** are fixed-sized sequences if items of the same type
  * **Arrays** in **Go** are *values*, unlike C/C++ (pointers) and Java (references). 
  * If you pass a array to a function, it will receive a copy of the array.

```go
// Array
// var arrayname = [length]type{values}
// arrayname := [length]type{values}
var a = [3]int{1, 2, 3}
var b = [...]int{4, 5, 6} // length is inferred

c = [3]string{"a", "b", "c"}
d = [...]string{"d", "e", "f"} //length is inferred

//Declare and initialize seperately
var aa [2]int
bb := [2]int{}
aa[0] = 10
aa[1] = 11
bb[0] = 20
bb[1] = 21

//Array can be partially initialized
arr1 := [5]int{1,2} // [1, 2, 0, 0, 0]
arr2 := [5]string{3:"d",4:"e"} // ["", "", "", "d", "e"]

// the len() is used to find the length of an array
fmt.Println(len(arr1)) // 5
```

* **Slices** are dynamic size array
  * **Slices** are *reference types*. 
  * `len()` returns the **lenght** of the slice or the number of elements in the slice.
  * `cap()` returns the **capacity** of the slice or the number of elements the slice can grow to.

```go
// Slice
// var slicename = []type{values}
// var slicename []type
// slicename := []type{values}
var a []int // len: 0, cap: 0
b := []int{4, 5, 6} // len:3, cap: 3

// or using make()
// slicename := make([]type, length, capacity)
slice1 := make([]int, 5, 10) // len: 5, cap: 10

// Slice from array
arr := [5]int{1,2,3,4,5}
slice := arr[1:3] // [2, 3, 4]
```

## Links
* [Golang in under an hour (2021)](https://www.youtube.com/watch?v=N0fIANJkwic)
* [W3Schools Go Tutorial](https://www.w3schools.com/go/index.php)
