/**
 * Single source of truth for Next.js listen address (dev + production).
 * Apache/nginx proxy, PM2, npm scripts, and deploy health checks must match.
 * Production (NODE_ENV=production) always uses port 3001 — never 3000.
 */
const PRODUCTION_PORT = 3001
const HOST = process.env.HOSTNAME || '0.0.0.0'

const PORT =
  process.env.NODE_ENV === 'production'
    ? PRODUCTION_PORT
    : Number(process.env.PORT) || PRODUCTION_PORT

module.exports = {
  PORT,
  HOST,
  PRODUCTION_PORT,
  LOCAL_URL: `http://127.0.0.1:${PORT}`,
}
