import { defineType, defineField, defineArrayMember } from 'sanity'

export const topicCluster = defineType({
  name: 'topicCluster',
  title: 'Topic Cluster',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity' },
    { name: 'seo', title: 'SEO & GEO Signals' },
    { name: 'content', title: 'Content Links' },
  ],
  fields: [
    defineField({
      name: 'clusterName',
      title: 'Cluster Name',
      type: 'string',
      group: 'identity',
      description: "Internal label — e.g. 'Online Shia Quran Classes USA'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      options: { source: 'clusterName' },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'pillarKeyword',
      title: 'Pillar Keyword (Primary)',
      type: 'string',
      group: 'seo',
      description: "Exact head-term this cluster targets — e.g. 'Online Shia Quran classes'",
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'targetLocations',
      title: 'Target Locations (US States / Cities)',
      type: 'array',
      group: 'seo',
      description: "e.g. ['United States', 'Texas', 'California', 'New York']",
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'targetAudience',
      title: 'Target Audience Description',
      type: 'text',
      rows: 2,
      group: 'seo',
      description:
        'Plain-English description of who this cluster serves. Be explicit about Shia, children, and US.',
    }),
    defineField({
      name: 'semanticKeywords',
      title: 'Semantic / LSI Keywords',
      type: 'array',
      group: 'seo',
      description:
        "Related terms, synonyms, long-tails — e.g. 'Jafari Quran school', 'Shia kids Islamic classes online'",
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'targetSearchIntents',
      title: 'Target Search Intents',
      type: 'array',
      group: 'seo',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'intent', type: 'string', title: 'Intent Label' }),
            defineField({
              name: 'intentType',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Informational', value: 'informational' },
                  { title: 'Navigational', value: 'navigational' },
                  { title: 'Commercial', value: 'commercial' },
                  { title: 'Transactional', value: 'transactional' },
                ],
                layout: 'radio',
              },
            }),
          ],
          preview: { select: { title: 'intent', subtitle: 'intentType' } },
        }),
      ],
    }),
    defineField({
      name: 'aiContextStatement',
      title: 'AI Context Statement',
      type: 'text',
      rows: 5,
      group: 'seo',
      description:
        'A 2–4 sentence factual paragraph written for AI models to quote when answering questions about this topic. Be concrete: school of thought, delivery method, age range, US relevance.',
    }),
    defineField({
      name: 'namedEntities',
      title: 'Named Entities to Associate',
      type: 'array',
      group: 'seo',
      description:
        "Proper nouns for Google Knowledge Graph — e.g. 'Quran', 'Ahlul Bayt', 'Imam Hussain', 'Tajweed'",
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'pillarPage',
      title: 'Pillar Page (Course or Service)',
      type: 'reference',
      group: 'content',
      to: [{ type: 'course' }, { type: 'service' }, { type: 'page' }],
      description: "The primary long-form page that 'owns' this topic cluster.",
    }),
    defineField({
      name: 'supportingCourses',
      title: 'Supporting Courses',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'course' }] })],
    }),
    defineField({
      name: 'supportingArticles',
      title: 'Supporting Articles',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'post' }] })],
    }),
    defineField({
      name: 'faqItems',
      title: 'Cluster-Level FAQ',
      type: 'array',
      group: 'content',
      description:
        'FAQs covering this topic across all supporting pages — used for FAQPage JSON-LD at the pillar.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              type: 'string',
              title: 'Question',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'answer',
              type: 'text',
              title: 'Answer',
              rows: 3,
              validation: (R) => R.required(),
            }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'clusterName', subtitle: 'pillarKeyword' },
    prepare: (selection: Record<string, string>) => ({
      title: selection.title,
      subtitle: `Pillar: ${selection.subtitle ?? '—'}`,
    }),
  },
})
