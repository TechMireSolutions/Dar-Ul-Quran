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
| Pure helpers | `lib/<name>.test.ts` | `paths.test.ts`, `navigation.test.ts` |
| Avoid | React components, pages, Sanity live fetch | manual QA + `preflight` |

## Existing coverage (extend, don’t reinvent)

`contact-schema` · `cache-tags` · `contact` · `paths` · `navigation` · `cmsPage` (pure resolve helpers) · `format-date` · `topicCluster` · `schemaHelpers` · `rate-limit` (in-memory path)

## Template

```ts
import { describe, expect, it } from 'vitest'
import { myHelper } from '@/lib/my-helper'

describe('myHelper', () => {
  it('handles the happy path', () => {
    expect(myHelper('input')).toBe('expected')
  })

  it('rejects invalid input', () => {
    expect(() => myHelper('')).toThrow()
  })
})
```

## Guidelines

- Prefer behavior assertions over implementation details
- Unique keys for stateful modules (`rate-limit` buckets)
- Restore `process.env` in `afterEach` when mutating env
- Locale formatters: compare to the same `Intl` options (or assert year), not brittle English month names
- New `lib/*.ts` helper shipped with API/UI → add colocated `*.test.ts` in the same PR

## CI

`.github/workflows/ci.yml` runs `npm run test` before build.

Ship: `preflight` includes `npm run test`.
