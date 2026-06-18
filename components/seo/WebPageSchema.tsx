import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { SITE_URL } from '@/lib/seo'

type WebPageSchemaProps = {
  title: string
  description?: string
  path: string
}

export default function WebPageSchema({ title, description, path }: WebPageSchemaProps) {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    ...(description ? { description } : {}),
    inLanguage: 'ur',
    isPartOf: { '@id': `${SITE_URL}#website` },
    about: { '@id': `${SITE_URL}#organization` },
  }

  return <JsonLdScripts schemas={schema} />
}
