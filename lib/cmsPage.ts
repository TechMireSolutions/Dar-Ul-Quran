import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { getPageBySlug, getSiteSettings } from '@/sanity/lib/fetchers'
import type { SiteSettingsDoc, PageDoc } from '@/lib/types'

export type CmsPageDoc = {
  title?: string
  seoTitle?: string
  subtitle?: string
  seoDescription?: string
  eyebrow?: string
}

export type SlugListItem = {
  title?: string
  slug?: { current?: string }
}

export function resolveSeoTitle(doc: CmsPageDoc | null | undefined, fallback: string): string {
  return doc?.seoTitle || doc?.title || fallback
}

export function resolveSeoDescription(
  doc: CmsPageDoc | null | undefined,
  fallback?: string,
): string | undefined {
  return doc?.seoDescription || doc?.subtitle || fallback
}

/** Type guard for CMS list items with a published slug. */
export function hasPublishedSlug<T extends SlugListItem>(
  item: T,
): item is T & { title: string; slug: { current: string } } {
  return Boolean(item.title && item.slug?.current)
}

/** Map slugged list items to ItemListSchema entries. */
export function toItemListEntries(
  items: Array<{ title: string; slug: { current: string } }>,
  basePath: string,
): { name: string; url: string }[] {
  return items.map((item) => ({
    name: item.title,
    url: `${basePath}/${item.slug.current}`,
  }))
}

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
    settings,
    keywords,
    noIndex,
  })
}
