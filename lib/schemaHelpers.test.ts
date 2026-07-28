import { describe, expect, it } from 'vitest'
import { SITE_URL, DEFAULT_SITE_NAME } from '@/lib/seo'
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildOrganizationProvider,
} from '@/lib/schemaHelpers'

describe('buildFaqPageSchema', () => {
  it('builds FAQPage JSON-LD', () => {
    const schema = buildFaqPageSchema('https://darulquran.pk/about', [
      { question: 'سوال؟', answer: 'جواب' },
    ])
    expect(schema).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': 'https://darulquran.pk/about#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'سوال؟',
          acceptedAnswer: { '@type': 'Answer', text: 'جواب' },
        },
      ],
    })
  })
})

describe('buildOrganizationProvider', () => {
  it('builds EducationalOrganization with defaults', () => {
    expect(buildOrganizationProvider()).toMatchObject({
      '@type': 'EducationalOrganization',
      '@id': `${SITE_URL}#organization`,
      name: DEFAULT_SITE_NAME,
      url: SITE_URL,
      address: { '@type': 'PostalAddress', addressCountry: 'PK' },
    })
  })

  it('allows name and description overrides', () => {
    expect(
      buildOrganizationProvider({ name: 'دار القرآن', description: 'تفصیل' }),
    ).toMatchObject({
      name: 'دار القرآن',
      description: 'تفصیل',
    })
  })
})

describe('buildBreadcrumbSchema', () => {
  it('includes home, section, and nested slug parts', () => {
    const schema = buildBreadcrumbSchema({
      pageUrl: `${SITE_URL}/online-courses/quran/nazra`,
      sectionPath: '/online-courses',
      sectionLabel: 'آنلائن کورسز',
      slugPath: 'quran/nazra',
      title: 'نظریہ',
      breadcrumbLabels: { quran: 'قرآن' },
    })

    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'صفحۂ اول', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'آنلائن کورسز',
        item: `${SITE_URL}/online-courses`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'قرآن',
        item: `${SITE_URL}/online-courses/quran`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'نظریہ',
        item: `${SITE_URL}/online-courses/quran/nazra`,
      },
    ])
  })
})
