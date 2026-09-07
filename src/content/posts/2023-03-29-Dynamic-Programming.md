---
title: Dynamic Programming
tags: [cscheatsheet, algorithm]
date: 2023-03-28 20:36:00 -05:00
math: true
---

**Dynamic programming** is a programming technique developed by Richard Bellman in the 1950s. It is the "smarter" version of the brute-force approach as it stores the results of sub-problems so they can be retrieved when needed later. The recursive relationship that represents the equation is called the **Bellman equation**. This technique reduces the time complexity of an exponential to a polynomial. 

The process of eliminating repetitive computation is called **memoization** (not a typo haha). 

## Weighted Interval Scheduling

### Problem definition

Given $n$ jobs where every job is represented by start time, finish time, and a value:
```
Index
   1 |--- value=1 --|
   2      |-------- value=3 -------|
   3                     |--- value=1 --| 
     0----1----2----3----4----5----6----7----8--> time
```
* jobs: $\sigma = {r_1, ... , r_n}$
*  a job: $r_i = (s_i, f_i, v_i)$ where $s_i$ is the start time, $f_i$ is the finish time, and $v_i$ is the value. 

Produce a compatible schedule $S$ that has the maximum value.
* $S: \forall r_i, r_j \in S, f_i \leq s_j \vee f_j \leq s_i$

### Recursive solution

1. Sort $\sigma$ by finish time (asc).
2. Find the optimal value in $sigma$ of first $j$ items:
    1. find largest $i < j$ such that $f_i \leq s_i$.
    2. Opt($j$) = max(Opt($j-1$), Opt($i$) + $v_j$)

#### Proof of optimality

Using strong induction on $j$.<br>
Inductive hypothesis: Opt(0), ... , Opt($j$) is optimal.<br>
Base cases $j=0$ or $j=1$: There is only 1 possible optimal solution.<br>
Inductive step:
* By IH, we have the optimal solution for $j-1$ and $i$.
* The algorithm assures the dichotomy that the last interval is either in the solution or not.
* Take the max of the two dichotomies.

**Time complexity**: O($2^n$)

### DP solution
#### Bellman equation
$$
M[j] = max \\{ M[j-1], M[i_j]+v_j \\}
$$

#### Pseudo code
```
Algorithm: WeightIntDP

Sort sigma by finish time
m[0] := 0

for j = 1 to n do
  Find index i (linear search or binary search)
  m[j] = max(m[j-1], m[i]+v_j)
```
**Time complexity**: O($n^2$) using linear search, O($n \log{n}$) using binary search.


## Longest Increasing Subsequence

### Problem definition

Given an integer array A[1.. $n$ ].<br>
Find the longest increasing subsequence. That is, let $i$ be a sequence of indexes, we have A[ $i_k$ ] < A[ $i_{k+1}$ ] for all $k$.

#### Definition of subsequence

`I like watching the puddles gather rain`
* `puddles`: subsequence `I like watching the [puddles] gather rain`
* `late train`: subsequence `I [l]ike w[at]ching th[e] puddles ga[t]her [rain]`

For an array of length n, there are $2^n$ subsequences.

### Recursive solution
```
Algorithm: LIS
Input: Integer k and array of integers A[1..n].
Output: Return length of LIS where every value > k.

if n = 0 then return 0
else if A[1] <= k then
  return LIS(k, A[2..n])
else
  skip := LIS(k, A[2..n])
  take := LIS(A[1], A[2..n]) + 1
return max{skip, take}
end
```
Find the length of the longest increasing subsequence by calling `LIS(-Inf, A[1..n])`

**Time complexity**: O($2^n$)

### DP solution

Let L be a 2D array, where L[i, j] is the longest increasing subsequence of A[j..n] with every item > A[i], i<j.

#### Bellman equation
$$
L[i,j] =
\begin{cases}
0,  & \text{if $j$ > $n$} \\
L[i, j+1], & \text{if $A[i] \geq A[j]$} \\
max\\{L[i, j+1], L[i, j+1]+1\\} & \text{otherwise}\\
\end{cases}
$$

A[0] = $-\infty$<br>
Populate $j$ from $n$ to 1; $i$ from 0 to $j-1$ or $j-1$ to 0.<br>
Solution in $L[0, 1]$

**Time complexity**: O($n^2$)

## Coins in a line

### Problem definition

Alice and Bob are playing a coin game. There are n (even) coins in a line. Each coin has a value. Starting with Alice, each player will take turns picking a coin from the head or the tail of the line. Both players try to play optimally in order to maximize the total value of their coins. Give an algorithm that outputs the maximum total value of coins that Alice can take.

#### Example
```
[3, 1, 6, 3]
A: 3; [1, 6, 3] //Alice takes 3 from the head
B: 3; [1, 6]    //Bob takes 3 from the tail
A: 9; [1]       //Alice takes 6 from the tail
B: 4; []        //Bob takes 1 from the head
//Alice wins
```

#### Dichotomy

The natural dichotomy of the problem is Alice picking a coin from the head or the tail of the line.

* Assume that Bob will play optimally
* For Alice's k-th turn:
   * Coin array: `c[i..j]`, where `c[i]` is the head and `c[j]` is the tail of the line.
   * `AliceOpt(c[i..j]) := max{ c[i] + BobOpt(c[i+1..j]), c[j] + BobOpt(c[i..j-1]) }`
* Bob wants to make a choice that minimizes Alice's total value of coins:
   * `BobOpt(c[i..j]) := min{ AliceOpt(c[i+1..j]), AliceOpt(c[i..j-1]) }`
   
### DP solution

Let `M` be a 2D array, where `M[i, j]` is the maximum value possible for Alice when choosing from `c[i..j]`, assuming Bob plays optimally.

