---
name: new-sanity-schema
description: Creates a Sanity schema type with slug, order, seo, and Portable Text. Use when adding a CMS content type.
---

# New Sanity schema

1. `sanity/schemaTypes/<name>.ts` → export in `index.ts`
2. List + by-slug queries (`add-sanity-query` skill)
3. Public route if needed (`new-page` skill)

Required: unique `slug`, `order`, inline `seo`, image `alt`. Rule: `04-sanity.mdc`
