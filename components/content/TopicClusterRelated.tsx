import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pillarPagePath } from '@/lib/paths'
import { TW_CTA_ARROW, TW_EYEBROW, TW_EYEBROW_LINE } from '@/lib/tailwind'

type RelatedArticle = {
  _id: string
  title: string
  slug: string
  excerpt?: string
}

type PillarPage = {
  title?: string
  _type?: string
  slug?: string
  parentSlug?: string | null
  grandparentSlug?: string | null
}

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
      <p className={`${TW_EYEBROW} mb-3`}>
        <span className={TW_EYEBROW_LINE} />
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
            className={`shrink-0 text-dq-700 ${TW_CTA_ARROW}`}
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
