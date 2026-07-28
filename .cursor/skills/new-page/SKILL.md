---
name: new-page
description: Scaffolds a CMS public page under app/(site)/ with metadata and JSON-LD. Use when adding a flat public route or section page.
---

# New page

For nested CMS trees → `new-leaf-route` instead.

## Steps

1. Add query (`add-sanity-query`) + fetcher (`add-fetcher`)
2. Create `app/(site)/<slug>/page.tsx` — Server Component, `revalidate = 300`
3. `generateMetadata` → `pageMetadata({ path: PATHS.<key> | '/<slug>', ... })` from `lib/paths.ts` when the route is known — no string-concat paths
4. Titles/descriptions: prefer `resolveSiteNameUrdu` · `DEFAULT_SITE_NAME_URDU` · `DEFAULT_SITE_DESCRIPTION` / `DEFAULT_HOME_DESCRIPTION` from `lib/seo.ts`
5. Render `WebPageSchema` + `BreadcrumbNav` + `Reveal`; `notFound()` if no data
6. Sanity doc with matching `slug` + SEO; add to `sitemap.ts` if needed
7. Body shell: `TW_PAGE_BODY` + `` `${TW_CONTAINER_NARROW} lg:px-8` `` for prose; `PageHeroHeader` for hero
8. Copy/type: Urdu UI · Nastaliq leading (`leading-urdu` / `leading-heading`) · `tracking-normal`
9. Prefer existing shells before new markup (`05-components.mdc`)

## Verify

`check-urdu` · `preflight` · `technical-seo-audit` if SEO-critical · `rtl-check` if layout/type heavy

Rules: `02-coding-standards.mdc` · `03-rtl-urdu.mdc` · `06-tailwind.mdc` · `08-technical-seo-shared.mdc` · `14-file-structure.mdc` · `16-dry.mdc`

Portable Text → `components/content/RichTextBody.tsx`

Reference: `app/(site)/about/page.tsx` or `contact/page.tsx`
