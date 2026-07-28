# Dar Ul Quran — Modern Upgraded Tech Stack

**Live domain:** [darulquran.pk](https://darulquran.pk)  
**Primary locale:** Urdu (`ur`) · RTL (`dir="rtl"`)  
**Production port:** **3001** · **PM2 app:** `darulquran-next`  
**VPS app path:** `/var/www/darulquran_next`  
**Architecture:** Next.js monolith + Sanity headless CMS  
**License:** MIT  

**Last upgraded & security aligned:** July 2026 · Next.js **16.2.12** · React Compiler **1.0** · ESLint **9.39.4** (pin)

This file is the single source of truth for stack versions, infrastructure, security, and SEO inventory. Prefer editing here (and `package.json`) over duplicating version tables in agent stubs.

---

## 1. Core application layer

| Layer | Technology | Version | Operational & architecture notes |
|-------|------------|---------|----------------------------------|
| Runtime | **Node.js** | ≥ **22.12** (CI/Prod **24.17.0**) | Managed via NVM; required for Sanity v6 engine |
| Framework | **Next.js** (App Router) | **16.2.12** (Active LTS) | Patched for July 2026 SSR/Server Action advisories; Turbopack build |
| UI library | **React** / **React DOM** | **19.2.8** | RSC-first; **React Compiler 1.0** for memoization (`reactCompiler: true`) |
| Language | **TypeScript** | **6.0.3** | Strict mode, `target: ES2022`, `@/*` path aliases |
| Styling | **Tailwind CSS** v4 | **4.3.3** | CSS-first theme (`@import "tailwindcss"`); shared `TW_*` in `lib/tailwind.ts` |
| Icons | **lucide-react** | **1.27.0** | Client components; `optimizePackageImports` |
| Typography | **Noto Nastaliq Urdu** | Google Fonts | `DeferredUrduFont` — off critical rendering path |
| Locale | **RTL Urdu** | — | Enforced `<html lang="ur" dir="rtl">` |
| CMS | **Sanity** | **6.7.0** | Embedded Studio at `/studio` (`^6.7.0`) |
| CMS bridge | **next-sanity** | **13.2.2** | `safeFetch` wrapper, Studio integration (`^13.2.2`) |
| Rich text | **@portabletext/react** | **7.0.1** | React 19 + React Compiler builds; no API change from v6 |
| CMS custom input | **LtrStringInput** | `sanity/components/` | LTR override for emails, phones, URLs |
| Validation | **Zod** | **4.4.3** | API payloads and contact forms |
| Tests | **Vitest** | **4.1.10** | Unit tests under `lib/**/*.test.ts` |
| Linting | **ESLint** + Urdu check | **9.39.4** (pin) + custom | `eslint-config-next@16.2.12` + `check-urdu.mjs` |

### Architecture patterns

- **Thin routes** — `page.tsx` → `sanity/lib/fetchers.ts` → sections + JSON-LD
- **Route-private UI** — `app/(site)/**/_components/`
- **Shared UI** — `components/{layout,ui,sections,content,seo}/`
- **GROQ** only in `sanity/lib/queries.ts`
- **ISR** — `revalidate = 300` on CMS pages
- **On-demand revalidation** — Sanity webhook → `POST /api/revalidate`
- **Port** — production always **3001** via `deploy/runtime.cjs` (never 3000)

---

## 2. npm scripts & quality pipeline

Port **3001** is applied by `scripts/run-next.mjs` reading `deploy/runtime.cjs` (not CLI flags).

```json
{
  "scripts": {
    "dev": "node scripts/run-next.mjs dev",
    "build": "next build",
    "start": "node scripts/run-next.mjs start",
    "lint": "eslint .",
    "check:urdu": "node scripts/check-urdu.mjs",
    "test": "vitest run",
    "postinstall": "node scripts/stub-next-polyfills.mjs",
    "prebuild": "node scripts/stub-next-polyfills.mjs"
  }
}
```

### CI / preflight (Urdu compliance gate)

```bash
npm run lint && npm run check:urdu && npm run test && npm run build && npm audit --audit-level=critical
```

GitHub Actions CI (`.github/workflows/ci.yml`) runs the same gate on Node **24**. Audit gate is **critical** — Sanity CLI / eslint toolchain still report transitive **high** advisories; `npm audit fix --force` would downgrade Sanity to v5 and must not be used.

---

## 3. Synchronized dependencies (`package.json`)

July 2026 security-aligned direct dependencies:

```json
{
  "dependencies": {
    "@portabletext/react": "^7.0.1",
    "@sanity/client": "^7.25.0",
    "@sanity/image-url": "^2.1.1",
    "@sanity/vision": "^6.7.0",
    "@upstash/ratelimit": "^2.0.8",
    "@upstash/redis": "^1.38.0",
    "lucide-react": "^1.27.0",
    "next": "16.2.12",
    "next-sanity": "^13.2.2",
    "nodemailer": "^9.0.3",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "resend": "^6.18.1",
    "sanity": "^6.7.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/node": "^26.1.2",
    "@types/nodemailer": "^8.0.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "9.39.4",
    "eslint-config-next": "16.2.12",
    "postcss": "^8.5.24",
    "tailwindcss": "^4.3.3",
    "typescript": "6.0.3",
    "vitest": "^4.1.10"
  },
  "overrides": {
    "postcss": "^8.5.24",
    "eslint": "9.39.4",
    "typescript": "6.0.3",
    "sharp": "^0.35.3",
    "adm-zip": "0.6.0",
    "js-yaml": "^4.3.0",
    "smol-toml": "^1.7.1",
    "typeid-js": {
      "uuid": "^11.1.1"
    },
    "minimatch@>=9": {
      "brace-expansion": "^5.0.8"
    }
  }
}
```

| Pin / override | Why |
|----------------|-----|
| `next` / `eslint-config-next` **16.2.12** exact | Security-aligned LTS pair |
| `react` / `react-dom` **19.2.8** exact | Stable pair with Next 16.2 |
| `eslint` **9.39.4** exact + override | ESLint 10 breaks `eslint-plugin-react` peers |
| `postcss@^8.5.24` override | Patched PostCSS (source-map path traversal) |
| `sharp@^0.35.3` override | Patched libvips CVEs under Next image pipeline |
| `adm-zip@0.6.0` override | Sanity CLI ZIP memory advisory |
| `js-yaml@^4.3.0` override | Prototype pollution / merge DoS under Sanity CLI |
| `smol-toml@^1.7.1` override | Nested Vercel frameworks DoS advisory |
| `typeid-js` → `uuid@^11.1.1` | Nested uuid buffer bounds advisory |
| `minimatch@>=9` → `brace-expansion@^5.0.8` | Patched brace-expansion without breaking ESLint’s minimatch@3 |
| `babel-plugin-react-compiler@1.0.0` | Required for `reactCompiler: true` in `next.config.ts` |

**Dependabot** ignores ESLint major bumps (`.github/dependabot.yml`).

**Never** run `npm audit fix --force` if it downgrades Sanity to v5.

### Browser support (`browserslist`)

Chrome ≥ 120 · Edge ≥ 120 · Firefox ≥ 121 · Safari ≥ 17 · iOS Safari ≥ 17

### Not used (by design)

| Technology | Why not |
|------------|---------|
| App database (Postgres, etc.) | Content in **Sanity** |
| Auth.js / Clerk | Public marketing site |
| Docker / Cloud Run | **Hetzner VPS** + PM2 + Apache |
| Playwright E2E | Vitest only in CI |
| `@tailwindcss/typography` | Custom `.rich-text` classes |

---

## 4. Deployment & infrastructure

```
Internet ──► Apache (HTTPS / HTTP/2)
               │
               └──► http://127.0.0.1:3001
                      │
                      └──► PM2 [darulquran-next]
                             Node 24 · Next.js 16.2.12
```

| Component | Detail |
|-----------|--------|
| Host | Hetzner VPS — `/var/www/darulquran_next` |
| Process | PM2 `darulquran-next` — fork, max 1G |
| Port | **3001** locked — `deploy/runtime.cjs` |
| Listen host | `0.0.0.0` (Apache proxies to `127.0.0.1:3001`) |
| Remote deploy | `deploy/remote-deploy.sh` **v8** — `npm ci`, build, health, rollback |
| CI | Node **24** — `actions/checkout@v7` + `actions/setup-node@v7`; lint → urdu → test → audit(critical) → build |
| Deploy | After CI success (`workflow_run`) — `appleboy/ssh-action@v1.2.5` |

### Environment (`.env.example` / VPS `.env`)

Never commit secrets. Production fills empty values on the VPS:

```ini
PORT=3001
HOSTNAME=0.0.0.0
NODE_ENV=production

NEXT_PUBLIC_SITE_URL=https://darulquran.pk
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
REVALIDATE_SECRET=

RESEND_API_KEY=
EMAIL_FROM=contact@darulquran.pk
EMAIL_TO=

# Optional
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# SMTP fallback if Resend unset
EMAIL_USER=
EMAIL_PASS=
```

### PM2 (`ecosystem.config.cjs`)

Port/host come from `deploy/runtime.cjs`. PM2 runs the Next binary (not `runtime.cjs` as the process script):

```js
const { PORT, HOST } = require('./deploy/runtime.cjs')

module.exports = {
  apps: [
    {
      name: 'darulquran-next',
      script: 'node_modules/next/dist/bin/next',
      args: ['start', '-H', HOST, '-p', String(PORT)],
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: String(PORT),
        HOSTNAME: HOST,
      },
    },
  ],
}
```

Deploy rule: **stop PM2 before rebuilding `.next`** to avoid chunk 404s.

---

## 5. Data & content (Sanity)

| Concern | Implementation |
|---------|----------------|
| Schemas | `sanity/schemaTypes/` |
| GROQ | `sanity/lib/queries.ts` |
| Fetchers | `sanity/lib/fetchers.ts` — `cache()` + `safeFetch` |
| Images | Sanity CDN + `next/image` (AVIF/WebP) |
| Studio | `/studio` + `LtrStringInput` for LTR fields |
| Cache tags | `cms`, `cms:<type>`, `course:*`, `service:*`, `post:*` |

### Document types

| `_type` | Purpose |
|---------|---------|
| `siteSettings` | Brand, contact, social, donate |
| `homepageSettings` | Hero + homepage sections |
| `navigation` | Header nav tree |
| `page` | about / contact / donate |
| `course` / `service` | Nested trees |
| `post` / `category` / `author` | Articles |
| `testimonial` | Homepage testimonials |
| `topicCluster` | SEO clusters |
| `contactSubmission` | Form entries (API writes) |

---

## 6. Public routes & API

| Path | Notes |
|------|-------|
| `/` | Homepage |
| `/about` `/contact` `/donate` | CMS pages |
| `/articles` `/articles/[slug]` | Blog |
| `/online-courses` `/online-courses/[...slug]` | Courses |
| `/services` `/services/[...slug]` | Services |
| `/studio` | Sanity Studio |
| `/sitemap.xml` `/robots.txt` `/llms.txt` | Crawl / AI feeds |
| `/manifest.webmanifest` | PWA (Urdu RTL) |
| `POST /api/contact` | Zod + rate limit + Resend |
| `POST /api/revalidate` | Webhook cache purge |

---

## 7. Security & communication

| Layer | Implementation |
|-------|----------------|
| Validation | Zod — `lib/contact-schema.ts` |
| Rate limit | Upstash or in-memory — `lib/rate-limit.ts` |
| Bots | Turnstile (optional) + honeypot |
| Email | Resend → nodemailer/Gmail fallback |
| Headers | CSP, XFO, nosniff, Referrer-Policy (`next.config.ts`) |
| Studio CSP | Separate connect/worker rules |
| Console | Stripped in production (keep error/warn) |

See **`SECURITY.md`** and **`17-security.mdc`**.

---

## 8. Performance

| Tactic | Where |
|--------|-------|
| LCP | `LcpImagePreload` + hero `fetchPriority="high"` |
| Font | `DeferredUrduFont` |
| INP | Lazy `HeaderMobileMenu`; React Compiler memoization |
| CLS | Sized images, reserved hero space |
| Bundle | `optimizePackageImports`; `experimental.inlineCss` |
| Images | AVIF/WebP, 30-day cache TTL |

Documented exceptions: native LCP `<img>`, deferred font, `dynamic` mobile nav, inline footer SVGs, `.rich-text` (not typography plugin).

---

## 9. SEO

- Urdu-first UI (`check:urdu`); one H1; CMS trust data
- Canonicals via `lib/seo.ts`; dynamic sitemap/robots; `llms.txt`
- JSON-LD: Organization, WebPage, Course, Service, Article, ItemList, Breadcrumb, FAQ
- CWV targets: LCP ≤ 2.5s · INP ≤ 200ms · CLS ≤ 0.1 (mobile-first)

Content narrative: `.antigravityrules` · Rules: `.cursor/rules/07`–`10`

---

## 10. Project layout

```
app/(site)/ api/ studio/ sitemap.ts robots.ts manifest.ts llms.txt/
components/{layout,ui,sections,content,seo,studio}/
lib/{types,seo,paths,tailwind,cache-tags,contact-*,rate-limit,…}/
sanity/{schemaTypes,components,lib}/
deploy/ docs/ scripts/ .github/workflows/
```

---

## 11. Agent & convention docs

| Doc | Role |
|-----|------|
| `AGENTS.md` | Entry index |
| `.cursor/rules/*.mdc` | Primary conventions |
| `.cursor/skills/` | Workflows (20) |
| `CLAUDE.md` | Urdu allow/deny list |
| `techstack.md` | **This file** |

Port **3001** authority: `12-production-port.mdc` + `deploy/runtime.cjs`  
Upgrade policy: `13-dependencies.mdc` + `upgrade-deps` skill

---

## 12. Upgrade policy

```bash
npm outdated
npm update   # within ranges only — next/react/eslint are exact pins
npm run lint && npm run check:urdu && npm run test && npm run build
```

| Rule | Detail |
|------|--------|
| Next / eslint-config-next | Keep **exact matched** pair (currently 16.2.12) |
| React | Keep exact **19.2.8** with Next |
| ESLint | Stay on **9.39.4** until config-next supports v10 |
| Sanity | Latest v6 / client v7 / next-sanity v13 — no v5 force-downgrade |
| React Compiler | Keep `babel-plugin-react-compiler@1.0.0` + `reactCompiler: true` |
| Node | CI + VPS **24**; `engines >=22.12.0` |

### Resolved versions (July 2026)

| Package | Installed |
|---------|-----------|
| next | 16.2.12 |
| react / react-dom | 19.2.8 |
| eslint-config-next | 16.2.12 |
| eslint | 9.39.4 |
| babel-plugin-react-compiler | 1.0.0 |
| sanity / @sanity/vision | 6.7.0 |
| next-sanity | 13.2.2 |
| @sanity/client | 7.25.0 |
| tailwindcss / @tailwindcss/postcss | 4.3.3 |
| postcss | 8.5.24 |
| sharp (override) | 0.35.3 |
| lucide-react | 1.27.0 |
| resend | 6.18.1 |
| nodemailer | 9.0.3 |
| @types/node | 26.1.2 |
| typescript | 6.0.3 |
| zod / vitest | 4.4.3 / 4.1.10 |
| @portabletext/react | 7.0.1 |

### Optional future work

| Area | Latest on npm | Why not installed yet |
|------|---------------|------------------------|
| **ESLint 10.8** | Stable | Breaks with `eslint-config-next` / `eslint-plugin-react` (`getFilename` removed; also `scopeManager.addGlobals`). Pin **9.39.4**. |
| **TypeScript 7.0.2** | Stable | No Compiler API until **TS 7.1** — `typescript-eslint` (used by Next) cannot run. Pin **6.0.3**. |
| **Next 16.3** | Preview/canary only | Wait for `next@latest` to leave 16.2.x. |

All other direct dependencies are already on the latest **stable** release that works with this Next.js 16 app.

---

*Aligned with `package.json`, `next.config.ts`, `deploy/runtime.cjs`, and production topology — July 2026.*
