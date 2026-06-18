import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { getPageBySlug, getSiteSettings } from '@/sanity/lib/fetchers'

export type CmsPageDoc = {
  title?: string
  seoTitle?: string
  subtitle?: string
  seoDescription?: string
  eyebrow?: string
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

import type { SiteSettingsDoc, PageDoc } from '@/lib/types'

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
