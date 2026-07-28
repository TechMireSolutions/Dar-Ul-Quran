import type { ParentSlugNode, TopicClusterPillarPage } from '@/lib/types'

/** Canonical public paths — prefer these over string literals. */
export const PATHS = {
  home: '/',
  onlineCourses: '/online-courses',
  services: '/services',
  articles: '/articles',
  donate: '/donate',
  about: '/about',
  contact: '/contact',
} as const

/** Urdu label for the home crumb / empty-state home CTA. */
export const HOME_LABEL = 'صفحۂ اول'

/**
 * Canonical Urdu section titles (breadcrumbs, ItemList, listing fallbacks).
 * Keep spelling consistent — do not re-hardcode these strings in pages/schemas.
 */
export const SECTION_LABELS = {
  onlineCourses: 'آنلائن کورسز',
  services: 'خدمات',
  articles: 'مضامین',
  donate: 'عطیہ',
  about: 'ہمارے بارے میں',
  contact: 'ہم سے رابطہ کریں',
} as const

/**
 * Header/footer nav labels (may differ from section page titles, e.g. کلاسز vs کورسز).
 */
export const NAV_LABELS = {
  onlineCourses: 'آنلائن کلاسز',
  services: SECTION_LABELS.services,
  articles: SECTION_LABELS.articles,
  donate: 'عطیات',
  about: SECTION_LABELS.about,
  contact: 'رابطہ',
  home: 'ہوم',
} as const

type AncestryNode = { title: string; slug: string; parent?: AncestryNode | null }

/** Build catch-all static params from Sanity parent chains. */
export function staticParamsFromPaths(
  paths: Array<{ slug: string; parent: ParentSlugNode }> | null | undefined,
): { slug: string[] }[] {
  if (!paths) return []
  return paths.map((entry) => {
    const ancestors: string[] = []
    let parent = entry.parent
    while (parent) {
      ancestors.unshift(parent.slug)
      parent = parent.parent ?? null
    }
    return { slug: [...ancestors, entry.slug] }
  })
}

/** Walk parent refs into breadcrumb ancestry. */
export function ancestryFromParent(node: { parent?: AncestryNode | null }): { title: string; slug: string }[] {
  const chain: { title: string; slug: string }[] = []
  let cur = node.parent
  while (cur) {
    chain.unshift({ title: cur.title, slug: cur.slug })
    cur = cur.parent
  }
  return chain
}

export function coursePath(
  slug: string,
  parentSlug?: string | null,
  grandparentSlug?: string | null,
): string {
  const base = PATHS.onlineCourses
  if (grandparentSlug && parentSlug) {
    return `${base}/${grandparentSlug}/${parentSlug}/${slug}`
  }
  if (parentSlug) return `${base}/${parentSlug}/${slug}`
  return `${base}/${slug}`
}

export function servicePath(slug: string, parentSlug?: string | null): string {
  const base = PATHS.services
  const leaf = slug.toLowerCase()
  const parent = parentSlug?.toLowerCase()
  if (parent) return `${base}/${parent}/${leaf}`
  return `${base}/${leaf}`
}

export function articlePath(slug: string): string {
  return `${PATHS.articles}/${slug}`
}

/** Strip trailing slashes for href equality (keeps `/`). */
export function normalizeHref(href: string): string {
  if (!href || href === '/') return href || '/'
  return href.replace(/\/+$/, '')
}

export function breadcrumbHref(basePath: string, ancestry: { slug: string }[], index: number): string {
  return `${basePath}/${ancestry
    .slice(0, index + 1)
    .map((item) => item.slug)
    .join('/')}`
}

/** Normalize catch-all params — Next may pass string[] or a slash-joined string. */
export function normalizeCatchAllSlug(slug: string | string[] | undefined): string[] {
  if (!slug) return []
  if (Array.isArray(slug)) return slug.filter(Boolean)
  return slug.split('/').filter(Boolean)
}

