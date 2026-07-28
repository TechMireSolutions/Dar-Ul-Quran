import { describe, expect, it } from 'vitest'
import {
  hasPublishedSlug,
  courseCtaLabel,
  defaultCourseDescription,
  defaultServiceDescription,
  resolveLeafDescription,
  resolveSeoDescription,
  resolveSeoTitle,
  serviceCtaLabel,
  toItemListEntries,
} from '@/lib/cmsPage'
import { DEFAULT_SITE_NAME_URDU } from '@/lib/seo'

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

describe('resolveLeafDescription', () => {
  it('prefers seoDescription then excerpt then fallback', () => {
    expect(
      resolveLeafDescription({ seoDescription: 'SEO', excerpt: 'Excerpt' }, 'Fallback'),
    ).toBe('SEO')
    expect(resolveLeafDescription({ excerpt: 'Excerpt' }, 'Fallback')).toBe('Excerpt')
    expect(resolveLeafDescription({}, 'Fallback')).toBe('Fallback')
    expect(resolveLeafDescription(null, 'Fallback')).toBe('Fallback')
  })
})

describe('courseCtaLabel / serviceCtaLabel', () => {
  it('uses browse labels when children exist', () => {
    expect(courseCtaLabel(2)).toBe('کورسز دیکھیں')
    expect(serviceCtaLabel(1)).toBe('خدمات دیکھیں')
  })

  it('uses enroll/book labels for leaves', () => {
    expect(courseCtaLabel(0)).toBe('ابھی داخلہ لیں')
    expect(serviceCtaLabel(0)).toBe('ابھی بک کریں')
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

  it('accepts plain string slugs for nested children', () => {
    expect(
      toItemListEntries(
        [{ title: 'نظریہ', slug: 'nazra' }],
        '/online-courses/rozana',
      ),
    ).toEqual([{ name: 'نظریہ', url: '/online-courses/rozana/nazra' }])
  })
})

describe('defaultCourseDescription / defaultServiceDescription', () => {
  it('builds course fallbacks with optional short form', () => {
    expect(defaultCourseDescription({ title: 'نظریہ', subject: 'قرآن' })).toContain('نظریہ')
    expect(defaultCourseDescription({ title: 'نظریہ' }, { short: true })).toBe('آن لائن نظریہ۔')
  })

  it('builds service fallback with site name', () => {
    expect(defaultServiceDescription({ title: 'زکوٰۃ' })).toBe(
      `زکوٰۃ — ${DEFAULT_SITE_NAME_URDU} کی مذہبی خدمات۔`,
    )
  })
})
