# Skill: add-query

Adds a new GROQ query to `sanity/lib/queries.ts`.

## Trigger

User needs to fetch new data from Sanity for a page or component.

## Steps

1. **Write** the GROQ query with:
   - Draft filter: `!(_id in path("drafts.**"))`
   - Explicit field selection (no `*` spread)
   - `slug { current }` on all slug fields
   - `seo { title, description }` on content types
   - `order(order asc)` default sort (or as specified)

2. **Export** as a named const:
   ```ts
   export const scholarshipsQuery = groq`
     *[_type == "scholarship" && !(_id in path("drafts.**"))] | order(order asc) {
       _id,
       title,
       slug { current },
       deadline,
       excerpt,
       seo { title, description }
     }
   `
   ```

3. **Provide** matching TypeScript type and `safeFetch` call pattern for the consuming page

## Conventions

- Naming: `<plural>Query` for lists, `<singular>BySlugQuery` for single-item lookups
- Always filter drafts
- Never use `...` top-level document spread
- Reference projections: `field-> { _id, title, slug { current } }` (explicit, not `...`)
