import type { Metadata } from 'next'
import { ogImageUrl, type SanityImageAsset } from '@/sanity/lib/image'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darulquran.pk'

/** Default org name when Sanity siteSettings is unavailable (JSON-LD, metadata). */
export const DEFAULT_SITE_NAME = 'Dar Ul Quran'

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

/**
 * Build a single document title that will not be doubled by the root
 * `title.template`. Home uses the site name alone; other pages get
 * `Title | SiteName` unless the brand suffix is already present.
 */
export function resolveDocumentTitle(title: string, siteName: string): string {
  const trimmed = title.trim()
  const brand = siteName.trim()
  if (!trimmed) return brand
  if (trimmed === brand) return brand

  const suffix = ` | ${brand}`
  if (trimmed.endsWith(suffix)) return trimmed

  // Legacy callers sometimes hard-coded `| دار القرآن` while CMS siteName differs.
  if (/\s\|\sدار\s*القرآن\s*$/u.test(trimmed) || /\s\|\sدار\s*القرآٓن\s*$/u.test(trimmed)) {
    return trimmed
  }

  return `${trimmed}${suffix}`
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
  const resolvedSiteName = siteName ?? settings?.siteName ?? DEFAULT_SITE_NAME
  const documentTitle = resolveDocumentTitle(title, resolvedSiteName)

  return {
    title: { absolute: documentTitle },
    ...(description ? { description } : {}),
    ...(keywords?.length ? { keywords } : {}),
    ...(authors?.length ? { authors: authors.map((name) => ({ name })) } : {}),
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : DEFAULT_ROBOTS,
    openGraph: {
      type,
      locale: 'ur_PK',
      url,
      title: documentTitle,
      siteName: resolvedSiteName,
      ...(description ? { description } : {}),
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      ...(type === 'article' && modifiedTime ? { modifiedTime } : {}),
      ...(type === 'article' && authors?.length ? { authors } : {}),
      ...(ogImage
        ? {
            images: [
              { url: ogImage, width: 1200, height: 630, alt: imageAlt ?? documentTitle },
            ],
          }
        : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: documentTitle,
      ...(description ? { description } : {}),
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}
