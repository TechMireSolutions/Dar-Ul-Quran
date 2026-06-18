/**
 * Single source of truth for Next.js listen address (dev + production).
 * Apache/nginx proxy, PM2, npm scripts, and deploy health checks must match.
 * Do not use port 3000 on the production VPS.
 */
const PORT = Number(process.env.PORT) || 3001
const HOST = process.env.HOSTNAME || '0.0.0.0'

module.exports = {
  PORT,
  HOST,
  LOCAL_URL: `http://127.0.0.1:${PORT}`,
}
