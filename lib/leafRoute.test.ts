import { describe, expect, it, vi } from 'vitest'
import { loadCatchAllLeaf } from '@/lib/leafRoute'

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  },
}))

describe('loadCatchAllLeaf', () => {
  const sectionPath = '/online-courses'

  it('returns doc + ancestry when URL matches parent chain', async () => {
    const doc = {
      slug: { current: 'nazra' },
      parent: { title: 'روزانہ', slug: 'rozana', parent: null },
    }
    const result = await loadCatchAllLeaf(
      ['rozana', 'nazra'],
      sectionPath,
      async () => doc,
    )

    expect(result.leafSlug).toBe('nazra')
    expect(result.canonicalPath).toBe('/online-courses/rozana/nazra')
    expect(result.ancestry).toEqual([{ title: 'روزانہ', slug: 'rozana' }])
    expect(result.doc).toBe(doc)
  })

  it('calls notFound when leaf slug is missing', async () => {
    await expect(
      loadCatchAllLeaf([], sectionPath, async () => ({ slug: { current: 'x' } })),
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('calls notFound when document is missing', async () => {
    await expect(
      loadCatchAllLeaf(['missing'], sectionPath, async () => null),
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })

  it('calls notFound when URL ancestry does not match', async () => {
    const doc = {
      slug: { current: 'nazra' },
      parent: { title: 'روزانہ', slug: 'rozana', parent: null },
    }
    await expect(
      loadCatchAllLeaf(['wrong-parent', 'nazra'], sectionPath, async () => doc),
    ).rejects.toThrow('NEXT_NOT_FOUND')
  })
})
