<img alt="Ditto Logo" src="https://user-images.githubusercontent.com/6694167/117236689-35701f80-adf7-11eb-9c5c-c7c05c747d0f.png" width="200" />


# Ditto

**[Website](https://ditto.pages.dev/)**

A simple mock API for testing, prototyping, and general fun. Think of Ditto as a combination of an HTTP API and a key-value store. Whatever you `PUT` to a path will be returned when you `GET` that path.

## Setup

Ensure you have [`wrangler`](https://github.com/cloudflare/wrangler) installed and configured, then create a new CloudFlare Worker based on Ditto:

```
wrangler generate ditto https://github.com/jkulton/ditto && cd ditto
```

Set your account id in `wrangler.toml`, which can be found on your [Workers Dashboard](https://dash.cloudflare.com/?to=/:account/workers).

Create a KV namespace for Ditto:

```
wrangler kv:namespace create "DITTO_KV"
```

The previous command will instruct you to append some content to `wrangler.toml`, be sure to do so.

Publish your Worker and start using your mock API: `wrangler publish`

---

## Usage

### Creating Data

`PUT` request to Ditto on a non-origin path with some JSON data will store the data

```http
PUT https://ditto.USERNAME.workers.dev/users/1
Content-Type: application/json

{
  "id": 1,
  "name": "Some Name",
  "favorite_food": "Peanut Butter & Jelly"
}
```


### Reading Data

`GET` requests to the same path will return the data stored

```http
GET https://ditto.USERNAME.workers.dev/users/1

{
  "id": 1,
  "name": "Some Name",
  "favorite_food": "Peanut Butter & Jelly"
}
```


`GET` requests a path you haven't `PUT` will return a 404

```http
GET https://ditto.USERNAME.workers.dev/users/2

404 Not Found
```


`GET` requests to the origin URL return a JSON array of all defined routes

```http
GET https://ditto.USERNAME.workers.dev/

[
  {
    "name": "/users/1",
    "url": "https://ditto.USERNAME.workers.dev/users/1"
  }
]
```

### Updating Data

`PUT` requests to an existing path update that resource

```http
PUT https://ditto.USERNAME.workers.dev/users/1
Content-Type: application/json

{
  "id": 1,
  "name": "New Name",
  "favorite_food": "Oatmeal"
}
```

### Deleting Data

`DELETE` requests to an existing path will remove that resource

```http
DELETE https://ditto.USERNAME.workers.dev/users/1
```

`DELETE` requests to the origin URL will **remove all resources**

```http
DELETE https://ditto.USERNAME.workers.dev/

...

GET https://ditto.USERNAME.workers.dev/

[]
```

---

## Authentication

If you'd like to enable authentication simply [set a secret using wrangler](https://developers.cloudflare.com/workers/cli-wrangler/commands#secret) with the name `DITTO_PSK`.

```
wrangler secret put DITTO_PSK
```

All requests to Ditto will then require passing `X-Ditto-PSK` as a header with the value of your secret.

To disable auth again just delete the `DITTO_PSK` secret

```
wrangler secret delete DITTO_PSK
```

---

## Development

Ensure you have an installation of [`wrangler`](https://github.com/cloudflare/wrangler) installed and configured.

1. Clone repo locally
2. Run `npm install`
3. Run `wrangler kv:namespace create "DITTO_KV"` and add output to `wrangler.toml`
4. Run `wrangler dev` to test locally

### Testing

```
npm run test
```

