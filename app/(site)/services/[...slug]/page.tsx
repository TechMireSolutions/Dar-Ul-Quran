import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { connection } from 'next/server'
import { urlFor, ogImageUrl, leafHeroImageUrl } from '@/sanity/lib/image'
import { getServiceBySlug, getSiteSettings, getTopicClusterForPillar, getAllServicePaths } from '@/sanity/lib/fetchers'
import ServiceSchema from '@/components/seo/ServiceSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import NestedChildListing from '@/components/content/NestedChildListing'
import ServiceLeafPage from './_components/ServiceLeafPage'
import {
  ancestryFromParent,
  assertSlugAncestry,
  breadcrumbLabelsFromAncestry,
  buildBreadcrumbNavItems,
  expectedPathFromAncestry,
  staticParamsFromPaths,
} from '@/lib/paths'
import { resolveWhatsappLink } from '@/lib/contact'
import { mergeFaqItems } from '@/lib/topicCluster'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

const SECTION_PATH = '/services'

export async function generateStaticParams() {
  const paths = await getAllServicePaths()
  return staticParamsFromPaths(paths)
}

function serviceCanonical(
  slug: string[],
  service: { slug?: { current?: string }; parent?: Parameters<typeof ancestryFromParent>[0]['parent'] },
) {
  const leafSlug = service.slug?.current ?? slug[slug.length - 1]
  const ancestry = ancestryFromParent(service)
  return {
    leafSlug,
    ancestry,
    canonicalPath: expectedPathFromAncestry(SECTION_PATH, ancestry, leafSlug),
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await params
  const currentSlug = slug[slug.length - 1]
  const [service, settings] = await Promise.all([
    getServiceBySlug(currentSlug),
    getSiteSettings(),
  ])
  if (!service) notFound()

  const { canonicalPath } = serviceCanonical(slug, service)
  const title = service.seoTitle || service.title || 'خدمت'
  const description =
    service.seoDescription ||
    service.excerpt ||
    `${title} — دار القرآن کی مذہبی خدمات۔`
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
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const currentSlug = slug[slug.length - 1]

  const service = await getServiceBySlug(currentSlug)
  if (!service) notFound()

  const { leafSlug, ancestry, canonicalPath: currentPath } = serviceCanonical(slug, service)
  if (!assertSlugAncestry(slug, ancestry, leafSlug)) {
    await connection()
    permanentRedirect(currentPath)
  }

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
    service.seoDescription || service.excerpt || `${serviceTitle} — دار القرآن کی مذہبی خدمات۔`

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
