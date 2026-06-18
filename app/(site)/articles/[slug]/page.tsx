import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { CalendarDays, User } from 'lucide-react'
import { getPostBySlug, getSiteSettings, getTopicClusterForPost, getPostSlugs } from '@/sanity/lib/fetchers'
import { urlFor, ogImageUrl } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import ArticleSchema from '@/components/seo/ArticleSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import WebPageSchema from '@/components/seo/WebPageSchema'
import TopicClusterRelated from '@/components/content/TopicClusterRelated'
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

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {(post.categories?.length ?? 0) > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
            {post.categories!.map((cat) => (
              <span key={cat._id}
                className="text-[10.5px] font-bold uppercase tracking-[0.1em] bg-dq-50 text-dq-700 border border-dq-100 px-3 py-1 rounded-full">
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-bold text-[26px] sm:text-[30px] lg:text-[38px] text-slate-900 leading-[1.12] tracking-[-0.02em] mb-4 sm:mb-5">
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

        {post.body && (
          <div className="prose prose-slate prose-base sm:prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
            prose-p:text-gray-700 prose-p:leading-[1.8]
            prose-a:text-dq-500 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 prose-strong:font-semibold
            prose-blockquote:border-l-4 prose-blockquote:border-dq-400 prose-blockquote:text-slate-600 prose-blockquote:not-italic
            prose-li:text-gray-700">
            <PortableText value={post.body} />
          </div>
        )}

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
