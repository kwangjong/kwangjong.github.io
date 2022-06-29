---
layout: post
title: "Forward and Backward Propagation"
tags: blog, datascience, deeplearning
date: 2022-06-27 23:45 +0900
math: true
---

In the last blog post, I went over the basics of the neural network and the implementation with Keras. In this post, I'll dive deep into the math behind the neural network. 

![deeplearning](https://i.imgur.com/vfYfJ4A.jpg)

[Link to the notebook](https://www.kaggle.com/code/kwangjongchoi/forward-and-backward-propagation)

![2x2](https://i.imgur.com/r5ahUTR.png)

## Forward Propagation

Take a look at the diagram of a neural network with two hidden layers. Each *neuron* or unit has its own *state* denoted with $a_{n}^{(L)}$ where $n$ and $L$ indicate which neuron in which layer the state $a$ belongs to. This state of a neuron is called **activation**. It is the *output of weighted sum of its inputs plus a bias passed through an activation function*. The most commonly used activation function is sigmoid $\sigma$.The weighted sum plus bias is represented as $z_{n}^{(L)}$. 

$$
a_{n}^{(L)} = \sigma(z_{n}^{(L)}) = \sigma(\sum\limits_{i}^{}w_{n,i}^{(L-1)}a_{i}^{(L-1)}+b_{n}^{(L-1)})
$$

For instance, the activations of the two neurons in layer 1 are: 

$$
a_{0}^{(1)} = \sigma( w_{0,0}^{(0)} a_{0}^{(0)} + w_{0,1}^{(0)} a_{1}^{(0)} + b_{0}^{(0)} )
$$

$$
a_{1}^{(1)} = \sigma( w_{1,0}^{(0)} a_{0}^{(0)} + w_{1,1}^{(0)} a_{1}^{(0)} + b_{1}^{(0)} )
$$

These two activations above can also be calculated using matrix multiplication:

$$ 
\begin{bmatrix} a_{0}^{(1)}\\ a_{1}^{(1)} \end{bmatrix} = \sigma
\begin{pmatrix}
  \begin{bmatrix} w_{0,0}^{(0)} & w_{0,1}^{(0)}\\ w_{1,0}^{(0)} & w_{1,1}^{(0)} \end{bmatrix}
  \begin{bmatrix} a_{0}^{(0)}\\ a_{1}^{(0)} \end{bmatrix} + \begin{bmatrix} b_{0}^{(0)}\\ b_{1}^{(0)} \end{bmatrix}
\end{pmatrix}
$$

Let's replace the vectors and the matrix with symbols.

$$
a^{(L)} = \begin{bmatrix} a_{0}^{(L)}\\ a_{1}^{(L)}\\ \vdots\\ a_{n}^{(L)} \end{bmatrix},
W^{(L)} = 
  \begin{bmatrix} 
    w_{0,0}^{(L)} & w_{0,1}^{(L)} & \cdots & w_{0,n}^{(L)} \\ 
    w_{1,0}^{(L)} & w_{1,1}^{(L)} & \cdots & w_{1,n}^{(L)} \\
    \vdots & \vdots & \ddots & \vdots \\
    w_{k,0}^{(L)} & w_{k,1}^{(L)} & \cdots & w_{k,n}^{(L)} \\
  \end{bmatrix},
b^{(L)} = \begin{bmatrix} b_{0}^{(L)}\\ b_{1}^{(L)}\\ \vdots\\ b_{n}^{(L)} \end{bmatrix}
$$

Activations for all neurons in layer $L$ are caculated as:

$$
a^{(L)} = \sigma(W^{(L-1)} a^{(L-1)} + b^{(L-1)})
$$

i.e. it is a *linear transformation of weights with respect to its basis passed through an activation function*.

**Forward propagation** is *the calculation of each layer’s activations "propagating" input data forward to the output*.


## Implementing Forward Propagation

Before implementing the forward propagation, let's set activation and loss functions first. **Sigmoid** is used for activation, and **mean squared error** is used for calculating the loss. 

$$\sigma = \frac{1}{1+e^{-x}}$$

$$mse = \frac{1}{2}\sum(\hat y - y)^2$$

We also need to prepare test input and initialize weights. I set`[0.5, 0.35]` as the input and `[0.725]` as the target value. Initial weights are chosen randomly from the standard normal distribution.

#### Using row-vectors
Vectors are commonly implemented as row-vector using an array. The activation vectors and weight matrices are transposed and calculated as:

$$
(a'^{(L)})= \sigma((a'^{(L-1)}W'^{(L-1)}) + b'^{(L-1)}
$$

```python
import numpy as np # linear algebra

Y = [[0.725]] # target value
X = np.array([[0.5, 0.35]]) # test data
W = [np.random.randn(2,2), np.random.randn(2,2), np.random.randn(2,1)] # initialize weights with standard normal distribution
B = [np.random.randn(1,2), np.random.randn(1,2), np.random.randn(1,1)]
```
```python
sig = lambda x: 1/(1+np.exp(-x)) #sigmoid
mse = lambda x, y: 0.5*np.square(x-y).sum() # loss funcition

def forward_pass(X, W, B):
    for i,w in enumerate(W):
        X = sig(np.dot(X, w)+B[i]) # X*W
    return X

pred = forward_pass(X, W, B)
print("prediction:", pred, "loss:", mse(pred, Y))
```
```
prediction: [[0.24512972]] loss: 0.11513774169863143
```

## Backpropagation

**Backpropagation** is an algorithm that trains the neural network by minimizing a cost function. It does so by *adjusting each weight in proportion to the gradient of loss functions*. Intuitively, the gradient of each weight represents how much it contributes to the overall error. The algorithm adjusts each weight in proportion to its contribution. Refer to [3Blue1Brown's video](https://www.youtube.com/watch?v=Ilg3gGewQ5U&t=123s&ab_channel=3Blue1Brown) for better explanation.

### Chain Rule
Given the cost of forward propagation with respect to weights in the last hidden layer as:

$$
C(w^{(L-1)}) = C(a^{(L)}(z^{(L)}(w^{(L-1)})))
$$

$$
C = (\hat y - y)^2, \quad a^{(L)} = \sigma(z^{(L)}), \quad z^{(L)} = W^{(L-1)} a^{(L-1)}
$$

The gradients are calculated using the chain rule.

$$
C'(w^{(L-1)}) = \frac{\partial C}{\partial a^{(L)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial z^{(L)}}{\partial w^{(L-1)}}
$$

Let's calculate the partial derivatives.

$$
\frac{\partial C}{\partial a^{(L)}} = (\hat y - y), \quad \frac{\partial a^{(L)}}{\partial z^{(L)}} = \sigma'(z^{(L)}) = \sigma(z^{(L)}) \cdot (1-\sigma(z^{(L)})), \quad \frac{\partial z^{(L)}}{w^{(L-1)}} = a^{(L-1)} 
$$

Then, 

$$
C'(w^{(L-1)}) =  (a^{(L-1)})^T \cdot (\hat y - y) \odot \sigma'(z^{(L)})
$$

$a^{(L-1)}$ is transposed and multiplied to the left side to match the dimension.


The gradients with respect to weights in the second to last hidden layer are:

$$
C'(w^{(L-2)}) =  (a^{(L-2)})^T \cdot (\hat y - y) \odot \sigma'(z^{(L)}) \cdot (w^{(L-1)})^T \odot \sigma'(z^{(L-1)})
$$

And the gradients with respect to weights in the first layer are:

$$
C'(w^{(0)}) =  (X)^T \cdot (\hat y - y) \odot \sigma'(z^{(L)}) \cdot (w^{(L-1)})^T \odot \sigma'(z^{(L-1)} \cdots (w^{(1)})^T \odot \sigma'(z^{(1)})
$$

To calculate the gradients with respect to the bias, replace $\frac{\partial z^{(n+1)}}{\partial w^{(n)}}$ with $\frac{\partial z^{(n+1)}}{\partial b^{(n)}}$ which equals to $1$:

$$
C'(b^{(0)}) =  [1, 1, 1, \cdots] \cdot (\hat y - y) \odot \sigma'(z^{(L)}) \cdot (w^{(L-1)})^T \odot \sigma'(z^{(L-1)} \cdots (w^{(1)})^T \odot \sigma'(z^{(1)})
$$

A $1 \times n$ matrix withh all ones is multiplied for the batch sum.

After the gradients have been calculated, update weights in proportion to the gradients.

$$w_{new}^{(L)} = w^{(L)} - (\text{learning rate}) * C'(w^{(L)})$$


## Implementing Backpropagation

Derivatives of sigmoid and mean squared error are:

$$
\sigma '(x) = \sigma(x) \cdot (1-\sigma(x))
$$

$$
\frac{\partial}{\partial \hat y} mse = (\hat y - y)
$$

```python
dsig = lambda A: A * (1-A) #derivative of sigmoid
dmse = lambda x, y: (x-y) #derivative of mse
```

For faster computation, let's modify the forward propagation function so that it stores  $a^{(L)}$ and $\sigma'(z^{(L)})$.

```python
def forward_pass(X, W, B, A, dA):
    for i,w in enumerate(W):
        A.append(X)
        X = sig(np.dot(X, w)+B[i]) # X*W
        dA.append(dsig(X))
                  
    return X
```
```python
# deep copy weights before updating them
new_W = []
new_B = []
for i, w in enumerate(W):
    new_W.append(w.copy())
    new_B.append(B[i].copy())
```
```python
def backward_pass(X, W, B, A, dA, pred, Y, learning_rate=0.5):
    E = dmse(pred, Y) * dA[-1]
    for i, w in reversed(list(enumerate(W))):
        dw = np.dot(A[i].T, E)
        db = np.dot(np.ones(shape=(1, E.shape[0])), E)
        W[i] -= dw * learning_rate
        B[i] -= db * learning_rate
        if i>0:
            E = np.dot(E, w.T) * dA[i]

A, dA = [],[]
pred = forward_pass(X, new_W, B, A, dA)
for i in range(500):
    backward_pass(X, new_W, B, A, dA, pred, Y)
    pred = forward_pass(X, new_W, B, A, dA)
    if i %50 == 0:
        print("epoch:", i, "prediction:", pred, "loss:", mse(pred, Y))
```
```
epoch: 0 prediction: [[0.26206966]] loss: 0.10715224875433976
epoch: 20 prediction: [[0.56510157]] loss: 0.012783753641463615
epoch: 40 prediction: [[0.66383467]] loss: 0.0018705989093751665
epoch: 60 prediction: [[0.69754805]] loss: 0.00037680488010479623
epoch: 80 prediction: [[0.7117886]] loss: 8.727055221715389e-05
epoch: 100 prediction: [[0.71843509]] loss: 2.1549052822002712e-05
epoch: 120 prediction: [[0.72168694]] loss: 5.488181527431076e-06
epoch: 140 prediction: [[0.72331511]] loss: 1.4194236184139503e-06
epoch: 160 prediction: [[0.7241398]] loss: 3.6997171363399e-07
epoch: 180 prediction: [[0.72455997]] loss: 9.681446495914698e-08
epoch: 200 prediction: [[0.72477468]] loss: 2.5385611306852804e-08
epoch: 220 prediction: [[0.72488456]] loss: 6.663201142057146e-09
epoch: 240 prediction: [[0.72494084]] loss: 1.7498772336994115e-09
epoch: 260 prediction: [[0.72496968]] loss: 4.5967379324490785e-10
epoch: 280 prediction: [[0.72498446]] loss: 1.2076806992748317e-10
epoch: 300 prediction: [[0.72499203]] loss: 3.1731117689103174e-11
epoch: 320 prediction: [[0.72499592]] loss: 8.337472866171438e-12
epoch: 340 prediction: [[0.72499791]] loss: 2.1907438745709694e-12
epoch: 360 prediction: [[0.72499893]] loss: 5.756426120239408e-13
epoch: 380 prediction: [[0.72499945]] loss: 1.5125731778394313e-13
epoch: 400 prediction: [[0.72499972]] loss: 3.974485774696661e-14
epoch: 420 prediction: [[0.72499986]] loss: 1.0443499710032055e-14
epoch: 440 prediction: [[0.72499993]] loss: 2.7441728137204566e-15
epoch: 460 prediction: [[0.72499996]] loss: 7.210692946507104e-16
epoch: 480 prediction: [[0.72499998]] loss: 1.894709489296153e-16
epoch: 500 prediction: [[0.72499999]] loss: 4.978612098339798e-17
```

You can see that, after each backpropagation, the loss is minimized, and prediction is approaching the target value `0.725`.

Links
* [Link to the notebook](https://www.kaggle.com/code/kwangjongchoi/forward-and-backward-propagation)
* [Neural Networks by 3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
* [Neural Networks Demystified by Welch Labs](https://www.youtube.com/watch?v=GlcnxUlrtek&ab_channel=WelchLabs)


