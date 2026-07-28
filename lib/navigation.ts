import type { NavNode, RawNavItem } from '@/lib/types/navigation'
import type { FooterServiceDoc } from '@/lib/types/cms'
import { NAV_LABELS, normalizeHref, PATHS, servicePath } from '@/lib/paths'

/** Used when Sanity header navigation is empty. */
export const FALLBACK_HEADER_NAV: NavNode[] = [
  { label: NAV_LABELS.onlineCourses, href: PATHS.onlineCourses },
  { label: NAV_LABELS.services, href: PATHS.services },
  { label: NAV_LABELS.articles, href: PATHS.articles },
  { label: NAV_LABELS.donate, href: PATHS.donate },
  { label: NAV_LABELS.about, href: PATHS.about },
  { label: NAV_LABELS.contact, href: PATHS.contact },
]

/** Footer fallback when nav is empty — includes Home. */
const HOME_NAV_NODE: NavNode = { label: NAV_LABELS.home, href: PATHS.home }

export const FALLBACK_QUICK_LINKS: NavNode[] = [
  HOME_NAV_NODE,
  ...FALLBACK_HEADER_NAV,
]

const PRIMARY_NAV_LINKS: Array<{ href: string; label: string; insertAt?: 'start' | 'end' }> = [
  { href: PATHS.onlineCourses, label: NAV_LABELS.onlineCourses, insertAt: 'start' },
  { href: PATHS.contact, label: NAV_LABELS.contact, insertAt: 'end' },
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

  if (!out.some((n) => n.href === PATHS.home)) {
    out.unshift({ ...HOME_NAV_NODE })
  }

  return out
}

/** Drop links that match an href (e.g. related-site URL already shown as a chip). */
export function withoutHref(links: NavNode[], href?: string | null): NavNode[] {
  if (!href) return links
  const target = normalizeHref(href)
  return links.filter((link) => normalizeHref(link.href) !== target)
}

/** Top-level service slugs for footer when CMS list is empty. */
const FALLBACK_FOOTER_SERVICES: FooterServiceDoc[] = [
  { _id: '1', title: 'قربانی', slug: 'qurbani' },
  { _id: '2', title: 'خمس', slug: 'khums' },
  { _id: '3', title: 'نیابت زیارت', slug: 'niyabat-ziyarat' },
  { _id: '4', title: 'اجارہ', slug: 'ijarah' },
  { _id: '5', title: 'زکوٰۃ', slug: 'zakat' },
  { _id: '6', title: 'کفارہ', slug: 'kaffara' },
]

/** Footer services column — CMS list or fallback, via servicePath. */
export function footerServiceLinks(
  services?: FooterServiceDoc[] | null,
): Array<{ label: string; href: string }> {
  const list = services?.length ? services : FALLBACK_FOOTER_SERVICES
  return list.map((s) => ({ label: s.title, href: servicePath(s.slug) }))
}
