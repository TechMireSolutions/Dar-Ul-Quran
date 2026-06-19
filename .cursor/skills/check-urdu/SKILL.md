---
name: check-urdu
description: Runs the Urdu UI scanner and fixes English user-facing strings. Use after UI copy changes.
---

# Check Urdu

```bash
npm run check:urdu
```

Fix English in JSX, labels, placeholders, `aria-label`, `alt`, fallbacks.  
Allowlist: `CLAUDE.md` § Urdu · Rule: `03-rtl-urdu.mdc`. Suppress: `// urdu-ok`
