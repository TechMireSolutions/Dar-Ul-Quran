# Sanity webhook — on-demand cache revalidation

When content changes in Sanity, call the revalidate API so pages update without waiting for ISR (300s).

## Setup

1. Generate a secret: `openssl rand -hex 32`
2. Add to VPS `.env`: `REVALIDATE_SECRET=<secret>`
3. In [Sanity Manage](https://www.sanity.io/manage) → API → Webhooks → Create:
   - **URL:** `https://darulquran.pk/api/revalidate?secret=<REVALIDATE_SECRET>`
   - **Trigger:** Create, Update, Delete
   - **Filter:** `_type in ["course","service","post","page","siteSettings","homepageSettings","headerNav","testimonial"]`
   - **Projection:** `{ _type, "slug": slug }`
   - **HTTP method:** POST

## Manual test

```bash
curl -X POST "https://darulquran.pk/api/revalidate?secret=YOUR_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"_type":"course","slug":{"current":"nazra"}}'
```

Expected: `{"revalidated":true,"type":"course",...}`

## Cache tags

All CMS fetches use tag `cms` plus `cms:<type>`. The webhook revalidates matching paths and tags.
