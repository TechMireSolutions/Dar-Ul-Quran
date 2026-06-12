# /new-page

Scaffolds a new CMS-driven page in the Dar-Ul-Quran Next.js App Router.

## Usage

```
/new-page <slug>
```

Example: `/new-page gallery`

## What it does

1. Creates `app/(site)/<slug>/page.tsx` as a Server Component with:
   - `generateMetadata` function pulling from Sanity `seo`
   - `safeFetch` call using `pageBySlugQuery`
   - `Reveal` scroll animation wrapper
   - RTL-compatible layout

2. Adds a `pageBySlug('<slug>')` call pattern if the page uses the generic `page` schema

3. Adds `revalidate = 300` ISR export

## Conventions enforced

- Server Component (no `"use client"`)
- RTL-safe layout (uses logical spacing `ms-*`/`me-*`)
- `dq-*` color tokens for brand elements
- `<Image>` not `<img>`
- `<Link>` not `<a>`
