import type { FaqSchemaItem } from '@/lib/types'

export type FaqDisplayItem = {
  question: string
  /** Portable Text blocks or plain string (cluster FAQs). */
  answer?: unknown
}

function questionKey(question: string): string {
  return question.trim().toLowerCase()
}

/** Merge cluster FAQs into page FAQs without duplicate questions (JSON-LD). */
export function mergeFaqItems(
  pageItems: FaqSchemaItem[] | undefined,
  clusterItems: FaqSchemaItem[] | undefined,
): FaqSchemaItem[] | undefined {
  if (!clusterItems?.length) return pageItems
  if (!pageItems?.length) return clusterItems

  const seen = new Set(pageItems.map((item) => questionKey(item.question)))
  const merged = [...pageItems]
  for (const item of clusterItems) {
    const key = questionKey(item.question)
    if (!seen.has(key)) {
      seen.add(key)
      merged.push(item)
    }
  }
  return merged
}

/**
 * Merge page FAQ blocks (Portable Text answers) with cluster string FAQs for visible UI.
 * Schema and accordion must use the same question set.
 */
export function mergeFaqForDisplay(
  pageItems: FaqDisplayItem[] | undefined,
  clusterItems: FaqSchemaItem[] | undefined,
): FaqDisplayItem[] {
  const page = pageItems?.length ? [...pageItems] : []
  if (!clusterItems?.length) return page

  const seen = new Set(page.map((item) => questionKey(item.question)))
  for (const item of clusterItems) {
    const key = questionKey(item.question)
    if (!seen.has(key)) {
      seen.add(key)
      page.push(item)
    }
  }
  return page
}
