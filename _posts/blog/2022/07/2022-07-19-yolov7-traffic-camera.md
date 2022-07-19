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

MS COCO

| Model | Test Size | AP<sup>test</sup> | AP<sub>50</sub><sup>test</sup> | AP<sub>75</sub><sup>test</sup> | batch 1 fps | batch 32 average time |
| :-- | :-: | :-: | :-: | :-: | :-: | :-: |
| YOLOv7 | 640 | **51.4%** | **69.7%** | **55.9%** | 161 *fps* | 2.8 *ms* |
| YOLOv7-X | 640 | **53.1%** | **71.2%** | **57.8%** | 114 *fps* | 4.3 *ms* |
|  |  |  |  |  |  |  |
| YOLOv7-W6 | 1280 | **54.9%** | **72.6%** | **60.1%** | 84 *fps* | 7.6 *ms* |
| YOLOv7-E6 | 1280 | **56.0%** | **73.5%** | **61.2%** | 56 *fps* | 12.3 *ms* |
| YOLOv7-D6 | 1280 | **56.6%** | **74.0%** | **61.8%** | 44 *fps* | 15.0 *ms* |
| YOLOv7-E6E | 1280 | **56.8%** | **74.4%** | **62.1%** | 36 *fps* | 18.7 *ms* |

## Breaking Down YOLOv7
[Read article on Roboflow blog](https://blog.roboflow.com/yolov7-breakdown/)

## Inference on Traffic Video

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dioKxDaiqhU?controls=0?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/DBBpC-v7Ku8?controls=0?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;" allowfullscreen></iframe>

## Links
* [my notebook code](https://drive.google.com/file/d/17v7MeCEXPVqAYpG5WwxwFNTuMXj7E57I/view?usp=sharing)
