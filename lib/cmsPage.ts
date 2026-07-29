import type { Metadata } from 'next'
import {
  DEFAULT_COURSE_ENROLL_CTA,
  DEFAULT_HERO_CTA1_LABEL,
  DEFAULT_SERVICE_BOOK_CTA,
  DEFAULT_SERVICE_BROWSE_CTA,
  DEFAULT_SITE_NAME_URDU,
  pageMetadata,
} from '@/lib/seo'
import { defaultOgImage } from '@/sanity/lib/image'
import { getPageBySlug, getSiteSettings } from '@/sanity/lib/fetchers'
import type { SiteSettingsDoc, PageDoc, CmsPageDoc, SlugListItem, SanityImageAsset } from '@/lib/types'

/** Listing index meta/subtitle fallbacks. */
export const DEFAULT_COURSES_DESCRIPTION =
  'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ سیکھیں۔'

export const DEFAULT_SERVICES_DESCRIPTION =
  'اخلاص کے ساتھ پیش کی گئی مذہبی خدمات — نیابت زیارت، زکوٰۃ، خمس اور مزید۔'

export const DEFAULT_ARTICLES_DESCRIPTION = 'اسلامی علم، خبریں اور مطالعات'

export const DEFAULT_COURSES_SUBTITLE =
  'اہل علماء سے سیکھیں — قرآن، نہج البلاغہ، فقہ، اخلاق اور تاریخ۔'

export function resolveSeoTitle(doc: CmsPageDoc | null | undefined, fallback: string): string {
  return doc?.seoTitle || doc?.title || fallback
}

export function resolveSeoDescription(
  doc: CmsPageDoc | null | undefined,
  fallback?: string,
): string | undefined {
  return doc?.seoDescription || doc?.subtitle || fallback
}


/** Default course leaf description (metadata + WebPage + JSON-LD). */
export function defaultCourseDescription(
  doc: { title?: string; subject?: string } | null | undefined,
  options?: { short?: boolean },
): string {
  const title = doc?.title ?? 'کورس'
  const subject = doc?.subject ? ` — ${doc.subject}` : ''
  if (options?.short) {
    return `آن لائن ${title}${subject}۔`
  }
  return `آن لائن ${title}${subject}۔ پاکستان اور دنیا بھر کے شیعہ خاندانوں کے لیے مستند اسلامی تعلیم۔`
}

/** Default service leaf description (metadata + WebPage + JSON-LD). */
export function defaultServiceDescription(
  doc: { title?: string } | null | undefined,
): string {
  const title = doc?.title || 'خدمت'
  return `${title} — ${DEFAULT_SITE_NAME_URDU} کی مذہبی خدمات۔`
}

/** Leaf course/service description: SEO → excerpt → fallback. */
export function resolveLeafDescription(
  doc: { seoDescription?: string; excerpt?: string } | null | undefined,
  fallback: string,
): string {
  return doc?.seoDescription || doc?.excerpt || fallback
}

/** Parent vs leaf CTA on course cards / carousel / nested listings. */
export function courseCtaLabel(childCount: number): string {
  return childCount > 0 ? DEFAULT_HERO_CTA1_LABEL : DEFAULT_COURSE_ENROLL_CTA
}

/** Card image for course lists — prefers own image, then GROQ child fallback. */
export function resolveCourseCardImage(
  course: { featuredImage?: SanityImageAsset; cardImage?: SanityImageAsset } | null | undefined,
): SanityImageAsset | undefined {
  return course?.featuredImage ?? course?.cardImage
}

/** Parent vs leaf CTA on service cards / carousel / nested listings. */
export function serviceCtaLabel(childCount: number): string {
  return childCount > 0 ? DEFAULT_SERVICE_BROWSE_CTA : DEFAULT_SERVICE_BOOK_CTA
}

/** Type guard for CMS list items with a published slug. */
export function hasPublishedSlug<T extends SlugListItem>(
  item: T,
): item is T & { title: string; slug: { current: string } } {
  return Boolean(item.title && item.slug?.current)
}

/** Map list items to ItemListSchema entries (`slug` as string or `{ current }`). */
export function toItemListEntries(
  items: Array<{ title: string; slug: string | { current: string } }>,
  basePath: string,
): { name: string; url: string }[] {
  return items.map((item) => {
    const slug = typeof item.slug === 'string' ? item.slug : item.slug.current
    return {
      name: item.title,
      url: `${basePath}/${slug}`,
    }
  })
}

/** Page-level CMS orchestration (see `15-naming.mdc` — `fetch*` lives here). */
export async function fetchCmsPage(slug: string): Promise<{
  page: PageDoc | null
  settings: SiteSettingsDoc | null
}> {
  const [page, settings] = await Promise.all([getPageBySlug(slug), getSiteSettings()])
  return { page, settings }
}

export type CmsPageMetadataOptions = {
  slug: string
  path: string
  titleFallback: string
  descriptionFallback?: string
  keywords?: string[]
  noIndex?: boolean
}

export async function cmsPageMetadata({
  slug,
  path,
  titleFallback,
  descriptionFallback,
  keywords,
  noIndex,
}: CmsPageMetadataOptions): Promise<Metadata> {
  const { page, settings } = await fetchCmsPage(slug)
  return pageMetadata({
    title: resolveSeoTitle(page, titleFallback),
    description: resolveSeoDescription(page, descriptionFallback),
    path,
    image: defaultOgImage(settings),
    settings,
    keywords,
    noIndex,
  })
}
