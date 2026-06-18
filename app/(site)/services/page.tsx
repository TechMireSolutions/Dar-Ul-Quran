import type { Metadata } from 'next'
import { getTopLevelServices } from '@/sanity/lib/fetchers'
import { cardImageUrl } from '@/sanity/lib/image'
import {
  cmsPageMetadata,
  fetchCmsPage,
  hasPublishedSlug,
  resolveSeoDescription,
  resolveSeoTitle,
  toItemListEntries,
} from '@/lib/cmsPage'
import ContentCard from '@/components/ui/ContentCard'
import ListingIndexShell, { ListingCardGrid, ListingEmptyState } from '@/components/layout/ListingIndexShell'
import Reveal from '@/components/ui/Reveal'

export const revalidate = 300

const PAGE_SLUG = 'services'
const PAGE_PATH = '/services'

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: 'خدمات',
  })
}

export default async function ServicesPage() {
  const [{ page }, servicesRaw] = await Promise.all([
    fetchCmsPage(PAGE_SLUG),
    getTopLevelServices(),
  ])
  const services = servicesRaw ?? []

  const title = resolveSeoTitle(page, 'خدمات')
  const description = resolveSeoDescription(page)
  const listItems = toItemListEntries(services.filter(hasPublishedSlug), PAGE_PATH)

  return (
    <ListingIndexShell
      title={title}
      description={description}
      path={PAGE_PATH}
      itemListName="خدمات"
      listItems={listItems}
      eyebrow={page?.eyebrow || 'ہم کیا پیش کرتے ہیں'}
      pageTitle={page?.title || 'خدمات'}
      pageSubtitle={page?.subtitle || 'اخلاص کے ساتھ پیش کی گئی مذہبی خدمات — نیابت زیارت، زکوٰۃ، خمس اور مزید۔'}
    >
      {services.length === 0 ? (
        <ListingEmptyState message="خدمات جلد آ رہی ہیں۔" />
      ) : (
        <ListingCardGrid>
          {services.map((service, i) => (
            <Reveal key={service._id} animation="up" delay={i * 70}>
              <ContentCard
                href={`${PAGE_PATH}/${service.slug?.current ?? ''}`}
                image={service.featuredImage ? cardImageUrl(service.featuredImage) : null}
                title={service.title ?? ''}
                description={service.excerpt || null}
                ctaLabel={(service.childCount ?? 0) > 0 ? 'خدمات دیکھیں' : 'ابھی بک کریں'}
              />
            </Reveal>
          ))}
        </ListingCardGrid>
      )}
    </ListingIndexShell>
  )
}
