/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: 'darulquran-next',
      script: 'npm',
      args: 'start',
      cwd: __dirname,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
}
