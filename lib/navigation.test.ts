import { describe, expect, it } from 'vitest'
import { buildNavTree, nodeIsActive, toNavNode } from '@/lib/navigation'
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
