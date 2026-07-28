---
name: new-page
description: Scaffolds a CMS public page under app/(site)/ with metadata and JSON-LD. Use when adding a flat public route or section page.
---

# New page

For nested CMS trees → `new-leaf-route` instead.

## Steps

1. Add query (`add-sanity-query`) + fetcher (`add-fetcher`)
2. Create `app/(site)/<slug>/page.tsx` — Server Component, `revalidate = 300`
3. `generateMetadata` → `pageMetadata({ path: '/<slug>', ... })` — `await params` on dynamic routes
4. Render `WebPageSchema` + `BreadcrumbNav` + `Reveal`; `notFound()` if no data
5. Sanity doc with matching `slug` + SEO; add to `sitemap.ts` if needed
6. Body shell: `TW_PAGE_BODY` + `` `${TW_CONTAINER_NARROW} lg:px-8` `` for prose; `PageHeroHeader` for hero
7. Copy/type: Urdu UI · Nastaliq leading (`leading-urdu` / `leading-heading`) · `tracking-normal`
8. Prefer existing shells before new markup (`05-components.mdc`)

## Verify

`check-urdu` · `preflight` · `technical-seo-audit` if SEO-critical · `rtl-check` if layout/type heavy

Rules: `02-coding-standards.mdc` · `03-rtl-urdu.mdc` · `06-tailwind.mdc` · `08-technical-seo-shared.mdc` · `14-file-structure.mdc`

Portable Text → `components/content/RichTextBody.tsx`

Reference: `app/(site)/about/page.tsx` or `contact/page.tsx`
