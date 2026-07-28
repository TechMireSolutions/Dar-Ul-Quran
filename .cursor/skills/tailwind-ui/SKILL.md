---
name: tailwind-ui
description: Applies pure Tailwind v4 patterns when editing UI, components, or globals.css. Use for styling refactors, new sections, or fixing non-Tailwind CSS.
---

# Tailwind UI

Rule: `06-tailwind.mdc` · Tokens: `tailwind.config.ts` · Shared strings: `lib/tailwind.ts`

## Before editing

1. Read `lib/tailwind.ts` — full `TW_*` catalog in `06-tailwind.mdc`
2. Check `tailwind.config.ts` for theme token (shadow, gradient, dot-grid)
3. Rich text → `RichTextBody` or `TW_RICH_TEXT_*`, not `prose-*`
4. Prefer shared shells: `PageHeroHeader` · `LeafHero` · `SectionHeaderRow` · `CenteredSectionHeader` · `ListingIndexShell`

## Layout patterns

| Need | Token / pattern |
|------|-----------------|
| Standard section | `TW_CONTAINER` (+ optional `TW_SECTION_PY` / `TW_CV_AUTO`) |
| Wide / prose / pricing | `TW_CONTAINER_WIDE` · `TW_CONTAINER_PROSE` · `TW_CONTAINER_PRICING` |
| Narrow column | `TW_CONTAINER_NARROW` (+ `lg:px-8` for CMS prose) |
| CMS page body | `TW_PAGE_BODY` |
| Card grids | `TW_CARD_GRID` · forms `TW_GRID_2` |
| Page hero | `PageHeroHeader` |
| Leaf dark hero | `LeafHero` (`TW_CONTAINER_LEAF_HERO`, chips, subtitle/body) |
| Homepage header row | `SectionHeaderRow` |
| Centered section title | `CenteredSectionHeader` |

## UI patterns

| Pattern | Use |
|---------|-----|
| Eyebrow | `TW_EYEBROW` + one `TW_EYEBROW_LINE` |
| Titles | `TW_SECTION_TITLE*` · `TW_PAGE_TITLE` · `TW_HERO_TITLE` |
| Muted copy | `TW_PAGE_SUBTITLE` · `TW_BODY_MUTED` · `TW_FEATURE_CARD_DESC` |
| Cards | `TW_CARD_SURFACE*` · `TW_FEATURE_CARD*` · `ContentCard` (single link) |
| CTAs | `TW_GOLD_CTA*` · `TW_OUTLINE_PILL` · `TW_CTA_ARROW` |
| Forms | `TW_FORM_*` · touch ≥ `min-h-11` |
| Nav / footer | `TW_NAV_*` · `TW_FOOTER_*` · `TW_MOBILE_*` |
| Carousel controls | `TW_CAROUSEL_NAV_BTN*` |

## Leaf page checklist

- Hero: `LeafHero` (not duplicated markup)
- Sections: `` `bg-* ${TW_SECTION_PY}` `` + `CenteredSectionHeader` where centered
- Shared: `HowItWorksSection` · `FaqAccordion` · `LeafCtaBanner` · `PortableTextSection` · `LeafTopicClusterBlock`

## New repeated pattern (2+ uses)

1. Theme-level → `tailwind.config.ts`
2. Export `TW_*` + JSDoc in `lib/tailwind.ts`
3. Document in `06-tailwind.mdc` if widely used
4. `npm run lint && npm run check:urdu`

## globals.css

- Custom utilities → `@utility` · components → `@layer components`
- Keep `.rv-*` + `scripting: none` / mobile / reduced-motion visibility

## Verify

```bash
npm run lint && npm run check:urdu
```

RTL → `rtl-check` · ship → `preflight`.
