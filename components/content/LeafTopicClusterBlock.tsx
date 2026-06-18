import TopicClusterRelated from '@/components/content/TopicClusterRelated'
import type { TopicClusterDoc } from '@/lib/types'

type LeafTopicClusterBlockProps = {
  cluster: TopicClusterDoc | null
}

export default function LeafTopicClusterBlock({ cluster }: LeafTopicClusterBlockProps) {
  if (!cluster) return null

  return (
    <section className="bg-white pb-12 sm:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <TopicClusterRelated
          clusterName={cluster.clusterName}
          pillarKeyword={cluster.pillarKeyword}
          relatedArticles={cluster.relatedArticles}
        />
      </div>
    </section>
  )
}
