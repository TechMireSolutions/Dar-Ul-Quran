---
name: add-sanity-query
description: Adds GROQ to sanity/lib/queries.ts with draft filter, slug, and seo fields. Use when fetching new Sanity data.
---

# Add Sanity query

In `sanity/lib/queries.ts`:

- `!(_id in path("drafts.**"))` · explicit fields · `slug { current }` · `seo { title, description }`
- Name: `itemsQuery` / `itemBySlugQuery`
- Refs: `field-> { _id, title, slug { current } }`

Rule: `04-sanity.mdc`
