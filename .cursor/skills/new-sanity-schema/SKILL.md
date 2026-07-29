---
name: new-sanity-schema
description: Creates a Sanity schema type with slug, order, SEO, and Portable Text. Use when adding a CMS content type or document schema.
---

# New Sanity schema

Rule: `04-sanity.mdc` · Reference: `sanity/schemaTypes/course.ts` (full) or a simpler type like `testimonial.ts`.

## Steps

1. `sanity/schemaTypes/<name>.ts` → export in `index.ts`
2. List + by-slug queries (`add-sanity-query`) + fetchers (`add-fetcher`)
3. DTO in `lib/types/` aligned with GROQ
4. Public route: flat → `new-page` · nested tree → `new-leaf-route`
5. Webhook: add `_type` to revalidate filter + path map (`setup-revalidation`)

## Minimal template

```ts
import { defineField, defineType } from 'sanity'

export const thing = defineType({
  name: 'thing',
  title: 'Thing',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number' }),
    defineField({ name: 'excerpt', type: 'text', rows: 2 }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string' })] },
      ],
    }),
    defineField({ name: 'seoTitle', type: 'string' }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
```

## Required

- Unique `slug` · `order` · SEO fields · content-image `alt`
- Email/phone/URL fields in Studio → `LtrStringInput`
- After schema: queries → fetchers → route → update path map in `app/api/revalidate/route.ts` (`setup-revalidation`)

## Verify

`preflight` · if public route: `add-seo-to-page` · `setup-revalidation` for new `_type`
