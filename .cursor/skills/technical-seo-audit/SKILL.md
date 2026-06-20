---
name: technical-seo-audit
description: Audits technical SEO on mobile and desktop for darulquran.pk. Use for SEO reviews, PageSpeed Insights, or pre-deploy.
---

# Technical SEO audit

Rules: `08-technical-seo-shared.mdc` · `09-technical-seo-mobile.mdc` · `10-technical-seo-desktop.mdc` · `07-content-seo.mdc` · `.antigravityrules`

## PageSpeed Insights checklist

### Mobile (primary index)

- [ ] LCP ≤2.5s — H1 visible without hero image fetch on `/`
- [ ] Hero preload scoped: `LcpImagePreload` + `media="(min-width: 768px)"`
- [ ] INP ≤200ms — no heavy sync work on first interaction
- [ ] CLS ≤0.1 — reserved hero height, card aspect ratios
- [ ] Touch targets ≥44px (`TW_TOUCH`)
- [ ] No horizontal scroll at 375px

### Desktop

- [ ] LCP ≤2.5s — hero srcset up to 1200w, preconnect Sanity CDN
- [ ] Nav links in view-source (`lg:flex`)
- [ ] 1440px Urdu layout — no overflow/truncation

### Shared

- [ ] Canonical on every page (`pageMetadata({ path })`)
- [ ] `robots.ts` + `sitemap.ts` valid
- [ ] JSON-LD: `WebPageSchema` + type schema · `inLanguage: ur`
- [ ] Images: `sizes` on all `fill` Images · AVIF/WebP via Sanity `.auto('format')`
- [ ] Below-fold: `TW_CV_AUTO` on heavy sections
- [ ] Third-party JS deferred (Turnstile on intersect, WhatsApp lazy)

**Tools:** PSI mobile + desktop · view-source · Rich Results Test

Report: shared pass/fail · mobile CWV · desktop CWV · prioritized fixes.

Skill: `optimize-lcp` for LCP regressions.
