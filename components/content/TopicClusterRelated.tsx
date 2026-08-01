import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { articlePath, pillarPagePath } from '@/lib/paths'
import { TW_CTA_ARROW, TW_EYEBROW, TW_EYEBROW_LINE, TW_FEATURE_CARD_DESC } from '@/lib/tailwind'
import type { TopicClusterPillarPage, TopicClusterRelatedArticle } from '@/lib/types'

type TopicClusterRelatedProps = {
  clusterName?: string
  pillarKeyword?: string
  pillarPage?: TopicClusterPillarPage | null
  relatedArticles?: TopicClusterRelatedArticle[]
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
    <aside className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-700 transition-colors">
      <p className={`${TW_EYEBROW} mb-3`}>
        <span className={TW_EYEBROW_LINE} />
        {clusterName || pillarKeyword || 'متعلقہ موضوعات'}
      </p>

      {pillarHref && pillarPage?.title && (
        <Link
          href={pillarHref}
          className="group flex min-h-11 items-center justify-between gap-3 bg-dq-50 dark:bg-slate-800/80 border border-dq-100 dark:border-slate-700 rounded-xl px-4 py-3.5 mb-4 hover:bg-dq-100/60 dark:hover:bg-slate-800 focus-visible:bg-dq-100/60 dark:focus-visible:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50 transition-colors"
        >
          <span className="text-[14px] font-semibold text-slate-900 dark:text-white transition-colors">{pillarPage.title}</span>
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className={`shrink-0 text-dq-700 ${TW_CTA_ARROW}`}
          />
        </Link>
      )}

      {articles.length > 0 && (
        <ul className="space-y-2">
          {articles.map((article) => (
            <li key={article._id}>
              <Link
                href={articlePath(article.slug)}
                className="block min-h-11 rounded-xl border border-gray-100 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/60 px-4 py-3 hover:border-dq-100 dark:hover:border-slate-600 hover:bg-dq-50/40 dark:hover:bg-slate-800/80 focus-visible:border-dq-100 dark:focus-visible:border-slate-600 focus-visible:bg-dq-50/40 dark:focus-visible:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50 transition-colors"
              >
                <span className="font-medium text-[14px] text-slate-900 dark:text-white transition-colors">{article.title}</span>
                {article.excerpt && (
                  <p className={`${TW_FEATURE_CARD_DESC} mt-1 line-clamp-2`}>{article.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
