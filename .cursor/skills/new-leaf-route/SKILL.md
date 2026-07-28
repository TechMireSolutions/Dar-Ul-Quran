---
name: new-leaf-route
description: Scaffolds a nested CMS catch-all route for courses or services with breadcrumbs, static params, and JSON-LD. Use when adding hierarchical Sanity content sections.
---

# New leaf route

For nested CMS trees (courses, services). Simple flat pages → `new-page` skill.

## Steps

1. Schema + queries + fetchers (`new-sanity-schema` → `add-sanity-query` → `add-fetcher`)
2. `app/(site)/<section>/[...slug]/page.tsx` — `revalidate = 300`
3. `generateStaticParams` → `getAll*Paths()` + `staticParamsFromPaths` from `lib/paths.ts`
4. `generateMetadata` → `await params` · leaf slug = `slug[slug.length - 1]` · `pageMetadata({ path: \`${SECTION}/${slug.join('/')}\` })`
5. `ancestryFromParent` + `buildBreadcrumbNavItems` + `BreadcrumbNav`
6. Type schema: `CourseSchema` or `ServiceSchema` (includes FAQPage when FAQ present) · `ItemListSchema` for index children
7. Route-private UI in `_components/*LeafPage.tsx` · parents with children → `NestedChildListing`  
   Styling: `LeafHero` · `CenteredSectionHeader` · `TW_SECTION_PY` · `TW_CONTAINER_WIDE` / `_NARROW` · `LeafCtaBanner` · `HowItWorksSection` · `FaqAccordion` — see `tailwind-ui`
8. `sitemap.ts` paths via `coursePath` / `servicePath`
9. Webhook path map for the `_type` (`setup-revalidation`)

## Verify

`add-seo-to-page` · `technical-seo-audit` · `check-urdu` · `preflight`

Rules: `04-sanity.mdc` · `05-components.mdc` · `06-tailwind.mdc` · `08-technical-seo-shared.mdc`

Reference: `app/(site)/online-courses/[...slug]/` · `services/[...slug]/`
