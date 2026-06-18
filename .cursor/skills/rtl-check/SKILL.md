---
name: rtl-check
description: Audits files for RTL spacing, Urdu typography, and touch targets. Use before finishing layout work.
---

# RTL check

- `ml/mr/pl/pr` → `ms/me/ps/pe` · chevrons → `rtl:rotate-180`
- Body `leading-[1.8]`+ · real Urdu test text · `npm run check:urdu`
- Touch ≥44px · reduced motion

Rule: `03-rtl-urdu.mdc`. Report issues by line or `RTL-clean`.
