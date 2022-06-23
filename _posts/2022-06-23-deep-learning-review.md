---
layout: post
title: "Deep Learning Review"
tags: blog, datascience, deeplearning
date: 2022-06-23 21:45 +0900
---

![deeplearning](https://i.imgur.com/ZTwsQGu.jpg)

## Single Neuron
![neuron](https://i.imgur.com/1TjA90k.png)

A neuron "learns" by adjusting its **weight** and **bias**.

```python
# one linear unit network
from tensorflow import keras
from tensorflow.keras import layers
# Create a network with 1 linear unit
model = keras.Sequential([
    layers.Dense(units=1, input_shape=[3])
])
```

## Activation Function
An ***activation Function*** enables a neural network to have **non-linearity**.

!(relu)[https://i.imgur.com/JlW89IR.png]
ReLu is the most commonly used activation function.

## Fully Connected Network
![fully-connected](https://i.imgur.com/k1EJ472.png)
```python
from tensorflow import keras
from tensorflow.keras import layers
model = keras.Sequential([
    # the hidden ReLU layers
    layers.Dense(units=4, activation='relu', input_shape=[2]),
    layers.Dense(units=3, activation='relu'),
    # the linear output layer 
    layers.Dense(units=1),
]
```

## Stochastic Gradient Descent
### Loss Function and Optimizer
The **loss function** tells a network *what* problem to solve. The **optimizer** tells a network *how* to solve the problem.
```python
model.compile(
    optimizer="adam",
    loss="mae",
)
```
**Adam** is a self-tuning optimizer great for general-purpose use.

![animated_sdg](https://i.imgur.com/rFI1tIk.gif)

### Train Model
```python
history = model.fit(
    X,y,
    batch_size=128,
    epochs=200
)
```

### Loss Curve
```python
import pandas as pd

history_df = pd.DataFrame(history.history)
# Start the plot at epoch 5. You can change this to get a different view.
history_df.loc[5:, ['loss']].plot();
```
![loss](https://i.imgur.com/RWG8rFm.png)

### How training works: Backpropagation
**Backpropagation** is the key steps to the training of a neural network. It calculates the *gradient* of the loss function with respect to the *weights* of the network. In other words, it determines *how much* weights of each unit need to change to minimize the *loss*. Check out [3Blue1Brown's video] if you want to dig into the math behind backpropagation.


##  Underfitting and Overfitting
Information accquired from training data are two kinds: *signal* and *noise*. **Underfitting** occurs if the model fails to learn enough *signal*. **Overfitting** occurs when the model learned too much *noise*.

If the network *underfits*, we can try increasing **capacity** (making the network *wider* or *deeper*). Also to prevent *overfitting*, we can adding early stopping through *callback*.
```python
from tensorflow.keras.callbacks import EarlyStopping

early_stopping = EarlyStopping(
    min_delta=0.001, # minimium amount of change to count as an improvement
    patience=20, # how many epochs to wait before stopping
    restore_best_weights=True,
)
```
```python
history = model.fit(
    X_train, y_train,
    validation_data=(X_valid, y_valid),
    batch_size=256,
    epochs=500,
    callbacks=[early_stopping], # put your callbacks in a list
    verbose=0,  # turn off training log
)
```

## Dropout
**Dropout** is a technique to *"drop out"* fraction of hidden layers to improve training qualities and prevent overfitting. It is commonly described as `creating a kind of ensemble of networks`.

![dropout](https://i.imgur.com/a86utxY.gif)

```python
keras.Sequential([
    # ...
    layers.Dropout(rate=0.3), # apply 30% dropout to the next layer
    layers.Dense(16),
    # ...
])
```

## Batch Normalization

**Batch normalization** is a special kind of layer that helps the optimization process and prevent training to get "stuck". Batch normalization is believed to solve *internal covariate shift* which is change in distribution of data during training process.

![batch-nornm](https://i.imgur.com/ZlqADvu.jpg)

You can add batch normalization after a layer...
```python
layers.Dense(16, activation='relu'),
layers.BatchNormalization(),
```
... or between a layer and its activation function.
```
layers.Dense(16),
layers.BatchNormalization(),
layers.Activation('relu'),
```

Links
* [Neural Networks by 3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)
* [Batch-Normalization by Jinsol Kim](https://gaussian37.github.io/dl-concept-batchnorm/)
* [Intro to Deep Learning Course on Kaggle](https://www.kaggle.com/learn/intro-to-deep-learning)


