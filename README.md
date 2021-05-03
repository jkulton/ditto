# Repeat

A simple mock API for testing, prototyping, and general fun.

## Setup

Ensure you have an installation of [`wrangler`](https://github.com/cloudflare/wrangler) that is configured.

1. Generate a new Worker using this template

```sh
wrangler generate https://github.com/jkulton/repeat
```

2. Update `wrangler.toml`

- Update `account_id` in `wrangler.toml` to your account id (found on your [Workers Dashboard](https://dash.cloudflare.com/?to=/:account/workers))
- Update `zone_id` if appropriate

3. Create Worker KV namespace

```
wrangler kv:namespace create "REPEAT_KV"
```

This command will output a message instructing you to append some content to the end of `wrangler.toml`, be sure to do so.

4. Deploy

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




