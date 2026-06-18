import type { Metadata } from 'next'
import { ogImageUrl, type SanityImageAsset } from '@/sanity/lib/image'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darulquran.pk'

type SanityImage = SanityImageAsset

export type SiteSettingsOg = {
  logo?: SanityImage
  favicon?: SanityImage
  siteName?: string
} | null

/** Default Open Graph image from Sanity site settings (logo → favicon). */
export function defaultOgImage(settings?: SiteSettingsOg): string | undefined {
  if (settings?.logo) return ogImageUrl(settings.logo)
  if (settings?.favicon) return ogImageUrl(settings.favicon)
  return undefined
}

/** Resolve page OG image: explicit image → site default. */
export function resolveOgImage(
  image?: string | null,
  settings?: SiteSettingsOg,
): string | undefined {
  return image ?? defaultOgImage(settings) ?? undefined
}

type PageMetadataOptions = {
  title: string
  description?: string | null
  path: string
  image?: string | null
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
  settings?: SiteSettingsOg
  noIndex?: boolean
  siteName?: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

const DEFAULT_ROBOTS: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
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
  settings,
  noIndex = false,
  siteName,
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataOptions): Metadata {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`
  const ogImage = resolveOgImage(image, settings)
  const resolvedSiteName = siteName ?? settings?.siteName ?? 'Dar Ul Quran'

  return {
    title,
    ...(description ? { description } : {}),
    ...(keywords?.length ? { keywords } : {}),
    ...(authors?.length ? { authors: authors.map((name) => ({ name })) } : {}),
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : DEFAULT_ROBOTS,
    openGraph: {
      type,
      locale: 'ur_PK',
      url,
      title,
      siteName: resolvedSiteName,
      ...(description ? { description } : {}),
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
      ...(type === 'article' && authors?.length ? { authors } : {}),
      ...(ogImage
        ? { images: [{ url: ogImage, width: 1200, height: 630, alt: imageAlt ?? title }] }
        : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      ...(description ? { description } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}
