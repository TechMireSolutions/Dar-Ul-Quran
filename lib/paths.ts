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
