# /add-query

Adds a new GROQ query to `sanity/lib/queries.ts` following project conventions.

## Usage

```
/add-query <description>
```

Example: `/add-query all scholarships sorted by deadline`

## What it does

1. Writes the GROQ query as an exported `const` in `sanity/lib/queries.ts`
2. Includes standard field selections: `_id`, `title`, `slug { current }`, `seo { title, description }`
3. Adds TypeScript return type inference comment
4. Suggests the matching `safeFetch` call pattern for a Server Component

## Conventions enforced

- Exported named constant (e.g. `scholarshipsQuery`)
- Explicit field selection — never `...` top-level spread
- Ordering by `order asc` unless specified otherwise
- Filters out drafts: `!(_id in path("drafts.**"))`
- Slug projection: `slug { current }`
