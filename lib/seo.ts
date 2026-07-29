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

/** Leaf FAQ accordion heading when CMS field is empty. */
export const DEFAULT_FAQ_HEADING = 'اکثر پوچھے گئے سوالات'

/** WhatsApp CTA on leaf banners. */
export const DEFAULT_WHATSAPP_CTA_LABEL = 'واٹس ایپ کریں'

/** Header / articles search placeholder. */
export const DEFAULT_SEARCH_PLACEHOLDER = 'مضامین تلاش کریں…'

/** Article listing card CTA. */
export const DEFAULT_ARTICLE_CTA = 'مزید پڑھیں'

/** Donate page causes when CMS `donateCauses` is empty. */
export const DEFAULT_DONATE_CAUSES: { title: string; desc: string }[] = [
  { title: 'عمومی عطیہ', desc: `${DEFAULT_SITE_NAME_URDU} کے مجموعی مشن میں معاونت` },
  { title: 'قرآنی تعلیم', desc: 'بچوں کی مفت قرآنی کلاسوں کی مالی معاونت' },
  { title: 'محرم پروگرامز', desc: 'مجالس اور عزاداری کی تقاریب منظم کرنے میں مدد' },
  { title: `${DEFAULT_SITE_NAME_URDU} معاونت`, desc: 'ہمارے قرآنی ادارے میں حصہ ڈالیں' },
]

/** Donate page chrome fallbacks (page + Studio seeds). */
export const DEFAULT_DONATE_ARABIC_VERSE = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ'
export const DEFAULT_DONATE_HOW_TO_HEADING = 'عطیہ کیسے دیں'
export const DEFAULT_DONATE_HOW_TO_TEXT =
  'بینک ٹرانسفر کی تفصیل کے لیے ہم سے رابطہ کریں یا نیچے آنلائن ادائیگی کا لنک استعمال کریں۔'
export const DEFAULT_DONATE_PAY_ONLINE_LABEL = 'آنلائن عطیہ دیں'
export const DEFAULT_DONATE_CONTACT_LABEL = 'ہم سے رابطہ کریں'
export const DEFAULT_DONATE_CLOSING_MESSAGE =
  'جزاک اللہ خیر — اللہ (سبحانہ و تعالیٰ) آپ کے عطیات قبول فرمائے۔'

/** Contact form subject options when CMS list is empty. */
export const DEFAULT_CONTACT_FORM_SUBJECTS = [
  'عام پوچھ گچھ',
  'کورس داخلہ',
  'خدمت کی درخواست',
  'عطیہ',
] as const

/** Contact form submit button fallback. */
export const DEFAULT_CONTACT_FORM_SUBMIT_LABEL = 'پیغام بھیجیں'

/** Contact form purpose select labels. */
export const CONTACT_PURPOSE_LABELS = {
  general: DEFAULT_CONTACT_FORM_SUBJECTS[0],
  course: 'کورس میں داخلہ',
  service: 'خدمت کی درخواست',
  other: 'دیگر',
} as const

/** Homepage / Studio “view all courses” CTA. */
export const DEFAULT_COURSE_ALL_CTA = 'تمام کورسز'

/** Homepage / Studio “view all services” CTA. */
export const DEFAULT_SERVICE_ALL_CTA = 'تمام خدمات'

/** Carousel / section “view all” fallback. */
export const DEFAULT_VIEW_ALL_LABEL = 'سب دیکھیں'

/** Homepage services section title (longer than SECTION_LABELS.services). */
export const DEFAULT_SERVICES_SECTION_HEADING = 'ہماری خدمات'

/** Homepage articles section title. */
export const DEFAULT_ARTICLES_SECTION_HEADING = 'تازہ ترین مضامین'

/** Homepage hero primary CTA fallback. */
export const DEFAULT_HERO_CTA1_LABEL = 'کورسز دیکھیں'

/** Homepage hero secondary CTA fallback. */
export const DEFAULT_HERO_CTA2_LABEL = DEFAULT_SERVICES_SECTION_HEADING

/** About page secondary courses CTA. */
export const DEFAULT_ABOUT_COURSES_CTA = 'ہمارے کورسز'

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
