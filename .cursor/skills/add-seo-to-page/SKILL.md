---
name: add-seo-to-page
description: Adds or fixes pageMetadata and JSON-LD on an existing route. Use for SEO fixes without new pages, or when metadata/schema is missing or mismatched.
---

# Add SEO to page

Rules: `08-technical-seo-shared.mdc` · `07-content-seo.mdc` · `.antigravityrules`

## Steps

1. `pageMetadata({ title, description, path, settings, type? })` — `await params` on dynamic routes
2. Add `WebPageSchema` + type schema (`Article` / `Course` / `Service` / `ItemList`)
3. Leaf FAQ UI present → ensure FAQPage via `CourseSchema` / `ServiceSchema` (`buildFaqPageSchema`) — do not invent orphan FAQ JSON-LD
4. `BreadcrumbNav` if hierarchical · sitemap entry · `?q=` → `noIndex`
5. Match visible H1 / copy; Urdu `alt` on content images; `inLanguage: ur` in JSON-LD
6. Articles: pass `publishedTime` / `modifiedTime` / authors when CMS has them

## Verify

`technical-seo-audit` · Rich Results Test for schema changes · `preflight` if code shipped