/** Parse catch-all route params into segments + leaf slug. */
export function parseCatchAllSlug(rawSlug: string | string[] | undefined): {
  segments: string[]
  leafSlug: string | null
} {
  const segments = normalizeCatchAllSlug(rawSlug)
  return { segments, leafSlug: segments.at(-1) ?? null }
}

/** Relative path under a section root (for JSON-LD slugPath). */
export function sectionRelativePath(sectionPath: string, canonicalPath: string): string {
  const prefix = `${sectionPath}/`
  if (canonicalPath.startsWith(prefix)) return canonicalPath.slice(prefix.length)
  return canonicalPath.replace(/^\//, '')
}

/** Expected catch-all segments: [...ancestorSlugs, leafSlug]. */
export function expectedSlugSegmentsFromAncestry(
  ancestry: { slug: string }[],
  leafSlug: string,
): string[] {
  return [...ancestry.map((a) => a.slug), leafSlug]
}

/** Canonical path for a nested CMS leaf under a section. */
export function expectedPathFromAncestry(
  sectionPath: string,
  ancestry: { slug: string }[],
  leafSlug: string,
): string {
  return `${sectionPath}/${expectedSlugSegmentsFromAncestry(ancestry, leafSlug).join('/')}`
}

/** True when the URL slug array matches the CMS parent chain + leaf. */
export function assertSlugAncestry(
  urlSlugs: string[],
  ancestry: { slug: string }[],
  leafSlug: string,
): boolean {
  const expected = expectedSlugSegmentsFromAncestry(ancestry, leafSlug)
  return (
    urlSlugs.length === expected.length &&
    urlSlugs.every((segment, i) => segment === expected[i])
  )
}

export type BreadcrumbAncestryItem = { title: string; slug: string }

type LeafCanonicalDoc = {
  slug?: { current?: string }
  parent?: AncestryNode | null
}

/**
 * Resolve leaf slug + ancestry + canonical path, or null when URL ancestry is wrong.
 * Shared by course/service catch-all routes.
 */
export function resolveLeafCanonical(
  sectionPath: string,
  urlSlugs: string[],
  doc: LeafCanonicalDoc,
): { leafSlug: string; ancestry: BreadcrumbAncestryItem[]; canonicalPath: string } | null {
  const leafSlug = doc.slug?.current ?? urlSlugs[urlSlugs.length - 1]
  if (!leafSlug) return null
  const ancestry = ancestryFromParent(doc)
  if (!assertSlugAncestry(urlSlugs, ancestry, leafSlug)) return null
  return {
    leafSlug,
    ancestry,
    canonicalPath: expectedPathFromAncestry(sectionPath, ancestry, leafSlug),
  }
}

/** Map ancestry slugs to labels for JSON-LD breadcrumb schema. */
export function breadcrumbLabelsFromAncestry(
  ancestry: BreadcrumbAncestryItem[],
): Record<string, string> {
  return Object.fromEntries(ancestry.map((item) => [item.slug, item.title]))
}

/** Build BreadcrumbNav items from section path + ancestry + current page title. */
export function buildBreadcrumbNavItems(
  sectionPath: string,
  ancestry: BreadcrumbAncestryItem[],
  currentTitle: string,
): Array<{ label: string; href?: string }> {
  return [
    ...ancestry.map(({ title }, i) => ({
      label: title,
      href: breadcrumbHref(sectionPath, ancestry, i),
    })),
    { label: currentTitle },
  ]
}

/** Resolve a topic-cluster pillar reference to a site path. */
export function pillarPagePath(pillar?: TopicClusterPillarPage | null): string | null {
  if (!pillar?.slug) return null
  if (pillar._type === 'page') return `/${pillar.slug}`
  if (pillar._type === 'course') {
    return coursePath(pillar.slug, pillar.parentSlug, pillar.grandparentSlug)
  }
  if (pillar._type === 'service') {
    return servicePath(pillar.slug, pillar.parentSlug)
  }
  return null
}
