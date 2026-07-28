---
name: add-fetcher
description: Adds a React-cached fetcher in sanity/lib/fetchers.ts after a GROQ query. Use when wiring new Sanity data into pages or API routes.
---

# Add fetcher

Run after `add-sanity-query` skill.

## Steps

1. Add typed export in `sanity/lib/fetchers.ts`:
   ```ts
   import { cmsTypeTag } from '@/lib/cache-tags'

   export const getThingBySlug = cache((slug: string) =>
     safeFetch<ThingDoc>(thingBySlugQuery, { slug }, { tags: [cmsTypeTag('thing')] }),
   )
   ```
2. Import query from `./queries`, types from `@/lib/types`
3. Add or extend DTO in `lib/types/` if missing — fields must match GROQ projection
4. Pages call `get*` only — never import `queries.ts` or `safeFetch` from routes
5. Dynamic routes that need SSG: export path list fetcher for `generateStaticParams`

## Patterns

| Use case | Pattern |
|----------|---------|
| Singleton doc | `cache(() => safeFetch<T>(query))` — inherits `cms` tag |
| By slug | `cache((slug: string) => safeFetch<T>(query, { slug }, { tags: [cmsTypeTag('type')] }))` |
| Path list | `cache(() => safeFetch<SlugPathDoc[]>(allPathsQuery))` |
| Nullable first row | `async` wrapper returning `rows?.[0] ?? null` |

## Checklist

```
[ ] cache() wrapper
[ ] cms / cmsTypeTag tags
[ ] DTO aligned with query
[ ] No safeFetch outside fetchers.ts
```

Rules: `04-sanity.mdc` · `16-dry.mdc`  
Invalidation: `setup-revalidation` skill
