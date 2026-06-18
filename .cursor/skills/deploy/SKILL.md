---
name: deploy
description: Deploys Dar Ul Quran via GitHub Actions or VPS steps. Use for production deploys or chunk/MIME issues.
---

# Deploy

Push `main` → `.github/workflows/deploy.yml` v7.

Runtime port: **3001** (`deploy/runtime.cjs`). PM2 app: `darulquran-next`.

Manual order: `pm2 stop` → `npm ci` → `npm run build` → verify chunk → `pm2 start ecosystem.config.cjs` → health check on `127.0.0.1:3001`.

Never `rm -rf .next` while PM2 serves. Rules: `07-deploy-ops.mdc`, `08-production-port.mdc`.
