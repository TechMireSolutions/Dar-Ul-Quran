# Dar-Ul-Quran — Claude Code Rules

## Project Overview

Full-stack Islamic educational organization website. Next.js 15 App Router + React 19 frontend, Sanity v6 CMS backend, Tailwind CSS v4. Fully RTL (Urdu/Arabic), deployed via GitHub Actions.

**Live Content:** Courses, Services, Articles, Static Pages — all CMS-driven from Sanity.

---

## Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npx sanity dev       # Sanity Studio standalone (not usually needed — /studio route works)
```

Studio is available at `http://localhost:3000/studio` during dev.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | 15.x |
| UI | React | 19.x |
| CMS | Sanity | v6 |
| Styles | Tailwind CSS | v4 (PostCSS plugin, not CLI) |
| Language | TypeScript | v6, strict mode |
| Rich Text | @portabletext/react | — |
| Images | @sanity/image-url + next/image | — |
| Email | nodemailer (Gmail SMTP) | — |
| Icons | lucide-react | — |
| Fonts | Noto Nastaliq Urdu | Google Fonts |

---

## Architecture

```
app/
  layout.tsx                — Root: RTL HTML (lang="ur" dir="rtl"), font, metadata
  (site)/layout.tsx         — Site shell: Header + Footer (fetches siteSettings, headerNav)
  (site)/page.tsx           — Homepage
  (site)/[section]/         — Static pages: about, contact, donate, articles, services, online-courses
  (site)/articles/[slug]/   — Dynamic article detail
  (site)/online-courses/[...slug]/   — Hierarchical course detail (catch-all)
  (site)/services/[...slug]/         — Hierarchical service detail (catch-all)
  api/contact/route.ts      — POST: saves to Sanity + sends email
  studio/[[...tool]]/       — Embedded Sanity Studio

components/
  layout/   — Header (sticky, 4-level recursive nav), Footer (4-column)
  sections/ — HeroSection, CarouselSection
  ui/       — Reveal (scroll animation), ContentCard, WhatsAppButton

sanity/
  lib/      — client.ts (safeFetch), image.ts (urlFor), queries.ts (all GROQ)
  schemaTypes/ — post, course, service, page, author, category, siteSettings,
                 homepageSettings, navigation, testimonial, contactSubmission
```

---

## Code Conventions

### TypeScript
- **Strict mode always on.** No `any`, no `@ts-ignore` without a comment explaining why.
- Inline types for component props; use `type` not `interface` for object shapes.
- Export named types alongside components when they're reused externally.

### React / Next.js
- **Default: Server Components.** Only add `"use client"` when you need browser APIs, `useState`, `useEffect`, or event handlers.
- Never import server-only modules (sanity client, nodemailer) in client components.
- Use `generateStaticParams` for dynamic routes when content changes infrequently.
- `revalidate` export (ISR) on layout/page: typically 300 seconds.
- Never use `<a>` — use `<Link>` from `next/link`.
- Never use `<img>` — use `<Image>` from `next/image` with explicit `width`/`height` or `fill`.

### Sanity Queries
- All GROQ queries live in `sanity/lib/queries.ts`. Never write inline GROQ in page files.
- Always use `safeFetch` from `sanity/lib/client.ts` — it returns `null` on missing config instead of crashing.
- Project references: `course->` or `service->` should be followed with explicit field selection — never just `...` expansion at top level.
- Add `seo { title, description }` selection to every content type query.

### Styling — Tailwind v4
- **Tailwind v4 uses PostCSS plugin** (`@tailwindcss/postcss`), NOT the CLI watcher. Config is in `tailwind.config.ts`.
- Custom brand colors use the `dq-*` prefix (e.g., `dq-600`, `dq-700`).
- Use RTL-aware utilities: `rtl:ml-auto`, `rtl:space-x-reverse`, `rtl:rotate-180` etc.
- Do not add `margin-left`/`margin-right` raw values in RTL contexts — always use `ms-*`/`me-*` (margin-start/end).
- Animations defined in `globals.css` keyframes; expose via `tailwind.config.ts` → `extend.animation`.

