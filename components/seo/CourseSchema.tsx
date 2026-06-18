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
  /** Full path segments, e.g. "rozana/nazra-rozana" */
  slugPath: string
  /** @deprecated use slugPath — kept for query backward compat */
  slug?: string
  parentSlug?: string
  outcomes?: Array<{ title: string }>
  orgName?: string
  /** Optional breadcrumb labels keyed by slug segment */
  breadcrumbLabels?: Record<string, string>
}

function resolveSlugPath(data: CourseSchemaData): string {
  if (data.slugPath) return data.slugPath
  if (data.parentSlug && data.slug) return `${data.parentSlug}/${data.slug}`
  return data.slug ?? ''
}

function buildCourseUrl(slugPath: string): string {
  return `${BASE}/online-courses/${slugPath}`
}

function buildSchemas(data: CourseSchemaData): object[] {
  const slugPath = resolveSlugPath(data)
  const courseUrl = buildCourseUrl(slugPath)
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

  const slugParts = slugPath.split('/').filter(Boolean)
  const breadcrumbItems: object[] = [
    { '@type': 'ListItem', position: 1, name: 'صفحۂ اول', item: BASE },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'آن لائن کورسز',
      item: `${BASE}/online-courses`,
    },
  ]
  slugParts.forEach((part, i) => {
    const isLast = i === slugParts.length - 1
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: i + 3,
      name: isLast ? data.title : (data.breadcrumbLabels?.[part] ?? part),
      item: `${BASE}/online-courses/${slugParts.slice(0, i + 1).join('/')}`,
    })
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
