---
name: rtl-check
description: Audits files for RTL spacing, Urdu typography, and touch targets. Use before finishing layout work.
---

# RTL check

- `ml/mr/pl/pr` → `ms/me/ps/pe` · `left/right` insets → `start/end` where directional
- Chevrons / arrows → `rtl:rotate-180` (or `TW_CTA_ARROW`)
- Body `leading-[1.8]`+ · real Urdu test text · `npm run check:urdu`
- Touch ≥44px (`min-h-11` / `TW_TOUCH`) on links, buttons, form controls, nav rows
- Visible `:focus-visible` rings — do not strip with bare `outline-none`
- `prefers-reduced-motion` respected (Reveal / hover translate)

Rule: `03-rtl-urdu.mdc`. Report issues by line or `RTL-clean`.