#### Bellman equation
```
M[i, j] = max{ c[i] + min{ M[i+2, j], M[i+1, j-1]}, 
               c[j] + min{ M[i+1, j-1], M[i, j-2]} }
```
* `M[i, i] = c[i]` for all `i`
* `M[i, j] = max{ c[i], c[j] }` for all `i = j-1`
* Populate `i' from `n-2` to `1`; `j` from `n` to `3`
* Solution: `M[1, n]`

**Time complexity**: O($n^2$)

## Max Subarray

### Problem definition

Given an array A of integers, find the (non-empty) contiguous subarray of A of the maximum sum.

#### Dichotomy

An integer at i is either a part subarray started from an index j < i or an integer at i is a start of a new subarray.

### DP solution

### Finding the maximum sum

Let `s` be an array, where `s[i]` contains the value of the max subarray ending at i.
```
s[i] = max{ s[i-1] + A[i], A[i]) }
```

* Solution: `max{s}`

### Finding the subarray

Use another array that memoizes the starting index of the subarray ending at i.

```
start[i] = start[i-1] if s[i-1]+a[i] > a[] else i
```

Or trace back from the max value of `s` at index j until `s[i] == A[i]`

**Time complexity**: O($n$)

## Subset Problem

### Problem definition

Given a set of $n$ jobs each with a run time $w_i$, we want to run these jobs in a single machine that we can use for time $W$. What is the subset $S$ of jobs to run that maximizes $\sum_{i \in S}w_i \leq W$?

### DP solution

Let $v[i, w]$ be a 2D matrix, where $i$ is item indices from 0 to $n$, and $w$ is a max weight from 0 to $W$.

$$
v[i,w] = max( v[i-1, w], x_{i,w} * (v[i-1, w-w_i] + w_i))
$$
* $v[0, w] := 0$ for all $w$ and $v[i, 0] := 0$ for all $i$
* $x_{i,w} := 0$ if $w_i > w$ and $1$ otherwise.
* Solution: $v[n,W]$

**Time complexity**: O($nW$)
* This not a polynomial runtime, but a *pseudo-polynomial*, because of $W$ which is unbounded.

#### Recovering the subset

Backtrace from $v[n,W]$ from $n$ to $0$ and $W$ to $0$ until $v[i,j]$ is 0. Trace down the first axis if $v[i-1, j]=v[i, j]$ or $v[i, j] - w_i$.

```
W=6, w1=2, w2=2, w3=3

v =[[0 0 0 0 0 0 0],
    [0 0 2 2 2 2 2],
    [0 0 2 2 4 4 4],
    [0 0 2 3 4 5 5]] 
//backtrace: w[3, 6]=5 => w[2, 3]=5-3=2 => w[2, 3]=2 => w[1, 3]=2 => w[0, 3]=2-2=0
//S = {w1, w3}
```

## Knapsack Extension

### Problem definition

You are a thief with a knapsack that can carry $W$ weight of goods. Given a set of $n$ items, each with a weight $w_i$ and a value $v_i$. What is the subset $S$ of items to steal that maximizes $\sum_{i \in S}v_i$ with the constraint that $\sum_{i \in S}w_i \leq W$?

### DP solution

Similar to the subset problem, but add $v_i$ instead of $w_i$ for the second case of the dichotomy.

$$
v[i,w] = max( v[i-1, w], x_{i,w} * (v[i-1, w-w_i] + v_i))
$$
* $v[0, w] := 0$ for all $w$ and $v[i, 0] := 0$ for all $i$
* $x_{i,w} := 0$ if $w_i > w$ and $1$ otherwise.
* Solution: $v[n,W]$


## Edit Distance Problem

### Problem definition

Find the minimum number of the letter (insert, delete, replace) to change string A[1..m] to string B[1..n].<br>
Ex: TUESDAY -> THUESDAY -> THURSDAY

This is equivalent to aligning the letters and counting mismatched letters.<br>
Ex: T UESDAY
    THURSDAY

### DP solution

Let $E$ be a 2D matrix, where $E[i, j]$ is the edit distance from A[1..i] and B[1..j].

#### Trichotomy

* Insertion: $E[i,j] = E[i, j-1]+1$
* Deletion: $E[i,j] = E[i,-1, j] + 1$
* Substitution: $E[i,j] = E[i,-1, j-1] + A[i] \neq B[j]$
   * if $A[i] = B[j]$, the cost of the substitution is 0, i.e., we don't need to do anything.

#### Bellman equation
$$
E[i,j] =
\begin{cases}
i,  & \text{if $j=0$} \\
j, & \text{if $i=0$} \\
min\\{E[i, j-1]+1, E[i-1, j]+1, E[i-1, j-1]+A[i] \neq B[j]\\} & \text{otherwise}\\
\end{cases}
$$
* $E[0,j] = j$ and $E[i,0] = i$
* Populate from 1 to $n$, 1 to $m$
* Solution: $E[m,n]$

**Time complexity**: O($mn$)

## Shortest Path

### Problem definition

Find the shortest path from s to each other node in a directed graph G=(V,E), where |V|=n and |E|=m. There are no cycles with negative weight.

### DP solution

Let $M$ be a 2D matrix, where $M[i, v]$ is the shortest path from $v$ to $t$ using $\leq i edges$.
* Solution: $M[n-1, s]$

#### Dichotomy

* Use $\leq i -1$ edges
* Use $\leq i$ edges

#### Bellman equation
$$
M[i,v] = min\\{M[i-1, v], min_{w \in V} \\{M[i-1, w] + c_{vw}\\}  \\}
$$
* Solution: $M[n-1,s]$
* Recovery of actual path: An additional array $first[v]$ that maintains the first hop from $v$ to $t$.

**Time complexity**: O($mn$)
