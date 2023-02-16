---
layout: post
title: Multi-threading design idea for Go
tags: Go, Multi-threading
date: 2023-02-15 21:49 -0500
---

This is my brainstorm idea for Multi-threading design idea using channal in Go.
WorkerPool-Workers mechanism for [open-sourced project](https://github.com/open-lambda/open-lambda/tree/s23) I'm working on.
* Workers in WorkerPool read shared task channel.
* Each Workers also reads its independent exit channels.

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

[demo](https://go.dev/play/p/sxjcSgnJaXy)