# Ditto

A simple mock API for testing, prototyping, and general fun.

## Setup

Ensure you have [`wrangler`](https://github.com/cloudflare/wrangler) installed and configured.

1. Generate a new Worker using this template:
    - `wrangler generate ditto https://github.com/jkulton/ditto && cd ditto`
2. Set your `account_id` in `wrangler.toml`.
    - (Found on [Workers Dashboard](https://dash.cloudflare.com/?to=/:account/workers))
3. Create a KV namespace for Ditto:
    - `wrangler kv:namespace create "DITTO_KV"`
    - This command will instruct you to append some content to `wrangler.toml`, do so now.
4. Publish your Worker and start using your mock API:
    - `wrangler publish`

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

