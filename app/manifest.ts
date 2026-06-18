import type { MetadataRoute } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await safeFetch(siteSettingsQuery)
  const iconUrl = settings?.logo
    ? urlFor(settings.logo).width(192).height(192).url()
    : settings?.favicon
      ? urlFor(settings.favicon).width(192).height(192).url()
      : undefined

  return {
    name:             settings?.siteName ?? 'دار القرآن',
    short_name:       settings?.siteName ?? 'دار القرآن',
    description:      settings?.description ?? 'اسلامی علم، آنلائن کورسز اور خدمات',
    start_url:        '/',
    display:          'standalone',
    background_color: '#ffffff',
    theme_color:      '#b8900e',
    lang:             'ur',
    dir:              'rtl',
    icons: iconUrl
      ? [{ src: iconUrl, sizes: '192x192', type: 'image/png', purpose: 'any' }]
      : [],
  }
}
