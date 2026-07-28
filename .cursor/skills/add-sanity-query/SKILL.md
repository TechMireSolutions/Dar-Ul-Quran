---
name: add-sanity-query
description: Adds GROQ to sanity/lib/queries.ts with explicit fields, slug, and SEO projections. Use when fetching new Sanity data or extending CMS queries.
---

# Add Sanity query

Rule: `04-sanity.mdc` · Then → `add-fetcher` skill.

## Rules

- File: `sanity/lib/queries.ts` only
- Explicit fields — **no** top-level `...`
- `slug { current }` · SEO fields as used by the type (`seo { title, description }` or `seoTitle` / `seoDescription`)
- Refs: `field->{ _id, title, "slug": slug.current }`
- **Do not** add `!(_id in path("drafts.**"))` to new queries — match existing queries; published content is handled by CDN / client `perspective` (see `04-sanity.mdc`)
- Name: `itemsQuery` / `itemBySlugQuery` / `*DeepQuery` for nested trees
- Reuse private `SCREAMING_SNAKE` fragments when the same field set appears 2+ times

## Template

```ts
export const thingBySlugQuery = `
  *[_type == "thing" && slug.current == $slug][0] {
    _id, title, slug, excerpt, body,
    "seoTitle": seoTitle, "seoDescription": seoDescription,
    featuredImage
  }
`
```

## Checklist

```
[ ] Query in queries.ts (not page/component)
[ ] Explicit projection + slug shape
[ ] DTO fields match projection (lib/types/)
[ ] Fetcher added (add-fetcher)
```
