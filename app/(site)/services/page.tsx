import type { Metadata } from 'next'
import { getTopLevelServices } from '@/sanity/lib/fetchers'
import { cardImageUrl } from '@/sanity/lib/image'
import {
  cmsPageMetadata,
  DEFAULT_SERVICES_DESCRIPTION,
  fetchCmsPage,
  hasPublishedSlug,
  resolveSeoDescription,
  resolveSeoTitle,
  serviceCtaLabel,
  toItemListEntries,
} from '@/lib/cmsPage'
import ListingIndexShell, { ListingContentCards, ListingEmptyState } from '@/components/layout/ListingIndexShell'
import { PATHS, SECTION_LABELS, servicePath } from '@/lib/paths'

export const revalidate = 300

const PAGE_SLUG = 'services'
const PAGE_PATH = PATHS.services

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: SECTION_LABELS.services,
    descriptionFallback: DEFAULT_SERVICES_DESCRIPTION,
  })
}

export default async function ServicesPage() {
  const [{ page }, servicesRaw] = await Promise.all([
    fetchCmsPage(PAGE_SLUG),
    getTopLevelServices(),
  ])
  const services = servicesRaw ?? []

  const title = resolveSeoTitle(page, SECTION_LABELS.services)
  const description = resolveSeoDescription(page, DEFAULT_SERVICES_DESCRIPTION)
  const listItems = toItemListEntries(services.filter(hasPublishedSlug), PAGE_PATH)

  return (
    <ListingIndexShell
      title={title}
      description={description}
      path={PAGE_PATH}
      itemListName={SECTION_LABELS.services}
      listItems={listItems}
      eyebrow={page?.eyebrow || 'ہم کیا پیش کرتے ہیں'}
      pageTitle={page?.title || SECTION_LABELS.services}
      pageSubtitle={page?.subtitle || DEFAULT_SERVICES_DESCRIPTION}
    >
      {services.length === 0 ? (
        <ListingEmptyState message="خدمات جلد آ رہی ہیں۔" />
      ) : (
        <ListingContentCards
          items={services.map((service) => ({
            id: service._id,
            href: servicePath(service.slug?.current ?? ''),
            image: service.icon ? cardImageUrl(service.icon) : null,
            title: service.title ?? '',
            description: service.excerpt || null,
            ctaLabel: serviceCtaLabel(service.childCount ?? 0),
          }))}
        />
      )}
    </ListingIndexShell>
  )
}
