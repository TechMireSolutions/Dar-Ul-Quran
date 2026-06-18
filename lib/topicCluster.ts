import type { FaqSchemaItem } from '@/lib/types'

/** Merge cluster FAQs into page FAQs without duplicate questions. */
export function mergeFaqItems(
  pageItems: FaqSchemaItem[] | undefined,
  clusterItems: FaqSchemaItem[] | undefined,
): FaqSchemaItem[] | undefined {
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
