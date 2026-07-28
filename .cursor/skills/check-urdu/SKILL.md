---
name: check-urdu
description: Runs the Urdu UI scanner and fixes English user-facing strings. Use after UI copy changes, new pages, or when check:urdu fails in CI.
---

# Check Urdu

Rule: `03-rtl-urdu.mdc` · Allowlist: `CLAUDE.md` § Urdu-First Frontend Rule.

```bash
npm run check:urdu
```

## Fix checklist

```
[ ] JSX text / headings / CTAs
[ ] placeholders, labels, form messages
[ ] aria-label / alt (content images)
[ ] nav labels, badges, empty/error fallbacks
[ ] Re-run npm run check:urdu until clean
```

## Suppression (`// urdu-ok`)

Use **only** when the string is intentionally English (brand tokens, technical IDs, false positives on code). Prefer rewriting to Urdu when the string is user-visible.

## After copy fixes

If layout/typography changed → `rtl-check`  
Ship → `preflight`
