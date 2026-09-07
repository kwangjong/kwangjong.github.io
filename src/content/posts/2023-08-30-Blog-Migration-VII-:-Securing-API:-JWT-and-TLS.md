---
title: "Blog Migration VII : Securing API: JWT and HTTPS/TLS"
tags: [ security, blog-migration ]
date: 2023-08-30 16:17:56 -05:00 
---

In today's post, I will delve into security side of my app. I am using JWT Token to authorize API access to write, update, and delete a post. Also, I configured HTTPS/TLS to ensure secure data transmission.

```
.
└── src
  ├── db
  └── server
    ├── auth.go
    └── server.go

```
## JWT Authentication
### Implementiong JWT Authenticaiton
Let's take a closer look at the `auth.go` code that handles JWT token generation and validation. I am using golang-jwt package to generate jwt token and godotenv for loading secret from environment variable.

First, I set JWT secret and API key in the `.env` file located at the root of the package. JWT secret will be used for generating jwt token, and api key is used for authenticating the `/auth` endpoint which returns JWT token to client when correct key is given.
```
JWT_SECRET = 
API_KEY = 
```
Next, I loaded the secret like this.
```go
func LoadSecret() {
		err := godotenv.Load()
    if err != nil {
        log.Fatalf("err loading: %v", err)
    }

	SECRET = []byte(os.Getenv("JWT_SECRET"))
	API_KEY = os.Getenv("API_KEY")
}
```
I then used this secret to generate the token as shown below.
```go
func generateJwt() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(time.Hour * 12).Unix()
	tokenStr, err := token.SignedString(SECRET)

	if err != nil {
		log.Printf(err.Error())
		return "", err
	}

	return tokenStr, nil
}
```
Additionally, token validation is handled like so.
```go
func validateJwt(next func(w http.ResponseWriter, r *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Header["Token"] != nil {
			token, err := jwt.Parse(r.Header.Get("Token"), func(token *jwt.Token) (interface{}, error) {
				_, ok := token.Method.(*jwt.SigningMethodHMAC)
				if !ok {
					return nil, errors.New("not authorized")
				}
				return SECRET, nil
			})

			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("not authorized: " + err.Error()))
			}

			if token.Valid {
				next(w, r)
			}
		} else {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("not authorized"))
		}
	})
}
```
Note that validateJwt() is a middleware. It is used in either of these ways:
```go
http.Handle("/admin", validateJwt(admin))

//or inside a handler function
validateJwt(admin).Serve(w, r)
```
Finally, `/auth` endpoint is handled like this:
```go
func getJwt(w http.ResponseWriter, r *http.Request) {
	...
	//verify whether given JWT token is valid. this does not delete token
	if r.Method == http.MethodDelete {
		validateJwt(func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("authorized"))
		}).ServeHTTP(w,r)
		return
	}

	//verify api key and return token
	_, ok := r.Header["Api-Key"]
	if ok && r.Header["Api-Key"][0] == API_KEY {
		token, err := generateJwt()
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte(err.Error()))
			return
		}
		w.Write([]byte(token))
	} else {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("not authorized"))
	}
}
```

On client-side, JWT token is retrieved and stored in cookie:
```typescript
await fetch(`https://107106.xyz/auth`, {
            method: 'GET',
            headers: {
                'Api-Key': input_element!.value
            }
        }).then(response => response.status == 401 ? null : response.text())
        .then(tok => {
            if (tok != null) {
                window.alert('you are authenticated');
                document.cookie = 'token='+tok;
                // ...
            } else {
                window.alert('invalid key');
            }
        })
```

## HTTPS/TLS

### Domain and SSL Certificate

Securing the transmission of data between clients and the server is a cornerstone of application security. This is where HTTPS/TLS comes into play. In order to setup HTTPS/TLS, I needed to get a domain and SSL certificate first. 

After researching, I discovered that .xyz domains with 6-9 digits cost less than a dollar annually ([link](https://www.reddit.com/r/homelab/comments/vtqg9m/psa_any_xyz_domain_of_the_format_69_digitsxyz_is/)). Since this domain will only be used for my backend API, I did not need an easily recognizable one. So, I purchased mine at [Porkbun](https://porkbun.com) for $1.22/year, including the SSL certificate.

### Setting Up DNS

Now, I need my domain to point to the GCP instance running this my Go server. I added a DNS record through the Porkbun domain management console.

![dns-record](https://i.imgur.com/dxrF21f.jpg)

### Enabling HTTPS/TLS

Lastly, I utilized the SSL certificate purchased from PorkBun to enable TLS.
```go
const (
	// ...
	CERTFILEPATH = 
	KEYFILEPATH  = 
)

// Run initializes the server and handles routes
func Run() {
	// ...
	if err := http.ListenAndServeTLS(":443", CERTFILEPATH, KEYFILEPATH, nil); err != nil {
		log.Fatal(err)
	}
}
```
Enabling HTTPS/TLS guarantees that the data transmitted between the client and server remains confidential and tamper-proof, thwarting potential eavesdropping and data manipulation attacks.


Links
* [Secure Your Go REST API with JWT Authentication](https://www.youtube.com/watch?v=-Eei8eik1Io)
* [Simple Golang HTTPS/TLS Examples](https://gist.github.com/denji/12b3a568f092ab951456)
