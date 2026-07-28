import { SITE_URL, DEFAULT_SITE_NAME } from '@/lib/seo'
import { HOME_LABEL } from '@/lib/paths'

import type { FaqSchemaItem } from '@/lib/types'

export const DEFAULT_ORG_DESCRIPTION =
  'دار القرآن ایک شیعہ اسلامی تعلیمی ادارہ ہے جو مستند جعفری فقہ پر مبنی قرآن و اسلامی تعلیم پاکستان اور عالمی سطح پر پیش کرتا ہے۔'

type OrganizationProviderOptions = {
  name?: string | null
  description?: string | null
  logoUrl?: string
  email?: string | null
  phone?: string | null
  /** Article publisher uses Organization; Course/Service use EducationalOrganization. */
  type?: 'EducationalOrganization' | 'Organization'
  includeDescription?: boolean
  includeAddress?: boolean
}

/** Shared organization node for Course / Service / SiteGraph / Article JSON-LD. */
export function buildOrganizationProvider(options: OrganizationProviderOptions = {}) {
  const type = options.type ?? 'EducationalOrganization'
  const includeDescription = options.includeDescription ?? type === 'EducationalOrganization'
  const includeAddress = options.includeAddress ?? type === 'EducationalOrganization'

  return {
    '@type': type,
    '@id': `${SITE_URL}#organization`,
    name: options.name || DEFAULT_SITE_NAME,
    url: SITE_URL,
    ...(includeDescription
      ? { description: options.description ?? DEFAULT_ORG_DESCRIPTION }
      : {}),
    ...(includeAddress
      ? { address: { '@type': 'PostalAddress', addressCountry: 'PK' } }
      : {}),
    ...(options.logoUrl
      ? { logo: { '@type': 'ImageObject', url: options.logoUrl } }
      : {}),
    ...(options.email ? { email: options.email } : {}),
    ...(options.phone ? { telephone: options.phone } : {}),
  }
}

/** JSON-LD Course description when SEO/excerpt missing. */
export function defaultCourseSchemaDescription(title: string): string {
  return `${title} — مستند شیعہ قرآن و اسلامی تعلیم، آن لائن — پاکستان اور دنیا بھر کے خاندانوں کے لیے۔`
}

/** JSON-LD Service description when SEO/excerpt missing. */
export function defaultServiceSchemaDescription(title: string): string {
  return `${title} — مستند شیعہ اسلامی خدمات، آن لائن اور عالمی سطح پر دستیاب۔`
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
    { '@type': 'ListItem', position: 1, name: HOME_LABEL, item: SITE_URL },
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
