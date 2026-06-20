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

Keep `package.json` `overrides.postcss` at `^8.5.15`. Never `npm audit fix --force`.

## Constraints

| Package | Rule |
|---------|------|
| `eslint` | Stay on **v9** until `eslint-config-next` supports v10 |
| `sanity` / `@sanity/*` / `next-sanity` | Latest **v6 / v7 / v13** — no v5 downgrade via `npm audit fix --force` |
| `next` / `react` | Latest within current major; match `eslint-config-next` |
| `zod` | Latest **4.x** — API validation |
| `resend` | Latest — contact email |
| `vitest` | Latest — unit tests in CI |
| Node | `>=22.12.0` per `package.json` engines (22.23.x LTS) |
| `@types/node` | Latest **26.x** |

After bump: read changelogs for `next-sanity`, Studio, Tailwind v4.

Ship only after `preflight` skill (+ `build`).
