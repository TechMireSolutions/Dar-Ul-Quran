import { describe, expect, it } from 'vitest'
import {
  ancestryFromParent,
  assertSlugAncestry,
  breadcrumbHref,
  breadcrumbLabelsFromAncestry,
  buildBreadcrumbNavItems,
  coursePath,
  expectedPathFromAncestry,
  expectedSlugSegmentsFromAncestry,
  normalizeCatchAllSlug,
  pillarPagePath,
  servicePath,
  staticParamsFromPaths,
} from '@/lib/paths'

describe('coursePath / servicePath', () => {
  it('builds course paths for 1–3 levels', () => {
    expect(coursePath('nazra')).toBe('/online-courses/nazra')
    expect(coursePath('nazra', 'quran')).toBe('/online-courses/quran/nazra')
    expect(coursePath('nazra', 'quran', 'kids')).toBe('/online-courses/kids/quran/nazra')
  })

  it('builds service paths with optional parent', () => {
    expect(servicePath('zakat')).toBe('/services/zakat')
    expect(servicePath('fitrana', 'zakat')).toBe('/services/zakat/fitrana')
  })
})

describe('staticParamsFromPaths', () => {
  it('returns empty for nullish input', () => {
    expect(staticParamsFromPaths(null)).toEqual([])
    expect(staticParamsFromPaths(undefined)).toEqual([])
  })

  it('flattens parent chains into slug arrays', () => {
    expect(
      staticParamsFromPaths([
        { slug: 'nazra', parent: { slug: 'quran', parent: { slug: 'kids', parent: null } } },
        { slug: 'zakat', parent: null },
      ]),
    ).toEqual([
      { slug: ['kids', 'quran', 'nazra'] },
      { slug: ['zakat'] },
    ])
  })
})

describe('ancestry + breadcrumbs', () => {
  const ancestry = [
    { title: 'قرآن', slug: 'quran' },
    { title: 'بچے', slug: 'kids' },
  ]

  it('walks parent refs into ancestry order', () => {
    expect(
      ancestryFromParent({
        parent: {
          title: 'بچے',
          slug: 'kids',
          parent: { title: 'قرآن', slug: 'quran', parent: null },
        },
      }),
    ).toEqual([
      { title: 'قرآن', slug: 'quran' },
      { title: 'بچے', slug: 'kids' },
    ])
  })

  it('builds breadcrumb href segments', () => {
    expect(breadcrumbHref('/online-courses', ancestry, 0)).toBe('/online-courses/quran')
    expect(breadcrumbHref('/online-courses', ancestry, 1)).toBe('/online-courses/quran/kids')
  })

  it('maps ancestry to JSON-LD labels', () => {
    expect(breadcrumbLabelsFromAncestry(ancestry)).toEqual({
      quran: 'قرآن',
      kids: 'بچے',
    })
  })

  it('builds nav items with current page unlinked', () => {
    expect(buildBreadcrumbNavItems('/online-courses', ancestry, 'نظریہ')).toEqual([
      { label: 'قرآن', href: '/online-courses/quran' },
      { label: 'بچے', href: '/online-courses/quran/kids' },
      { label: 'نظریہ' },
    ])
  })
})

describe('assertSlugAncestry / expectedPathFromAncestry', () => {
  const ancestry = [
    { title: 'روزانه', slug: 'rozana' },
    { title: 'نظریہ', slug: 'nazra-rozana' },
  ]

  it('builds expected slug segments and paths', () => {
    expect(expectedSlugSegmentsFromAncestry(ancestry, 'leaf')).toEqual([
      'rozana',
      'nazra-rozana',
      'leaf',
    ])
    expect(expectedPathFromAncestry('/online-courses', ancestry, 'leaf')).toBe(
      '/online-courses/rozana/nazra-rozana/leaf',
    )
  })

  it('accepts matching URL segments and rejects wrong parents', () => {
    expect(assertSlugAncestry(['rozana', 'nazra-rozana', 'leaf'], ancestry, 'leaf')).toBe(true)
    expect(assertSlugAncestry(['wrong', 'leaf'], ancestry, 'leaf')).toBe(false)
    expect(assertSlugAncestry(['leaf'], [], 'leaf')).toBe(true)
  })
})

describe('normalizeCatchAllSlug', () => {
  it('normalizes arrays and slash-joined strings', () => {
    expect(normalizeCatchAllSlug(['a', 'b'])).toEqual(['a', 'b'])
    expect(normalizeCatchAllSlug('a/b')).toEqual(['a', 'b'])
    expect(normalizeCatchAllSlug(undefined)).toEqual([])
  })
})

describe('pillarPagePath', () => {
  it('returns null without slug', () => {
    expect(pillarPagePath(null)).toBeNull()
    expect(pillarPagePath({})).toBeNull()
  })

  it('resolves page, course, and service pillars', () => {
    expect(pillarPagePath({ _type: 'page', slug: 'about' })).toBe('/about')
    expect(
      pillarPagePath({ _type: 'course', slug: 'nazra', parentSlug: 'quran' }),
    ).toBe('/online-courses/quran/nazra')
    expect(
      pillarPagePath({ _type: 'service', slug: 'fitrana', parentSlug: 'zakat' }),
    ).toBe('/services/zakat/fitrana')
  })

  it('returns null for unknown types', () => {
    expect(pillarPagePath({ _type: 'post', slug: 'ramadan' })).toBeNull()
  })
})
