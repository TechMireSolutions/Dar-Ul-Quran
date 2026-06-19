---
name: new-sanity-schema
description: Creates a Sanity schema type with slug, order, seo, and Portable Text. Use when adding a CMS content type.
---

# New Sanity schema

1. `sanity/schemaTypes/<name>.ts` → export in `index.ts`
2. List + by-slug queries (`add-sanity-query` skill) + fetchers (`add-fetcher` skill)
3. Public route: flat → `new-page` · nested tree → `new-leaf-route`
4. Webhook: add `_type` to revalidate filter + path map (`setup-revalidation` skill)

Required: unique `slug`, `order`, inline `seo`, image `alt`. Rule: `04-sanity.mdc`
