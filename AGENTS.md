# Dar Ul Quran — Agent index

**Rules (primary):** `.cursor/rules/*.mdc` · **Workflows:** `.cursor/skills/`  
**Content SEO:** `.antigravityrules` · **Urdu allowlist:** `CLAUDE.md` § Urdu

Live: https://darulquran.pk · Dev: `npm run dev` (:3001)

## File structure

| Path | Role |
|------|------|
| `app/(site)/` | Public pages; `_components/` for route-private UI |
| `app/studio/` | Embedded Sanity |
| `components/{layout,ui,sections,content,seo,studio}` | Shared UI |
| `lib/types/` | Nav + schema DTOs (data layer imports from here) |
| `sanity/lib/` | GROQ, `safeFetch`, cached `fetchers` |
| `public/` | Static fallbacks; CMS assets primary |

## Rules map

| `.mdc` | Topic |
|--------|--------|
| `00` | Hierarchy, behavior |
| `01` | Stack, env, commands |
| `02` | TS, Next 16, Tailwind |
| `03` | RTL, Urdu UI |
| `04` | Sanity / GROQ |
| `05` | Content SEO (E-E-A-T) |
| `06` | Components |
| `07` | Deploy |
| `09` | Technical SEO shared |
| `10` | Technical SEO mobile |
| `11` | Technical SEO desktop |

## Skills

`preflight` · `new-page` · `add-sanity-query` · `new-sanity-schema` · `add-seo-to-page` · `technical-seo-audit` · `optimize-lcp` · `rtl-check` · `check-urdu` · `deploy`

## Exceptions

| Rule | Exception |
|------|-----------|
| No `<img>` | LCP hero only |
| Blocking font | `DeferredUrduFont` |
| Eager mobile JS | `HeaderMobileMenu` dynamic |

Commits only when user asks. Preflight before ship.
