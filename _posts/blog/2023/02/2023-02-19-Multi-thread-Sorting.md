---
layout: post
title: Multi-Threaded Sorts in Go
tags: Go, Multi-threading, Sorts
date: 2023-02-19 03:50 -0500
---

Exploring Sorting Algorithms: A Comparison of Single Threaded and Multi-Threaded Sorts

[github repo](https://github.com/kwangjong/multi_thread_sorting)

Recently, I've found myself enjoying programming in Go. I appreciate its simplicity and the ease with which I can write concurrent programs. One project I've been working on is a multi-threaded sorting algorithm. In this post, I'll describe my implementation and compare its performance to that of single-threaded sorting.

## Sorting Algorithms
Among the many sorting algorithms available, Merge Sort and Quick Sort are two of the most popular divide-and-conquer algorithms. They are commonly used for multi-threaded sorting due to their "divide" aspect. I chose to implement Quick Sort because it is an in-place sorting algorithm and has good cache locality, making it faster.

## Implementation
### Optimization
Before integrating multi-thread features, I added some optimizations to the Quick sort algorithm.

* **Use Insertion sort for small subarrays**: If the subarray being sorted has a small number of elements, it can be faster to use Insertion sort instead of Quick sort. This is because Insertion sort has lower overhead and is faster for small input sizes. I used Insertion sort for small sub-arrays of size 15 or less.
* **Use the median-of-three pivot rule**: The choice of pivot value can affect the performance of the algorithm. To choose a better pivot value, I used the median-of-three pivot rule, which involves selecting the median value from the first, middle, and last elements in the subarray. This can help avoid worst-case performance when the input is already sorted or nearly sorted.
* **Use a single partition function**: Instead of using a separate partition function, I incorporated the partition logic into the Quick sort function. This can eliminate the function call overhead and improve cache locality.

### Multi-threading
To avoid additional overhead, I limited the number of threads to the number of CPU cores available on the machine. I used a sync.WaitGroup to keep track of the number of threads that are actively sorting.

## Code
My implementation can be found [here](https://github.com/kwangjong/multi_thread_sorting/blob/main/sort.go).

## Performance
I compared single-thread Quick sort and multi-thread Quick sort using a list of 10,000,000 32-bit integers. On my machine, the single-threaded sort took 1.325355604 seconds and the multi-threaded sort took 214.76232 milliseconds. The multi-threaded sorting was 84% faster than the single-thread sorting.

```
single-thread quick sort
  sorted: true
  duration: 1.325355604s

single-thread quick sort
  sorted: true
  duration: 214.76232ms
```

## Conclusion

In conclusion, multi-threading can greatly improve the performance of sorting algorithms, especially for large inputs. Go makes it easy to write concurrent programs, and the built-in concurrency features such as goroutines and channels are very useful. By limiting the number of threads to the number of CPU cores, we can avoid overhead and achieve optimal performance. The Quick sort algorithm with optimizations and multi-threading is a great choice for sorting large datasets efficiently.
