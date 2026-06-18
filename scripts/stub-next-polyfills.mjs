/**
 * Replaces Next.js polyfill-module with an empty stub before build.
 * Our browserslist targets Chrome 120+, Safari 17+, Firefox 121+ (Baseline features).
 */
import { writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const targets = [
  'node_modules/next/dist/build/polyfills/polyfill-module.js',
  'node_modules/next/dist/build/polyfills/polyfill-nomodule.js',
]

for (const rel of targets) {
  const file = join(process.cwd(), rel)
  if (!existsSync(file)) continue
  writeFileSync(file, '/* modern browsers only — polyfills stubbed */\n')
  console.log(`stub-next-polyfills: ${rel}`)
}
