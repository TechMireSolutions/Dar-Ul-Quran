import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { defaultOgImage } from '@/sanity/lib/image'
import { getPageBySlug, getSiteSettings } from '@/sanity/lib/fetchers'
import type { SiteSettingsDoc, PageDoc, CmsPageDoc, SlugListItem } from '@/lib/types'

export function resolveSeoTitle(doc: CmsPageDoc | null | undefined, fallback: string): string {
  return doc?.seoTitle || doc?.title || fallback
}

export function resolveSeoDescription(
  doc: CmsPageDoc | null | undefined,
  fallback?: string,
): string | undefined {
  return doc?.seoDescription || doc?.subtitle || fallback
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
  return childCount > 0 ? 'کورسز دیکھیں' : 'ابھی داخلہ لیں'
}

/** Parent vs leaf CTA on service cards / carousel / nested listings. */
export function serviceCtaLabel(childCount: number): string {
  return childCount > 0 ? 'خدمات دیکھیں' : 'ابھی بک کریں'
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
