const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darulquran.pk'
const ORG_NAME = 'Dar Ul Quran'

export type CourseSchemaData = {
  title: string
  seoTitle?: string
  seoDescription?: string
  excerpt?: string
  subject?: string
  duration?: string
  instructor?: string
  faqItems?: Array<{ question: string; answer: string }>
  pricingMin?: string
  slug: string
  parentSlug?: string
  outcomes?: Array<{ title: string }>
  orgName?: string
}

function buildCourseUrl(data: CourseSchemaData): string {
  return data.parentSlug
    ? `${BASE}/online-courses/${data.parentSlug}/${data.slug}`
    : `${BASE}/online-courses/${data.slug}`
}

function buildSchemas(data: CourseSchemaData): object[] {
  const courseUrl = buildCourseUrl(data)
  const description =
    data.seoDescription ??
    data.excerpt ??
    `${data.title} — مستند شیعہ قرآن و اسلامی تعلیم، آن لائن — پاکستان اور دنیا بھر کے خاندانوں کے لیے۔`

  const courseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${courseUrl}#course`,
    name: data.title,
    description,
    url: courseUrl,

    provider: {
      '@type': 'EducationalOrganization',
      '@id': `${BASE}#organization`,
      name: data.orgName ?? ORG_NAME,
      url: BASE,
      description:
        'دار القرآن ایک شیعہ اسلامی تعلیمی ادارہ ہے جو مستند جعفری فقہ پر مبنی قرآن و اسلامی تعلیم پاکستان اور عالمی سطح پر پیش کرتا ہے۔',
      address: { '@type': 'PostalAddress', addressCountry: 'PK' },
    },

    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        inLanguage: ['ur', 'en'],
        location: { '@type': 'VirtualLocation', url: BASE },
        ...(data.instructor
          ? {
              instructor: {
                '@type': 'Person',
                name: data.instructor,
                worksFor: {
                  '@type': 'EducationalOrganization',
                  name: data.orgName ?? ORG_NAME,
                },
              },
            }
          : {}),
      },
    ],

    inLanguage: 'ur',
    educationalLevel: 'Beginner',

    audience: {
      '@type': 'EducationalAudience',
      audienceType: 'Children and Adults',
      educationalRole: 'student',
      geographicArea: [
        { '@type': 'Country', name: 'Pakistan' },
        { '@type': 'Place', name: 'Worldwide' },
      ],
    },

    isAccessibleForFree: false,

    ...(data.pricingMin
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'PKR',
            price: String(data.pricingMin),
            availability: 'https://schema.org/InStock',
            url: `${BASE}/contact`,
          },
        }
      : {}),

    ...(data.outcomes?.length
      ? { teaches: data.outcomes.map((o) => o.title) }
      : {}),
  }

  const schemas: object[] = [courseSchema]

  if (data.faqItems?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${courseUrl}#faq`,
      mainEntity: data.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    })
  }

  const breadcrumbItems: object[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Online Courses',
      item: `${BASE}/online-courses`,
    },
  ]
  if (data.parentSlug) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 3,
      item: `${BASE}/online-courses/${data.parentSlug}`,
    })
  }
  breadcrumbItems.push({
    '@type': 'ListItem',
    position: breadcrumbItems.length + 1,
    name: data.title,
    item: courseUrl,
  })

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${courseUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  })

  return schemas
}

export default function CourseSchema({ data }: { data: CourseSchemaData }) {
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
