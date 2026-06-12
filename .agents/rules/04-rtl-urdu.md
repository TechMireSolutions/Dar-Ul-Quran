# RTL & Urdu Rules

The entire site is right-to-left. Breaking RTL is a critical regression.

## HTML Root

```html
<html lang="ur" dir="rtl">
```

Never override `dir="rtl"` without explicit justification. Use `dir="ltr"` only for code blocks, URLs, or numeric-only content that must read left-to-right.

## Spacing — Use Logical Properties

| Wrong (physical) | Correct (logical) |
|-----------------|-----------------|
| `ml-4` / `mr-4` | `ms-4` / `me-4` |
| `pl-4` / `pr-4` | `ps-4` / `pe-4` |
| `left-0` / `right-0` | `start-0` / `end-0` |
| `text-left` / `text-right` | `text-start` / `text-end` |

## Flexbox

- `flex-row` renders RTL visually reversed — items flow right-to-left
- For intentional LTR visual order inside RTL: use `flex-row-reverse` or `rtl:flex-row-reverse`
- Navigation and card lists: test with real Urdu labels to catch ordering bugs

## Directional Icons

- Chevrons, arrows, and "back" icons need `rtl:rotate-180`
- WhatsApp button and external link icons: verify visual direction
- Use `rtl:scale-x-[-1]` for horizontal flips

## Typography

- Font: `font-urdu` class → Noto Nastaliq Urdu (loaded in root layout)
- Body text: `leading-[1.8]` minimum — Urdu glyphs have tall ascenders/descenders
- Display headings: `leading-[1.2]` to `leading-[1.35]`
- Font features in `globals.css`: `font-feature-settings: "calt" 1, "liga" 1` for ligatures
- Always pair with system fallback font stack

## Testing Requirement

**Always test with real Urdu text.** Latin placeholder text (Lorem Ipsum) hides:
- Glyph overflow and line-height issues
- RTL text alignment bugs
- Font ligature failures
- Bidirectional number rendering

## Tailwind RTL Utilities

```
rtl:ml-auto      → apply only in RTL
rtl:rotate-180   → flip directional icons
rtl:space-x-reverse  → reverse space-x gap direction
rtl:flex-row-reverse → LTR visual order inside RTL container
```
