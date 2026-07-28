import Image from 'next/image'
import { CalendarDays, User } from 'lucide-react'
import RichTextBody from '@/components/content/RichTextBody'
import LeafTopicClusterBlock from '@/components/content/LeafTopicClusterBlock'
import { TW_ARTICLE_TITLE, TW_BADGE, TW_CONTAINER_NARROW } from '@/lib/tailwind'
import { formatPublishedDate } from '@/lib/format-date'
import { articleFeaturedImageUrl } from '@/sanity/lib/image'
import type { PostDoc, TopicClusterDoc } from '@/lib/types'

type ArticleDetailProps = {
  post: PostDoc
  slug: string
  cluster: TopicClusterDoc | null
}

export default function ArticleDetail({ post, slug, cluster }: ArticleDetailProps) {
  const pageTitle = post.title ?? 'مضمون'

  return (
    <article className={`${TW_CONTAINER_NARROW} lg:px-8 py-8 sm:py-12`}>
      {(post.categories?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
          {post.categories!.map((cat) => (
            <span key={cat._id} className={TW_BADGE}>
              {cat.title}
            </span>
          ))}
        </div>
      )}

      <h1 className={`${TW_ARTICLE_TITLE} mb-4 sm:mb-5`}>
        {pageTitle}
      </h1>

      <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-[12.5px] sm:text-[13px] text-gray-400 mb-8 pb-7 border-b border-gray-100">
        {post.author?.name && (
          <span className="flex items-center gap-1.5">
            <User size={13} strokeWidth={2} />
            <span className="font-medium text-gray-600">{post.author.name}</span>
          </span>
        )}
        {post.publishedAt && (
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} strokeWidth={2} />
            {formatPublishedDate(post.publishedAt)}
          </span>
        )}
      </div>

      {post.mainImage && (
        <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] rounded-xl sm:rounded-2xl overflow-hidden mb-8 sm:mb-10 shadow-sm">
          <Image
            src={articleFeaturedImageUrl(post.mainImage)}
            alt={post.mainImage.alt ?? pageTitle}
            fill
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      )}

      {post.body && <RichTextBody value={post.body} />}

      <LeafTopicClusterBlock cluster={cluster} currentSlug={slug} inline />
    </article>
  )
}
