---
name: write-tests
description: Adds Vitest unit tests for lib helpers and Zod schemas in Dar Ul Quran. Use when adding validation, utilities, or before shipping API changes.
---

# Write tests

Config: `vitest.config.ts` · Run: `npm run test`  
Rule: **`17-security.mdc`** for API/Zod schemas

## Where to test

| Target | Path | Example |
|--------|------|---------|
| Zod schemas | `lib/<name>-schema.test.ts` | `contact-schema.test.ts` |
| Pure helpers | `lib/<name>.test.ts` | `cache-tags.test.ts` |
| Avoid | React components, pages | use manual QA + `preflight` |

## Template

```ts
import { describe, expect, it } from 'vitest'
import { mySchema } from '@/lib/my-schema'

describe('mySchema', () => {
  it('accepts valid input', () => {
    expect(mySchema.safeParse({ ... }).success).toBe(true)
  })
})
```

## CI

Tests run in `.github/workflows/ci.yml` before build.

Ship: `preflight` skill includes `npm run test`
