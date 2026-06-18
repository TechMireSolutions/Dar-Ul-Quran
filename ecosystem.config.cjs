/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: 'darulquran-next',
      script: 'node_modules/next/dist/bin/next',
      args: ['start'],
      cwd: __dirname,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: '3001',
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
}
