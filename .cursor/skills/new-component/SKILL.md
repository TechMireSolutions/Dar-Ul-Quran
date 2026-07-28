---
name: new-component
description: Scaffolds a shared or route-private React component with correct folder, Tailwind, Nastaliq, and RTL conventions. Use when adding UI to components/ or app/**/_components/.
---

# New component

Rules: `05-components.mdc` · `06-tailwind.mdc` · `15-naming.mdc` · `16-dry.mdc` · `03-rtl-urdu.mdc` · `18-mobile-first-responsive.mdc` · `19-ui-ux.mdc`

## Placement

| Scope | Path |
|-------|------|
| Shared | `components/{layout,ui,sections,content,seo}/` |
| Route-only | `app/(site)/**/_components/` — never imported elsewhere |

## Prefer existing shells

`PageHeroHeader` · `LeafHero` · `SectionHeaderRow` · `CenteredSectionHeader` · `ListingIndexShell` · `ContentCard` · `NestedChildListing` · `RichTextBody`

Extend an existing shell before creating a parallel component.

## Scaffold

1. `type ComponentNameProps` — default export = filename  
2. Server Component default; `"use client"` only if needed  
3. React Compiler on — skip default `useMemo`/`useCallback`  
4. `TW_*` from `lib/tailwind.ts` — no duplicated class strings  
5. Nastaliq: `leading-urdu*` / `tracking-normal` on text (see `03-rtl-urdu.mdc`)  
6. Interactive: `min-h-11` + `focus-visible` ring; **one** primary link per card  
7. Urdu copy + `aria-label` / content `alt` in Urdu; decorative `alt=""`  
8. Logical spacing; `shrink-0`; `motion-reduce` on hover translate  
9. Images: `sizes` + lazy below fold  
10. Phone/email/URL → `dir="ltr"` / `<bdi>`

## Verify

`tailwind-ui` · `check-urdu` · `rtl-check` if nav/layout/type · `preflight`

Reference: `PageHeroHeader` · `LeafHero` · `SectionHeaderRow` · `CenteredSectionHeader` · `LeafCtaBanner`
