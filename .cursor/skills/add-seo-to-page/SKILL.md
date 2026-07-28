---
name: add-seo-to-page
description: Adds or fixes pageMetadata and JSON-LD on an existing route. Use for SEO fixes without new pages, or when metadata/schema is missing or mismatched.
---

# Add SEO to page

Rules: `08-technical-seo-shared.mdc` · `07-content-seo.mdc` · `16-dry.mdc` · `.antigravityrules`

## Steps

1. `pageMetadata({ title, description, path, settings, type? })` — use `PATHS.<key>` from `lib/paths.ts` when known; `await params` on dynamic routes
2. Description fallbacks: `DEFAULT_SITE_DESCRIPTION` / `DEFAULT_HOME_DESCRIPTION`; site name UI → `resolveSiteNameUrdu` / `DEFAULT_SITE_NAME_URDU` (`lib/seo.ts`)
3. Add `WebPageSchema` + type schema (`Article` / `Course` / `Service` / `ItemList`)
4. Leaf FAQ UI present → ensure FAQPage via `CourseSchema` / `ServiceSchema` (`buildFaqPageSchema`) — do not invent orphan FAQ JSON-LD
5. `BreadcrumbNav` if hierarchical · sitemap entry · `?q=` → `noIndex`
6. Match visible H1 / copy; Urdu `alt` on content images; `inLanguage: ur` in JSON-LD
7. Articles: pass `publishedTime` / `modifiedTime` / authors when CMS has them

## Verify

`technical-seo-audit` · Rich Results Test for schema changes · `preflight` if code shipped
