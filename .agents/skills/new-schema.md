# Skill: new-schema

Creates a new Sanity schema type for Dar-Ul-Quran following established conventions.

## Trigger

User asks to add a new content type, document type, or Sanity schema (e.g. "add a scholarship schema", "create a new event type").

## Steps

1. **Create** `sanity/schemaTypes/<name>.ts` with:
   - `title` (string, required)
   - `slug` (slug, `source: 'title'`, `isUnique: true` validator)
   - `order` (number, for manual sort)
   - `seo` inline object `{ title: string, description: string }`
   - `body` Portable Text array (if content type)
   - Any type-specific fields based on context
   - TypeScript `defineType` / `defineField` from `sanity`

2. **Export** the new type from `sanity/schemaTypes/index.ts`

3. **Add queries** to `sanity/lib/queries.ts`:
   - List query (all items, ordered by `order asc`, filtered `!(_id in path("drafts.**"))`)
   - Single item query by slug

4. **Suggest** route structure if the type needs a public page

## Conventions

- `weak: false` on `reference` fields for parent relationships
- Image fields always include `alt` subfield
- Labels in Urdu when appropriate (ask user)
- `hidden: () => true` for deprecated fields kept for back-compat
