/**
 * check-urdu.mjs
 *
 * Scans app/(site)/ and components/ for English user-facing text that should
 * be translated to Urdu. Exits 1 if violations are found.
 *
 * Usage:  npm run check:urdu
 * Suppress a false-positive by adding   // urdu-ok   anywhere on that line.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, '..')

// ── Directories to scan ────────────────────────────────────────────────────
const SCAN_DIRS = [
  join(ROOT, 'app', '(site)'),
  join(ROOT, 'components'),
]

// ── Paths/segments to skip entirely ───────────────────────────────────────
const SKIP_SEGMENTS = [
  'studio',          // Sanity Studio — not user-facing
  'node_modules',
  '.next',
  'scripts',
]

// ── UI props whose values must be in Urdu ─────────────────────────────────
const UI_PROPS = [
  'eyebrow', 'ctaLabel', 'viewAllLabel', 'submitLabel',
  'badge', 'placeholder', 'label', 'alt',
]

// ── Regex helpers ──────────────────────────────────────────────────────────
// Matches any Latin letter
const LATIN = /[A-Za-z]/

// Matches a JSX text node:  >  some text  <
// Captured group = the text content (trimmed)
const JSX_TEXT_RE = />\s*([^<>{}\n]+?)\s*</g

// Matches: propName="value"  or  propName='value'
function propRe(prop) {
  return new RegExp(`\\b${prop}=['"]([^'"\\n]+)['"]`, 'g')
}

// Matches fallback patterns:  || 'text'  or  || "text"
const FALLBACK_RE = /\|\|\s*['"]([A-Za-z][^'"]{2,})['"]|\|\|\s*`([A-Za-z][^`]{2,})`/g

// Strip HTML entities (&ldquo; &quot; &#8220; etc.) before Latin check
function stripEntities(text) {
  return text.replace(/&[a-zA-Z]+;/g, '').replace(/&#\d+;/g, '')
}

// ── Exceptions: short technical strings that legitimately contain Latin ───
function isTechnicalValue(text) {
  const t = text.trim()
  if (!t || t.length <= 1)               return true  // empty / single char
  // After stripping HTML entities, if no Latin remains → not a violation
  if (!LATIN.test(stripEntities(t)))     return true
  if (/^https?:\/\//.test(t))            return true  // URLs
  if (/^mailto:|^tel:/.test(t))          return true  // link protocols
  if (/^[\d\s+\-().]+$/.test(t))         return true  // phone numbers
  if (/@/.test(t) && /\./.test(t))       return true  // email addresses
  if (/^[A-Z_]+$/.test(t))              return true  // ALL_CAPS constants / enum values
  if (/^\s*[{(]/.test(t))               return true  // starts with { or ( — expression
  if (/^application\/|^text\//.test(t)) return true  // MIME types
  if (/^[a-z]+-[a-z]+$/.test(t))        return true  // kebab-case technical ids
  if (/^\d/.test(t) && t.length <= 6)   return true  // short numeric
  if (t === 'noopener noreferrer')       return true
  if (t === 'anonymous')                 return true
  return false
}

// ── File walker ────────────────────────────────────────────────────────────
function walkFiles(dir, acc = []) {
  let entries
  try { entries = readdirSync(dir, { withFileTypes: true }) } catch { return acc }

  for (const entry of entries) {
    if (SKIP_SEGMENTS.includes(entry.name)) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      walkFiles(full, acc)
    } else if (entry.isFile() && /\.(tsx|ts)$/.test(entry.name)) {
      acc.push(full)
    }
  }
  return acc
}

// ── Per-file checker ───────────────────────────────────────────────────────
function checkFile(filePath) {
  const src = readFileSync(filePath, 'utf8')
  const lines = src.split('\n')
  const violations = []

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const lineNum = i + 1

    // Skip suppressed lines
    if (raw.includes('// urdu-ok')) continue

    // Skip comment-only lines
    const trimmed = raw.trim()
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue

    // Skip import / export type lines
    if (/^\s*(import|export)\s/.test(raw) && !raw.includes('JSX') && !/</.test(raw)) continue

    // ── 1. JSX text nodes ────────────────────────────────────────────────
    let m
    JSX_TEXT_RE.lastIndex = 0
    while ((m = JSX_TEXT_RE.exec(raw)) !== null) {
      const text = m[1].trim()
      if (LATIN.test(text) && !isTechnicalValue(text)) {
        violations.push({ line: lineNum, text, kind: 'JSX text' })
      }
    }

    // ── 2. UI prop string values ──────────────────────────────────────────
    for (const prop of UI_PROPS) {
      const re = propRe(prop)
      while ((m = re.exec(raw)) !== null) {
        const text = m[1].trim()
        if (LATIN.test(text) && !isTechnicalValue(text)) {
          violations.push({ line: lineNum, text, kind: `prop: ${prop}` })
        }
      }
    }

    // ── 3. Fallback strings:  || 'English default' ────────────────────────
    FALLBACK_RE.lastIndex = 0
    while ((m = FALLBACK_RE.exec(raw)) !== null) {
      const text = (m[1] ?? m[2]).trim()
      if (LATIN.test(text) && !isTechnicalValue(text)) {
        violations.push({ line: lineNum, text, kind: 'fallback string' })
      }
    }
  }

  return violations
}

// ── Main ───────────────────────────────────────────────────────────────────
const files = SCAN_DIRS.flatMap(dir => walkFiles(dir))

let totalViolations = 0
const results = []

for (const file of files) {
  const violations = checkFile(file)
  if (violations.length > 0) {
    results.push({ file: relative(ROOT, file), violations })
    totalViolations += violations.length
  }
}

if (totalViolations === 0) {
  console.log('✅  All user-facing text is in Urdu.')
  process.exit(0)
}

console.log(`\n🔍  Urdu text check — found ${totalViolations} violation(s)\n`)
for (const { file, violations } of results) {
  console.log(`  📄 ${file}`)
  for (const v of violations) {
    console.log(`     ❌ Line ${String(v.line).padStart(4)} [${v.kind}]  →  "${v.text}"`)
  }
  console.log()
}
console.log('Translate all violations to Urdu.')
console.log('Add  // urdu-ok  to suppress a false positive.')
process.exit(1)
