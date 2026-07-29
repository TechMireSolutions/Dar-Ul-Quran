---
name: rtl-check
description: Audits RTL spacing, Nastaliq type, Urdu copy, mobile-first layout, touch targets, and viewport checks. Use before finishing layout, typography, or responsive UI work.
---

# RTL / responsive check

Rules: `03-rtl-urdu.mdc` · `18-mobile-first-responsive.mdc` · `19-ui-ux.mdc`

Copy this checklist; mark each item:

```
[ ] Logical spacing (ms/me/ps/pe/start/end) — no ml/mr for directional UI
[ ] Arrows/chevrons use rtl:rotate-180 or TW_CTA_ARROW
[ ] Body/paragraphs: leading-urdu or leading-relaxed (≥1.9)
[ ] Multi-line titles: leading-heading / leading-urdu-display (not leading-none)
[ ] tracking-normal only — no tracking-tight/wide/negative on Urdu
[ ] No Latin uppercase+wide tracking on Urdu eyebrows/badges
[ ] Phone/email/URL islands use dir="ltr" or <bdi>
[ ] Mobile-first (base → sm/md/lg) — no desktop-first max-* grids
[ ] Fluid layout — no fixed w-[1200px]-style shells; use TW_CONTAINER*
[ ] No horizontal scroll at 375px; text not clipped
[ ] Images/media fluid (max-w-full / sizes) 
[ ] Wide tables: overflow-x-auto or stacked/cards on mobile
[ ] Nav below `lg` uses drawer (HeaderMobileMenu), not cramped horizontal links
[ ] Touch ≥44×44px (min-h-11); gap between targets
[ ] Forms usable on phone (full-width, inputMode)
[ ] Visible :focus-visible rings
[ ] motion-reduce respected on hover transforms
[ ] Sticky/floating UI does not cover CTAs or form fields
[ ] Spot-check 375 · 768 · 1440
[ ] npm run check:urdu passes
```

Report findings by file:line, or reply **`RTL-clean`** if all pass.
