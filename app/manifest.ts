import type { MetadataRoute } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await safeFetch(siteSettingsQuery)
  const source = settings?.logo ?? settings?.favicon

  const icons: MetadataRoute.Manifest['icons'] = source
    ? [
        {
          src: urlFor(source).width(192).height(192).url(),
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: urlFor(source).width(512).height(512).url(),
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: urlFor(source).width(512).height(512).fit('crop').url(),
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ]
    : []

  return {
    name: settings?.siteName ?? 'دار القرآن',
    short_name: settings?.siteName ?? 'دار القرآن',
    description: settings?.description ?? 'اسلامی علم، آنلائن کورسز اور خدمات',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#b8900e',
    lang: 'ur',
    dir: 'rtl',
    categories: ['education', 'religion'],
    icons,
  }
}
