import { notFound } from 'next/navigation'
import {
  parseCatchAllSlug,
  resolveLeafCanonical,
  type BreadcrumbAncestryItem,
} from '@/lib/paths'
import { mergeFaqForDisplay, mergeFaqItems, type FaqDisplayItem } from '@/lib/topicCluster'
import type { FaqSchemaItem } from '@/lib/types'

type LeafDoc = {
  slug?: { current?: string }
  parent?: {
    title: string
    slug: string
    parent?: LeafDoc['parent']
  } | null
}

/**
 * Shared catch-all leaf load: parse slug → fetch → assert ancestry → canonical path.
 * Calls `notFound()` when the URL or document is invalid.
 */
export async function loadCatchAllLeaf<T extends LeafDoc>(
  rawSlug: string | string[],
  sectionPath: string,
  getBySlug: (slug: string) => Promise<T | null>,
): Promise<{
  doc: T
  leafSlug: string
  ancestry: BreadcrumbAncestryItem[]
  canonicalPath: string
}> {
  const { segments, leafSlug } = parseCatchAllSlug(rawSlug)
  if (!leafSlug) notFound()

  const doc = await getBySlug(leafSlug)
  if (!doc) notFound()

  const resolved = resolveLeafCanonical(sectionPath, segments, doc)
  if (!resolved) notFound()

  return {
    doc,
    leafSlug: resolved.leafSlug,
    ancestry: resolved.ancestry,
    canonicalPath: resolved.canonicalPath,
  }
}

/** Merge page + cluster FAQs for JSON-LD and visible accordion (same question set). */
export function mergeLeafFaqs(
  pageFaq: FaqDisplayItem[] | undefined,
  pageFaqItems: FaqSchemaItem[] | undefined,
  clusterFaq: FaqSchemaItem[] | undefined,
): {
  faqItems: FaqSchemaItem[] | undefined
  faqDisplayItems: FaqDisplayItem[]
} {
  return {
    faqItems: mergeFaqItems(pageFaqItems, clusterFaq),
    faqDisplayItems: mergeFaqForDisplay(pageFaq, clusterFaq),
  }
}
