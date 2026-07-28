import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { ogImageUrl } from '@/sanity/lib/image'
import { SITE_URL } from '@/lib/seo'
import { articlePath, PATHS, SECTION_LABELS } from '@/lib/paths'
import { buildBreadcrumbSchema, buildOrganizationProvider } from '@/lib/schemaHelpers'

type ArticlePost = {
  title?: string
  excerpt?: string
  publishedAt?: string
  _updatedAt?: string
  mainImage?: { alt?: string }
  author?: { name?: string }
}

type ArticleSchemaProps = {
  post: ArticlePost
  slug: string
  publisherLogoUrl?: string
}

export default function ArticleSchema({ post, slug, publisherLogoUrl }: ArticleSchemaProps) {
  const articleUrl = `${SITE_URL}${articlePath(slug)}`
  const title = post.title ?? ''

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${articleUrl}#article`,
      headline: title,
      description: post.excerpt,
      url: articleUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
      inLanguage: 'ur',
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
      ...(post._updatedAt ? { dateModified: post._updatedAt } : {}),
      ...(post.mainImage ? { image: [ogImageUrl(post.mainImage)] } : {}),
      ...(post.author?.name
        ? { author: { '@type': 'Person', name: post.author.name } }
        : {}),
      publisher: buildOrganizationProvider({
        type: 'Organization',
        logoUrl: publisherLogoUrl,
        includeDescription: false,
      }),
    },
    buildBreadcrumbSchema({
      pageUrl: articleUrl,
      sectionPath: PATHS.articles,
      sectionLabel: SECTION_LABELS.articles,
      slugPath: slug,
      title,
    }),
  ]

  return <JsonLdScripts schemas={schemas} />
}
