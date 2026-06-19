---
name: add-seo-to-page
description: Adds or fixes pageMetadata and JSON-LD on an existing route. Use for SEO fixes without new pages.
---

# Add SEO to page

1. `pageMetadata({ title, description, path, settings, type? })` — `await params` on dynamic routes
2. Add `WebPageSchema` + type schema (`Article`/`Course`/`Service`/`ItemList`)
3. `BreadcrumbNav` if hierarchical · sitemap entry · `?q=` → `noIndex`

Rules: `08-technical-seo-shared.mdc` · `07-content-seo.mdc` · `.antigravityrules`