### RTL / Urdu-Arabic Text
- The entire site is `dir="rtl"` with `lang="ur"`. Do not fight this with `dir="ltr"` unless specifically needed for code/numbers.
- Font: `font-urdu` class → Noto Nastaliq Urdu. Apply to body text. Always pair with fallback.
- Line-heights for Arabic/Urdu glyphs: `leading-[1.8]` to `leading-[2.0]` for body, `leading-[1.2]` for display headings.
- Use `font-feature-settings: "calt" 1, "liga" 1` for proper Urdu rendering.
- Numbers: Urdu uses Eastern Arabic-Indic numerals in content but Western numerals are fine in UI.

---

## Component Patterns

### Reveal (scroll animation)
```tsx
import Reveal from "@/components/ui/Reveal";

<Reveal animation="up" delay={100}>
  <YourContent />
</Reveal>
```
Animations: `'up' | 'fade' | 'scale' | 'left' | 'right'`

### ContentCard
```tsx
<ContentCard
  title="Course Title"
  description="Short excerpt"
  imageUrl={urlFor(image).url()}
  href="/online-courses/slug"
  ctaLabel="مزید جانیں"
/>
```

### CarouselSection
Accepts: `title`, `items[]`, `viewAllHref`. Items must have `id`, `title`, `imageUrl`, `href`.

### WhatsAppButton
Reads phone from Sanity `siteSettings.whatsapp`. No props needed — pulled from context in layout.

---

## Sanity Schema Conventions

- Every content type with a public URL must have a `slug` field with `isUnique` validator.
- `parent` references (course, service) use `reference` type with `weak: false`.
- Use `order` (number) for manual sort control on all list types.
- `seo` is an inline object `{ title: string, description: string }` — not a separate document.
- `body` is always `array` of `block` (Portable Text).
- Image fields include `alt` text subfield. Never omit alt.
- `hidden: () => true` in fields that should not appear in studio but remain in schema for backward compat.

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production` |
| `SANITY_API_TOKEN` | Yes (write) | Contact form creates docs |
| `EMAIL_USER` | Yes | Gmail sender address |
| `EMAIL_PASS` | Yes | Gmail App Password |
| `EMAIL_TO` | Yes | Notification recipient |

Never commit `.env.local`. Never log env values.

---

## Do NOT

- Do not install `@tailwindcss/typography` — prose styles are handled in `globals.css` directly.
- Do not use `styled-components` or `emotion` — Tailwind only.
- Do not add `"use client"` to layout files or page files that have no interactivity.
- Do not use `getServerSideProps` or `getStaticProps` — App Router only.
- Do not use `useEffect` for data fetching — use async Server Components or `route.ts` handlers.
- Do not hardcode phone numbers, email addresses, or social links — they come from `siteSettings` in Sanity.
- Do not use `console.log` in committed code — use `console.error` for catch blocks only.
- Do not write raw CSS animations — add keyframes to `globals.css` and expose via Tailwind config.
- Do not abbreviate Arabic/Urdu strings in code — use the full string as a constant.

---

## Common Gotchas

1. **Tailwind v4** — class names changed; `bg-opacity-*` is now `bg-black/50` syntax. `ring-offset` utilities may differ.
2. **next/image + Sanity** — must add `cdn.sanity.io` to `next.config.ts` `remotePatterns`.
3. **RTL Flexbox** — `flex-row` reverses visually in RTL. Use `flex-row-reverse` when you need LTR visual order.
4. **Sanity client in Server Components** — always `await` safeFetch; it can return `null` if env vars aren't set.
5. **Catch-all routes `[...slug]`** — params arrive as `string[]`, not `string`. Join with `/` for breadcrumbs.
6. **ISR revalidation** — layout ISR (300s) means nav changes take up to 5 minutes. Bump to 60s in dev if needed.
7. **Noto Nastaliq Urdu** — the font has large vertical metrics. Always test with real Urdu text, not Latin placeholder.
