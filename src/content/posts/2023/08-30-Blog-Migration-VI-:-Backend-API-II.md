---
title: "Blog Migration VI : Backend API II"
tags: [ go, blog-migration ]
date: 2023-08-30 14:08:41 -05:00
---

This is the second part of the backend API. In the "Backend API I", I went over how to interact with DB using `mongo` driver. Let's explore how I designed API Endpoints.

* [backend repo](https://github.com/kwangjong/blog-server-go-mongoDB)

## API Endpoints

Here's an overview of endpoints:
* `/blog/`: This endpoint provides access to individual blog posts. The client can create a new blog post using POST method. The client can read, update, and delete existing blog posts by appending the desired URL. Access to the POST, PUT, and DELETE operations is restricted with a JWT token.
	* **400: Bad Request** - indicates that the request body is incorrectly formatted during a POST method.
	* **401: Unauthorized** - indicates that the given JWT token is invalid.
	* **404: Not Found** - indicates that blog post with given url does not exist.
	* **500: Database Interaction Error** - indicates an issue attempting to interact with the database.

* `/blog/list`: This endpoint is the gateway to a list of blog entries. The client can adjust the results by utilizing query parameters `skip` and `numPost`. "Skip" specifies the number of posts to skip, while "numPost" dictates the number of posts to retrieve. The response will return a list of blog post data such as title, date, and URL in the newest first order. This endpoint is mainly used for the blog listing page.
	* **405: Method Not Allowed** - only the GET method is allowed.

* `/blog/list/all`: This endpoint returns URL of all blog posts in the database. This endpoint is used during Sveltekit's building process for routing necessary pages.
	* **405: Method Not Allowed** - only the GET method is allowed.

* `/auth`: This endpoint is used for issuing and verifying a JWT token. With the correct API key, the GET method will return a JWT token. This endpoint will verify the JWT Token when the token is given in the request header with the DELETE method. This token is used for granting access to authorized interactions with our API, such as updating or deleting a blog post.
	* **401: Unauthorized** - indicates that the given API key is invalid.

Check my Github repo for the implementation.
* [backend repo](https://github.com/kwangjong/blog-server-go-mongoDB)

## Deployment
When it comes to deployment, I opted for the quickest approach by manually running it using `screen`. Since my server is straightforward and does not involve Nginx, configuring Docker felt excessive. However, I am considering future improvements by exploring Paas providers like Heroku and building CI/CD pipeline using Github Action.

This approach aligns with the simplicity of my current setup while keeping scalability in mind.

## Conclusion
In this segment, I've intricately designed our backend API, shaping endpoints like /blog/ and /auth that ensure seamless interactions and security. As our backend transforms concepts into functionality, we bridge the gap between data and user experience. In the next blog post, I will delve into security aspect of my app.
