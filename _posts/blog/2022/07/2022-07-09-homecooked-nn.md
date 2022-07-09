---
layout: post
title: "HomeCooked Neural Network"
tags: blog, datascience, deeplearning
date: 2022-07-09 23:55 +0900
math: true
---

My attempt on building a neural network from scratch.

![homecooked-nn](https://i.imgur.com/H2dx5KO.png)

[link to the notebook](https://www.kaggle.com/code/kwangjongchoi/homecooked-nn/notebook)<br>
[code on github](https://github.com/Kwangjong/homecooked-nn/blob/main/neuralnet.py)


#### He Initialization: 

$$W ~ N(0, Var(W)), \text{where } Var(W) = \sqrt{\frac{2}{n_{in}}} \text{and } n_{in} = \text{size of layer input}$$

#### Forward Propagation: 

$$a^{(L)} = \sigma(z^{(L)}) = \sigma(W^{(L-1)}a^{(L-1)}+b^{(L-1)})$$

#### Backpropagation: 

$$C'(w^{(0)}) = \frac{\partial C}{\partial a^{(L)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial z^{(L)}}{\partial a^{(L-1)}} \cdots \frac{\partial a^{(1)}}{\partial z^{(1)}} \cdot \frac{\partial z^{(1)}}{\partial w^{(0)}} $$

$$C'(b^{(0)}) = \frac{\partial C}{\partial a^{(L)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial z^{(L)}}{\partial a^{(L-1)}} \cdots \frac{\partial a^{(1)}}{\partial z^{(1)}} \cdot \frac{\partial z^{(1)}}{\partial b^{(0)}} 
$$

#### Stochastic Gradient Descent:
[Deep Learning](https://www.deeplearningbook.org/contents/optimization.html), Ian Goodfellow, Ch.8, 291p

<img src="https://i.imgur.com/07HSvfq.png" alt="sgd" width="600" style="margin-left: auto; margin-right: auto"/>

#### Adam Optimizer:
[Deep Learning](https://www.deeplearningbook.org/contents/optimization.html), Ian Goodfellow, Ch.8, 306p

<img src="https://i.imgur.com/HDdc9I5.png" alt="adam" width="600" style="margin-left: auto; margin-right: auto"/>


## Implementation
Go to my [github](https://github.com/Kwangjong/homecooked-nn/blob/main/neuralnet.py) or [kaggle](https://www.kaggle.com/code/kwangjongchoi/homecooked-nn/notebook) to see my implementation.


## Testing my neural net

```python
import numpy as np
import matplotlib.pyplot as plt

#dataset generator
from sklearn.datasets import make_regression
from sklearn.datasets import make_moons

#normalizer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

#plotting
from mlxtend.plotting import plot_decision_regions
from mlxtend.plotting import category_scatter

#load module
import os
os.chdir("/kaggle/input/neuralnet")
import neuralnet as nn
```

## Regression

#### create test data
```python
reg_X, reg_y = make_regression(n_samples=1500, n_features=1, noise=0.1, random_state=0)

train_reg_X, valid_reg_X, train_reg_y, valid_reg_y = train_test_split(reg_X, reg_y, random_state=0)

normalize = StandardScaler()
train_X = normalize.fit_transform(train_reg_X)
valid_X = normalize.transform(valid_reg_X)

plt.scatter(train_reg_X, train_reg_y)
plt.show()
```

![regression-data](https://i.imgur.com/gwXJsQa.png)

#### initialize network: 4x4 w/ sgd
```python
nn_regressor = nn.NeuralNet(
    input_size=1, 
    hidden_size=(4,4,1),
    activation=[nn.relu, nn.relu, nn.linear],
    loss=nn.mse,
    optimizer='sgd',
    random_state=0
)

nn_regressor.summary()
```
```
loss='mean_square_error', optimizer='sgd'
--------------------------------------------------
     input:     1 unit(s)
  hidden_0:     4 unit(s), activation='relu'
  hidden_1:     4 unit(s), activation='relu'
    output:     1 unit(s), activation='linear'
--------------------------------------------------
                   total_unit: 3  total_param: 33 
```

#### training
```python
history = {}
nn_regressor.fit(
    train_reg_X, train_reg_y, 
    batch_size=32,
    epochs=800,
    learning_rate=0.02,
    valid_data=(valid_reg_X, valid_reg_y),
    history=history, 
    verbose=1
)

test_reg_X = np.linspace(train_reg_X.min(), train_reg_X.max(), 100)
test_reg_p = nn_regressor.predict(test_reg_X)

fig, ax = plt.subplots(1,2,figsize=(15,5))
ax[0].plot(history['train_loss'][100:])
ax[0].plot(history['valid_loss'][100:])
ax[0].legend()
ax[0].set_title('Loss')

ax[1].scatter(train_reg_X, train_reg_y)
ax[1].plot(test_reg_X, test_reg_p, color='r')
ax[1].set_title('Trained Model')
plt.show()
```

![regression-history-with-sgd](https://i.imgur.com/cOTzajG.png)

#### recompile network: 4x4 w/ adam

```python
# same model but with adam optimizer (trained weights are reset)
nn_regressor.recompile(optimizer='adam')
```

#### training
```python
history = {}
nn_regressor.fit(
    train_reg_X, train_reg_y, 
    batch_size= 32,
    epochs = 800, 
    valid_data=(valid_reg_X, valid_reg_y), 
    history=history, 
    verbose=1
)

test_reg_X = np.linspace(train_reg_X.min(), train_reg_X.max(), 100)
test_reg_p = nn_regressor.predict(test_reg_X)

fig, ax = plt.subplots(1,2,figsize=(15,5))
ax[0].plot(history['train_loss'][100:])
ax[0].plot(history['valid_loss'][100:])
ax[0].legend()
ax[0].set_title('Loss')

ax[1].scatter(train_reg_X, train_reg_y)
ax[1].plot(test_reg_X, test_reg_p, color='r')
ax[1].set_title('Trained Model')
plt.show()
```

![regression-history-with-adam](https://i.imgur.com/z82blTB.png)


## Binary Classification

#### create test data
```python
moon_X, moon_y = make_moons(n_samples=1500, noise=0.1, random_state=0)

train_moon_X, valid_moon_X, train_moon_y, valid_moon_y = train_test_split(moon_X, moon_y, random_state=0)

normalize = StandardScaler()
train_moon_X = normalize.fit_transform(train_moon_X)
valid_moon_X = normalize.transform(valid_moon_X)


df_moon_X = np.concatenate((train_moon_X, valid_moon_X))
df_moon_y = np.concatenate((train_moon_y, valid_moon_y))
df_moon = np.concatenate((df_moon_X, df_moon_y.reshape(df_moon_y.shape[0], 1)), axis=1)

category_scatter(x=0, y=1, label_col=2, data=df_moon, markers='s^',colors=('blue','orange'))
plt.show()
```

![binary-classification](https://i.imgur.com/ybPDWLw.png)

#### initialize network: 4x4 w/ adam
```python
nn_bclassifier = nn.NeuralNet(
    input_size=2, 
    hidden_size=(16,16,1),
    activation=[nn.relu, nn.relu, nn.sigmoid],
    loss=nn.bce, #binary crossentropy
    metric=[nn.bacc], #binary accuracy
    optimizer='adam',
    random_state=0
)

nn_bclassifier.summary()
```
```
loss='binary_cross_entropy', optimizer='adam'
--------------------------------------------------
     input:     2 unit(s)
  hidden_0:    16 unit(s), activation='relu'
  hidden_1:    16 unit(s), activation='relu'
    output:     1 unit(s), activation='sigmoid'
--------------------------------------------------
                  total_unit: 4  total_param: 337 
```

#### training
```python
history = {}
nn_bclassifier.fit(
    train_moon_X, train_moon_y,
    batch_size=32,
    epochs=400, 
    valid_data=(valid_moon_X, valid_moon_y), 
    history=history, 
    verbose=1
)

fig, ax = plt.subplots(1,2,figsize=(15,5))
ax[0].plot(history['train_loss'])
ax[0].plot(history['valid_loss'])
ax[0].set_title('Loss')

ax[1].plot(history['train_binary_accuracy'])
ax[1].plot(history['valid_binary_accuracy'])
ax[1].set_title('Accuracy')
plt.show()

plot_decision_regions(df_moon_X,df_moon_y, clf=nn_bclassifier)
plt.show()
```

![binary-classification-history](https://i.imgur.com/VX5yvgD.png)

#### decision region

![decision-region](https://i.imgur.com/1mebQRf.png)


Links
* [Optimization for Training DeepModels, Deep Learning (Ian Goodfellow et al)](https://www.deeplearningbook.org/contents/optimization.html)
* [Neural Networks by 3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
* [Neural Networks Demystified by Welch Labs](https://www.youtube.com/watch?v=GlcnxUlrtek&ab_channel=WelchLabs)


