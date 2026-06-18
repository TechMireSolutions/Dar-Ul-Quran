type PillarPage = {
  _type?: string
  title?: string
  slug?: string
  parentSlug?: string
  grandparentSlug?: string
}

/** Resolve a topic-cluster pillar reference to a site path. */
export function pillarPagePath(pillar?: PillarPage | null): string | null {
  if (!pillar?.slug) return null

  if (pillar._type === 'page') return `/${pillar.slug}`

  if (pillar._type === 'course') {
    if (pillar.grandparentSlug && pillar.parentSlug) {
      return `/online-courses/${pillar.grandparentSlug}/${pillar.parentSlug}/${pillar.slug}`
    }
    if (pillar.parentSlug) return `/online-courses/${pillar.parentSlug}/${pillar.slug}`
    return `/online-courses/${pillar.slug}`
  }

  if (pillar._type === 'service') {
    if (pillar.parentSlug) return `/services/${pillar.parentSlug}/${pillar.slug}`
    return `/services/${pillar.slug}`
  }

  return null
}

type FaqItem = { question: string; answer: string }

/** Merge cluster FAQs into page FAQs without duplicate questions. */
export function mergeFaqItems(
  pageItems: FaqItem[] | undefined,
  clusterItems: FaqItem[] | undefined,
): FaqItem[] | undefined {
  if (!clusterItems?.length) return pageItems
  if (!pageItems?.length) return clusterItems

  const seen = new Set(pageItems.map((item) => item.question.trim().toLowerCase()))
  const merged = [...pageItems]
  for (const item of clusterItems) {
    const key = item.question.trim().toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      merged.push(item)
    }
  }
  return merged
}
