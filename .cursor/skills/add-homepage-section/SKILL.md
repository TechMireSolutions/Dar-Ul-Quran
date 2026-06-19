---
name: add-homepage-section
description: Adds or edits a homepage section driven by Sanity homepageSettings or shared section components. Use when changing the landing page layout or hero.
---

# Add homepage section

Homepage: `app/(site)/page.tsx` · CMS: `homepageSettings` schema · helpers: `lib/homepage.ts`

## Steps

1. If CMS-driven: extend `sanity/schemaTypes/homepageSettings.ts` + `homepageSettingsQuery` + `HomepageSettingsDoc` type
2. If reusable block: add `components/sections/*` — use `TW_*` from `lib/tailwind.ts`
3. Below-fold carousels: `nextDynamic` import (see existing `CarouselSection` pattern)
4. LCP hero: keep `HeroSection` + `LcpImagePreload` — do not add competing above-fold images
5. Urdu copy in JSX or Sanity fields · `check-urdu` after UI strings change

## Performance

- Above-fold: Server Component, minimal JS
- Carousels / heavy UI: dynamic import with skeleton
- Section wrappers: `TW_CV_AUTO` when below fold

Skills: `tailwind-ui` · `optimize-lcp` · `check-urdu` · `preflight`

Rules: `06-tailwind.mdc` · `09-technical-seo-mobile.mdc`
