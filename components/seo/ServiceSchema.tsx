import { SITE_URL } from '@/lib/seo'

const ORG_NAME = 'Dar Ul Quran'

export type ServiceSchemaData = {
  title: string
  seoDescription?: string
  excerpt?: string
  slugPath: string
  price?: string
  isBookable?: boolean
  faqItems?: Array<{ question: string; answer: string }>
  orgName?: string
  breadcrumbLabels?: Record<string, string>
}

function buildServiceUrl(slugPath: string): string {
  return `${SITE_URL}/services/${slugPath}`
}

function buildSchemas(data: ServiceSchemaData): object[] {
  const serviceUrl = buildServiceUrl(data.slugPath)
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
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${serviceUrl}#faq`,
      mainEntity: data.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  const slugParts = data.slugPath.split('/').filter(Boolean)
  const breadcrumbItems: object[] = [
    { '@type': 'ListItem', position: 1, name: 'صفحۂ اول', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'خدمات', item: `${SITE_URL}/services` },
  ]
  slugParts.forEach((part, i) => {
    const isLast = i === slugParts.length - 1
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: i + 3,
      name: isLast ? data.title : (data.breadcrumbLabels?.[part] ?? part),
      item: `${SITE_URL}/services/${slugParts.slice(0, i + 1).join('/')}`,
    })
  })

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${serviceUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  })

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
