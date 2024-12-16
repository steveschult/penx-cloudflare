# PenX cloudflare

## How to deploy to cloudflare pages?


### Clone repo

Clone the penx project to your computer:

```bash
git clone https://github.com/penx-dao/penx-cloudflare
```

### Setup `wrangler.toml`


Rename `wrangler.toml.example` to `wrangler.toml`.


### Get a Cloudflare D1 database ID


Run `npx wrangler d1 create penx-blog` to create a  Cloudflare D1 database.

If success, you will get this response:

```
✅ Successfully created DB 'penx-blog' in region WNAM
Created your new D1 database.

[[d1_databases]]
binding = "DB"
database_name = "penx-blog"
database_id = "00e31c14-e6ae-4612-9bc3-d25c6a1f8023d"
```

Then copy the `database_id` and replace the `database_id` in `wrangler.toml`.

### Setup Cloudflare R2 bucket

Run `npx wrangler r2 bucket create penx-bucket` to create a  Cloudflare R2 bucket.

If success, you will get this response.

```
✅ Created bucket 'penx-bucket' with default storage class of Standard.

Configure your Worker to write objects to this bucket:

[[r2_buckets]]
bucket_name = "penx-bucket"
binding = "penx_bucket"
```

### Config session password

In your browser, visit https://generate-secret.vercel.app/64 to get session password, and replace `SESSION_PASSWORD` in `wrangler.toml`.

### Deploy to Cloudflare pages

```bash
pnpm run db:generate # First time release needed
pnpm run db:migrate:prod # First time release needed
pnpm run deploy
```