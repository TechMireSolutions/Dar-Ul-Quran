---
name: deploy
description: Deploys Dar Ul Quran via GitHub Actions or VPS steps. Use for production deploys or chunk/MIME issues.
---

# Deploy

Push `main` → `.github/workflows/deploy.yml` v7.

Manual order: `pm2 stop` → `npm ci` → `npm run build` → verify chunk → `pm2 start` (:3001) → health check.

Never `rm -rf .next` while PM2 serves. Rule: `07-deploy-ops.mdc`
