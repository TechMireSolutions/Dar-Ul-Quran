# Dar-Ul-Quran — Claude Code index

> **Do not duplicate conventions here.** Primary: `.cursor/rules/*.mdc` · Workflows: `.cursor/skills/` · Map: `AGENTS.md`

Next.js 16 · React 19 · Sanity v6 · Tailwind v4 · RTL Urdu · https://darulquran.pk

```bash
npm run dev    # :3001
npm run start  # production :3001 (PM2 uses same port — see 08-production-port.mdc)
npm run build && npm run lint && npm run check:urdu
```

## Documented exceptions

- LCP hero: native `<img fetchPriority="high">` + `LcpImagePreload`
- Font: `DeferredUrduFont` (not blocking root layout)
- Mobile nav: `dynamic(..., { ssr: false })`
- Footer icons: inline SVG in RSC

## Urdu-First Frontend Rule

**All user-visible strings in Urdu.** Run `npm run check:urdu`. False positive: `// urdu-ok`

### Must be Urdu
JSX text · CTAs · placeholders · fallbacks · `aria-label` · `alt` · form messages · nav labels · badges

### Allowed English
HTML attrs · imports/types · GROQ in `queries.ts` · JSON-LD keys · `llms.txt` · bilingual SEO keywords · `console.error` in catch

## Legacy `.agents/` folder

Replaced by `.cursor/rules` + `.cursor/skills`. See `.agents/INDEX.md`.
