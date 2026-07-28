---
name: preflight
description: Runs lint, Urdu check, Vitest, and optional build before shipping. Use before commits, deploys, or PRs.
---

# Preflight

```bash
npm run lint && npm run check:urdu && npm run test
# npm run build  — only if deploy / bundling / next.config / deps changed
```

## Route by change type

| Change | Also run |
|--------|----------|
| UI / CSS / typography | `rtl-check` · `tailwind-ui` patterns |
| SEO / metadata | `technical-seo-audit` |
| LCP / hero | `optimize-lcp` |
| API / Zod / lib helpers | `write-tests` · `secure-api-route` if new API |
| New shared UI | Prefer shells in `05-components.mdc` before scaffolding |
| Deploy / chunks | `deploy` · `fix-chunk-mime` if MIME/404 |

Commit / push only when the user asks. Never commit secrets or `.env`.
