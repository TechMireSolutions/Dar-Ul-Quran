import { SITE_URL } from '@/lib/seo'

type ItemListSchemaProps = {
  name: string
  path: string
  items: Array<{ name: string; url: string }>
}

export default function ItemListSchema({ name, path, items }: ItemListSchemaProps) {
  if (!items.length) return null

  const listUrl = `${SITE_URL}${path}`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${listUrl}#itemlist`,
    name,
    url: listUrl,
    inLanguage: 'ur',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
