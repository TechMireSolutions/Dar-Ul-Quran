import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { urlFor, ogImageUrl, leafHeroImageUrl } from '@/sanity/lib/image'
import { getServiceBySlug, getSiteSettings, getTopicClusterForPillar, getAllServicePaths } from '@/sanity/lib/fetchers'
import ServiceSchema from '@/components/seo/ServiceSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import NestedChildListing from '@/components/content/NestedChildListing'
import ServiceLeafPage from './_components/ServiceLeafPage'
import {
  breadcrumbLabelsFromAncestry,
  buildBreadcrumbNavItems,
  normalizeCatchAllSlug,
  PATHS,
  resolveLeafCanonical,
  staticParamsFromPaths,
} from '@/lib/paths'
import { resolveWhatsappLink } from '@/lib/contact'
import { mergeFaqItems } from '@/lib/topicCluster'
import { pageMetadata, DEFAULT_SITE_NAME_URDU } from '@/lib/seo'

export const revalidate = 300

const SECTION_PATH = PATHS.services

export async function generateStaticParams() {
  const paths = await getAllServicePaths()
  return staticParamsFromPaths(paths)
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string | string[] }> }
): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const slug = normalizeCatchAllSlug(rawSlug)
  const currentSlug = slug[slug.length - 1]
  if (!currentSlug) notFound()
  const [service, settings] = await Promise.all([
    getServiceBySlug(currentSlug),
    getSiteSettings(),
  ])
  if (!service) notFound()

  const resolved = resolveLeafCanonical(SECTION_PATH, slug, service)
  if (!resolved) notFound()
  const { canonicalPath } = resolved
  const title = service.seoTitle || service.title || 'خدمت'
  const description =
    service.seoDescription ||
    service.excerpt ||
    `${title} — ${DEFAULT_SITE_NAME_URDU} کی مذہبی خدمات۔`
  const image = service.featuredImage
    ? ogImageUrl(service.featuredImage)
    : service.icon
      ? ogImageUrl(service.icon)
      : null

  return pageMetadata({
    title,
    description,
    path: canonicalPath,
    image,
    imageAlt: title,
    settings,
  })
}

export default async function ServiceCatchAllPage(
  { params }: { params: Promise<{ slug: string | string[] }> }
) {
  // Prevent wrong-parent URLs from sharing a statically cached leaf response.
  noStore()
  const { slug: rawSlug } = await params
  const slug = normalizeCatchAllSlug(rawSlug)
  const currentSlug = slug[slug.length - 1]
  if (!currentSlug) notFound()

  const service = await getServiceBySlug(currentSlug)
  if (!service) notFound()

  const resolved = resolveLeafCanonical(SECTION_PATH, slug, service)
  if (!resolved) notFound()
  const { ancestry, canonicalPath: currentPath } = resolved

  const [site, cluster] = await Promise.all([
    getSiteSettings(),
    getTopicClusterForPillar(service._id),
  ])

  const hasChildren = (service.children?.length ?? 0) > 0
  const heroImageUrl = service.heroImage ? leafHeroImageUrl(service.heroImage) : null
  const whyUsImageUrl = service.whyUsImage ? urlFor(service.whyUsImage).width(700).height(700).auto('format').url() : null
  const whatsappLink = resolveWhatsappLink(site?.whatsapp)

  const serviceTitle = service.title ?? 'خدمت'
  const pageDescription =
    service.seoDescription || service.excerpt || `${serviceTitle} — ${DEFAULT_SITE_NAME_URDU} کی مذہبی خدمات۔`

  return (
    <div>
      <WebPageSchema title={serviceTitle} description={pageDescription} path={currentPath} />
      <ServiceSchema
        data={{
          title: serviceTitle,
          seoDescription: service.seoDescription,
          excerpt: service.excerpt,
          slugPath: currentPath.replace(`${SECTION_PATH}/`, ''),
          price: service.price,
          isBookable: service.isBookable,
          faqItems: mergeFaqItems(service.faqItems, cluster?.faqItems),
          orgName: site?.siteName,
          breadcrumbLabels: breadcrumbLabelsFromAncestry(ancestry),
        }}
      />

      <BreadcrumbNav
        sectionLabel="خدمات"
        sectionHref={SECTION_PATH}
        items={buildBreadcrumbNavItems(SECTION_PATH, ancestry, serviceTitle)}
      />

      {hasChildren ? (
        <NestedChildListing
          eyebrow="خدمات"
          title={serviceTitle}
          excerpt={service.excerpt}
          basePath={currentPath}
          items={service.children ?? []}
          imageField="icon"
          parentCtaLabel="خدمات دیکھیں"
          leafCtaLabel="مزید جانیں"
          formatDescription={(child) => child.excerpt || child.price || null}
        />
      ) : (
        <ServiceLeafPage
          service={service}
          cluster={cluster}
          heroImageUrl={heroImageUrl}
          whyUsImageUrl={whyUsImageUrl}
          whatsappLink={whatsappLink}
        />
      )}
    </div>
  )
}
