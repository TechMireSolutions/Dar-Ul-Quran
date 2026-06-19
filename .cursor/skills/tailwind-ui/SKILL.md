---
name: tailwind-ui
description: Applies pure Tailwind v4 patterns when editing UI, components, or globals.css. Use for styling refactors, new sections, or fixing non-Tailwind CSS.
---

# Tailwind UI

Rule: `06-tailwind.mdc` · Tokens: `tailwind.config.ts` · Shared strings: `lib/tailwind.ts`

## Before editing

1. Check `lib/tailwind.ts` for existing `TW_*` constant
2. Check `tailwind.config.ts` for theme token (shadow, gradient, dot-grid)
3. Rich text wrapper → `components/content/RichTextBody.tsx` or `TW_RICH_TEXT_LG` / `TW_RICH_TEXT_SM`, not `prose-*`

## Adding UI

| Pattern | Use |
|---------|-----|
| Page container | `TW_CONTAINER` |
| CMS page shell | `TW_PAGE_BODY` |
| Section kicker | `TW_EYEBROW` + `TW_EYEBROW_LINE` |
| Section H2 | `TW_SECTION_TITLE` or `TW_SECTION_TITLE_COMPACT` |
| Page hero H1 | `TW_PAGE_TITLE` |
| Gold CTA | `TW_GOLD_CTA` + `TW_CTA_ARROW` |
| Primary/secondary buttons | `TW_BTN_PRIMARY` / `TW_BTN_SECONDARY` |
| Leaf hero H1 | `TW_HERO_TITLE` |
| Article H1 / badge | `TW_ARTICLE_TITLE` / `TW_BADGE` |
| Below-fold section | `TW_CV_AUTO` |
| Carousel track | `TW_SCROLLBAR_HIDE` + `snap-x snap-mandatory` |

## New repeated pattern (2+ uses)

1. Add token to `tailwind.config.ts` if theme-level (color, shadow, backgroundImage)
2. Export `TW_*` string from `lib/tailwind.ts`
3. Replace duplicates in components/pages

## globals.css changes

- Custom utilities → `@utility` (v4), not loose classes
- Component layer → `@layer components` (e.g. `.rich-text`)
- Keep `.rv-*`, `.hero-item`, skip-link, reduced-motion as-is (JS/CSS coordination)

## Verify

```bash
npm run lint && npm run check:urdu
```

RTL spacing → `rtl-check` skill. Deploy-bound → `preflight` + `build`.
