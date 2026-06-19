export type SitemapCourseEntry = {
  slug: string
  parentSlug?: string
  grandparentSlug?: string
  _updatedAt: string
  hasChildren: boolean
}

export type SitemapServiceEntry = {
  slug: string
  parentSlug?: string
  _updatedAt: string
  hasChildren: boolean
}

export type SitemapArticleEntry = {
  slug: string
  _updatedAt: string
}

export type SitemapData = {
  courses: SitemapCourseEntry[]
  articles: SitemapArticleEntry[]
  services: SitemapServiceEntry[]
}

export type LlmFeedSettings = {
  siteName: string
  description: string
  whatsapp: string
  email: string
}

export type LlmFeedCourseChild = {
  title: string
  slug: string
  subject?: string
  seoDescription?: string
  grandchildren?: Array<{ title: string; slug: string; seoDescription?: string }>
}

export type LlmFeedCourse = {
  title: string
  slug: string
  subject?: string
  duration?: string
  seoDescription?: string
  children?: LlmFeedCourseChild[]
}

export type LlmFeedArticle = {
  title: string
  slug: string
  excerpt?: string
  categories?: Array<{ title: string }>
}

export type LlmFeedTestimonial = {
  name?: string
  quote?: string
}

export type LlmFeedData = {
  settings: LlmFeedSettings | null
  courses: LlmFeedCourse[]
  articles: LlmFeedArticle[]
  testimonials: LlmFeedTestimonial[]
}
