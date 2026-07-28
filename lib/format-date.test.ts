import { describe, expect, it } from 'vitest'
import { formatPublishedDate } from '@/lib/format-date'

describe('formatPublishedDate', () => {
  it('formats an ISO date with ur-PK long month options', () => {
    const iso = '2024-03-15T12:00:00.000Z'
    const expected = new Date(iso).toLocaleDateString('ur-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    expect(formatPublishedDate(iso)).toBe(expected)
  })

  it('includes the calendar year', () => {
    expect(formatPublishedDate('2025-12-01T00:00:00.000Z')).toMatch(/2025/)
  })
})
