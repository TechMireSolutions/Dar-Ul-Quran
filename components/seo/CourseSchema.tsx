import { SITE_URL } from '@/lib/seo'
import { buildBreadcrumbSchema, buildFaqPageSchema } from '@/lib/schemaHelpers'
import type { CourseSchemaData } from '@/lib/types'

export type { CourseSchemaData } from '@/lib/types'

const ORG_NAME = 'Dar Ul Quran'

function resolveSlugPath(data: CourseSchemaData): string {
  if (data.slugPath) return data.slugPath
  if (data.parentSlug && data.slug) return `${data.parentSlug}/${data.slug}`
  return data.slug ?? ''
}

function buildSchemas(data: CourseSchemaData): object[] {
  const slugPath = resolveSlugPath(data)
  const courseUrl = `${SITE_URL}/online-courses/${slugPath}`
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
      '@id': `${SITE_URL}#organization`,
      name: data.orgName ?? ORG_NAME,
      url: SITE_URL,
      description:
        'دار القرآن ایک شیعہ اسلامی تعلیمی ادارہ ہے جو مستند جعفری فقہ پر مبنی قرآن و اسلامی تعلیم پاکستان اور عالمی سطح پر پیش کرتا ہے۔',
      address: { '@type': 'PostalAddress', addressCountry: 'PK' },
    },

    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        inLanguage: ['ur', 'en'],
        location: { '@type': 'VirtualLocation', url: SITE_URL },
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
            url: `${SITE_URL}/contact`,
          },
        }
      : {}),

    ...(data.outcomes?.length
      ? { teaches: data.outcomes.map((o) => o.title) }
      : {}),
  }

  const schemas: object[] = [courseSchema]

  if (data.faqItems?.length) {
    schemas.push(buildFaqPageSchema(courseUrl, data.faqItems))
  }

  schemas.push(
    buildBreadcrumbSchema({
      pageUrl: courseUrl,
      sectionPath: '/online-courses',
      sectionLabel: 'آن لائن کورسز',
      slugPath,
      title: data.title,
      breadcrumbLabels: data.breadcrumbLabels,
    }),
  )

  return schemas
}

type CourseSchemaProps = { data: CourseSchemaData }

export default function CourseSchema({ data }: CourseSchemaProps) {
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
