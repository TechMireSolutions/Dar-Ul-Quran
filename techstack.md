# Dar Ul Quran — Tech Stack & SEO

**Live:** [darulquran.pk](https://darulquran.pk) · **License:** MIT · **Repo:** Next.js monolith + Sanity headless CMS

This document describes what the site **actually runs today** (from `package.json`, deploy config, and codebase). It is the single reference for stack, dependencies, infrastructure, security, and SEO.

**Last dependency verification:** 2026-06-20 — direct packages at latest **stable** npm; lockfile refreshed (`npm update`, 25 transitive bumps). See [Upgrade policy](#upgrade-policy).

---

## Core application layer

| Layer | Technology | Version | Notes |
|-------|------------|---------|-------|
| Runtime | **Node.js** | ≥ 22.12 | `engines` in `package.json`; VPS uses Node 22 |
| Framework | **Next.js** (App Router) | 16.2.9 | RSC default; no Pages Router |
| UI | **React** | 19.2.7 | Server Components first; `"use client"` only when needed |
| Language | **TypeScript** | 6.0.3 | Strict mode |
| Styling | **Tailwind CSS** v4 + PostCSS | 4.3.1 | `@import "tailwindcss"` in `globals.css`; tokens in `tailwind.config.ts` |
| Icons | **lucide-react** | 1.21.0 | Client components only |
| Font | **Noto Nastaliq Urdu** | Google Fonts | Loaded via `DeferredUrduFont` (non-blocking) |
| Locale | **RTL Urdu** | — | `lang="ur" dir="rtl"` on root HTML |

### Architecture patterns

- **Thin routes** — `page.tsx` fetches via `sanity/lib/fetchers.ts`, composes sections, adds JSON-LD
- **Route-private UI** — `app/(site)/**/_components/` (not shared across routes)
- **Shared UI** — `components/{layout,ui,sections,content,seo}/`
- **Data layer** — GROQ in `sanity/lib/queries.ts` only; pages never import queries directly
- **ISR** — `export const revalidate = 300` on CMS-backed pages
- **On-demand revalidation** — Sanity webhook → `POST /api/revalidate` (optional; see `docs/sanity-webhook.md`)

### npm scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `node scripts/run-next.mjs dev` | Dev server **:3001** |
| `build` | `next build` | Production build (prebuild stubs polyfills) |
| `start` | `node scripts/run-next.mjs start` | Production **:3001** |
| `lint` | `eslint .` | ESLint 9 + `eslint-config-next` |
| `test` | `vitest run` | Unit tests (`lib/*.test.ts`) |
| `check:urdu` | `node scripts/check-urdu.mjs` | Urdu UI string scanner |

---

## Dependencies

### Production (`dependencies`)

| Package | Version | Role |
|---------|---------|------|
| `next` | ^16.2.9 | App framework |
| `react` / `react-dom` | ^19.2.7 | UI runtime |
| `sanity` | ^6.1.0 | CMS core + Studio |
| `next-sanity` | ^13.1.1 | Next.js integration, `safeFetch` |
| `@sanity/client` | ^7.23.0 | Server writes (contact form) |
| `@sanity/image-url` | ^2.1.1 | Image URL builder (`urlFor`) |
| `@sanity/vision` | ^6.1.0 | GROQ IDE in Studio |
| `@portabletext/react` | ^6.2.0 | Rich text rendering |
| `lucide-react` | ^1.21.0 | Icons |
| `zod` | ^4.4.3 | Contact API validation |
| `resend` | ^6.14.0 | Transactional email (primary) |
| `nodemailer` | ^9.0.1 | Gmail SMTP fallback |
| `@upstash/ratelimit` | ^2.0.8 | Optional distributed rate limit |
| `@upstash/redis` | ^1.38.0 | Upstash REST client |

### Development (`devDependencies`)

| Package | Version | Role |
|---------|---------|------|
| `tailwindcss` | ^4.3.1 | Utility CSS |
| `@tailwindcss/postcss` | ^4.3.1 | PostCSS plugin |
| `postcss` | ^8.5.15 | CSS pipeline |
| `typescript` | ^6.0.3 | Type checking |
| `eslint` | ^9.39.4 | Linting (**v10 blocked** by `eslint-config-next`) |
| `eslint-config-next` | ^16.2.9 | Next.js ESLint rules |
| `vitest` | ^4.1.9 | Unit tests |
| `@types/node` | ^26.0.0 | Node types (Node 22+ API) |
| `@types/react` / `@types/react-dom` | ^19.2.x | React types |
| `@types/nodemailer` | ^8.0.1 | Nodemailer types |

### Browser support (`browserslist`)

Chrome ≥ 120 · Edge ≥ 120 · Firefox ≥ 121 · Safari ≥ 17 · iOS Safari ≥ 17

### Lockfile overrides

| Override | Purpose |
|----------|---------|
| `postcss@^8.5.15` | Forces Next.js nested PostCSS to patched 8.5.15+ (XSS advisory in older nested copies) |

### Known audit notes (2026-06-20)

- **11 moderate** — transitive via Sanity CLI (`js-yaml`, `uuid` in `@sanity/cli` / `typeid-js`). No fix without `npm audit fix --force` downgrading Sanity to v5.
- **CI gate:** `npm audit --audit-level=high` — passes (no high/critical).
- **Do not** run `npm audit fix --force`.

### Not used (by design)

| Technology | Why not |
|------------|---------|
| PostgreSQL / Drizzle / Neon / Turso | Content lives in **Sanity**; no app database |
| Payload CMS | **Sanity v6** embedded at `/studio` |
| Auth.js / Clerk | Public marketing site; no user accounts |
| Docker / Fly.io / Cloud Run | **Hetzner VPS** + PM2 + Apache |
| Edge Runtime for app | Node.js runtime on VPS; Sanity CDN for content |
| Playwright (E2E) | Not configured yet; CI runs Vitest only |

---

## Data & content

| Concern | Implementation |
|---------|----------------|
| CMS | **Sanity v6** — schemas in `sanity/schemaTypes/` |
| Queries | **GROQ** in `sanity/lib/queries.ts` (draft filter, explicit fields) |
| Fetch layer | `sanity/lib/fetchers.ts` — React `cache()` + `safeFetch` |
| Types | `lib/types/` — DTOs per domain |
| Images | Sanity CDN (`cdn.sanity.io`) + `next/image` (AVIF/WebP) |
| Rich text | Portable Text → `@portabletext/react` + `.rich-text` CSS |
| Studio | Embedded at `/studio` (same Next.js app) |
| Cache tags | `cms`, `cms:<type>`, and per-slug `course:*` / `service:*` / `post:*` via `lib/cache-tags.ts` |

Every public document type: `slug`, `order`, inline `seo { title, description }`, image `alt`.

### Sanity document types (`sanity/schemaTypes/`)

| `_type` | Purpose |
|---------|---------|
| `siteSettings` | Site name, logo, contact, social, donate causes |
| `homepageSettings` | Hero, about block, section headings |
| `navigation` | Header nav tree |
| `page` | CMS pages (`about`, `contact`, `donate`) |
| `course` | Nested online courses (parent refs) |
| `service` | Nested services |
| `post` | Articles / blog |
| `category` | Article categories |
| `author` | Article authors |
| `testimonial` | Homepage testimonials |
| `topicCluster` | SEO topic clusters (pillar + related) |
| `contactSubmission` | Contact form entries (API writes) |

---

## Public routes & API

### Site routes (`app/(site)/`)

| Path | Type | Notes |
|------|------|-------|
| `/` | Homepage | Hero, carousels, testimonials, donate CTA |
| `/about` | CMS page | `page` slug `about` |
| `/contact` | CMS page + form | Turnstile optional |
| `/donate` | CMS page | PayPal CTA |
| `/articles` | Listing | Featured posts |
| `/articles/[slug]` | Article detail | `ArticleSchema` |
| `/online-courses` | Listing | Top-level courses |
| `/online-courses/[...slug]` | Course tree | `CourseSchema`, catch-all |
| `/services` | Listing | Top-level services |
| `/services/[...slug]` | Service tree | `ServiceSchema`, catch-all |

### System routes

| Path | Purpose |
|------|---------|
| `/studio` | Sanity Studio (embedded) |
| `/sitemap.xml` | Dynamic sitemap |
| `/robots.txt` | Crawl rules + AI bots |
| `/llms.txt` | AI-readable site feed |
| `/manifest.webmanifest` | PWA manifest (Urdu RTL) |

### API routes (`app/api/`)

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/contact` | Form submit → Sanity + Resend |
| `POST` | `/api/revalidate?secret=` | Sanity webhook cache purge |

---

## Infrastructure & deployment

```
Internet → Apache (HTTPS, HSTS) → 127.0.0.1:3001 → PM2 (darulquran-next) → Next.js
```

| Component | Detail |
|-----------|--------|
| **Host** | Hetzner VPS (`/var/www/darulquran_next`) |
| **Process** | PM2 — `ecosystem.config.cjs`, app name `darulquran-next` |
| **Port** | **3001** (locked in production) — `deploy/runtime.cjs` |
| **Proxy** | Apache — static `/_next/static/`, security headers, HTTP/2 |
| **CI/CD** | GitHub Actions — CI passes → deploy v8 (`workflow_run`) |
| **CI checks** | lint → `check:urdu` → vitest → `npm audit --audit-level=high` → build |
| **Dependabot** | Weekly npm updates (`.github/dependabot.yml`) |

Deploy rule: **stop PM2 before rebuilding `.next`** — prevents chunk 404s during deploy.

---

## Security & communication

| Layer | Implementation |
|-------|----------------|
| **Input validation** | Zod — `lib/contact-schema.ts` |
| **Rate limiting** | 5 req / 15 min — Upstash Redis if configured, else in-memory on VPS |
| **Bot protection** | Cloudflare Turnstile (optional) + honeypot field |
| **Email** | Resend (primary) → nodemailer/Gmail (fallback) |
| **Secrets** | `.env` on VPS — see `.env.example`; never committed |
| **HTTP headers** | CSP, XFO, nosniff, Referrer-Policy, Permissions-Policy (`next.config.ts`) |
| **Apache** | HSTS, immutable cache for `/_next/static/` (`deploy/apache-security-snippet.conf`) |

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production` |
| `SANITY_API_TOKEN` | Yes | Contact writes + server fetches |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical base URL |
| `RESEND_API_KEY` + `EMAIL_TO` | Prod | Contact notifications |
| `REVALIDATE_SECRET` | Prod | Sanity webhook auth |
| `UPSTASH_REDIS_REST_*` | Optional | Distributed rate limit |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | Optional | Turnstile |
| `EMAIL_USER` / `EMAIL_PASS` | Fallback | Gmail SMTP |

---

## Performance optimisation

| Tactic | Where |
|--------|-------|
| **LCP ≤ 2.5s** | `LcpImagePreload` with `media="(min-width: 768px)"`; `lcpHeroImageProps()` srcset; hero `<img fetchPriority="high">`; leaf `leafHeroImageUrl()` |
| **Deferred font** | `DeferredUrduFont` — Noto Nastaliq off critical path; preconnect Google Fonts |
| **INP ≤ 200ms** | Lazy `HeaderMobileMenu`; Turnstile on intersect; passive scroll |
| **CLS ≤ 0.1** | Image dimensions, reserved hero space, aspect-ratio cards |
| **Below-fold** | `content-visibility: auto` (`TW_CV_AUTO`) on sections, footer, listings |
| **Images** | `next/image` — AVIF/WebP, 30-day cache, Sanity `remotePatterns` |
| **JS bundle** | `optimizePackageImports` for lucide, portabletext, sanity client |
| **Console** | Stripped in production (`removeConsole` in `next.config.ts`) |
| **Carousel** | Dynamic import with skeleton placeholder |

Shared Tailwind strings: `lib/tailwind.ts` (`TW_*`) — single source, no duplicated class strings. Full token map: `06-tailwind.mdc`.

Key exports by group:
- **Layout:** `TW_CONTAINER`, `TW_CONTAINER_HEADER`, `TW_CONTAINER_HERO`, `TW_CONTAINER_NARROW`, `TW_SECTION_PY`, `TW_PAGE_BODY`, `TW_PAGE_HERO_PADDING`
- **Typography:** `TW_EYEBROW`, `TW_EYEBROW_LINE`, `TW_PAGE_TITLE`, `TW_PAGE_SUBTITLE`, `TW_BODY_MUTED`, `TW_SECTION_TITLE`, `TW_HERO_TITLE`, `TW_ARTICLE_TITLE`
- **Surfaces:** `TW_CARD_SURFACE`, `TW_FORM_PANEL`, `TW_FORM_INPUT`, `TW_FORM_SUBMIT`
- **CTAs:** `TW_GOLD_CTA`, `TW_HERO_GOLD_CTA`, `TW_LEAF_WHATSAPP_CTA`, `TW_BTN_PRIMARY`, `TW_CTA_ARROW`, `TW_CARD_LINK`
- **Rich text / perf:** `TW_RICH_TEXT_LG` / `TW_RICH_TEXT_SM`, `TW_CV_AUTO`

Theme shadows: `shadow-focus-gold`, `shadow-nav-scrolled`, `shadow-gold-dot`, `shadow-gold-icon`, `shadow-inset-highlight`.

Org name fallback: `DEFAULT_SITE_NAME` in `lib/seo.ts` (metadata + JSON-LD).

---

## SEO best practices applied

### Content & trust (E-E-A-T)

- **Urdu-first** UI — titles, CTAs, `alt`, `aria-label` (enforced by `npm run check:urdu`)
- **One H1 per page**; clear above-fold intent
- **Internal linking** — courses ↔ services ↔ articles; topic cluster blocks
- **Trust data from CMS** — contact, social, org info via `siteSettings` (not hardcoded)
- **No keyword stuffing** or misleading metadata
- **`llms.txt`** — machine-readable site summary for AI crawlers

### Technical SEO (crawl & index)

| Practice | Implementation |
|----------|----------------|
| Canonical URLs | `pageMetadata({ path })` in `lib/seo.ts` |
| Sitemap | Dynamic `app/sitemap.ts` from Sanity |
| Robots | `app/robots.ts` — blocks `/studio/`, `/api/`; allows AI bots to `/llms.txt` |
| Metadata | Title, description, keywords, Open Graph, Twitter cards |
| `noIndex` | 404 page; listing pages with `?q=` search param |
| Static paths | `generateStaticParams` for courses, services, articles |
| Server HTML | Primary content in RSC — crawlable without JS |
| GSC verification | Google site verification in root `generateMetadata` |
| PWA manifest | `app/manifest.ts` — `lang: ur`, `dir: rtl`, theme color |

### Structured data (JSON-LD)

| Schema | Component | Pages |
|--------|-----------|-------|
| Organization | Root layout | Site-wide |
| WebPage | `WebPageSchema` | All major routes |
| Course | `CourseSchema` | Course leaf pages |
| Service | `ServiceSchema` | Service leaf pages |
| Article | `ArticleSchema` | Blog posts |
| ItemList | `ItemListSchema` | Listing/index pages |
| BreadcrumbList | `BreadcrumbNav` | Hierarchical routes |

JSON-LD matches visible title/description; `inLanguage: ur` where applicable.

### Core Web Vitals targets (mobile-first index)

| Metric | Target | Primary tactics |
|--------|--------|-----------------|
| LCP | ≤ 2.5s | Hero preload, `fetchPriority`, deferred font |
| INP | ≤ 200ms | Lazy mobile nav, minimal handlers |
| CLS | ≤ 0.1 | Sized images, stable layout |

Test **both** Lighthouse Mobile and Desktop.

### Accessibility (SEO-adjacent)

- Skip link · keyboard nav · `role="menuitem"` inside menus only
- Touch targets ≥ 44px (`TW_TOUCH`)
- Crawlable server-rendered nav (Header/Footer from Sanity)

### SEO tooling in repo

| Asset | Path |
|-------|------|
| Content SEO narrative | `.antigravityrules` |
| Technical SEO rules | `.cursor/rules/07`–`10` |
| Audit skill | `.cursor/skills/technical-seo-audit` |
| LCP skill | `.cursor/skills/optimize-lcp` |

---

## Project layout

```
app/
  (site)/              Public RTL pages + _components/
  api/contact/         Contact form (Zod, rate limit, Resend)
  api/revalidate/      Sanity webhook cache purge
  studio/              Embedded Sanity Studio
  sitemap.ts robots.ts manifest.ts llms.txt/
components/
  layout/ ui/ sections/ content/ seo/
lib/
  types/ seo.ts paths.ts tailwind.ts cache-tags.ts contact-schema.ts …
sanity/
  schemaTypes/ lib/queries.ts lib/fetchers.ts
deploy/                Apache snippets, runtime.cjs
docs/                  sanity-webhook.md
```

---

## Agent & convention docs

| Doc | Role |
|-----|------|
| `AGENTS.md` | Agent entry index |
| `.cursor/rules/*.mdc` | Coding, SEO, security, deploy rules |
| `.cursor/skills/` | Step-by-step workflows |
| `CLAUDE.md` | Claude index + Urdu allowlist |
| `SECURITY.md` | Vulnerability reporting |

---

## Upgrade policy

- Stay on **latest stable** per major line (`13-dependencies.mdc`)
- Run `npm outdated` + `npm update`; bump `package.json` ranges only when npm registry has a newer stable release
- **ESLint 9.39.4** until `eslint-config-next@16` supports ESLint 10 (`getFilename()` removed — re-verified 2026-06-20)
- **`postcss` override** — keep `^8.5.15` in `package.json` `overrides`
- Never `npm audit fix --force` if it downgrades Sanity
- Preflight before ship: `npm run lint && npm run check:urdu && npm run test` (+ `build` if deploy-bound)

### Current stable versions (direct deps)

| Package | Latest stable | Installed |
|---------|---------------|-----------|
| next | 16.2.9 | 16.2.9 |
| react / react-dom | 19.2.7 | 19.2.7 |
| sanity / @sanity/vision | 6.1.0 | 6.1.0 |
| next-sanity | 13.1.1 | 13.1.1 |
| @sanity/client | 7.23.0 | 7.23.0 |
| tailwindcss | 4.3.1 | 4.3.1 |
| typescript | 6.0.3 | 6.0.3 |
| zod | 4.4.3 | 4.4.3 |
| vitest | 4.1.9 | 4.1.9 |
| @types/node | 26.0.0 | 26.0.0 |
| eslint | 9.39.4 (pin) | 9.39.4 |

---

## Optional future upgrades (not implemented)

Documented for planning only — **not** current stack:

| Area | Option | When to consider |
|------|--------|------------------|
| CDN / edge | Cloudflare in front of Apache | Global TTFB, DDoS, Turnstile at edge |
| Deploy | CI builds artifact; VPS only restarts | Zero-downtime, faster deploys |
| Studio | `studio.darulquran.pk` separate deploy | Smaller public bundle |
| Observability | Sentry, Uptime Kuma | Error tracking, uptime alerts |
| E2E | Playwright in CI | Regression on contact + key routes |
| ESLint | v10 | When `eslint-config-next` supports it |

---

*Last aligned with `package.json` and production config in this repository.*
