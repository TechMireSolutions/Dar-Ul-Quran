# GitHub Copilot Instructions — Dar-Ul-Quran

## Project Context

Islamic educational organization website (Dar Ul Quran, Pakistan). Next.js 15 App Router, React 19, Sanity v6 CMS, Tailwind CSS v4, TypeScript strict mode. Fully right-to-left (Urdu/Arabic), font: Noto Nastaliq Urdu.

---

## Architecture

- **App Router** with `(site)` route group for the public site
- **Server Components** by default; `"use client"` only for interactivity
- **Sanity CMS** for all content — never hardcode copy/contacts
- **RTL-first** — root HTML is `lang="ur" dir="rtl"`

---

## Coding Conventions

### TypeScript
- Strict mode, no `any`, no `@ts-ignore` without comment
- `type` not `interface` for component props

### React & Next.js
- Server Components default; `"use client"` only when required
- `<Link>` (next/link) and `<Image>` (next/image) — never native elements
- `export const revalidate = 300` on CMS-backed pages
- No `useEffect` for data fetching

### Sanity
- All GROQ queries in `sanity/lib/queries.ts`
- Use `safeFetch` from `sanity/lib/client.ts`
- Every content type: `slug`, `seo { title, description }`
- Never import Sanity client in `"use client"` components

### Tailwind v4
- Brand: `dq-600` / `dq-700` (gold primary)
- Logical spacing: `ms-*` / `me-*` for RTL safety
- Opacity: `bg-black/50` syntax (v4), not `bg-opacity-*`
- Custom animations defined in `app/globals.css`, exposed in `tailwind.config.ts`

### RTL
- Use `rtl:` Tailwind prefix for directional overrides
- Body text: `leading-[1.8]` minimum for Urdu glyph clearance
- Test all UI with real Urdu text — Latin placeholder text hides RTL issues

---

## What to Avoid

- Inline GROQ queries (use `sanity/lib/queries.ts`)
- Hardcoded phone/email/social links (use Sanity `siteSettings`)
- `console.log` in committed code
- Raw hex for brand colors (use `dq-*` tokens)
- CSS-in-JS libraries
- `bg-opacity-*` utilities (Tailwind v4 deprecated)
