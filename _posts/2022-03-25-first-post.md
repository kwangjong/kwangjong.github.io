---
layout: post
title: "First Blog Post Building Blogging Website"
tags: blog, front-end, jekyll
date: 2022-03-25 15:30 +0800
---

I am finally writing my first blog post on my new blogging website. All the posts before this are imported from my github. My goal for this dev blog is to archive everything going on in my life as a CS enthusiast from studying, side-projects, or journaling. I will try to write most of my posts in English, but since I feel more comfortable thinking in Korean some of my journaling posts might be in Korean. I hope through this blog I can be more organized on my work and life. 
Here are the steps I went through building this website.

### Where to host?
First, I needed a server to host my website. There are many web hosting services providing a server with various specs at different prices. However, I wanted my website to be as cheap as possible, so my choice was Github Pages. 

![github-pages](https://res.cloudinary.com/practicaldev/image/fetch/s--FDDyc3MP--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/3uy5od7tw2jf4fh7ldlv.jpeg)

**Github Pages** is a free web page hosting service provided by Github. It can host static web pages with a 'github.io' domain. And, it is built automatically when you push your source to the Github repository. This was the best fit for me because maintenance is easier using git, it does not require a lot of extra setups to build and deploy my website, and it costs nothing to host my website.

### What tools to use?
Jekyll is a static website generator that renders Markdowns, HTML & CSS, and Liquids into a website. It is one of the widely used for creating a blog on github pages.

### Template?
Jekyll has many free fully-customizable templates provided by the open-source community. I could build from scratch, but it building from the existing template greatly saved my time.

You can find free templates here:
https://jekyllthemes.io/free
http://jekyllthemes.org/

I chose [Not-Pure-Pole](https://github.com/vszhub/not-pure-poole). 

### Getting Started
1. install ruby
