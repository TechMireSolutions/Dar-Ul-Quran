---
name: technical-seo-audit
description: Audits technical SEO on mobile and desktop for darulquran.pk. Use for SEO reviews, PageSpeed Insights, Rich Results issues, or pre-deploy checks.
---

# Technical SEO audit

Rules: `08-technical-seo-shared.mdc` · `09-technical-seo-mobile.mdc` · `10-technical-seo-desktop.mdc` · `07-content-seo.mdc` · `.antigravityrules`

## PageSpeed Insights checklist

### Mobile (primary index)

- [ ] LCP ≤2.5s — H1 visible without hero image fetch on `/`
- [ ] Hero preload scoped: `LcpImagePreload` + `media="(min-width: 768px)"`
- [ ] INP ≤200ms — no heavy sync work on first interaction
- [ ] CLS ≤0.1 — reserved hero height, card aspect ratios
- [ ] Touch targets ≥44×44px (`TW_TOUCH`)
- [ ] No horizontal scroll at 375px; text not clipped
- [ ] Font non-blocking (`DeferredUrduFont`, `display=optional`)
- [ ] Mobile-first layout (rule `18`) — fluid containers, no fixed page widths

### Desktop

- [ ] LCP ≤2.5s — hero srcset up to 1200w, preconnect Sanity CDN
- [ ] Nav links in view-source (`lg:flex`); mobile uses drawer below `lg` (1024) — not at `md`
- [ ] 1440px Urdu layout — no overflow/truncation; sticky header clear of H1
- [ ] Also spot-check 768px tablet breakpoint

### Shared

- [ ] Canonical on every page (`pageMetadata({ path })`)
- [ ] `robots.ts` + `sitemap.ts` valid · `llms.txt` present · `manifest.ts` OK
- [ ] JSON-LD: `WebPageSchema` + type schema · FAQ when FAQ UI · `inLanguage: ur` · matches visible content
- [ ] Images: `sizes` on all `fill` Images · fluid media · AVIF/WebP via Sanity `.auto('format')`
- [ ] Below-fold: `TW_CV_AUTO` on heavy sections
- [ ] Third-party JS deferred (Turnstile on intersect, WhatsApp lazy)
- [ ] A11y: skip link, focus-visible, touch ≥44px, `motion-reduce`
- [ ] Nastaliq: body leading ≥1.9 · no Latin tracking on Urdu
- [ ] Forms usable on touch; wide tables scroll or stack (`19`)

**Tools:** PSI mobile + desktop · view-source · Rich Results Test · viewport 375/768/1440

Report: shared pass/fail · mobile CWV · desktop CWV · prioritized fixes.

Skill: `optimize-lcp` for LCP regressions · `rtl-check` for layout/RTL.
