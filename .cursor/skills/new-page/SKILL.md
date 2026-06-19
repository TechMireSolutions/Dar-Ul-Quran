---
name: new-page
description: Scaffolds a CMS public page under app/(site)/ with metadata and JSON-LD. Use when adding a route or section.
---

# New page

1. Add query (`add-sanity-query` skill) + fetcher (`add-fetcher` skill)
2. Create `app/(site)/<slug>/page.tsx` — Server Component, `revalidate = 300`
3. `generateMetadata` → `pageMetadata({ path: '/<slug>', ... })`
4. Render `WebPageSchema` + `BreadcrumbNav` + `Reveal`; `notFound()` if no data
5. Sanity doc with matching `slug` + `seo`; add to `sitemap.ts` if needed
6. `preflight` skill + `technical-seo-audit` if SEO-critical

Rules: `02-coding-standards.mdc` · `03-rtl-urdu.mdc` · `06-tailwind.mdc` · `08-technical-seo-shared.mdc` · `14-file-structure.mdc`

Portable Text pages → `components/content/RichTextBody.tsx`

Reference implementation: `app/(site)/about/page.tsx` or `contact/page.tsx`
