import JsonLdScripts from '@/components/seo/JsonLdScripts'
import { PATHS } from '@/lib/paths'
import { SITE_URL, DEFAULT_SITE_DESCRIPTION, resolveSiteNameUrdu } from '@/lib/seo'
import { buildOrganizationProvider } from '@/lib/schemaHelpers'

type SiteGraphSchemaProps = {
  siteName?: string | null
  description?: string | null
  email?: string | null
  phone?: string | null
  logoUrl: string
}

/** Root Organization + WebSite JSON-LD (E-E-A-T / SearchAction). */
export default function SiteGraphSchema({
  siteName,
  description,
  email,
  phone,
  logoUrl,
}: SiteGraphSchemaProps) {
  const name = resolveSiteNameUrdu(siteName)
  const desc = description ?? DEFAULT_SITE_DESCRIPTION

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...buildOrganizationProvider({
          name,
          description: desc,
          logoUrl,
          email,
          phone,
        }),
        inLanguage: 'ur',
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        name,
        url: SITE_URL,
        inLanguage: 'ur',
        publisher: { '@id': `${SITE_URL}#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}${PATHS.articles}?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  return <JsonLdScripts schemas={structuredData} />
}
