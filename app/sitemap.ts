import type { MetadataRoute } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { sitemapQuery } from '@/sanity/lib/queries'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://darulquran.pk'

type SitemapData = {
  courses: Array<{
    slug: string
    parentSlug?: string
    grandparentSlug?: string
    _updatedAt: string
    hasChildren: boolean
  }>
  articles: Array<{ slug: string; _updatedAt: string }>
  services: Array<{
    slug: string
    parentSlug?: string
    _updatedAt: string
    hasChildren: boolean
  }>
}

function courseUrl(c: SitemapData['courses'][number]): string {
  if (c.grandparentSlug)
    return `/online-courses/${c.grandparentSlug}/${c.parentSlug}/${c.slug}`
  if (c.parentSlug) return `/online-courses/${c.parentSlug}/${c.slug}`
  return `/online-courses/${c.slug}`
}

function serviceUrl(s: SitemapData['services'][number]): string {
  if (s.parentSlug) return `/services/${s.parentSlug}/${s.slug}`
  return `/services/${s.slug}`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await safeFetch<SitemapData>(sitemapQuery)
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/online-courses`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/articles`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/donate`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const coursePages: MetadataRoute.Sitemap = (data?.courses ?? []).map((c) => ({
    url: `${BASE}${courseUrl(c)}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: 'monthly' as const,
    // Leaf courses (enrollable) are higher value than category landing pages
    priority: c.hasChildren ? 0.8 : 0.95,
  }))

  const servicePages: MetadataRoute.Sitemap = (data?.services ?? []).map((s) => ({
    url: `${BASE}${serviceUrl(s)}`,
    lastModified: new Date(s._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: s.hasChildren ? 0.7 : 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = (data?.articles ?? []).map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...coursePages, ...servicePages, ...articlePages]
}
