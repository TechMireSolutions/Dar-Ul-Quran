import { urlFor } from '@/sanity/lib/image'
import { SITE_URL } from '@/lib/seo'

type ArticlePost = {
  title: string
  excerpt?: string
  publishedAt?: string
  mainImage?: { alt?: string }
  author?: { name?: string }
}

export default function ArticleSchema({ post, slug }: { post: ArticlePost; slug: string }) {
  const articleUrl = `${SITE_URL}/articles/${slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    inLanguage: 'ur',
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
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
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
