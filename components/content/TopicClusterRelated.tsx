import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pillarPagePath } from '@/lib/topicCluster'

type RelatedArticle = {
  _id: string
  title: string
  slug: string
  excerpt?: string
}

type PillarPage = Parameters<typeof pillarPagePath>[0]

type TopicClusterRelatedProps = {
  clusterName?: string
  pillarKeyword?: string
  pillarPage?: PillarPage | null
  relatedArticles?: RelatedArticle[]
  currentSlug?: string
}

export default function TopicClusterRelated({
  clusterName,
  pillarKeyword,
  pillarPage,
  relatedArticles,
  currentSlug,
}: TopicClusterRelatedProps) {
  const pillarHref = pillarPagePath(pillarPage)
  const articles = (relatedArticles ?? []).filter((a) => a.slug !== currentSlug)

  if (!pillarHref && articles.length === 0) return null

  return (
    <aside className="mt-12 pt-8 border-t border-gray-100">
      <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">
        <span className="w-5 h-px bg-dq-400 inline-block" />
        {clusterName || pillarKeyword || 'متعلقہ موضوعات'}
      </p>

      {pillarHref && pillarPage?.title && (
        <Link
          href={pillarHref}
          className="group flex items-center justify-between gap-3 bg-dq-50 border border-dq-100 rounded-xl px-4 py-3.5 mb-4 hover:bg-dq-100/60 transition-colors"
        >
          <span className="text-[14px] font-semibold text-slate-900">{pillarPage.title}</span>
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="shrink-0 text-dq-600 rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform"
          />
        </Link>
      )}

      {articles.length > 0 && (
        <ul className="space-y-2">
          {articles.map((article) => (
            <li key={article._id}>
              <Link
                href={`/articles/${article.slug}`}
                className="block rounded-xl border border-gray-100 bg-slate-50/60 px-4 py-3 hover:border-dq-100 hover:bg-dq-50/40 transition-colors"
              >
                <span className="font-medium text-[14px] text-slate-900">{article.title}</span>
                {article.excerpt && (
                  <p className="text-[12.5px] text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
