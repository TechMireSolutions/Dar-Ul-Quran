---
name: preflight
description: Runs lint, Urdu check, Vitest, and optional build before shipping. Use before commits, deploys, or PRs.
---

# Preflight

```bash
npm run lint && npm run check:urdu && npm run test
# npm run build  — only if build/deploy/bundling changed
```

SEO changes → `technical-seo-audit` skill. Layout → `rtl-check` skill. UI → `tailwind-ui` skill.  
API/schema changes → `write-tests` skill. New API → `secure-api-route` skill.  
Commit only when user asks.
