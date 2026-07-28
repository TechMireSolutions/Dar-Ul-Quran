---
name: tailwind-ui
description: Applies pure Tailwind v4 and Nastaliq-safe typography when editing UI, components, or globals.css. Use for styling refactors, new sections, or fixing non-Tailwind CSS.
---

# Tailwind UI

Rules: `06-tailwind.mdc` · `03-rtl-urdu.mdc` · `18-mobile-first-responsive.mdc` · `19-ui-ux.mdc` · Tokens: `tailwind.config.ts` · `lib/tailwind.ts`

## Before editing

1. Read `lib/tailwind.ts` — catalog in `06-tailwind.mdc`
2. Prefer shells: `PageHeroHeader` · `LeafHero` · `SectionHeaderRow` · `CenteredSectionHeader` · `ListingIndexShell` · `ContentCard`
3. Rich text → `RichTextBody` / `TW_RICH_TEXT_*`, not `prose-*`
4. Mobile-first: base = phone; enhance with `sm:`/`md:`/`lg:` — see rule `18`

## Layout

| Need | Pattern |
|------|---------|
| Section | `TW_CONTAINER` + `TW_SECTION_PY` / `TW_CV_AUTO` |
| Wide / prose / pricing | `TW_CONTAINER_WIDE` · `_PROSE` · `_PRICING` |
| CMS body | `TW_PAGE_BODY` |
| Grids | `TW_CARD_GRID` · `TW_GRID_2` |

## Nastaliq typography (required)

| Role | Classes |
|------|---------|
| Body / muted | `leading-urdu` or `leading-relaxed` (≥1.9) |
| Titles | `leading-heading` / `leading-urdu-display` + `tracking-normal` |
| Compact titles | `leading-urdu-tight` |
| Never on Urdu | `tracking-tight` · `tracking-wide` · `tracking-[-*]` · Latin `uppercase` + wide tracking |

Theme remaps: `tight`/`snug`/`relaxed` are already Nastaliq-safe in `tailwind.config.ts`.

## UI patterns

Eyebrow → `TW_EYEBROW` + one `TW_EYEBROW_LINE`  
CTAs → `TW_GOLD_CTA*` + `motion-reduce:hover:translate-y-0`  
Forms/nav → `min-h-11` + `focus-visible` ring  
Cards → single primary link (`ContentCard`)  
UX density / touch / forms → rule `19-ui-ux.mdc`

## Leaf pages

`LeafHero` · `CenteredSectionHeader` · `HowItWorksSection` · `FaqAccordion` · `LeafCtaBanner`

## New repeated pattern (2+)

1. Theme → `tailwind.config.ts`  
2. `TW_*` + JSDoc in `lib/tailwind.ts`  
3. Document in `06-tailwind.mdc` if widely used  
4. `npm run lint && npm run check:urdu`

## Verify

```bash
npm run lint && npm run check:urdu
```

Then `rtl-check` · ship with `preflight`.

## Anti-patterns

- `prose-*` / `@tailwindcss/typography`
- Public-site `dark:` theme
- Duplicating `TW_*` class strings instead of importing
- Latin tracking on Urdu text
