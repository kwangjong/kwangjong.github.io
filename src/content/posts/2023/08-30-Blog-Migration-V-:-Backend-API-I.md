---
title: "Blog Migration V : Backend API I"
tags: [ go, blog-migration ]
date: 2023-08-29 22:48:30 -05:00 
---

In the previous blog post, I covered architecture design and data structure. In this post, I will briefly go over how I built my backend API. 

* [backend repo](https://github.com/kwangjong/blog-server-go-mongoDB)

![architecture](https://i.imgur.com/lKoBWVy.png)

## Functionalities of the API

To recap, the backend API is placed between the client and the database. The primary role of this layer is to communicate with the database to read, write, or update data. The client should be able to retrieve a blog post, upload a new one, or edit an existing one from the database. It is responsible for serving data to the frontend based on the client's requests.

## Choosing an API Framework

There are a couple API Frameworks like Gin, echo,  or Gorilla Mux. However, I wanted the best performance out of the GCP's E2 micro. I choose to use Go's standard HTTP library. This will keep my API very simple and have minimal overhead compared to other frameworks listed above. 

Unlike the common practice in web development to have Nginx as the reverse proxy, I choose not to use Nginx. Since this is a simple app expecting a low traffic volume, the additional benefits of having Nginx are unnecessary. The Go server can handle moderate traffic loads.

## Go Package Overview
```
.
└── src
  ├── db
  └── server
```

I divided the backend operation into two separate sub-packages. `db` interacts with the database, and `server` interacts with the client. 

### Interacting with the Database
`db` package uses `mongo` package ([link](https://pkg.go.dev/go.mongodb.org/mongo-driver/mongo)), which is the MongoDB Driver for go. Basic usage of the driver starts with connecting with the database. The authentication key is placed in the server's filesystem and is loaded from `Mongo_Key` path.

```go
func Connect_DB() (*DBClient, error) {
	key_file, err := os.Open(MONGO_KEY)
	if err != nil {
		return nil, err
	}
	defer key_file.Close()

	key_byte, _ := ioutil.ReadAll(key_file)

	var credential options.Credential
	json.Unmarshal([]byte(key_byte), &credential)

	opts := options.Client().ApplyURI(MONGO_URL).
		SetAuth(credential)

	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		return nil, err
	}
	log.Println("Mongo db connection established")

	err = client.Ping(context.TODO(), readpref.Primary())
	if err != nil {
		return nil, err
	}
	log.Println("Mongo db successfully pinged")

	return &DBClient{client}, nil
}
```
`DBClient` is a struct that stores `mongo.Client`.
```go
type DBClient struct {
	client *mongo.Client
}
```

Then, I loaded the "blog" collection, which is the "collection" of blog post documents. 
```go
coll := db.client.Database("db").Collection("blog")
```
Using this collection, go can perform CRUD operation to the database.

### CRUD operations
These are additional struct I used for CRUD.
```go
type FilterId struct {
	Id primitive.ObjectID `bson:"_id,omitempty"`
}
type FilterUrl struct {
	Url string `bson:"url"`
}
```

Basic CRUD operations are like this:
```go
//Create(insert)
func (db_coll *DBCollection) Insert(post *Post) error {
	// ...
	_, err := coll.InsertOne(context.TODO(), *post)
	// ...
	return nil
}
//Read(Get)
func (db_coll *DBCollection) Get(url string) (*Post, error) {
	// ...
	filter := FilterUrl{url}
	opts := options.Find()
	cursor, err := coll.Find(context.TODO(), filter, opts)
	// ...
	var results []*Post
	err = cursor.All(context.TODO(), &results)
	// ...
	return results[0], err
}
//Update
func (db_coll *DBCollection) Update(post *Post) error {
	// ...
	filter := FilterId{post.Id}
	update := bson.D{{"$set", *post}}
	_, err := coll.UpdateOne(context.TODO(), filter, update)
	// ...
	return nil
}
//Delete
func (db_coll *DBCollection) Delete(url string) error {
	// ...
	filter := FilterUrl{url}
	_, err := coll.DeleteOne(context.TODO(), filter)
	// ...
	return nil
}
```

I am using `url` field to query the blog post for read and delete, because `url` will be the API endpoint for retrieving or deleting the blog post.

Check my Github repo for the full implementation.
* [backend repo](https://github.com/kwangjong/blog-server-go-mongoDB)

