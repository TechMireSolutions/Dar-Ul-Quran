#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { PORT, HOST } = require('../deploy/runtime.cjs')

const mode = process.argv[2]
if (mode !== 'dev' && mode !== 'start') {
  console.error('Usage: node scripts/run-next.mjs <dev|start>')
  process.exit(1)
}

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const nextBin = path.join(root, 'node_modules/next/dist/bin/next')

const child = spawn(process.execPath, [nextBin, mode, '-H', HOST, '-p', String(PORT)], {
  stdio: 'inherit',
  cwd: root,
  env: { ...process.env, PORT: String(PORT), HOSTNAME: HOST },
})

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  process.exit(code ?? 1)
})
