---
layout: post
title: "Forward and Backward Propagation"
tags: blog, datascience, deeplearning
date: 2022-06-27 23:45 +0900
use_math: true
---

![deeplearning](https://i.imgur.com/ZTwsQGu.jpg)

On the last blog post, I went over the basics of neural network and implementing it with Keras. On this post, I'll dive deep into the math behind it. 

![2x2](https://i.imgur.com/r5ahUTR.png)

## Forward Propagation

Take a look at the diagram of a neural network with two hidden layers. Each *neuron* or unit has its own *state* denoted with $a_{n}^{(L)}$ where $n$ and $L$ indicates which neuron in which layer the state $a$ belongs to. This state of a neuron is called **activations**. It is the *output of weighted sum of its inputs plus a bias passed through an activation function*. The most commonly used activation function is sigmoid $\sigma$.The weighted sum plus bias is represented as $z_{n}^{(L)}$. 

$$
a_{n}^{(L)} = \sigma(z_{n}^{(L)}) = \sigma(\sum\limits_{i}^{}w_{n,i}^{(L-1)}a_{i}^{(L-1)}+b_{n}^{(L-1)})
$$

For instance, the activations of the two neurons in layer 1 is: 
$$
a_{0}^{(1)} = \sigma( w_{0,0}^{(0)} a_{0}^{(0)} + w_{0,1}^{(0)} a_{1}^{(0)} + b_{0}^{(0)} )
$$

$$
a_{1}^{(1)} = \sigma( w_{1,0}^{(0)} a_{0}^{(0)} + w_{1,1}^{(0)} a_{1}^{(0)} + b_{1}^{(0)} )
$$

In fact, these two activations above can be calculated using matrix multiplication:
$$ \begin{bmatrix} a_{0}^{(1)}\\ a_{1}^{(1)} \end{bmatrix} = \sigma
\begin{pmatrix}
  \begin{bmatrix} w_{0,0}^{(0)} & w_{0,1}^{(0)}\\ w_{1,0}^{(0)} & w_{1,1}^{(0)} \end{bmatrix}
  \begin{bmatrix} a_{0}^{(0)}\\ a_{1}^{(0)} \end{bmatrix} + \begin{bmatrix} b_{0}^{(0)}\\ b_{1}^{(0)} \end{bmatrix}
\end{pmatrix}
$$

Let's replace the vectors and matrix with symbols.
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

Activations for all neurons in layer $L$ is caculated as:
$$
a^{(L)} = \sigma(W^{(L-1)} a^{(L-1)} + b^{(L-1)})
$$

i.e. it is a *linear transformation of weights with respect to its basis passed through an activation function*.

**Forward propagation** is *the entire process of calculating of activations of each layer "propagating" input data forward to the output which is the network's prediction*.


## Implementing Forward Propagation
​
Before implementing the forward propagation, let's set activation and loss functions first. **Sigmoid** will be used for activation, and **mean squared error** will be used for calculating the loss. 
​
$$\sigma = \frac{1}{1+e^{-x}}$$
​
$$mse = \frac{1}{2}\sum(\hat y - y)^2$$
​
We also need test input and initialize weights. I set`[0.5, 0.35]` as the input and `[0.85]` as the target value. Initial weights will be chosen randomly number from standard normal distribution.
​
#### Using row-vectors
Vectors are commonly implemented as row-vector using an array. The activation vectors and weight matrices are transposed and calculated as:
$$
(a'^{(L)})= \sigma((a'^{(L-1)}W'^{(L-1)}) + b'^{(L-1)}
$$

```python
import numpy as np # linear algebra

Y = [[0.85]] # target value
X = np.array([[0.5, 0.35]]) # test data
W = [np.random.randn(2,2), np.random.randn(2,2), np.random.randn(2,1)] # initialize weights with standard normal distribution
B = [np.random.randn(1,2), np.random.randn(1,2), np.random.randn(1,1)]
```
```python
sig = lambda x: 1/(1+np.exp(-x)) #sigmoid
mse = lambda x, y: np.square(x-y) # loss funcition

def forward_pass(X, W, B):
    for i,w in enumerate(W):
        X = sig(np.dot(X, w)+B[i]) # X*W
    return X

pred = forward_pass(X, W, B)
print("prediction:", pred, "loss:", mse(pred, Y))
```
```
prediction: [[0.7338931]] loss: [[0.01348081]]
```

## Backpropagation

**Backpropagation** is algorithm that trains neural network by minimizing the cost function. It does so by adjusting each weights in proportion to the gradient of loss functions. Intuitively, gradient of each weight represents how much it contributes to overall error. For the weights that contributes more to the output, weight will change in greater value.

### Chain Rule
Given the cost of forward propagation function as with respect to the weights of the last hidden layer:
$$
C(w^{(L-1)}) = C(a^{(L)}(z^{(L)}(w^{(L-1)})))
$$

$$
C = (\hat y - y)^2, \quad a^{(L)} = \sigma(z^{(L)}), \quad z^{(L)} = W^{(L-1)} a^{(L-1)}
$$

The gradient is calculated using the chain rule.
$$
C'(w^{(L-1)}) = \frac{\partial z^{(L)}}{\partial w^{(L-1)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial C}{\partial a^{(L)}}
$$

Let's calculate the partial derivatives.
$$
\frac{\partial C}{\partial a^{(L)}} = (\hat y - y), \quad \frac{\partial a^{(L)}}{\partial z^{(L)}} = \sigma'(z^{(L)}) = \sigma(z^{(L)}) \cdot (1-\sigma(z^{(L)})), \quad \frac{\partial z^{(L)}}{w^{(L-1)}} = a^{(L-1)} 
$$

Then, 
$$
C'(w^{(L-1)}) =  (a^{(L-1)})^T \cdot (\hat y - y) \odot \sigma'(z^{(L)})
$$
$a^{(L-1)}$ is transposed to match the dimension.


The gradient with respect to weights in second to last hiden layer is:
$$
C'(w^{(L-2)}) =  (a^{(L-2)})^T \cdot (\hat y - y) \odot \sigma'(z^{(L)}) \cdot (w^{(L-1)})^T \odot \sigma'(z^{(L-1)})
$$

And the gradient with respect to the first weight is:
$$
C'(w^{(0)}) =  (X)^T \cdot (\hat y - y) \odot \sigma'(z^{(L)}) \cdot (w^{(L-1)})^T \odot \sigma'(z^{(L-1)} \cdots (w^{(1)})^T \odot \sigma'(z^{(1)})
$$

To calculate the gradient with respect to the bias, replace $\frac{\partial z^{(n+1)}}{\partial w^{(n)}}$ with $\frac{\partial z^{(n+1)}}{\partial b^{(n)}}$ which is $1$:

$$
C'(b^{(0)}) =  (\hat y - y) \odot \sigma'(z^{(L)}) \cdot (w^{(L-1)})^T \odot \sigma'(z^{(L-1)} \cdots (w^{(1)})^T \odot \sigma'(z^{(1)})
$$

After the gradients have been caculated, update weights in proportion to the gradients.

$$w_{new}^{(L)} = w^{(L)} - \text{learning_rate} * C'(w^{(L)})$$


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

For faster computation, let's modify forward propagation so that it stores  $a^{(L)}$ and $\sigma'(z^{(L)})$.

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
        W[i] -= dw * learning_rate
        B[i] -= E * learning_rate
        E = np.dot(E, w.T) * dA[i]

A, dA = [],[]
pred = forward_pass(X, new_W, B, A, dA)
for i in range(1000):
    backward_pass(X, new_W, B, A, dA, pred, Y)
    pred = forward_pass(X, new_W, B, A, dA)
    if i %50 == 0:
        print("epoch:", i, "prediction:", pred, "loss:", mse(pred, Y))
```
```
epoch: 0 prediction: [[0.45828646]] loss: [[0.1534395]]
epoch: 50 prediction: [[0.80206431]] loss: [[0.00229783]]
epoch: 100 prediction: [[0.83524438]] loss: [[0.00021773]]
epoch: 150 prediction: [[0.84456951]] loss: [[2.94901935e-05]]
epoch: 200 prediction: [[0.84788703]] loss: [[4.46465182e-06]]
epoch: 250 prediction: [[0.84916089]] loss: [[7.04107819e-07]]
epoch: 300 prediction: [[0.84966412]] loss: [[1.12818446e-07]]
epoch: 350 prediction: [[0.84986513]] loss: [[1.81909124e-08]]
epoch: 400 prediction: [[0.84994577]] loss: [[2.94050943e-09]]
epoch: 450 prediction: [[0.84997819]] loss: [[4.75805858e-10]]
epoch: 500 prediction: [[0.84999122]] loss: [[7.70217759e-11]]
epoch: 550 prediction: [[0.84999647]] loss: [[1.24700525e-11]]
epoch: 600 prediction: [[0.84999858]] loss: [[2.01907108e-12]]
epoch: 650 prediction: [[0.84999943]] loss: [[3.26923717e-13]]
epoch: 700 prediction: [[0.84999977]] loss: [[5.29353603e-14]]
epoch: 750 prediction: [[0.84999991]] loss: [[8.57130958e-15]]
epoch: 800 prediction: [[0.84999996]] loss: [[1.38787145e-15]]
epoch: 850 prediction: [[0.84999999]] loss: [[2.24725105e-16]]
epoch: 900 prediction: [[0.84999999]] loss: [[3.6387656e-17]]
epoch: 950 prediction: [[0.85]] loss: [[5.89191639e-18]]
```

Links
* [Neural Networks by 3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
* [Neural Networks Demystified by Welch Labs](https://www.youtube.com/watch?v=GlcnxUlrtek&ab_channel=WelchLabs)


