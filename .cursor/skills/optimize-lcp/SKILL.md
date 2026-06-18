---
name: optimize-lcp
description: Optimizes LCP for the Dar Ul Quran hero and above-the-fold images. Use when fixing Lighthouse LCP.
---

# Optimize LCP

- `LcpImagePreload` + hero `<img fetchPriority="high">` (only LCP `<img>` exception)
- Sanity ~828w mobile / 1200w desktop; explicit dimensions
- `DeferredUrduFont` — no blocking `next/font` in root
- No `priority` on below-fold images; lazy mobile menu

Rules: `10-technical-seo-mobile` · `11-technical-seo-desktop`
