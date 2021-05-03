# Repeat

A simple mock API for testing, prototyping, and general fun.

## Setup

Ensure you have [`wrangler`](https://github.com/cloudflare/wrangler) installed and configured.

Generate a new Worker using this template:

```
wrangler generate repeat https://github.com/jkulton/test && cd repeat
```

Next, set your `account_id` in `wrangler.toml`. (Found on [Workers Dashboard](https://dash.cloudflare.com/?to=/:account/workers))

Create a KV namespace for Repeat:

```sh
wrangler kv:namespace create "REPEAT_KV"
```

This command will instruct you to append some content to `wrangler.toml`, do so now.

Publish your Worker and start using your mock API:

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




