import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { CalendarDays, User } from 'lucide-react'
import { getPostBySlug, getSiteSettings, getTopicClusterForPost, getPostSlugs } from '@/sanity/lib/fetchers'
import { urlFor, ogImageUrl } from '@/sanity/lib/image'
import RichTextBody from '@/components/content/RichTextBody'
import ArticleSchema from '@/components/seo/ArticleSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import WebPageSchema from '@/components/seo/WebPageSchema'
import TopicClusterRelated from '@/components/content/TopicClusterRelated'
import { TW_ARTICLE_TITLE, TW_BADGE, TW_CONTAINER_NARROW } from '@/lib/tailwind'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSiteSettings()])
  const title = post?.seoTitle ?? post?.title ?? 'مضمون'
  const description = post?.seoDescription ?? post?.excerpt
  const image = post?.mainImage ? ogImageUrl(post.mainImage) : null

  return pageMetadata({
    title,
    description,
    path: `/articles/${slug}`,
    image,
    imageAlt: post?.mainImage?.alt ?? title,
    type: 'article',
    settings,
    publishedTime: post?.publishedAt ?? undefined,
    modifiedTime: post?._updatedAt ?? undefined,
    authors: post?.author?.name ? [post.author.name] : undefined,
  })
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const [settings, cluster] = await Promise.all([
    getSiteSettings(),
    getTopicClusterForPost(post._id),
  ])

  const publisherLogoUrl = settings?.logo
    ? urlFor(settings.logo).width(512).height(512).url()
    : undefined

  const pageTitle = post.seoTitle ?? post.title ?? 'مضمون'

  return (
    <div className="min-h-screen bg-white">
      <ArticleSchema post={post} slug={slug} publisherLogoUrl={publisherLogoUrl} />
      <WebPageSchema
        title={pageTitle}
        description={post.seoDescription ?? post.excerpt}
        path={`/articles/${slug}`}
      />

      <BreadcrumbNav
        sectionLabel="مضامین"
        sectionHref="/articles"
        items={[{ label: pageTitle }]}
      />

      <article className={`${TW_CONTAINER_NARROW} lg:px-8 py-8 sm:py-12`}>

        {(post.categories?.length ?? 0) > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
            {post.categories!.map((cat) => (
              <span key={cat._id}
                className={TW_BADGE}>
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
              {new Date(post.publishedAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
        </div>

        {post.mainImage && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] rounded-xl sm:rounded-2xl overflow-hidden mb-8 sm:mb-10 shadow-sm">
            <Image
              src={urlFor(post.mainImage).width(900).height(500).url()}
              alt={post.mainImage.alt ?? pageTitle}
              fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover"
            />
          </div>
        )}

        {post.body && <RichTextBody value={post.body} />}

        <TopicClusterRelated
          clusterName={cluster?.clusterName}
          pillarKeyword={cluster?.pillarKeyword}
          pillarPage={cluster?.pillarPage}
          relatedArticles={cluster?.relatedArticles}
          currentSlug={slug}
        />

      </article>
    </div>
  )
}
