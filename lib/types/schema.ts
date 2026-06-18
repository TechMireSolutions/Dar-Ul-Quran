export type FaqSchemaItem = { question: string; answer: string }

export type CourseSchemaData = {
  title: string
  seoTitle?: string
  seoDescription?: string
  excerpt?: string
  subject?: string
  duration?: string
  instructor?: string
  faqItems?: FaqSchemaItem[]
  pricingMin?: string
  /** Full path segments, e.g. "rozana/nazra-rozana" */
  slugPath: string
  /** @deprecated use slugPath — kept for query backward compat */
  slug?: string
  parentSlug?: string
  outcomes?: Array<{ title: string }>
  orgName?: string
  breadcrumbLabels?: Record<string, string>
}

export type ServiceSchemaData = {
  title: string
  seoDescription?: string
  excerpt?: string
  slugPath: string
  price?: string
  isBookable?: boolean
  faqItems?: FaqSchemaItem[]
  orgName?: string
  breadcrumbLabels?: Record<string, string>
}

export type TopicClusterPillarPage = {
  title?: string
  _type?: string
  slug?: string
  parentSlug?: string | null
  grandparentSlug?: string | null
}

export type TopicClusterRelatedArticle = {
  _id: string
  title: string
  slug: string
  excerpt?: string
}

export type TopicClusterDoc = {
  clusterName?: string
  pillarKeyword?: string
  aiContextStatement?: string
  faqItems?: FaqSchemaItem[]
  pillarPage?: TopicClusterPillarPage | null
  relatedArticles?: TopicClusterRelatedArticle[]
}
