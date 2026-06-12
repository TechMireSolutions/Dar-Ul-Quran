# Coding Standards

## TypeScript

- Strict mode always on — no `any`, no `@ts-ignore` without an explanatory comment
- Use `type` keyword for component props, not `interface`
- Explicit return types on API route handlers and server actions
- Export named types alongside components when reused externally

## React & Next.js

- **Default: Server Component** — no directive needed
- Add `"use client"` ONLY for: `useState`, `useEffect`, event handlers, browser APIs
- Never import `sanity/lib/client.ts` or `nodemailer` in `"use client"` components
- `<Link>` from `next/link` — never `<a>`
- `<Image>` from `next/image` — never `<img>` (must have explicit `width`/`height` or `fill`)
- `export const revalidate = 300` on every CMS-backed page/layout
- No `getServerSideProps` or `getStaticProps` — App Router only
- No `useEffect` for data fetching — use async Server Components

## Sanity / GROQ

- **All GROQ lives in `sanity/lib/queries.ts`** — zero inline queries in pages or components
- Always call `safeFetch` — it returns `null` on missing env vars instead of throwing
- Explicit field selection — never `...` top-level spread on fetched documents
- Every query must include `slug { current }` and `seo { title, description }`
- Filter drafts: `!(_id in path("drafts.**"))`

## Tailwind CSS v4

- Config: `tailwind.config.ts` with PostCSS plugin `@tailwindcss/postcss`
- Brand: `dq-600` / `dq-700` for primary gold — never raw hex values
- Opacity: `bg-black/50` syntax — `bg-opacity-*` is deprecated in v4
- No `@tailwindcss/typography` — prose styles are in `app/globals.css`
- No `styled-components`, `emotion`, or CSS-in-JS of any kind
- Custom keyframes → `app/globals.css`; expose via `tailwind.config.ts` `extend.animation`

## Prohibited Patterns

| Never do | Do instead |
|----------|-----------|
| Inline GROQ strings | Export from `sanity/lib/queries.ts` |
| `<a href>` | `<Link href>` |
| `<img src>` | `<Image>` with explicit dimensions |
| `any` type | Proper types or `unknown` |
| `console.log` | Remove; `console.error` in catch only |
| Hardcoded phone/email/links | Fetch from Sanity `siteSettings` |
| `bg-opacity-*` | `bg-black/50` (Tailwind v4) |
| `useEffect` for data | Async Server Component |
| CSS-in-JS | Tailwind classes |
| Raw hex for brand | `dq-*` tokens |
