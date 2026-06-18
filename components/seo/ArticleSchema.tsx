import { urlFor } from '@/sanity/lib/image'
import { SITE_URL } from '@/lib/seo'

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
  const articleUrl = `${SITE_URL}/articles/${slug}`

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${articleUrl}#article`,
      headline: post.title ?? '',
      description: post.excerpt,
      url: articleUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
      inLanguage: 'ur',
      ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
      ...(post._updatedAt ? { dateModified: post._updatedAt } : {}),
      ...(post.mainImage
        ? { image: [urlFor(post.mainImage).width(1200).height(630).auto('format').url()] }
        : {}),
      ...(post.author?.name
        ? { author: { '@type': 'Person', name: post.author.name } }
        : {}),
      publisher: {
        '@type': 'Organization',
        name: 'Dar Ul Quran',
        url: SITE_URL,
        ...(publisherLogoUrl ? { logo: { '@type': 'ImageObject', url: publisherLogoUrl } } : {}),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${articleUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'صفحۂ اول', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'مضامین', item: `${SITE_URL}/articles` },
        { '@type': 'ListItem', position: 3, name: post.title, item: articleUrl },
      ],
    },
  ]

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
