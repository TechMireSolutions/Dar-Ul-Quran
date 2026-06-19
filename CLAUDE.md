# Dar-Ul-Quran — Claude Code index

> **Do not duplicate conventions here.** Primary: `.cursor/rules/*.mdc` · Workflows: `.cursor/skills/` · Map: `AGENTS.md`  
> **Stack, deps, SEO, infra:** [`techstack.md`](techstack.md)

Next.js 16 · React 19 · Sanity v6 · Tailwind v4 · RTL Urdu · https://darulquran.pk

```bash
npm run dev    # :3001
npm run start  # production :3001 — see 12-production-port.mdc
npm run build && npm run lint && npm run check:urdu && npm run test
```

## Rules registry (index only)

| Group | IDs | Files |
|-------|-----|-------|
| Core | 00, 01, 12 | mirror · project · production port |
| Code | 02–06, 13–16 | coding · rtl · sanity · components · tailwind · deps · structure · naming · dry |
| SEO | 07–10 | content · tech shared · mobile · desktop |
| Ops | 11 | deploy |
| Security | 17 | API, CSP, secrets |

Full table: `00-mirror-sources.mdc`

## Skills (index only)

**Ship:** `preflight` · `check-urdu` · `rtl-check` · `upgrade-deps` · `write-tests`  
**Pages/UI:** `new-page` · `new-leaf-route` · `new-component` · `tailwind-ui` · `add-homepage-section`  
**Sanity:** `add-sanity-query` · `add-fetcher` · `new-sanity-schema` · `setup-revalidation`  
**SEO:** `add-seo-to-page` · `technical-seo-audit` · `optimize-lcp`  
**Ops:** `deploy` · `fix-chunk-mime`  
**Security:** `secure-api-route`

Details: `AGENTS.md` · env: `.env.example` · security: `SECURITY.md` · **full stack: `techstack.md`**

## Documented exceptions

- LCP hero: native `<img fetchPriority="high">` + `LcpImagePreload`
- Font: `DeferredUrduFont` (not blocking root layout)
- Mobile nav: `dynamic(..., { ssr: false })`
- Footer icons: inline SVG in RSC
- Rich text: `rich-text` classes — not `@tailwindcss/typography`

## Urdu-First Frontend Rule

**All user-visible strings in Urdu.** Run `npm run check:urdu`. False positive: `// urdu-ok`

### Must be Urdu
JSX text · CTAs · placeholders · fallbacks · `aria-label` · `alt` · form messages · nav labels · badges

### Allowed English
HTML attrs · imports/types · GROQ in `queries.ts` · JSON-LD keys · `llms.txt` · bilingual SEO keywords · `console.error` in catch

## Legacy `.agents/` folder

Replaced by `.cursor/rules` + `.cursor/skills`. See `.agents/INDEX.md`.
