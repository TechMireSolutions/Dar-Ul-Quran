---
name: setup-revalidation
description: Configures Sanity webhook on-demand cache revalidation for darulquran.pk. Use when the user asks to set up webhooks, after CMS type changes, or when ISR delay is too long.
disable-model-invocation: true
---

# Setup revalidation

Rules: **`04-sanity.mdc`** (webhook, path map, cache tags) · **`17-security.mdc`** (secret auth) · Doc: **`docs/sanity-webhook.md`**

## Steps

1. Generate secret: `openssl rand -hex 32`
2. Add to VPS `.env`: `REVALIDATE_SECRET=<secret>` — **fail closed** if missing
3. Sanity Manage → Webhooks → Create:
   - **URL:** `https://darulquran.pk/api/revalidate?secret=<secret>`
   - **Trigger:** Create, Update, Delete
   - **Filter:** `_type in ["course","service","post","page","siteSettings","homepageSettings","headerNav","testimonial"]`
   - **Projection:** `{ _type, "slug": slug }`
   - **Method:** POST
4. Update filter + path map in `app/api/revalidate/route.ts` when adding a public `_type`

## Test

```bash
curl -X POST "https://darulquran.pk/api/revalidate?secret=SECRET" \
  -H "Content-Type: application/json" \
  -d '{"_type":"course","slug":{"current":"nazra"}}'
```

Expect success JSON; wrong/missing secret → reject.

## Cache tags

All CMS fetches use tag `cms` via `sanity/lib/client.ts` (`lib/cache-tags.ts`). Prefer `cmsTypeTag` / slug tags for fine-grained invalidation.

Do not log webhook secrets or PII.

Ship: redeploy with `REVALIDATE_SECRET` set → `deploy` skill
