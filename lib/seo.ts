import type { Metadata } from 'next'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darulquran.pk'

/** Default org name when Sanity siteSettings is unavailable (JSON-LD, metadata). */
export const DEFAULT_SITE_NAME = 'Dar Ul Quran'

/** Urdu display name for UI chrome (header, footer, titles). */
export const DEFAULT_SITE_NAME_URDU = 'دار القرآن'

/** Default footer / brand tagline when CMS tagline is empty. */
export const DEFAULT_TAGLINE =
  'اہل بیت (ع) کے نور کو تعلیم، مستند مواد اور روحانی خدمات کے ذریعے پھیلانا۔'

/** Default donate CTA label (footer / homepage fallback). */
export const DEFAULT_DONATE_CTA_LABEL = 'ابھی عطیہ دیں'

/** External related-site chip label (footer). */
export const DEFAULT_RELATED_SITE_LABEL = 'متعلقہ ویب سائٹ'

/** Short meta description when CMS description is empty. */
export const DEFAULT_SITE_DESCRIPTION = 'اسلامی علم، آنلائن کورسز اور خدمات'

/** Longer homepage description fallback. */
export const DEFAULT_HOME_DESCRIPTION =
  'اسلامی علم، آنلائن کورسز اور خدمات — دنیا بھر میں شیعہ خاندانوں کے لیے مستند تعلیم۔'

/** Resolve Urdu display name from CMS (UI chrome, titles, manifest). */
export function resolveSiteNameUrdu(siteName?: string | null): string {
  const trimmed = siteName?.trim()
  return trimmed || DEFAULT_SITE_NAME_URDU
}

/** Site settings fields used for metadata chrome (not image URL building). */
export type SiteSettingsMeta = {
  siteName?: string
} | null

/** Resolve page OG image: explicit URL → pre-resolved site default. */
export function resolveOgImage(
  image?: string | null,
  fallback?: string | null,
): string | undefined {
  return image ?? fallback ?? undefined
}

type PageMetadataOptions = {
  title: string
  description?: string | null
  path: string
  /** Fully resolved OG image URL (page asset or `defaultOgImage(settings)`). */
  image?: string | null
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
  settings?: SiteSettingsMeta
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
  const ogImage = resolveOgImage(image)
  const resolvedSiteName = resolveSiteNameUrdu(siteName ?? settings?.siteName)
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
