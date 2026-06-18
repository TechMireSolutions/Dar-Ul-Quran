import type { MetadataRoute } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { sitemapQuery } from '@/sanity/lib/queries'
import { coursePath, servicePath } from '@/lib/paths'
import { SITE_URL } from '@/lib/seo'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await safeFetch<SitemapData>(sitemapQuery)
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/online-courses`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/articles`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/donate`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const coursePages: MetadataRoute.Sitemap = (data?.courses ?? []).map((c) => ({
    url: `${SITE_URL}${coursePath(c.slug, c.parentSlug, c.grandparentSlug)}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: c.hasChildren ? 0.8 : 0.95,
  }))

  const servicePages: MetadataRoute.Sitemap = (data?.services ?? []).map((s) => ({
    url: `${SITE_URL}${servicePath(s.slug, s.parentSlug)}`,
    lastModified: new Date(s._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: s.hasChildren ? 0.7 : 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = (data?.articles ?? []).map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(a._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...coursePages, ...servicePages, ...articlePages]
}
