---
name: write-tests
description: Adds Vitest unit tests for lib helpers and Zod schemas in Dar Ul Quran. Use when adding validation, utilities, paths, formatting, or before shipping API changes.
---

# Write tests

Config: `vitest.config.ts` (`include: lib/**/*.test.ts`) · Run: `npm run test`  
Security schemas → **`17-security.mdc`**

## Where to test

| Target | Path | Example |
|--------|------|---------|
| Zod schemas | `lib/<name>-schema.test.ts` | `contact-schema.test.ts` |
| Pure helpers | `lib/<name>.test.ts` | `paths.test.ts` |
| Avoid | React/pages/live Sanity | manual QA + `preflight` |

## Existing coverage (extend)

`contact-schema` · `cache-tags` · `contact` · `footer` · `seo` · `paths` · `navigation` · `cmsPage` · `format-date` · `topicCluster` · `schemaHelpers` · `rate-limit`

Footer / SEO helpers: cover `buildFooterModel` / `FOOTER_COPY` fallbacks and `resolveSiteNameUrdu` / `DEFAULT_*` in colocated `lib/*.test.ts`.

## Guidelines

- Behavior-first assertions; table-driven cases for enums/paths  
- Cover happy path **and** rejection/edge cases  
- Unique keys for stateful modules; restore `process.env` in `afterEach`  
- Locale: assert against same `Intl` options (or year), not English month names  
- New `lib/*.ts` shipped with API/UI → colocated `*.test.ts` in the same PR  
- Prefer `safeParse` for Zod; assert `success` and key `data` fields when useful  
- `describe('moduleName')` matching the source module (`15-naming.mdc`)  
- Do not add React/component tests here — Vitest scope is `lib/**/*.test.ts` only  

## Template

```ts
import { describe, expect, it } from 'vitest'
import { myHelper } from '@/lib/my-helper'

describe('myHelper', () => {
  it('handles the happy path', () => {
    expect(myHelper('input')).toBe('expected')
  })

  it('rejects invalid input', () => {
    expect(myHelper('')).toBeNull()
  })
})
```

CI: `.github/workflows/ci.yml` · Ship: `preflight`.
