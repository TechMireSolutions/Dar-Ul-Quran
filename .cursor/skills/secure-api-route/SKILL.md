---
name: secure-api-route
description: Hardens Next.js App Router API routes with Zod validation, rate limiting, and optional Turnstile. Use when adding or editing app/api routes.
---

# Secure API route

Rule: **`17-security.mdc`** · Reference: `app/api/contact/route.ts`

## Pattern

1. **Schema** in `lib/<domain>-schema.ts` (Zod) — export type + `safeParse`
2. **Rate limit** — `rateLimitContact` or new helper in `lib/rate-limit.ts`
3. **Route** (`app/api/<name>/route.ts`):
   - Parse IP from `x-forwarded-for` / `x-real-ip` (first hop only)
   - Rate limit → 429 with `Retry-After`
   - `schema.safeParse(await req.json())` → 400 with generic message
   - Bot defenses: honeypot field and/or Turnstile verify
   - Secrets: length-safe compare when checking shared secrets
   - Business logic via `lib/` helpers (not inline)
   - Escape HTML in emails; generic 4xx/5xx — no stack traces
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

`npm run test` · `preflight` skill
