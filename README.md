# Dar Ul Quran

Urdu-first Islamic education website — [darulquran.pk](https://darulquran.pk)

Open-source Next.js site with Sanity CMS, RTL Urdu UI, and performance-focused architecture.

**Full stack reference:** [`techstack.md`](techstack.md) — dependencies, infrastructure, security, and SEO.

## Stack

See **[`techstack.md`](techstack.md)** for full dependencies, infrastructure, security, SEO, and routes.

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 · React 19 · TypeScript 6 |
| CMS | Sanity v6 · GROQ · Portable Text |
| UI | Tailwind CSS v4 · Noto Nastaliq Urdu |
| Runtime | Node 24 · PM2 · Apache (production) |

## Quick start

```bash
npm ci
cp .env.example .env.local   # fill Sanity + email vars
npm run dev                  # http://localhost:3001
```

Studio: http://localhost:3001/studio

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (port 3001) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run test` | Vitest unit tests |
| `npm run check:urdu` | Scan for English UI strings |

## Environment

See [`.env.example`](.env.example). Required for CMS:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_TOKEN` (contact form + server fetches)

Recommended for production:

- `RESEND_API_KEY` + `EMAIL_TO` — contact notifications
- `REVALIDATE_SECRET` — [Sanity webhook](docs/sanity-webhook.md)
- `UPSTASH_REDIS_REST_*` — distributed rate limiting
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` — bot protection

## Project layout

```
app/(site)/     Public RTL pages
app/api/        Contact + revalidation routes
components/     Shared UI (layout, sections, seo, content)
lib/            Helpers, types, TW_* Tailwind strings
sanity/         Schema + GROQ + fetchers
.cursor/rules/  Agent conventions
.cursor/skills/ Workflow skills
```

Agent index: [`AGENTS.md`](AGENTS.md)

## Deploy

Push to `main` → GitHub Actions deploys to Hetzner VPS (PM2 + Apache).  
Production port **3001** — see `deploy/runtime.cjs` and `.cursor/rules/12-production-port.mdc`.

## Contributing

1. Urdu for all user-visible strings — run `npm run check:urdu`
2. Follow `.cursor/rules/` (structure, naming, DRY, Tailwind)
3. PRs must pass CI: lint, test, Urdu check, build

## License

[MIT](LICENSE)
