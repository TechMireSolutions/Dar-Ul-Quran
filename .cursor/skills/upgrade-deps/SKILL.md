---
name: upgrade-deps
description: Upgrades npm dependencies safely for Dar Ul Quran, respecting ESLint 9 and Sanity v6 constraints. Use when the user asks to bump packages, audit outdated deps, or align versions with techstack.md.
disable-model-invocation: true
---

# Upgrade dependencies

Rule: **`13-dependencies.mdc`** (policy) · Versions SSOT: **`techstack.md`** § Synchronized dependencies / Resolved versions

```bash
npm outdated
npm update
npm run lint && npm run check:urdu && npm run test && npm run build
```

Keep `package.json` overrides per `13-dependencies.mdc` / `techstack.md`. Never `npm audit fix --force`.

## Constraints

| Package | Rule |
|---------|------|
| `eslint` | Stay on **v9** until `eslint-config-next` supports v10 |
| `sanity` / `@sanity/*` / `next-sanity` | Latest **v6 / v7 / v13** — no v5 downgrade via `npm audit fix --force` |
| `next` / `react` | Exact matched pair — read current pins from `techstack.md` / `package.json` |
| `zod` | Latest **4.x** — API validation |
| `resend` / `nodemailer` | Latest — contact email path |
| `vitest` | Latest — unit tests in CI |
| Node | Match `engines` + `techstack.md` CI/VPS pin |
| `@types/node` | Latest **26.x** |
| React Compiler | `babel-plugin-react-compiler@1.0.0` + `reactCompiler: true` |

## After bump

1. Read changelogs for `next`, `next-sanity`, Studio, Tailwind v4  
2. Fix breaking API changes in one focused PR  
3. Update **`techstack.md` Resolved versions** (and `package.json`); keep `01-project.mdc` on major-line summary only  
4. Ship only after `preflight` (+ `build`)
