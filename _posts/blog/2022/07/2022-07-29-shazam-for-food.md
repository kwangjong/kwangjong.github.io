---
layout: post
title: "🍽Food Classifier using MobileNetV3: Shazam for Food?"
tags: blog, datascience, deeplearning
date: 2022-07-29 02:39 +0900
math: true
---

![mobilenet](https://i.imgur.com/NJe6z0i.png)

<!--kaggle-->
<a href ="https://www.kaggle.com/code/kwangjongchoi/mobilenetv3large-81-584/notebook">
    <img class ="badge" alt="Kaggle" src ="https://img.shields.io/badge/Kaggle-20BEFF.svg?&style=flat"> 
</a>
<!--demo-->
<a href ="https://huggingface.co/spaces/kwangjong/food-classifier-MobileNetV3">
    <img class ="badge" alt="Demo" src ="https://img.shields.io/badge/%F0%9F%A4%97%20Demo-blue?&style=flat"> 
</a>
<br>

While browsing around kaggle, I found this interesting food dataset which reminded me of Jin Yang's App in Silicon Valley. The dataset has huge amount of food pictures in 101 different classes. I tried training them with MobileNetV3.

## What is MobileNet?

MobileNet, first introduced in 2017, is a special artifificial neural network specifically designed for the CPUs in Smartphone. In most AI services, trainings and predictions run in the server side which has huge computational resources. However, MobileNet aims to run neural network in the mobile devices without the needs of sending data to the server. 

![cloud](https://i.imgur.com/JScwCFT.png)

However, with the emergence of many SOTA models with higher accuracy and lower latency. Many other models are also used for the mobile devices.
I used MobileNetV3Large model for the training.

## Data
Image data of 101 cuisines consisting 75750 training images and 25250 validation images divided into 101. Images were reshaped into 224 by 224 with data augmentation.
![food](https://i.imgur.com/2FLJfp7.png)

## Transfer Learning
Pretrained weights provided by keras were used.
```python
# load pretrained model
pre_trained = keras.applications.MobileNetV3Large(input_shape=(IMAGE_SIZE,IMAGE_SIZE,3),include_top=False,weights='imagenet')
pre_trained.trainable = True
```

## Model
```python
#define model
model = keras.Sequential([
    pre_trained,
    layers.GlobalAveragePooling2D(),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(101, activation='softmax'),
])

model.compile(
    optimizer='adam',
    loss = 'sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.summary()
```
```
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
MobilenetV3large (Functional (None, 1, 1, 1280)        4226432   
_________________________________________________________________
global_average_pooling2d_1 ( (None, 1280)              0         
_________________________________________________________________
dense (Dense)                (None, 128)               163968    
_________________________________________________________________
dropout (Dropout)            (None, 128)               0         
_________________________________________________________________
dense_1 (Dense)              (None, 101)               13029     
=================================================================
Total params: 4,403,429
Trainable params: 4,379,029
Non-trainable params: 24,400
_________________________________________________________________
```

## Training and Callbacks
```python
EPOCHS=20

# callbacks
reduce_lr = keras.callbacks.ReduceLROnPlateau(monitor = 'val_accuracy',patience = 1,verbose = 1)
early_stop = keras.callbacks.EarlyStopping(monitor = 'val_accuracy',patience = 5,verbose = 1,restore_best_weights = True)
chkp = keras.callbacks.ModelCheckpoint('mobilenet_v3_large_checkpoint.h5',monitor='val_accuracy',verbose=1,save_best_only=True)

with tf.device('/GPU:0'):
    hist = model.fit(
        train_data,
        validation_data = valid_data,
        epochs = EPOCHS,
        callbacks=[early_stop, reduce_lr, chkp],
    )

model.save('mobilenet_v3_large_final.h5')
```
Trained on 20 epochs with batch size of 64.

## Result
**`val_accuracy: 81.584%`**
![history](https://i.imgur.com/26HbZ6v.png)

Despite that one spike on epoch 3, overall training results were good.

## Ten more?

I tried training 10 more epochs to see if the network can train more. However, the model did not train at all and validation accuracy declined slightly. The model was at its maximum capacity in 20th epoch.

![history2](https://i.imgur.com/cGhouSN.png)

## Demo
Integrated into [Huggingface Spaces](https://huggingface.co/spaces/kwangjong/food-classifier-MobileNetV3) 🤗 using Gradio.

## Links
* [My Kaggle Notebook](https://www.kaggle.com/code/kwangjongchoi/mobilenetv3large-81-584/notebook)
* [Huggingface Space Repository](https://huggingface.co/spaces/kwangjong/food-classifier-MobileNetV3)
* [Food Images (Food-101)](https://www.kaggle.com/datasets/kmader/food41)
* [Searching for MobileNetV3](https://arxiv.org/pdf/1905.02244.pdf)
