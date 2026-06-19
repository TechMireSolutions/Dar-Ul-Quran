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

## Scaffold

1. `type ComponentNameProps = { ... }` — default export matches filename
2. Server Component default; `"use client"` only if state/effects/events
3. Import `TW_*` from `lib/tailwind.ts` — no duplicated class strings  
   Layout: `TW_CONTAINER` / `TW_CONTAINER_NARROW` / `TW_SECTION_PY` · copy: `TW_PAGE_SUBTITLE` / `TW_BODY_MUTED` · cards: `TW_CARD_SURFACE`
4. Urdu user-visible strings; `aria-label` / `alt` in Urdu
5. `ms-*` / `me-*` for spacing; `shrink-0` not `flex-shrink-0`

## SEO / layout components

- JSON-LD → `components/seo/*` (props typed in `lib/types/schema.ts`)
- `role="menuitem"` only inside `role="menu"`

## Verify

`tailwind-ui` skill patterns · `check-urdu` · `rtl-check` if nav/layout · `preflight`

Reference: `components/ui/PageHeroHeader.tsx`, `components/content/LeafCtaBanner.tsx`
