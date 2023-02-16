---
layout: post
title: Go Basics II
tags: Go
date: 2023-02-15 21:46 -0500
---

### Map
```go
// Map
// mapname := map[key_type]value_type
name_age := map[string]int{
  "Jen": 24,
  "KJ": 22,
}

// add to the map
name_age["Cherry"] = 22

// delete from map
delete(name_age, "KJ")

// replace value
name_age["Jen"] = 25

// traversing through the map
for key, value := range name_age {
  fmt.Printf("%s is %d years old", key, value)
}
```
### Struct
* tagging can be added for serialization

```go
type Person struct {
  name string `json:"name"`
}

kj := Person{
  name: "kj",
}

fmt.Printf("hello, my name is %s\n", kj.name)

//nested structs
type HousingUnit struct {
  tenant1 Person
  tenant2 Person
}

randallParks207 := HousingUnit{
  tenant1: Person{
    name: "kj",
  },
  tenant2: Person{
    name: "", //i actually leave alone
  },
}
fmt.Printf("Please, pay your rent %s\n", randallParks207.tenant1.name)

//promotion: fields of child
type Student struct {
  Person
  year string
  sync.Mutex //promotion is mostly used in mutexes
}

kj_student := Student{
  Person: Person{
    name: "kj",
  },
  year: "junior",
}

//kj_student.lock()

fmt.Printf("%s is %s", kj_student.name, kj_student.year)

//anonymous structs: can create structs without prior definition
kj_anon := struct {
  name:     string,
  friends:  []Person,
}{
  name: "kj",
  friends: []Person{}
}
```

## Links
* [Golang in under an hour (2021)](https://www.youtube.com/watch?v=N0fIANJkwic)
* [W3Schools Go Tutorial](https://www.w3schools.com/go/index.php)
