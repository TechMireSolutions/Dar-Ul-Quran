import TopicClusterRelated from '@/components/content/TopicClusterRelated'
import type { TopicClusterDoc } from '@/lib/types'
import { TW_CONTAINER_NARROW } from '@/lib/tailwind'

type LeafTopicClusterBlockProps = {
  cluster: TopicClusterDoc | null
}

export default function LeafTopicClusterBlock({ cluster }: LeafTopicClusterBlockProps) {
  if (!cluster) return null

  return (
    <section className="bg-white pb-12 sm:pb-16">
      <div className={TW_CONTAINER_NARROW}>
        <TopicClusterRelated
          clusterName={cluster.clusterName}
          pillarKeyword={cluster.pillarKeyword}
          relatedArticles={cluster.relatedArticles}
        />
      </div>
    </section>
  )
}
