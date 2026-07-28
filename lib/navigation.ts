import type { NavNode, RawNavItem } from '@/lib/types/navigation'

/** Used when Sanity header navigation is empty. */
export const FALLBACK_HEADER_NAV: NavNode[] = [
  { label: 'آنلائن کلاسز', href: '/online-courses' },
  { label: 'خدمات', href: '/services' },
  { label: 'مضامین', href: '/articles' },
  { label: 'عطیات', href: '/donate' },
  { label: 'ہمارے بارے میں', href: '/about' },
  { label: 'رابطہ', href: '/contact' },
]

/** Footer fallback when nav is empty — includes Home. */
export const FALLBACK_QUICK_LINKS: NavNode[] = [
  { label: 'ہوم', href: '/' },
  ...FALLBACK_HEADER_NAV,
]

const PRIMARY_NAV_LINKS: Array<{ href: string; label: string; insertAt?: 'start' | 'end' }> = [
  { href: '/online-courses', label: 'آنلائن کلاسز', insertAt: 'start' },
  { href: '/contact', label: 'رابطہ', insertAt: 'end' },
]

export function toNavNode(item: RawNavItem): NavNode {
  return {
    label: item.label ?? '',
    href: item.href || '#',
    external: !!item.external,
    children: item.children?.length ? item.children.map(toNavNode) : undefined,
  }
}

export function buildNavTree(items?: RawNavItem[] | null): NavNode[] | undefined {
  return items?.length ? items.map(toNavNode) : undefined
}

function navContainsHref(nodes: NavNode[], href: string): boolean {
  return nodes.some(
    (node) =>
      node.href === href ||
      (node.children?.length ? navContainsHref(node.children, href) : false),
  )
}

/**
 * Guarantee pillar links (courses, contact) exist even when CMS nav omits them.
 * Falls back to FALLBACK_HEADER_NAV when the tree is empty.
 */
export function ensurePrimaryNav(items?: NavNode[] | null): NavNode[] {
  const nav = items?.length ? [...items] : [...FALLBACK_HEADER_NAV]

  for (const link of PRIMARY_NAV_LINKS) {
    if (navContainsHref(nav, link.href)) continue
    if (link.insertAt === 'start') nav.unshift({ label: link.label, href: link.href })
    else nav.push({ label: link.label, href: link.href })
  }

  return nav
}

export function nodeIsActive(node: NavNode, pathname: string): boolean {
  if (
    node.href &&
    node.href !== '#' &&
    (pathname === node.href || (node.href !== '/' && pathname.startsWith(`${node.href}/`)))
  ) {
    return true
  }
  return node.children?.some((child) => nodeIsActive(child, pathname)) ?? false
}

/** Flat footer quick links — expands nested nav, keeps external flags, ensures Home. */
export function flattenFooterQuickLinks(items?: NavNode[] | null): NavNode[] {
  const out: NavNode[] = []

  const walk = (nodes: NavNode[]) => {
    for (const node of nodes) {
      if (node.href && node.href !== '#') {
        out.push({
          label: node.label,
          href: node.href,
          ...(node.external ? { external: true } : {}),
        })
      }
      if (node.children?.length) walk(node.children)
    }
  }

  walk(items?.length ? items : FALLBACK_QUICK_LINKS)

  if (!out.some((n) => n.href === '/')) {
    out.unshift({ label: 'ہوم', href: '/' })
  }

  return out
}
