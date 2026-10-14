import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getPublicationBySlug,
  getPublications,
  getPublicationSlugs,
  getSiteSettings,
} from '@/sanity/lib/fetchers'
import { defaultOgImage, ogImageUrl, urlFor } from '@/sanity/lib/image'
import BookSchema from '@/components/seo/BookSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PublicationDetail from './_components/PublicationDetail'
import { PATHS, publicationPath, SECTION_LABELS } from '@/lib/paths'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await getPublicationSlugs()
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const [publication, settings] = await Promise.all([
    getPublicationBySlug(slug),
    getSiteSettings(),
  ])

  if (!publication) {
    return {
      title: 'اشاعت نہیں ملی',
    }
  }

  const title = publication.title ?? 'کتاب'
  const description =
    publication.description?.slice(0, 160) ||
    `${title} — دار القرآن کی مطبوعات اور کتب سے استفادہ کریں۔`
  const image = publication.coverImage
    ? ogImageUrl(publication.coverImage)
    : defaultOgImage(settings)

  return pageMetadata({
    title,
    description,
    path: publicationPath(slug),
    image,
    imageAlt: title,
    type: 'website',
    settings,
    publishedTime: publication.publishedAt ?? undefined,
    modifiedTime: publication._updatedAt ?? undefined,
    authors: publication.author ? [publication.author] : undefined,
  })
}

export default async function PublicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [publication, allPublications, settings] = await Promise.all([
    getPublicationBySlug(slug),
    getPublications(),
    getSiteSettings(),
  ])

  if (!publication) notFound()

  const publisherLogoUrl = settings?.logo
    ? urlFor(settings.logo).width(512).height(512).url()
    : undefined

  const pageTitle = publication.title ?? 'کتاب'
  const path = publicationPath(slug)
  const otherPublications = (allPublications ?? [])
    .filter((p) => p._id !== publication._id && p.slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <BookSchema
        publication={publication}
        slug={slug}
        publisherLogoUrl={publisherLogoUrl}
      />
      <WebPageSchema
        title={pageTitle}
        description={publication.description || undefined}
        path={path}
      />

      <BreadcrumbNav
        sectionLabel={SECTION_LABELS.publications}
        sectionHref={PATHS.publications}
        items={[{ label: pageTitle }]}
      />

      <PublicationDetail
        publication={publication}
        otherPublications={otherPublications}
      />
    </div>
  )
}
