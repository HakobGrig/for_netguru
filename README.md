This project is done as an recruitment task for netguru.

Simple server providing 2 endpoints, create/get movies. Requirments and authorization server are [here](https://github.com/netguru/nodejs-recruitment-task).


To bring up the service use commands bellow

```sh
$ docker-compose build
$ JWT_SECRET=secret OMDB_KEY=omdbkey docker-compose up -d
```

This will bring up microservice with its postgres db. Please note this will not bring up auth service.
In order to change db username, pasword, name or app port edit .env file. Defaults are

```sh
PP_PORT=3001
DB_USERNAME=somesome
DB_PASSWORD=somesome
DB_NAME=moviemovie
```

To add movie run command below
```sh
curl --request POST -H "Authorization: Bearer <token>" \
  --header 'Content-Type: application/json'
  localhost:3001/movies -d '{ "title":"good" }'  
```
Response
```sh
{
  "error" : null,
  "data" : {"uuid":"35664514-2b37-4e5a-8ed4-38a341e6344f"}
}
```

In case you forgot to provide OMDB_KEY env variable or provided invalid one you will get the following error.

```sh
{
    "data": null,
    "error": {
        "message": "Internal server error."
    }
}
```

To get movies created by current user run command below

```sh
curl -H "Authorization: Bearer <token>" localhost:3001/movie' 
```

Responce
```sh
{
    "error": null,
    "data": {
        "movies": [
            {
                "uuid": "35664514-2b37-4e5a-8ed4-38a341e6344f",
                "created_at": "2022-05-11T16:16:31.411Z",
                "updated_at": "2022-05-11T16:16:31.411Z",
                "title": "Good Will Hunting",
                "released": "1998-01-09T00:00:00.000Z",
                "genre": "Drama, Romance",
                "director": "Gus Van Sant"
            },
            {
                "uuid": "333ae2a4-9b64-4d25-96ce-dfb4813fe61d",
                "created_at": "2022-05-11T16:21:05.170Z",
                "updated_at": "2022-05-11T16:21:05.170Z",
                "title": "Good Will Hunting",
                "released": "1998-01-09T00:00:00.000Z",
                "genre": "Drama, Romance",
                "director": "Gus Van Sant"
            }
        ]
    }
}
```
