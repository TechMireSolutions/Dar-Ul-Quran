import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { ogImageUrl } from '@/sanity/lib/image'
import { SITE_URL } from '@/lib/seo'
import { publicationPath, PATHS, SECTION_LABELS } from '@/lib/paths'
import { buildBreadcrumbSchema, buildOrganizationProvider } from '@/lib/schemaHelpers'
import type { PublicationDoc } from '@/lib/types'

type BookSchemaProps = {
  publication: PublicationDoc
  slug: string
  publisherLogoUrl?: string
}

export default function BookSchema({ publication, slug, publisherLogoUrl }: BookSchemaProps) {
  const pubUrl = `${SITE_URL}${publicationPath(slug)}`
  const title = publication.title ?? ''

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Book',
      '@id': `${pubUrl}#book`,
      name: title,
      description: publication.description,
      url: pubUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pubUrl },
      inLanguage: 'ur',
      bookFormat: 'https://schema.org/EBook',
      ...(publication.publishedAt ? { datePublished: publication.publishedAt } : {}),
      ...(publication._updatedAt ? { dateModified: publication._updatedAt } : {}),
      ...(publication.coverImage ? { image: [ogImageUrl(publication.coverImage)] } : {}),
      ...(publication.author
        ? { author: { '@type': 'Person', name: publication.author } }
        : {}),
      publisher: buildOrganizationProvider({
        type: 'Organization',
        logoUrl: publisherLogoUrl,
        includeDescription: false,
      }),
    },
    buildBreadcrumbSchema({
      pageUrl: pubUrl,
      sectionPath: PATHS.publications,
      sectionLabel: SECTION_LABELS.publications,
      slugPath: slug,
      title,
    }),
  ]

  return <JsonLdScripts schemas={schemas} />
}
