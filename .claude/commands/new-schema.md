# /new-schema

Creates a new Sanity schema type for the Dar-Ul-Quran project following established conventions.

## Usage

```
/new-schema <type-name>
```

Example: `/new-schema scholarship`

## What it does

1. Creates `sanity/schemaTypes/<name>.ts` with:
   - Standard fields: `title`, `slug` (with isUnique), `order`, `seo { title, description }`, `body` (Portable Text)
   - Optional fields prompted by context
   - Proper TypeScript types

2. Exports the new type from `sanity/schemaTypes/index.ts`

3. Suggests matching GROQ queries to add to `sanity/lib/queries.ts`

## Conventions enforced

- `slug` field uses `isUnique: true` validator
- `order` number field for manual sorting
- `seo` inline object (not a separate document)
- `body` is Portable Text array
- Image fields include `alt` subfield
- `parent` references use `weak: false`
- All labels in Urdu where appropriate (ask user)
