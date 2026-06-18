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
