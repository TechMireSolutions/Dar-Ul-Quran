# Dar Ul Quran — Agent index

**Rules (primary):** `.cursor/rules/*.mdc` · **Workflows:** `.cursor/skills/`  
**Stack:** [`techstack.md`](techstack.md) (versions, infra, routes) · **Content SEO:** `.antigravityrules` · **Urdu:** `CLAUDE.md` § Urdu · **Security:** `SECURITY.md` + `17-security.mdc`

Live: https://darulquran.pk · Port **3001** → `12-production-port.mdc`

## File structure

| Path | Role |
|------|------|
| `app/(site)/` | Public pages; `_components/` for route-private UI |
| `app/api/` | Contact + revalidation routes (`17-security.mdc`) |
| `app/studio/` | Embedded Sanity |
| `components/{layout,ui,sections,content,seo}` | Shared UI |
| `lib/types/` | DTOs · `cache-tags.ts` · `contact-schema.ts` · `navigation.ts` |
| `lib/tailwind.ts` | Shared `TW_*` class strings (`06-tailwind.mdc`) |
| `sanity/lib/` | GROQ, `safeFetch`, cached `fetchers` |
| `docs/` | Ops docs (Sanity webhook) |

Full layout: `14-file-structure.mdc`

## Rules map

| Group | ID | Topic |
|-------|-----|--------|
| **Core** | `00` | Hierarchy & behavior |
| | `01` | Stack, commands, env |
| | `12` | Production port 3001 |
| **Code** | `02`–`06` | TS, RTL, Sanity, components, Tailwind |
| | `13`–`16` | Dependencies, structure, naming, DRY |
| **SEO** | `07`–`10` | Content + technical SEO |
| **Ops** | `11` | Deploy & CI |
| **Security** | `17` | API auth, CSP, secrets, contact hardening |

Authority table (no conflicts): `00-mirror-sources.mdc`

## Skills (20)

### Ship & quality
`preflight` · `check-urdu` · `rtl-check` · `upgrade-deps` · `write-tests`

### Pages & UI
`new-page` · `new-leaf-route` · `new-component` · `tailwind-ui` · `add-homepage-section`

### Sanity CMS
`add-sanity-query` · `add-fetcher` · `new-sanity-schema` · `setup-revalidation`

### SEO
`add-seo-to-page` · `technical-seo-audit` · `optimize-lcp`

### Ops & security
`deploy` · `fix-chunk-mime` · `secure-api-route`

## Exceptions

| Rule | Exception |
|------|-----------|
| No `<img>` | LCP hero only |
| Blocking font | `DeferredUrduFont` |
| Eager mobile JS | `HeaderMobileMenu` dynamic |

Commits only when user asks. Preflight: `lint` + `check:urdu` + `test` (+ `build` if deploy).
