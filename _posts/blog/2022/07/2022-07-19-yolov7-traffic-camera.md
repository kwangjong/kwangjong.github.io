---
layout: post
title: "🛞Yolov7: Traffic Video Object Detection"
tags: blog, computervision
date: 2022-07-20 01:34 +0900
---

# YOLOv7
* [YOLOv7: Trainable bag-of-freebies sets new state-of-the-art for real-time object detectors](https://arxiv.org/abs/2207.02696)
* [Implementation on Github](https://github.com/WongKinYiu/yolov7)

## Performance 

![mscoco](https://i.imgur.com/1UNC9YV.png)
![performance](https://i.imgur.com/6r7TUf1.png)

## Breaking Down YOLOv7
[Read article on Roboflow blog](https://blog.roboflow.com/yolov7-breakdown/)

## Inference on Traffic Video

| Video | Model | Image Size | # frames | elapsed time | fps |
| :-- | :-: | :-: | :-: | :-: | :-: |
| [**Isanpo Interchange Day**](https://i.imgur.com/SDEdDq9.mp4) | **YOLOv7** | 640px | 191 *frames* | 56 *fps* | 3.41 *sec* |
| [**Isanpo Intercahnge Night**](https://i.imgur.com/rdygvod.mp4)| **YOLOv7** | 640px | 194 *frames* | 56 *fps* | 3.43 *sec* |
| [**Rainy Seoul Street**](https://youtu.be/ghWzuAl7rcY) | **YOLOv7-E6E** | 1280px | 4606 *frames* | 16 *fps* | 287.05 *sec* |

#### Isanpo Interchange CCTV

<video width=400 controls autoplay loop src="https://i.imgur.com/ukX5mED.mp4"></video>
<video width=400 controls autoplay loop src="https://i.imgur.com/P6H8g0z.mp4"></video>

#### Rainy Seoul Street

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/76fpOiVdTM0?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

original video from [`@SeoulWalker`](https://www.youtube.com/watch?v=Y6mLZBouFwU&t=63s)

## Links
* [my colab notebook](https://colab.research.google.com/drive/17v7MeCEXPVqAYpG5WwxwFNTuMXj7E57I#scrollTo=lrqovzPXy-Z8)
