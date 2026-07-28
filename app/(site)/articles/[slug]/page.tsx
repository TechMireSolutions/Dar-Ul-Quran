import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getSiteSettings, getTopicClusterForPost, getPostSlugs } from '@/sanity/lib/fetchers'
import { urlFor, ogImageUrl, defaultOgImage } from '@/sanity/lib/image'
import ArticleSchema from '@/components/seo/ArticleSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import WebPageSchema from '@/components/seo/WebPageSchema'
import ArticleDetail from './_components/ArticleDetail'
import { resolveLeafDescription } from '@/lib/cmsPage'
import { articlePath, PATHS } from '@/lib/paths'
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
  const description = resolveLeafDescription(post, '')
  const image = post?.mainImage ? ogImageUrl(post.mainImage) : defaultOgImage(settings)

  return pageMetadata({
    title,
    description: description || undefined,
    path: articlePath(slug),
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

  const pageTitle = post.title ?? 'مضمون'
  const schemaTitle = post.seoTitle ?? pageTitle
  const path = articlePath(slug)

  return (
    <div className="min-h-screen bg-white">
      <ArticleSchema post={post} slug={slug} publisherLogoUrl={publisherLogoUrl} />
      <WebPageSchema
        title={schemaTitle}
        description={resolveLeafDescription(post, '') || undefined}
        path={path}
      />

      <BreadcrumbNav
        sectionLabel="مضامین"
        sectionHref={PATHS.articles}
        items={[{ label: pageTitle }]}
      />

      <ArticleDetail post={post} slug={slug} cluster={cluster} />
    </div>
  )
}
