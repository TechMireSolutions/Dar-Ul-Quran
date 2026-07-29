---
name: preflight
description: Runs lint, Urdu check, Vitest, and optional build before shipping. Use before commits, deploys, PRs, or when asked to verify the project is ready to ship.
---

# Preflight

Stop on first failure; fix before continuing.

```bash
npm run lint && npm run check:urdu && npm run test
# npm run build  — only if deploy / bundling / next.config / deps changed
```

## Route by change type

| Change | Also run |
|--------|----------|
| UI / CSS / typography / layout | `tailwind-ui` · `rtl-check` (375 · 768 · 1440) |
| SEO / metadata | `technical-seo-audit` |
| LCP / hero | `optimize-lcp` |
| API / Zod / lib helpers | `write-tests` · `secure-api-route` if new API |
| New shared UI | Prefer shells in `05-components.mdc`; follow `18` + `19` |
| Deploy / chunks | `deploy` · `fix-chunk-mime` if MIME/404 |

## Pass criteria

```
[ ] lint clean
[ ] check:urdu clean
[ ] test green
[ ] build green (if required above)
[ ] UI changes: rtl-check responsive items pass (no horizontal scroll @375, touch 44px)
```

Commit / push only when the user asks. Never commit secrets or `.env`.
