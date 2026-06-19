---
name: tailwind-ui
description: Applies pure Tailwind v4 patterns when editing UI, components, or globals.css. Use for styling refactors, new sections, or fixing non-Tailwind CSS.
---

# Tailwind UI

Rule: `06-tailwind.mdc` · Tokens: `tailwind.config.ts` · Shared strings: `lib/tailwind.ts`

## Before editing

1. Read `lib/tailwind.ts` — full `TW_*` catalog in `06-tailwind.mdc`
2. Check `tailwind.config.ts` for theme token (shadow, gradient, dot-grid)
3. Rich text → `RichTextBody` or `TW_RICH_TEXT_LG` / `TW_RICH_TEXT_SM`, not `prose-*`

## Layout patterns

| Need | Token / pattern |
|------|-----------------|
| Standard section | `<section className={TW_CONTAINER}>` or wrap inner div |
| Section + vertical rhythm | `` className={`bg-slate-50 ${TW_SECTION_PY}`} `` |
| Header bar inner | `TW_CONTAINER_HEADER` |
| Homepage hero content | `TW_CONTAINER_HERO` |
| Narrow column (FAQ, CTA, portable text) | `TW_CONTAINER_NARROW` |
| CMS prose body (about, donate) | `` `${TW_CONTAINER_NARROW} lg:px-8` `` inside `TW_PAGE_BODY` |
| Page hero block | `PageHeroHeader` uses `TW_PAGE_HERO_PADDING` + `TW_PAGE_SUBTITLE` |
| Article column | `` `${TW_CONTAINER_NARROW} lg:px-8 py-8 sm:py-12` `` |

## UI patterns

| Pattern | Use |
|---------|-----|
| Section kicker | `TW_EYEBROW` + single `TW_EYEBROW_LINE` |
| Section H2 | `TW_SECTION_TITLE` or `TW_SECTION_TITLE_COMPACT` |
| Page hero H1 | `TW_PAGE_TITLE` |
| Leaf dark hero H1 | `TW_HERO_TITLE` + `TW_LEAF_HERO_OVERLAY` |
| Article H1 / badge | `TW_ARTICLE_TITLE` / `TW_BADGE` |
| White card shell | `TW_CARD_SURFACE` (+ `overflow-hidden shadow-sm` if needed) |
| Gold CTA | `TW_GOLD_CTA` + `TW_CTA_ARROW` |
| Homepage hero CTAs | `TW_HERO_GOLD_CTA` / `TW_HERO_OUTLINE_CTA` |
| Leaf WhatsApp on dark bg | `TW_LEAF_WHATSAPP_CTA` |
| Error/404 copy | `TW_BODY_MUTED` + `TW_BTN_PRIMARY` / `TW_BTN_SECONDARY` |
| Contact form | `TW_FORM_PANEL` + `TW_FORM_INPUT` + `TW_FORM_SUBMIT` |
| Below-fold section | `TW_CV_AUTO` |
| Carousel track | `TW_SCROLLBAR_HIDE` + `snap-x snap-mandatory` |

## Leaf page checklist

`CourseLeafPage` / `ServiceLeafPage` / shared blocks:

- Sections: `` `bg-white ${TW_SECTION_PY}` `` (or `bg-slate-50` / `bg-dq-900`)
- Centered copy: `` `${TW_CONTAINER_NARROW} text-center` ``
- CTA footer: `LeafCtaBanner` (already uses `TW_SECTION_PY`, `TW_CONTAINER_NARROW`, `TW_LEAF_WHATSAPP_CTA`)
- FAQ: `FaqAccordion` · steps: `HowItWorksSection` · rich text: `PortableTextSection`
- Topic cluster: `LeafTopicClusterBlock` — do not duplicate `TW_EYEBROW_LINE`

Reference: `components/content/LeafCtaBanner.tsx`, `components/ui/PageHeroHeader.tsx`

## New repeated pattern (2+ uses)

1. Add token to `tailwind.config.ts` if theme-level (color, shadow, backgroundImage)
2. Export `TW_*` string from `lib/tailwind.ts` with JSDoc comment
3. Replace duplicates; document in `06-tailwind.mdc` token table if widely used
4. `npm run lint && npm run check:urdu` (+ `build` if wide refactor)

## globals.css changes

- Custom utilities → `@utility` (v4), not loose classes
- Component layer → `@layer components` (e.g. `.rich-text`)
- Keep `.rv-*`, `.hero-item`, skip-link, reduced-motion as-is (JS/CSS coordination)

## Verify

```bash
npm run lint && npm run check:urdu
```

RTL spacing → `rtl-check` skill. Deploy-bound → `preflight` + `build`.
