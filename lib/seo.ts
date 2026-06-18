import type { Metadata } from 'next'
import { urlFor } from '@/sanity/lib/image'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darulquran.pk'

type SanityImage = Parameters<typeof urlFor>[0]

/** Default Open Graph image from Sanity site settings (logo → favicon). */
export function defaultOgImage(settings?: {
  logo?: SanityImage
  favicon?: SanityImage
} | null): string | undefined {
  if (settings?.logo) {
    return urlFor(settings.logo).width(1200).height(630).fit('crop').auto('format').url()
  }
  if (settings?.favicon) {
    return urlFor(settings.favicon).width(1200).height(630).fit('crop').auto('format').url()
  }
  return undefined
}

type PageMetadataOptions = {
  title: string
  description?: string | null
  path: string
  image?: string | null
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
}

/** Per-page metadata with canonical URL, Open Graph, and Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = 'website',
  keywords,
}: PageMetadataOptions): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`

  return {
    title,
    ...(description ? { description } : {}),
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: 'ur_PK',
      alternateLocale: 'en_US',
      url,
      title,
      ...(description ? { description } : {}),
      ...(image
        ? { images: [{ url: image, width: 1200, height: 630, alt: imageAlt ?? title }] }
        : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
  }
}
