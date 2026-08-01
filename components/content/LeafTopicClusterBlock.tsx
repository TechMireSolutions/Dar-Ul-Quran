import TopicClusterRelated from '@/components/content/TopicClusterRelated'
import type { TopicClusterDoc } from '@/lib/types'
import { TW_CONTAINER_NARROW } from '@/lib/tailwind'

type LeafTopicClusterBlockProps = {
  cluster: TopicClusterDoc | null
  /** Exclude the current article from related links. */
  currentSlug?: string
  /**
   * When true, skip the outer section/container — use inside article prose
   * that already provides layout.
   */
  inline?: boolean
}

export default function LeafTopicClusterBlock({
  cluster,
  currentSlug,
  inline = false,
}: LeafTopicClusterBlockProps) {
  if (!cluster) return null

  const related = (
    <TopicClusterRelated
      clusterName={cluster.clusterName}
      pillarKeyword={cluster.pillarKeyword}
      pillarPage={cluster.pillarPage}
      relatedArticles={cluster.relatedArticles}
      currentSlug={currentSlug}
    />
  )

  if (inline) return related

  return (
    <section className="bg-white dark:bg-slate-800/40 transition-colors pb-12 sm:pb-16">
      <div className={TW_CONTAINER_NARROW}>{related}</div>
    </section>
  )
}
