# Repeat

A simple mock API for testing, prototyping, and general fun.

## Setup

Ensure you have [`wrangler`](https://github.com/cloudflare/wrangler) installed and configured.

1. Generate a new Worker using this template:
    - `wrangler generate repeat https://github.com/jkulton/test && cd repeat`
2. Set your `account_id` in `wrangler.toml`.
    - (Found on [Workers Dashboard](https://dash.cloudflare.com/?to=/:account/workers))
3. Create a KV namespace for Repeat:
    - `wrangler kv:namespace create "REPEAT_KV"`
    - This command will instruct you to append some content to `wrangler.toml`, do so now.
4. Publish your Worker and start using your mock API:
    - `wrangler publish`

## Development

Ensure you have an installation of [`wrangler`](https://github.com/cloudflare/wrangler) installed and configured.

1. Clone repo locally
2. Run `npm install`
3. Run `wrangler kv:namespace create "REPEAT_KV"` and add output to `wrangler.toml`
4. Run `wrangler dev` to test locally

### Testing

```
npm run test
```

## Authentication





