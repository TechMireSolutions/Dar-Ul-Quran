# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| `main` (production deploy) | Yes |

## Reporting a vulnerability

Please **do not** open public GitHub issues for security problems.

Email security concerns to the maintainers via the contact address on [darulquran.pk/contact](https://darulquran.pk/contact) with subject **Security Report**.

Include:

- Description of the issue
- Steps to reproduce
- Impact assessment (if known)

We aim to acknowledge reports within **72 hours** and provide a fix timeline when confirmed.

## Security measures in this repo

- Contact API: Zod validation, rate limiting, optional Cloudflare Turnstile, honeypot
- Security headers: CSP, HSTS (Apache), XFO, nosniff
- Secrets via environment variables only — never committed
- CI: ESLint, Urdu check, Vitest, high-severity `npm audit`
- Dependabot weekly dependency updates

## Secrets rotation

Rotate immediately if exposed:

- `SANITY_API_TOKEN`
- `REVALIDATE_SECRET`
- `RESEND_API_KEY` / `EMAIL_PASS`
- `TURNSTILE_SECRET_KEY`
- `UPSTASH_REDIS_REST_TOKEN`
