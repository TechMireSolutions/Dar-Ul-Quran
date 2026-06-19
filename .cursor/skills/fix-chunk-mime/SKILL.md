---
name: fix-chunk-mime
description: Diagnoses and fixes Next.js static chunk 404s, MIME errors, or blank pages after deploy on darulquran.pk. Use when /_next/static/chunks fail or PM2 serves stale build.
---

# Fix chunk / MIME errors

Symptoms: blank page, `Unexpected token '<'`, chunk 404, wrong MIME on `/_next/static/*`.

## Root cause

PM2 serving old `.next` while build runs, or Apache not proxying static paths.

## Fix (VPS)

```bash
cd /var/www/darulquran_next
pm2 stop darulquran-next
npm ci --include=dev && npm run build
# verify chunk exists
SAMPLE=$(find .next/static/chunks -maxdepth 1 -name '*.js' | head -1)
test -n "$SAMPLE" && echo "OK: $(basename "$SAMPLE")"
pm2 start ecosystem.config.cjs --update-env
APP_PORT=$(node -e "console.log(require('./deploy/runtime.cjs').PORT)")
curl -fsS "http://127.0.0.1:${APP_PORT}/" -o /dev/null
curl -fsS "http://127.0.0.1:${APP_PORT}/_next/static/chunks/$(basename "$SAMPLE")" -o /dev/null
sudo apache2ctl configtest && sudo systemctl reload apache2
```

Never `rm -rf .next` while PM2 is running.

Port **3001** only in production (`12-production-port.mdc`). Apache must proxy `/_next/static/` to the app.

Rules: `11-deploy-ops.mdc` · `12-production-port.mdc` · Skill: `deploy`
