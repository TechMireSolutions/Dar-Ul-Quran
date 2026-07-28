import type { Metadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache'
import { ogImageUrl, leafHeroImageUrl, leafSquareImageUrl, defaultOgImage } from '@/sanity/lib/image'
import { getServiceBySlug, getSiteSettings, getTopicClusterForPillar, getAllServicePaths } from '@/sanity/lib/fetchers'
import ServiceSchema from '@/components/seo/ServiceSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import NestedChildListing from '@/components/content/NestedChildListing'
import ServiceLeafPage from './_components/ServiceLeafPage'
import {
  breadcrumbLabelsFromAncestry,
  buildBreadcrumbNavItems,
  PATHS,
  SECTION_LABELS,
  sectionRelativePath,
  staticParamsFromPaths,
} from '@/lib/paths'
import { loadCatchAllLeaf, mergeLeafFaqs } from '@/lib/leafRoute'
import { resolveWhatsappLink } from '@/lib/contact'
import { defaultServiceDescription, resolveLeafDescription, serviceCtaLabel } from '@/lib/cmsPage'
import { pageMetadata, resolveOgImage } from '@/lib/seo'

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
  const [{ doc: service, canonicalPath }, settings] = await Promise.all([
    loadCatchAllLeaf(rawSlug, SECTION_PATH, getServiceBySlug),
    getSiteSettings(),
  ])
  const title = service.seoTitle || service.title || 'خدمت'
  const description = resolveLeafDescription(service, defaultServiceDescription(service))
  const image = resolveOgImage(
    service.heroImage
      ? ogImageUrl(service.heroImage)
      : service.icon
        ? ogImageUrl(service.icon)
        : null,
    defaultOgImage(settings),
  )

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
  const {
    doc: service,
    ancestry,
    canonicalPath: currentPath,
  } = await loadCatchAllLeaf(rawSlug, SECTION_PATH, getServiceBySlug)

  const [site, cluster] = await Promise.all([
    getSiteSettings(),
    getTopicClusterForPillar(service._id),
  ])

  const hasChildren = (service.children?.length ?? 0) > 0
  const heroImageUrl = service.heroImage ? leafHeroImageUrl(service.heroImage) : null
  const whyUsImageUrl = service.whyUsImage ? leafSquareImageUrl(service.whyUsImage) : null
  const whatsappLink = resolveWhatsappLink(site?.whatsapp)
  const { faqItems, faqDisplayItems } = mergeLeafFaqs(
    service.faq,
    service.faqItems,
    cluster?.faqItems,
  )

  const serviceTitle = service.title ?? 'خدمت'
  const pageDescription = resolveLeafDescription(
    service,
    defaultServiceDescription(service),
  )

  return (
    <div>
      <WebPageSchema title={serviceTitle} description={pageDescription} path={currentPath} />
      <ServiceSchema
        data={{
          title: serviceTitle,
          seoDescription: service.seoDescription,
          excerpt: service.excerpt,
          slugPath: sectionRelativePath(SECTION_PATH, currentPath),
          price: service.price,
          isBookable: service.isBookable,
          faqItems,
          orgName: site?.siteName,
          breadcrumbLabels: breadcrumbLabelsFromAncestry(ancestry),
        }}
      />

      <BreadcrumbNav
        sectionLabel={SECTION_LABELS.services}
        sectionHref={SECTION_PATH}
        items={buildBreadcrumbNavItems(SECTION_PATH, ancestry, serviceTitle)}
      />

      {hasChildren ? (
        <NestedChildListing
          eyebrow={SECTION_LABELS.services}
          title={serviceTitle}
          excerpt={service.excerpt}
          basePath={currentPath}
          items={service.children ?? []}
          imageField="icon"
          resolveCtaLabel={serviceCtaLabel}
          formatDescription={(child) => child.excerpt || child.price || null}
        />
      ) : (
        <ServiceLeafPage
          service={service}
          cluster={cluster}
          heroImageUrl={heroImageUrl}
          whyUsImageUrl={whyUsImageUrl}
          whatsappLink={whatsappLink}
          faqItems={faqDisplayItems}
        />
      )}
    </div>
  )
}
