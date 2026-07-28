import { describe, expect, it } from 'vitest'
import { resolveDocumentTitle } from '@/lib/seo'

describe('resolveDocumentTitle', () => {
  it('keeps home title as site name alone', () => {
    expect(resolveDocumentTitle('دار القرآن', 'دار القرآن')).toBe('دار القرآن')
  })

  it('appends site name once for plain titles', () => {
    expect(resolveDocumentTitle('رابطہ', 'دار القرآن')).toBe('رابطہ | دار القرآن')
  })

  it('does not double an existing brand suffix', () => {
    expect(resolveDocumentTitle('بالغان | دار القرآن', 'دار القرآن')).toBe(
      'بالغان | دار القرآن',
    )
  })
})
