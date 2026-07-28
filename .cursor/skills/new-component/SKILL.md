---
name: new-component
description: Scaffolds a shared or route-private React component with correct folder, Tailwind, and RTL conventions. Use when adding UI to components/ or app/**/_components/.
---

# New component

Rules: `05-components.mdc` · `06-tailwind.mdc` · `15-naming.mdc` · `16-dry.mdc` · `03-rtl-urdu.mdc`

## Placement

| Scope | Path |
|-------|------|
| Shared | `components/{layout,ui,sections,content,seo}/` |
| Route-only | `app/(site)/**/_components/` — never imported elsewhere |

## Prefer existing shells

Before scaffolding: `PageHeroHeader` · `LeafHero` · `SectionHeaderRow` · `CenteredSectionHeader` · `ListingIndexShell` · `ContentCard` · `NestedChildListing`

## Scaffold

1. `type ComponentNameProps = { ... }` — default export matches filename
2. Server Component default; `"use client"` only if state/effects/events
3. Import `TW_*` from `lib/tailwind.ts` — no duplicated class strings  
   Layout: `TW_CONTAINER*` / `TW_SECTION_PY` · copy: `TW_PAGE_SUBTITLE` / `TW_BODY_MUTED` · cards: `TW_CARD_SURFACE*` / `TW_FEATURE_CARD*`
4. Interactive: `min-h-11` + visible `focus-visible` ring; one primary link per card
5. Urdu user-visible strings; `aria-label` / `alt` in Urdu
6. Logical spacing (`ms-*` / `me-*` / `start-*` / `end-*`); `shrink-0`

## SEO / layout

- JSON-LD → `components/seo/*` (props in `lib/types/schema.ts`)
- `role="menuitem"` only inside `role="menu"`

## Verify

`tailwind-ui` · `check-urdu` · `rtl-check` if nav/layout · `preflight`

Reference: `PageHeroHeader` · `LeafHero` · `SectionHeaderRow` · `CenteredSectionHeader` · `LeafCtaBanner`
