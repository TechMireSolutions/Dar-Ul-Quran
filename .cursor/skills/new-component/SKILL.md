---
name: new-component
description: Scaffolds a shared or route-private React component with correct folder, Tailwind, mobile-first layout, Nastaliq, and RTL conventions. Use when adding UI to components/ or app/**/_components/.
---

# New component

Rules: `05-components.mdc` · `06-tailwind.mdc` · `15-naming.mdc` · `16-dry.mdc` · `03-rtl-urdu.mdc` · `18-mobile-first-responsive.mdc` · `19-ui-ux.mdc`

## Placement

| Scope | Path |
|-------|------|
| Shared | `components/{layout,ui,sections,content,seo}/` |
| Route-only | `app/(site)/**/_components/` — never imported elsewhere |

## Prefer existing shells

`PageHeroHeader` · `LeafHero` · `SectionHeaderRow` · `CenteredSectionHeader` · `ListingIndexShell` · `ContentCard` · `NestedChildListing` · `RichTextBody` · `BrandLogo` · `Footer` / `FooterParts`

Extend an existing shell before creating a parallel component. Do not fork logo or footer chrome — reuse `BrandLogo`, `buildFooterModel` / `PATHS` / `lib/contact` helpers (`16-dry.mdc`).

## Scaffold

1. `type ComponentNameProps` — default export = filename  
2. Server Component default; `"use client"` only if needed  
3. React Compiler on — skip default `useMemo`/`useCallback`  
4. `TW_*` from `lib/tailwind.ts` — no duplicated class strings  
5. **Mobile-first** layout (`18`) — base phone → `sm:`/`md:`/`lg:`; fluid `TW_CONTAINER*` (no fixed px widths)  
6. Nastaliq: `leading-urdu*` / `tracking-normal` on text (`03-rtl-urdu.mdc`)  
7. Interactive: ≥44×44px (`min-h-11`) + `focus-visible`; **one** primary link per card  
8. Urdu copy + `aria-label` / content `alt` in Urdu; decorative `alt=""`  
9. Logical spacing; `shrink-0`; `motion-reduce` on hover translate  
10. Images: `sizes` + fluid / lazy below fold  
11. Phone/email/URL → `dir="ltr"` / `<bdi>`  
12. Wide tables → `overflow-x-auto` or card stack on mobile (`19`)

## Verify

`tailwind-ui` · `check-urdu` · `rtl-check` (375 · 768 · 1440) · `preflight`

Reference: `PageHeroHeader` · `LeafHero` · `SectionHeaderRow` · `CenteredSectionHeader` · `LeafCtaBanner`
