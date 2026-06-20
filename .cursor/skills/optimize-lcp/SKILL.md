---
name: optimize-lcp
description: Optimizes LCP for the Dar Ul Quran hero and above-the-fold images. Use when fixing Lighthouse LCP or PageSpeed Insights scores.
---

# Optimize LCP

Rules: `09-technical-seo-mobile.mdc` · `10-technical-seo-desktop.mdc`

## Homepage hero

- **Mobile PSI:** LCP is H1 text — hero image is `hidden md:block`. Do **not** preload hero on mobile.
- **Desktop PSI:** use `lcpHeroImageProps()` from `sanity/lib/image.ts`:
  - `srcSet` at 640 / 828 / 1200w · AVIF/WebP via `.auto('format')`
  - `sizes="(min-width: 768px) 58vw, 1px"`
  - `<LcpImagePreload href={…} media="(min-width: 768px)" />`
- Hero `<img>`: `fetchPriority="high"`, explicit `width`/`height`, optional LQIP blur
- `hero-item` CSS: opacity 1 on mobile; animated fade-up desktop-only (`globals.css`)

## Other pages

| Page | LCP element | Image helper |
|------|-------------|--------------|
| Leaf course/service | H1 on dark hero | `leafHeroImageUrl()` + `sizes="100vw"` |
| Article | H1 | featured image lazy below fold |
| Listing/index | `PageHeroHeader` H1 | no priority images |

## Font & JS (critical path)

- `DeferredUrduFont` — `display=optional`, idle callback; preconnect `fonts.googleapis.com` + `fonts.gstatic.com` in root layout
- Lazy `HeaderMobileMenu` (`dynamic`, `ssr: false`)
- Turnstile: IntersectionObserver before script inject (contact only)

## Below-fold

- `TW_CV_AUTO` on homepage sections, footer, listing body (desktop only)
- Dynamic import carousels with skeleton placeholder
- Carousel prev/next: sentinel `IntersectionObserver` on desktop only — mobile touch scroll, no IO
- Reveal animations: CSS-only on mobile; no `useEffect` DOM writes below 768px

## Verify

```bash
npm run lint && npm run build
```

PSI mobile + desktop on `/` and one leaf URL. Targets: LCP ≤2.5s · INP ≤200ms · CLS ≤0.1.
