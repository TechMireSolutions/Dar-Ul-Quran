---
name: preflight
description: Runs lint, Urdu check, and optional build before shipping Dar Ul Quran changes. Use before commits, deploys, or PRs.
---

# Preflight

```bash
npm run lint && npm run check:urdu
# npm run build  — only if build/deploy/bundling changed
```

SEO changes → `technical-seo-audit` skill. Layout → `rtl-check` skill.  
Commit only when user asks.
