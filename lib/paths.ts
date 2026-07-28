type ParentSlugNode = { slug: string; parent?: ParentSlugNode | null } | null | undefined

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
      parent = parent.parent
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
  if (grandparentSlug && parentSlug) {
    return `/online-courses/${grandparentSlug}/${parentSlug}/${slug}`
  }
  if (parentSlug) return `/online-courses/${parentSlug}/${slug}`
  return `/online-courses/${slug}`
}

export function servicePath(slug: string, parentSlug?: string | null): string {
  if (parentSlug) return `/services/${parentSlug}/${slug}`
  return `/services/${slug}`
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

type PillarPage = {
  _type?: string
  slug?: string
  parentSlug?: string | null
  grandparentSlug?: string | null
}

/** Resolve a topic-cluster pillar reference to a site path. */
export function pillarPagePath(pillar?: PillarPage | null): string | null {
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
