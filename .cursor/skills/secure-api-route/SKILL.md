---
name: secure-api-route
description: Hardens Next.js App Router API routes with Zod validation, rate limiting, and optional Turnstile. Use when adding or editing app/api routes or contact/revalidate handlers.
---

# Secure API route

Rule: **`17-security.mdc`** · Reference: `app/api/contact/route.ts`

## Pattern

1. **Schema** in `lib/<domain>-schema.ts` (Zod) — export type + `safeParse`
2. **Rate limit** — `rateLimitContact` or new helper in `lib/rate-limit.ts`
3. **Route** (`app/api/<name>/route.ts`):
   - Parse IP from first hop of `x-forwarded-for` / `x-real-ip`
   - Rate limit → 429 with `Retry-After`
   - `schema.safeParse(await req.json())` → 400 with generic message
   - Bot defenses: honeypot field and/or Turnstile verify
   - Secrets: length-safe compare when checking shared secrets; **fail closed** if secret env missing
   - Business logic via `lib/` helpers (not inline)
   - Escape HTML in emails; generic 4xx/5xx — no stack traces
   - No CORS `*` — same-origin only
4. **Tests** — `lib/<domain>-schema.test.ts` (Vitest) — happy + reject paths
5. **Env** — document in `.env.example` (never commit values)

## Contact form (existing)

| File | Role |
|------|------|
| `lib/contact-schema.ts` | Zod + purpose enum |
| `lib/rate-limit.ts` | Upstash or in-memory |
| `lib/turnstile.ts` | Cloudflare verify |
| `lib/contact-notify.ts` | Resend → SMTP fallback |
| `components/ui/TurnstileField.tsx` | Client widget (lazy / intersect) |

## Verify

```
[ ] Zod reject paths tested
[ ] npm run test
[ ] preflight
```
