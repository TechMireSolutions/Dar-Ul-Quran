---
name: new-page
description: Scaffolds a CMS public page under app/(site)/ with metadata and JSON-LD. Use when adding a route or section.
---

# New page

1. Add query (`add-sanity-query` skill) in `sanity/lib/queries.ts`
2. Create `app/(site)/<slug>/page.tsx` — Server Component, `revalidate = 300`
3. `generateMetadata` → `pageMetadata({ path: '/<slug>', ... })`
4. Render `WebPageSchema` + `BreadcrumbNav` + `Reveal`; `notFound()` if no data
5. Sanity doc with matching `slug` + `seo`; add to `sitemap.ts` if needed
6. `preflight` skill + `technical-seo-audit` if SEO-critical

Rules: `02-coding-standards` · `03-rtl-urdu` · `09-technical-seo-shared`

Reference implementation: `app/(site)/about/page.tsx` or `contact/page.tsx`
