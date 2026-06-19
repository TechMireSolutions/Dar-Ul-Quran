import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import ContentCard from '@/components/ui/ContentCard'
import Reveal from '@/components/ui/Reveal'
import type { HomepageSettingsDoc, PostListItemDoc } from '@/lib/types'
import {
  TW_CTA_ARROW,
  TW_CV_AUTO,
  TW_EYEBROW,
  TW_EYEBROW_LINE,
  TW_SECTION_TITLE_COMPACT,
  TW_VIEW_ALL_LINK,
} from '@/lib/tailwind'

type HomeArticlesSectionProps = {
  posts: PostListItemDoc[] | null | undefined
  settings?: HomepageSettingsDoc | null
}

export default function HomeArticlesSection({ posts, settings }: HomeArticlesSectionProps) {
  if (!posts?.length) return null

  return (
    <section className={`py-10 md:py-16 border-b border-gray-100 bg-white ${TW_CV_AUTO}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal animation="up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7 sm:mb-10">
            <div>
              <p className={`${TW_EYEBROW} mb-2`}>
                <span className={`${TW_EYEBROW_LINE} w-6`} />
                علم
              </p>
              <h2 className={TW_SECTION_TITLE_COMPACT}>
                {settings?.articlesHeading || 'تازہ ترین مضامین'}
              </h2>
              {settings?.articlesSubheading && (
                <p className="text-[13px] text-gray-500 mt-1.5">{settings.articlesSubheading}</p>
              )}
            </div>
            <Link
              href="/articles"
              className={`${TW_VIEW_ALL_LINK} shrink-0 sm:ms-6`}
            >
              سب دیکھیں
              <ArrowRight size={13} strokeWidth={2.5} className={TW_CTA_ARROW} />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post._id} animation="up" delay={i * 80}>
              <ContentCard
                href={`/articles/${post.slug?.current ?? ''}`}
                image={post.mainImage ? urlFor(post.mainImage).width(600).height(450).url() : null}
                title={post.title ?? ''}
                description={post.excerpt || null}
                badge={post.categories?.[0]?.title || null}
                ctaLabel="مزید پڑھیں"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
