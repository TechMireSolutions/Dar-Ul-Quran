---
name: upgrade-deps
description: Upgrades npm dependencies safely for Dar Ul Quran, respecting ESLint 9 and Sanity v6 constraints. Use when bumping packages or auditing outdated deps.
---

# Upgrade dependencies

Rule: **`13-dependencies.mdc`**

```bash
npm outdated
npm update
npm run lint && npm run check:urdu && npm run test && npm run build
```

Keep package.json overrides.postcss at ^8.5.24. Never `npm audit fix --force`.

## Constraints

| Package | Rule |
|---------|------|
| `eslint` | Stay on **v9** until `eslint-config-next` supports v10 |
| `sanity` / `@sanity/*` / `next-sanity` | Latest **v6 / v7 / v13** — no v5 downgrade via `npm audit fix --force` |
| `next` / `react` | Exact **16.2.12** / **19.2.8** — match `eslint-config-next` |
| `zod` | Latest **4.x** — API validation |
| `resend` | Latest — contact email |
| `vitest` | Latest — unit tests in CI |
| Node | `>=22.12.0` — CI + production VPS **24.17.0** |
| `@types/node` | Latest **26.x** |
| React Compiler | `babel-plugin-react-compiler@1.0.0` + `reactCompiler: true` |

After bump: read changelogs for `next-sanity`, Studio, Tailwind v4.

Ship only after `preflight` skill (+ `build`).
