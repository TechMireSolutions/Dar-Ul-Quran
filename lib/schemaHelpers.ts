import { SITE_URL } from '@/lib/seo'

type FaqItem = { question: string; answer: string }

export function buildFaqPageSchema(pageUrl: string, faqItems: FaqItem[]) {
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
