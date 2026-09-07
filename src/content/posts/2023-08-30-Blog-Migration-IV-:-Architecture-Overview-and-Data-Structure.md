---
title: "Blog Migration IV : Architecture Overview and Data Structure"
tags: [ blog-migration]
date: 2023-08-29 19:07:37 -05:00 
---

In this blog post, I will briefly describe how I designed the architecture and data structure of my blog app.

* [frontend repo](https://github.com/kwangjong/kwangjong.github.io)
* [backend repo](https://github.com/kwangjong/blog-server-go-mongoDB)

![architecture](https://i.imgur.com/lKoBWVy.png)

## the Technology Stack
As I mentioned in the previous blog posts. I am using Go, MongoDB, and SveltKit for this project's tech stack. The primary motivation for choosing these technologies is learning/trying new stuff and practicing my web development knowledge. And, using Go instead of the popular Node.js seemed like an exciting project to me. 

![go-vs-node](https://wp-uploads.yalantis.com/wp-content/uploads/2023/07/21073620/content_go-nodejs-comparison.png)

This is a Node.js vs Go comparison chart I found on [Yalantis's blog post](https://yalantis.com/blog/golang-vs-nodejs-comparison/#:~:text=Go%20is%20multi%2Dpurpose%2C%20it,language%20with%20high%2Dlevel%20efficiency.).
While Go lacks extensive developer's tool and popularity compared to Node.js. Its performance and simplicity intrigued me to use Go to build my API server. To keep it simple, I am using Go's standard HTTP server with no Nginx reverse proxy.

Also, I decided to use MongoDB mainly because I wanted to learn and try it out. Its flexible and document-oriented database model with JSON-like structure was easiler for me to store blog posts and associated data.

## Architecture overview

Here's an architecture diagram of my blog app.

![architecture](https://i.imgur.com/lKoBWVy.png)

The front-end is built with SvelteKit and served statically on GitHub Pages. All scripts run on the client side, fetching data from the backend API. The backend API is built with Go and hosted in the GCP instance. This API is mainly used to query data from the database hosted in another GCP instance provided by MongoDB free tier.

My main focus of the architecture design was keeping the cost minimal. While I could host SvelteKit on its own server, I wanted to utilize Github's intrastructure and the easily recognizable domain "kwangjong.github.io". This decision limits the app to being static website with no server-side rendering, but I was able to host my website with a nice domain at zero cost. I could also achieve better maintainability and reduced backend server load by separating front-end and backend services.

## Storing Blog Post Data in DB
Storing blog post data in DB was very similar to storing data in JSON format.
Here's Go struct representation of each "document" in DB collection:

```go
type Post struct {
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	Url      string             `bson:"url"`
	Title    string             `bson:"title"`
	Date     time.Time          `bson:"date"`
	Tags     []string           `bson:"tags"`
	MarkDown string             `bson:"markdown"`
	Html     string             `bson:"html"`
```

Let's break down the fields:
* `Id`: A unique identifier assigned by MongoDB.
* `Url`: The URL of the blog post. This will be data concatenated with the title. ("2023-02-27-Blog-Migration-I")
* `Title`: The title of the blog post.
* `Date`: The publication date of the blog post.
* `Tags`: An array of tags associated with the post.
* `MarkDown`: The original raw Markdown of the post.
* `Html`: The HTML-rendered content of the post.

Because I used Markdown for my previous Jekyll blog, I kept using markdown for formatting blog posts. Also, because my website is rendered on the client-side, I am pre-rendering the markdown and storing the rendered html. This will allow faster rendering speed.

Each field in our Post structure is mapped to MongoDB document fields using BSON tags. 

## Conclusion
In wrapping up the design of my blog app's structure and data, I've taken a learning-focused approach. With Go, MongoDB, and SvelteKit, I've built a smooth experience for users while keeping things simple and cost-effective. In my next post, I'll dive into the backend API's details.

