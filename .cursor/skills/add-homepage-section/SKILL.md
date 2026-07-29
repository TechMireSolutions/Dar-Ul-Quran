---
name: add-homepage-section
description: Adds or edits a homepage section driven by Sanity homepageSettings or shared section components. Use when changing the landing page layout or hero.
---

# Add homepage section

Homepage: `app/(site)/page.tsx` · CMS: `homepageSettings` schema · helpers: `lib/homepage.ts`

## Steps

1. If CMS-driven: extend `sanity/schemaTypes/homepageSettings.ts` + `homepageSettingsQuery` + `HomepageSettingsDoc` type
2. If reusable block: add `components/sections/*` — use `TW_*` from `lib/tailwind.ts`  
   Hero: `TW_CONTAINER_HERO`, `TW_HERO_GOLD_CTA`, `TW_HERO_OUTLINE_CTA`  
   Section chrome: `TW_CONTAINER` + `SectionHeaderRow` (eyebrow/title/view-all) or `CenteredSectionHeader`  
   Cards: `TW_CARD_GRID` + `ContentCard` (single primary link)
3. Below-fold carousels: `nextDynamic` import (see existing `CarouselSection` pattern)
4. LCP hero: keep `HeroSection` + `LcpImagePreload` — do not add competing above-fold images
5. Nastaliq: titles `leading-heading` · body `leading-urdu` · `tracking-normal` (`03-rtl-urdu.mdc`)
6. Urdu copy in JSX or Sanity fields · `check-urdu` after UI strings change
7. One job per section — avoid stuffing stats/cards into the hero viewport
8. Mobile-first: `TW_CARD_GRID` / containers from rule `18`; touch ≥44px from `19`

## Performance

- Above-fold: Server Component, minimal JS
- Carousels / heavy UI: dynamic import with skeleton / Suspense
- Section wrappers: `TW_CV_AUTO` when below fold
- Interactive: `min-h-11` + `focus-visible` · `motion-reduce` on hover lift
- Fluid media + explicit `sizes`; no fixed-width section shells

## Verify

`tailwind-ui` · `optimize-lcp` · `check-urdu` · `rtl-check` (375 · 768 · 1440) · `preflight`

Rules: `05-components.mdc` · `06-tailwind.mdc` · `03-rtl-urdu.mdc` · `09-technical-seo-mobile.mdc` · `18-mobile-first-responsive.mdc` · `19-ui-ux.mdc`
