---
name: setup-revalidation
description: Configures Sanity webhook on-demand cache revalidation for darulquran.pk. Use after CMS changes or when ISR delay is too long.
---

# Setup revalidation

Rules: **`04-sanity.mdc`** (webhook, path map, cache tags) · **`17-security.mdc`** (secret auth) · Doc: **`docs/sanity-webhook.md`**

## Steps

1. Generate secret: `openssl rand -hex 32`
2. Add to VPS `.env`: `REVALIDATE_SECRET=<secret>`
3. Sanity Manage → Webhooks → Create:
   - **URL:** `https://darulquran.pk/api/revalidate?secret=<secret>`
   - **Trigger:** Create, Update, Delete
   - **Filter:** `_type in ["course","service","post","page","siteSettings","homepageSettings","headerNav","testimonial"]`
   - **Projection:** `{ _type, "slug": slug }`
   - **Method:** POST

## Test

```bash
curl -X POST "https://darulquran.pk/api/revalidate?secret=SECRET" \
  -H "Content-Type: application/json" \
  -d '{"_type":"course","slug":{"current":"nazra"}}'
```

## Cache tags

All CMS fetches use tag `cms` via `sanity/lib/client.ts` (`lib/cache-tags.ts`).

After schema changes, update path map in `app/api/revalidate/route.ts` if new public types added.

Ship: redeploy with `REVALIDATE_SECRET` set → `deploy` skill
