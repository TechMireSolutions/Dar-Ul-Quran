import { SITE_URL } from '@/lib/seo'
import { buildBreadcrumbSchema, buildFaqPageSchema } from '@/lib/schemaHelpers'
import type { ServiceSchemaData } from '@/lib/types'

export type { ServiceSchemaData } from '@/lib/types'

const ORG_NAME = 'Dar Ul Quran'

function buildSchemas(data: ServiceSchemaData): object[] {
  const serviceUrl = `${SITE_URL}/services/${data.slugPath}`
  const description =
    data.seoDescription ??
    data.excerpt ??
    `${data.title} — مستند شیعہ اسلامی خدمات، آن لائن اور عالمی سطح پر دستیاب۔`

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
    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}#organization`,
      name: data.orgName ?? ORG_NAME,
      url: SITE_URL,
      description:
        'دار القرآن ایک شیعہ اسلامی تعلیمی و خدماتی ادارہ ہے جو قرآن، فقہ اور مذہبی خدمات دنیا بھر میں پیش کرتا ہے۔',
      address: { '@type': 'PostalAddress', addressCountry: 'PK' },
    },
    ...(data.isBookable
      ? {
          offers: {
            '@type': 'Offer',
            url: `${SITE_URL}/contact`,
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
      sectionPath: '/services',
      sectionLabel: 'خدمات',
      slugPath: data.slugPath,
      title: data.title,
      breadcrumbLabels: data.breadcrumbLabels,
    }),
  )

  return schemas
}

export default function ServiceSchema({ data }: { data: ServiceSchemaData }) {
  const schemas = buildSchemas(data)
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
