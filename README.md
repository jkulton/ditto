# Repeat

A simple mock API for testing, prototyping, and general fun.

## Setup

Ensure you have [`wrangler`](https://github.com/cloudflare/wrangler) installed and configured.

1. Generate a new Worker using this template

```
wrangler generate repeat https://github.com/jkulton/test
```

2. Navigate into new Worker\ directory

```
cd repeat
```
  
3. Update account_id in `wrangler.toml`

Your account id can be found on your [Workers Dashboard](https://dash.cloudflare.com/?to=/:account/workers))

4. Create Worker KV namespace

```sh
wrangler kv:namespace create "REPEAT_KV"
```

This command will output a message instructing you to append some content to the end of `wrangler.toml`, be sure to do so.

5. Deploy!

```
wrangler publish
```

## Development

Ensure you have an installation of [`wrangler`](https://github.com/cloudflare/wrangler) installed and configured.

1. Clone repo locally
2. Run `npm install`
3. Run `wrangler kv:namespace create "REPEAT_KV"` and add output to `wrangler.toml`
4. Run `wrangler dev` to test locally

## Enabling Authentication




