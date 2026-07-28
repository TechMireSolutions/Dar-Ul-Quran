import { describe, expect, it } from 'vitest'
import {
  hasPublishedSlug,
  resolveSeoDescription,
  resolveSeoTitle,
  toItemListEntries,
} from '@/lib/cmsPage'

describe('resolveSeoTitle / resolveSeoDescription', () => {
  it('prefers seoTitle then title then fallback', () => {
    expect(resolveSeoTitle({ seoTitle: 'SEO', title: 'Title' }, 'Fallback')).toBe('SEO')
    expect(resolveSeoTitle({ title: 'Title' }, 'Fallback')).toBe('Title')
    expect(resolveSeoTitle(null, 'Fallback')).toBe('Fallback')
  })

  it('prefers seoDescription then subtitle then fallback', () => {
    expect(
      resolveSeoDescription({ seoDescription: 'SEO desc', subtitle: 'Sub' }, 'Fallback'),
    ).toBe('SEO desc')
    expect(resolveSeoDescription({ subtitle: 'Sub' }, 'Fallback')).toBe('Sub')
    expect(resolveSeoDescription(null, 'Fallback')).toBe('Fallback')
    expect(resolveSeoDescription(null)).toBeUndefined()
  })
})

describe('hasPublishedSlug', () => {
  it('requires both title and slug.current', () => {
    expect(hasPublishedSlug({ title: 'A', slug: { current: 'a' } })).toBe(true)
    expect(hasPublishedSlug({ title: 'A', slug: {} })).toBe(false)
    expect(hasPublishedSlug({ slug: { current: 'a' } })).toBe(false)
    expect(hasPublishedSlug({})).toBe(false)
  })
})

describe('toItemListEntries', () => {
  it('maps items to name/url pairs under basePath', () => {
    expect(
      toItemListEntries(
        [
          { title: 'قرآن', slug: { current: 'quran' } },
          { title: 'فقہ', slug: { current: 'fiqh' } },
        ],
        '/online-courses',
      ),
    ).toEqual([
      { name: 'قرآن', url: '/online-courses/quran' },
      { name: 'فقہ', url: '/online-courses/fiqh' },
    ])
  })
})
