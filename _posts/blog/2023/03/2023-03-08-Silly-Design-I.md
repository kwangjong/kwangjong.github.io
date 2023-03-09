---
layout: post
title: Silly Design I : Inheritance in Go? (Composition is Better)
tags: Go, , Silly Design, OOP
date: 2023-03-08 23:55 -0500
---


## Silly Design
![meme1](https://i.imgur.com/T1XQUEI.png)
This is my silly mistake to implement inheritance in Go.
I replicated an overly simplified version of the code base I was working on. The code base initially contained others' work, and I was trying to add another type support.

[Go Playground](https://go.dev/play/p/qc75sox_qTu)
```go
type Image interface {
	size()
	save()
}

type JPEG struct {
	name               string
	width              int
	height             int
	smt_jpeg_only_have string
}

type PNG struct {
	name              string
	width             int
	height            int
	smt_png_only_have int
}

func (jpeg JPEG) size() {
	fmt.Printf("size : %d x %d\n", jpeg.width, jpeg.height)
}

func (jpeg JPEG) save() {
	fmt.Println("saving jpeg...") //something more complicated than this obviously
}

func (png PNG) size() {
	fmt.Printf("size : %d x %d\n", png.width, png.height)
}

func (png PNG) save() {
	fmt.Println("saving png...") //this would be very different from JPEG.save()
}
```

The inital code base had two different structs, each implementing two different types of the same concept. Imagine a struct with 4 more functions implemented in the same way. Me, "an intellectual and a master of OOP", my instinct yelled at me to use "inheritance." Because Go doesn't support classes, I thought, why not try to implement inheritance using struct embedding?

[Go Playground](https://go.dev/play/p/cuQJNRsMpFq)
```go
type Image interface {
	save()
	size()
}

type ImageShared struct {
	name   string
	width  int
	height int
}

type JPEG struct {
	smt_jpeg_only_have string
	ImageShared
}

type PNG struct {
	smt_png_only_have int
	ImageShared
}

func (img ImageShared) size() {
	fmt.Printf("size : %d x %d\n", img.width, img.height)
}

func (jpeg JPEG) save() {
	fmt.Println("saving jpeg...")
}

func (png PNG) save() {
	fmt.Println("saving png...")
}
```

Since the child class extends the parent class from my OOP knowledge, I created a parent struct called `ImageShared` and embedded it into two child classes, `JPEG` and `PNG`. Then, I added an `Image` interface because they needed to be accessed with the same reference type. However, I faced a problem where I wasn't able to address attributes of `ImageShared`. I could only access them if I assert child types, but I could never access them without knowing each instance's type.

```go
list_img[0].name //fails
list_img[0].(ImageShared).name //fails
list_img[0].(JPEG).name //runs
```

So what was the problem with my code? Well, the issue is that Go is not built for inheritance. Instead, it forces you to use composition. I had to reconsider my approach and come up with a better design.

[Go Playground](https://go.dev/play/p/EZ_IZ13qIp_J)
```go
type ImageFileType interface {
	save()
}

type Image struct {
	name   string
	width  int
	height int
	ImageFileType
}

type JPEG struct {
	smt_jpeg_only_have string
}

type PNG struct {
	smt_png_only_have int
}

func (img Image) size() {
	fmt.Printf("size : %d x %d\n", img.width, img.height)
}

func (jpeg JPEG) save() {
	fmt.Println("saving jpeg...")
}

func (png PNG) save() {
	fmt.Println("saving png...")
}
```

In composition, you insert smaller or more specific groupings into the bigger set. Intead of extending `Image` by it's child classes, you insert functionalities of `JPEG` and `PNG` to `Image`. So, Why is Go forcing you to use composition over inheritance?

## Composition over Inheritance
![composition-vs-inheritance](https://i.imgur.com/B0xMXGM.png)

Composition over inheritance (or composite reuse principle) in OOP is the principle that classes should achieve polymorphic behavior and code reuse by composition rather than inheritance from a base or parent class. This has been popularized by an influential book, [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns) (1994).

In composition, objects are built by combining smaller, more specific components, which are often described as "has-a" relationships. For example, an image "has-a" JPEG or PNG type support and a car "has-a" engine. Instead of creating a parent-child hierarchy of classes, you can start by defining interfaces that represent the behaviors your objects should have. Then, you can add classes that implement these interfaces as needed to build your objects.

### Pros

Composition provides flexibility in modifying the behavior of objects at runtime.
It allows for more specific, targeted reuse of code.
It avoids the issues of tight coupling that can arise with inheritance.

### Cons

It can lead to more code and complexity.
It may be less intuitive and harder to understand for those new to OOP.

### Why does Go force programmers to use composition?

Go is designed to be a simpler, more efficient language. By forcing programmers to use composition rather than inheritance, it avoids some of the complexities and pitfalls that can arise with inheritance-based code. Additionally, composition allows for more flexible code that can be modified at runtime, which aligns with Go's focus on concurrency and efficient memory usage.

## Takeaway

So basically, I tried to implement inheritance in Go but ended up writing a more complicated design. I thought I could use inheritance using struct embedding but ended up unable to access the parent class's attributes.

After some reflection, I realized that Go is designed for composition over inheritance. In composition, you create objects by combining smaller, more specific components rather than using a parent-child hierarchy of classes. This approach allows for more flexibility and targeted code reuse. It also avoids some issues that can arise with inheritance-based code, like tight coupling.

So, why does Go force programmers to use composition? Basically, it's because Go is designed to be a simpler, more efficient language that emphasizes concurrency and efficient memory usage. Composition allows for more flexible code that can be modified at runtime, which aligns with Go's design philosophy.

## Links
* [Composition over inheritance, Wikipedia](https://en.wikipedia.org/wiki/Composition_over_inheritance)
* [Inheritance and Composition: A Python OOP Guide](https://realpython.com/inheritance-composition-python/)




