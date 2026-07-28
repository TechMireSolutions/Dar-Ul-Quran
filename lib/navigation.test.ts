import { describe, expect, it } from 'vitest'
import { buildNavTree, ensurePrimaryNav, FALLBACK_HEADER_NAV, FALLBACK_QUICK_LINKS, flattenFooterQuickLinks, footerServiceLinks, nodeIsActive, toNavNode, withoutHref } from '@/lib/navigation'
import type { NavNode, RawNavItem } from '@/lib/types/navigation'

describe('toNavNode / buildNavTree', () => {
  it('maps raw items and defaults empty href to #', () => {
    const raw: RawNavItem = { label: 'خدمات', href: '', external: true }
    expect(toNavNode(raw)).toEqual({
      label: 'خدمات',
      href: '#',
      external: true,
      children: undefined,
    })
  })

  it('recursively maps children', () => {
    const tree = buildNavTree([
      {
        label: 'کورسز',
        href: '/online-courses',
        children: [{ label: 'قرآن', href: '/online-courses/quran' }],
      },
    ])
    expect(tree).toHaveLength(1)
    expect(tree![0].children?.[0].href).toBe('/online-courses/quran')
  })

  it('returns undefined for empty input', () => {
    expect(buildNavTree(undefined)).toBeUndefined()
    expect(buildNavTree([])).toBeUndefined()
  })
})

describe('ensurePrimaryNav', () => {
  it('falls back when CMS nav is empty', () => {
    expect(ensurePrimaryNav(undefined)).toEqual(FALLBACK_HEADER_NAV)
    expect(ensurePrimaryNav([])).toEqual(FALLBACK_HEADER_NAV)
  })

  it('injects missing courses and contact links', () => {
    const nav = ensurePrimaryNav([
      { label: 'خدمات', href: '/services' },
      { label: 'مضامین', href: '/articles' },
    ])
    expect(nav.some((n) => n.href === '/online-courses')).toBe(true)
    expect(nav.some((n) => n.href === '/contact')).toBe(true)
    expect(nav[0].href).toBe('/online-courses')
  })

  it('does not duplicate existing pillar links', () => {
    const nav = ensurePrimaryNav([
      { label: 'آنلائن کلاسز', href: '/online-courses' },
      { label: 'رابطہ', href: '/contact' },
    ])
    expect(nav.filter((n) => n.href === '/online-courses')).toHaveLength(1)
    expect(nav.filter((n) => n.href === '/contact')).toHaveLength(1)
  })
})

describe('nodeIsActive', () => {
  const courses: NavNode = {
    label: 'کورسز',
    href: '/online-courses',
    children: [
      { label: 'قرآن', href: '/online-courses/quran' },
      { label: 'فقہ', href: '/online-courses/fiqh' },
    ],
  }

  it('matches exact pathname', () => {
    expect(nodeIsActive(courses, '/online-courses')).toBe(true)
  })

  it('matches nested pathname under href', () => {
    expect(nodeIsActive(courses, '/online-courses/quran/nazra')).toBe(true)
  })

  it('does not treat root as prefix of everything', () => {
    const home: NavNode = { label: 'ہوم', href: '/' }
    expect(nodeIsActive(home, '/')).toBe(true)
    expect(nodeIsActive(home, '/about')).toBe(false)
  })

  it('matches via active child', () => {
    const parentOnly: NavNode = {
      label: 'مینو',
      href: '#',
      children: [{ label: 'رابطہ', href: '/contact' }],
    }
    expect(nodeIsActive(parentOnly, '/contact')).toBe(true)
    expect(nodeIsActive(parentOnly, '/about')).toBe(false)
  })
})

describe('flattenFooterQuickLinks', () => {
  it('falls back to quick links with Home when empty', () => {
    expect(flattenFooterQuickLinks(undefined)).toEqual(FALLBACK_QUICK_LINKS)
    expect(flattenFooterQuickLinks([])[0]).toEqual({ label: 'ہوم', href: '/' })
  })

  it('flattens nested children and keeps external', () => {
    const links = flattenFooterQuickLinks([
      {
        label: 'خدمات',
        href: '/services',
        children: [{ label: 'قربانی', href: '/services/qurbani' }],
      },
      { label: 'بیرونی', href: 'https://example.com', external: true },
    ])
    expect(links).toEqual([
      { label: 'ہوم', href: '/' },
      { label: 'خدمات', href: '/services' },
      { label: 'قربانی', href: '/services/qurbani' },
      { label: 'بیرونی', href: 'https://example.com', external: true },
    ])
  })

  it('does not duplicate Home when already present', () => {
    const links = flattenFooterQuickLinks([{ label: 'ہوم', href: '/' }, { label: 'رابطہ', href: '/contact' }])
    expect(links.filter((n) => n.href === '/')).toHaveLength(1)
  })
})

describe('withoutHref', () => {
  it('removes matching href ignoring trailing slash', () => {
    const links = withoutHref(
      [
        { label: 'ہوم', href: '/' },
        { label: 'متعلقہ', href: 'https://aabtaab.com/' },
      ],
      'https://aabtaab.com',
    )
    expect(links).toEqual([{ label: 'ہوم', href: '/' }])
  })
})

describe('footerServiceLinks', () => {
  it('maps CMS services through servicePath', () => {
    expect(footerServiceLinks([{ _id: '1', title: 'زکوٰۃ', slug: 'Zakat' }])).toEqual([
      { label: 'زکوٰۃ', href: '/services/zakat' },
    ])
  })
})
