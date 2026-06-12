# Common Gotchas & Known Issues

## Tailwind v4 Breaking Changes

- `bg-opacity-50` is deprecated → use `bg-black/50` fractional opacity syntax
- `ring-offset` utilities changed — check docs if ring shadows look wrong
- Config: uses PostCSS plugin (`@tailwindcss/postcss`), NOT the standalone CLI watcher

## next/image + Sanity

- `cdn.sanity.io` must be in `next.config.ts` `remotePatterns` or images throw 400
- Always pass explicit `width`/`height` or `fill` — no unsized images
- Use `urlFor(image).width(N).url()` to request appropriately sized images from Sanity CDN

## Catch-All Routes

- `[...slug]` params arrive as `string[]`, not `string`
- Reconstruct path: `params.slug.join("/")`
- Build breadcrumbs from the `ancestors` array returned by `courseBySlugDeepQuery` / `serviceBySlugDeepQuery`

## ISR & Caching

- Layout ISR is 300s → nav/footer CMS changes take up to 5 minutes to propagate
- Drop to `revalidate = 60` during active content editing sessions
- Sanity `safeFetch` uses CDN by default — writes via API take a moment to appear

## Noto Nastaliq Urdu Font

- Has unusually large vertical metrics (tall ascenders + descenders)
- UI that looks fine with Latin text can overflow or clip with Urdu
- **Always test with real Urdu text** before marking any text-heavy component done
- Some characters produce very wide glyphs — fixed-width containers may overflow

## RTL Flexbox Trap

- `flex-row` visually reverses item order in `dir="rtl"` — this is correct for content
- When you explicitly need LTR visual order (e.g. icon then text left-to-right): use `flex-row-reverse` or `rtl:flex-row-reverse`
- `space-x-*` gaps also reverse — use `rtl:space-x-reverse` or switch to `gap-*`

## Sanity Client in Client Components

- Never import `sanity/lib/client.ts` or any Sanity server utility in `"use client"` components
- For client-side interactions that need Sanity data, fetch server-side and pass as props
- Contact form uses a Next.js API route (`/api/contact`) as the intermediary

## Environment Variables

- `SANITY_API_TOKEN` is a write token — required for contact form to create documents
- `NEXT_PUBLIC_*` vars are bundled into the client — never put secrets there
- If `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing, `safeFetch` returns `null` (won't crash, but renders nothing)
