import { SITE_URL, DEFAULT_SITE_NAME } from '@/lib/seo'

import type { FaqSchemaItem } from '@/lib/types'

const DEFAULT_ORG_DESCRIPTION =
  'دار القرآن ایک شیعہ اسلامی تعلیمی ادارہ ہے جو مستند جعفری فقہ پر مبنی قرآن و اسلامی تعلیم پاکستان اور عالمی سطح پر پیش کرتا ہے۔'

/** Shared EducationalOrganization provider referenced by Course / Service JSON-LD. */
export function buildOrganizationProvider(options?: {
  name?: string | null
  description?: string
}) {
  return {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}#organization`,
    name: options?.name || DEFAULT_SITE_NAME,
    url: SITE_URL,
    description: options?.description ?? DEFAULT_ORG_DESCRIPTION,
    address: { '@type': 'PostalAddress', addressCountry: 'PK' },
  }
}

export function buildFaqPageSchema(pageUrl: string, faqItems: FaqSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

type BreadcrumbSchemaOptions = {
  pageUrl: string
  sectionPath: string
  sectionLabel: string
  slugPath: string
  title: string
  breadcrumbLabels?: Record<string, string>
}

export function buildBreadcrumbSchema({
  pageUrl,
  sectionPath,
  sectionLabel,
  slugPath,
  title,
  breadcrumbLabels,
}: BreadcrumbSchemaOptions) {
  const slugParts = slugPath.split('/').filter(Boolean)
  const items: object[] = [
    { '@type': 'ListItem', position: 1, name: 'صفحۂ اول', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: sectionLabel, item: `${SITE_URL}${sectionPath}` },
  ]

  slugParts.forEach((part, i) => {
    const isLast = i === slugParts.length - 1
    items.push({
      '@type': 'ListItem',
      position: i + 3,
      name: isLast ? title : (breadcrumbLabels?.[part] ?? part),
      item: `${SITE_URL}${sectionPath}/${slugParts.slice(0, i + 1).join('/')}`,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: items,
  }
}
