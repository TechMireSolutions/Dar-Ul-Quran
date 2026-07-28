import type { MetadataRoute } from 'next'
import { getSiteSettings } from '@/sanity/lib/fetchers'
import { urlFor } from '@/sanity/lib/image'
import { DEFAULT_SITE_DESCRIPTION, resolveSiteNameUrdu } from '@/lib/seo'

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings()
  const source = settings?.logo ?? settings?.favicon
  const siteName = resolveSiteNameUrdu(settings?.siteName)

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
    name: siteName,
    short_name: siteName,
    description: settings?.description ?? DEFAULT_SITE_DESCRIPTION,
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
