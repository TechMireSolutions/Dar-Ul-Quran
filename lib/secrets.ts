import { timingSafeEqual } from 'node:crypto'

/** Constant-time string compare for webhook / API secrets. */
export function secretsEqual(provided: string | null | undefined, expected: string | undefined): boolean {
  if (!provided || !expected) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
