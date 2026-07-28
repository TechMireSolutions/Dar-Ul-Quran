---
name: rtl-check
description: Audits files for RTL spacing, Nastaliq line-height/tracking, Urdu copy, LTR islands, and touch targets. Use before finishing layout or typography work.
---

# RTL / Nastaliq check

Rule: `03-rtl-urdu.mdc`

Copy this checklist; mark each item:

```
[ ] Logical spacing (ms/me/ps/pe/start/end) — no ml/mr for directional UI
[ ] Arrows/chevrons use rtl:rotate-180 or TW_CTA_ARROW
[ ] Body/paragraphs: leading-urdu or leading-relaxed (≥1.9)
[ ] Multi-line titles: leading-heading / leading-urdu-display (not leading-none)
[ ] tracking-normal only — no tracking-tight/wide/negative on Urdu
[ ] No Latin uppercase+wide tracking on Urdu eyebrows/badges
[ ] Phone/email/URL islands use dir="ltr" or <bdi>
[ ] Touch ≥44px (min-h-11) on controls
[ ] Visible :focus-visible rings
[ ] motion-reduce respected on hover transforms
[ ] npm run check:urdu passes
```

Report findings by file:line, or reply **`RTL-clean`** if all pass.
