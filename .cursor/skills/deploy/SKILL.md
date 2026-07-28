---
name: deploy
description: Deploys Dar Ul Quran via GitHub Actions or VPS steps. Use only when the user asks to deploy, or for production deploys / chunk MIME issues after an explicit request.
disable-model-invocation: true
---

# Deploy

Push `main` → **CI** must pass → `.github/workflows/deploy.yml` v8 (via `workflow_run`).

Manual: Actions → **Deploy Darulquran Website** → Run workflow.

GitHub secret: `SSH_PRIVATE_KEY` only. Optional repo variables: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_PORT`.

Runtime port: **3001** (`deploy/runtime.cjs`). PM2 app: `darulquran-next`. Host: **0.0.0.0**.

Remote script: `deploy/remote-deploy.sh` (rollback on failure).

Manual on VPS: `cd /var/www/darulquran_next && bash deploy/remote-deploy.sh`

## Post-deploy checklist

```
[ ] curl LOCAL_URL (port from deploy/runtime.cjs) returns 200
[ ] Sample /_next/static/chunks/*.js returns JS (not HTML)
[ ] Contact form / webhook env present if those features matter
```

Never `rm -rf .next` while PM2 serves. Rules: `11-deploy-ops.mdc`, `12-production-port.mdc`, `17-security.mdc`.

Production env: `REVALIDATE_SECRET`, `RESEND_API_KEY` (see `.env.example`).  
Webhook setup → `setup-revalidation` skill. Chunk/MIME → `fix-chunk-mime` skill.
