---
layout: post
title: Worker Pool Design for Go
tags: Go, Multi-threading
date: 2023-02-15 21:49 -0500
---

When working on concurrent projects, it can be helpful to use a worker pool to manage a group of worker threads that can process tasks asynchronously. In this blog post, we'll take a look at how to implement a worker pool in Go using channels.

[demo](https://go.dev/play/p/sxjcSgnJaXy).

The worker pool allows you to manage a group of worker threads that can process tasks asynchronously. Here's how I implemented a worker pool in Go using channels.

The worker pool design consists of a pool of worker threads and a channel that holds tasks that need to be executed. Workers read from the task channel and execute each task asynchronously. In addition, each worker has its own exit channel, which allows it to gracefully terminate when the worker pool needs to be shut down.

## Implementation Details
The implementation of the worker pool and worker objects is relatively simple. The worker pool maintains a map of worker objects, each with its task channel and exit channel.
```go
type Task struct {
	task string
	done chan bool
}

type WorkerPool struct {
	nextId   int
	pool     map[int]*Worker
	taskChan chan *Task
}

type Worker struct {
	id       int
	taskChan chan *Task
	exitChan chan bool
}
```
The task channel is shared among all worker objects and is used to receive incoming tasks. Each worker object also has its own exit channel, which is used to signal that it should stop processing tasks.

When a new worker is created, it is added to the worker pool map, and its task channel is set to the shared task channel.
```go
func (wp *WorkerPool) CreateWorker() {
	w := &Worker{
		id:       wp.nextId,
		taskChan: wp.taskChan,     //shared
		exitChan: make(chan bool), //independent
	}

	wp.pool[w.id] = w
	wp.nextId += 1
	fmt.Printf("[pool] launching worker-%d...\n", w.id)

	go w.task()
}
```
The worker objects are launched in separate goroutines and execute their `task()` function indefinitely until they receive a signal on their exit channel.
```go
func (wp *WorkerPool) StopWorker(id int) {
	fmt.Printf("[pool] stopping worker-%d...\n", id)
	wp.pool[id].close()
}

func (w *Worker) task() {
	for {
		var task *Task
		select {
		case <-w.exitChan:
			fmt.Printf("[worker-%d] stopping task()...\n", w.id)
			return
		case task = <-w.taskChan:
		}

		fmt.Printf("[worker-%d] %s\n", w.id, task.task)
		task.done <- true
	}
}

func (w *Worker) close() {
	w.exitChan <- true
}
```
When a task is received on the worker's task channel, the worker executes the task and sends a signal on the task's done channel to indicate that the task has been completed. Here is a link to its [demo](https://go.dev/play/p/sxjcSgnJaXy).

This is design idea for concurrent workers using channel for [open-sourced project](https://github.com/open-lambda/open-lambda/tree/s23).
The design was built upon some existing code within the project. 
