import type { Metadata } from 'next'
import { getPublications } from '@/sanity/lib/fetchers'
import { cardImageUrl } from '@/sanity/lib/image'
import {
  cmsPageMetadata,
  fetchCmsPage,
  resolveSeoDescription,
  resolveSeoTitle,
} from '@/lib/cmsPage'
import ListingIndexShell, { ListingContentCards, ListingEmptyState } from '@/components/layout/ListingIndexShell'
import { PATHS, SECTION_LABELS } from '@/lib/paths'

export const revalidate = 300

const PAGE_SLUG = 'publications'
const PAGE_PATH = PATHS.publications
const DEFAULT_DESCRIPTION = 'ہماری تمام مطبوعات اور کتابیں یہاں سے ڈاؤن لوڈ کریں۔'
const CTA_LABEL = 'ڈاؤن لوڈ کریں'

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: SECTION_LABELS.publications,
    descriptionFallback: DEFAULT_DESCRIPTION,
  })
}

export default async function PublicationsPage() {
  const [{ page }, publicationsRaw] = await Promise.all([
    fetchCmsPage(PAGE_SLUG),
    getPublications(),
  ])
  const publications = publicationsRaw ?? []

  const title = resolveSeoTitle(page, SECTION_LABELS.publications)
  const description = resolveSeoDescription(page, DEFAULT_DESCRIPTION)

  // Map to item list format for SEO schema
  const listItems = publications.map((pub, index) => ({
    name: pub.title ?? '',
    url: pub.fileUrl ?? '#',
  }))

  return (
    <ListingIndexShell
      title={title}
      description={description}
      path={PAGE_PATH}
      itemListName={SECTION_LABELS.publications}
      listItems={listItems}
      eyebrow={page?.eyebrow || 'کتب'}
      pageTitle={page?.title || SECTION_LABELS.publications}
      pageSubtitle={page?.subtitle || DEFAULT_DESCRIPTION}
    >
      {publications.length === 0 ? (
        <ListingEmptyState
          message="ابھی تک کوئی اشاعت موجود نہیں ہے۔"
        />
      ) : (
        <ListingContentCards
          items={publications.map((pub) => ({
            id: pub._id,
            href: pub.fileUrl ?? '#',
            image: pub.coverImage ? cardImageUrl(pub.coverImage) : null,
            title: pub.title ?? '',
            description: pub.description || null,
            badge: pub.author || null,
            ctaLabel: CTA_LABEL,
          }))}
        />
      )}
    </ListingIndexShell>
  )
}
