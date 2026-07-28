import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { SITE_URL } from '@/lib/seo'
import { PATHS, SECTION_LABELS } from '@/lib/paths'
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildOrganizationProvider,
  defaultServiceSchemaDescription,
} from '@/lib/schemaHelpers'
import type { ServiceSchemaData } from '@/lib/types'

function buildSchemas(data: ServiceSchemaData): object[] {
  const serviceUrl = `${SITE_URL}${PATHS.services}/${data.slugPath}`
  const description =
    data.seoDescription ??
    data.excerpt ??
    defaultServiceSchemaDescription(data.title)

  const serviceSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name: data.title,
    description,
    url: serviceUrl,
    serviceType: data.title,
    inLanguage: 'ur',
    areaServed: [
      { '@type': 'Country', name: 'Pakistan' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    provider: buildOrganizationProvider({ name: data.orgName }),
    ...(data.isBookable
      ? {
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}${PATHS.contact}`,
            availability: 'https://schema.org/InStock',
            ...(data.price ? { price: data.price, priceCurrency: 'PKR' } : {}),
          },
        }
      : {}),
  }

  const schemas: object[] = [serviceSchema]

  if (data.faqItems?.length) {
    schemas.push(buildFaqPageSchema(serviceUrl, data.faqItems))
  }

  schemas.push(
    buildBreadcrumbSchema({
      pageUrl: serviceUrl,
      sectionPath: PATHS.services,
      sectionLabel: SECTION_LABELS.services,
      slugPath: data.slugPath,
      title: data.title,
      breadcrumbLabels: data.breadcrumbLabels,
    }),
  )

  return schemas
}

type ServiceSchemaProps = { data: ServiceSchemaData }

export default function ServiceSchema({ data }: ServiceSchemaProps) {
  const schemas = buildSchemas(data)
  return <JsonLdScripts schemas={schemas} />
}
