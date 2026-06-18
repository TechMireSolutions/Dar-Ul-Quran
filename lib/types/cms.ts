import type { SanityImageAsset } from '@/sanity/lib/image'
import type { PortableTextBlock } from '@portabletext/types'
import type { CmsPageDoc } from '@/lib/cmsPage'
import type { FaqSchemaItem } from './schema'
import type { RawNavItem } from './navigation'

export type SiteSettingsDoc = {
  siteName?: string
  description?: string
  tagline?: string
  email?: string
  phone?: string
  whatsapp?: string
  address?: string
  favicon?: SanityImageAsset
  logo?: SanityImageAsset
  facebook?: string
  instagram?: string
  twitter?: string
  youtube?: string
  darulQuranUrl?: string
  searchPlaceholder?: string
  contactFormSubjects?: string[]
  contactFormSubmitLabel?: string
  donateCauses?: Array<{ title: string; desc: string }>
  donateArabicVerse?: string
  donateHowToHeading?: string
  donateHowToText?: string
  donateUrl?: string
  donatePayOnlineLabel?: string
  donateContactLabel?: string
  donateClosingMessage?: string
}

export type PageDoc = CmsPageDoc & {
  _id?: string
  slug?: { current?: string }
  body?: PortableTextBlock[]
}

export type HeaderNavDoc = {
  items?: RawNavItem[]
}

export type FooterServiceDoc = {
  _id: string
  title: string
  slug: string
}

export type HomepageSettingsDoc = {
  heroImage?: SanityImageAsset
  heroImageLqip?: string
  heroArabicText?: string
  heroTitle?: string
  heroSubtitle?: string
  heroCta1Label?: string
  heroCta1Link?: string
  heroCta2Label?: string
  heroCta2Link?: string
  aboutEyebrow?: string
  aboutHeading?: string
  aboutBody1?: string
  aboutBody2?: string
  aboutPillars?: string[]
  aboutCtaLabel?: string
  aboutHadithArabic?: string
  aboutHadithTranslation?: string
  aboutHadithAttribution?: string
  aboutStat1Value?: string
  aboutStat1Label?: string
  aboutStat2Value?: string
  aboutStat2Label?: string
  aboutStat3Value?: string
  aboutStat3Label?: string
  aboutBadgeText?: string
  aboutBadgeSubtext?: string
  coursesHeading?: string
  coursesSubheading?: string
  servicesHeading?: string
  servicesSubheading?: string
  articlesHeading?: string
  articlesSubheading?: string
  testimonialsEyebrow?: string
  testimonialsHeading?: string
  donateHeading?: string
  donateText?: string
  donateQuote?: string
  donateQuoteAttribution?: string
  donateCtaLabel?: string
}

export type TestimonialDoc = {
  _id: string
  quote: string
  name: string
  role?: string
}

export type ContactFormOptionDoc = {
  _id: string
  title: string
  parentTitle?: string
}

export type PostListItemDoc = {
  _id: string
  title?: string
  slug?: { current?: string }
  mainImage?: SanityImageAsset
  excerpt?: string
  publishedAt?: string
  featured?: boolean
  categories?: Array<{ _id: string; title?: string; slug?: { current?: string } }>
  author?: { name?: string; image?: SanityImageAsset }
}

export type PostDoc = PostListItemDoc & {
  body?: PortableTextBlock[]
  _updatedAt?: string
  seoTitle?: string
  seoDescription?: string
  author?: { name?: string; image?: SanityImageAsset; bio?: PortableTextBlock[] }
}

export type CourseListItemDoc = {
  _id: string
  title?: string
  slug?: { current?: string }
  excerpt?: string
  subject?: string
  featuredImage?: SanityImageAsset
  price?: string
  duration?: string
  instructor?: string
  childCount?: number
}

export type ServiceListItemDoc = {
  _id: string
  title?: string
  slug?: { current?: string }
  excerpt?: string
  featuredImage?: SanityImageAsset
  childCount?: number
}

export type ParentSlugNode = { slug: string; parent?: ParentSlugNode | null } | null

export type SlugPathDoc = {
  slug: string
  parent: ParentSlugNode
}

type AncestryNode = { title: string; slug: string; parent?: AncestryNode | null }

export type CourseChildDoc = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: SanityImageAsset
  icon?: SanityImageAsset
  price?: string
  duration?: string
  childCount?: number
}

export type CourseDetailDoc = {
  _id: string
  title?: string
  slug?: { current?: string }
  excerpt?: string
  body?: PortableTextBlock[]
  subject?: string
  featuredImage?: SanityImageAsset
  price?: string
  duration?: string
  instructor?: string
  enrollmentLink?: string
  seoTitle?: string
  seoDescription?: string
  parent?: AncestryNode | null
  children?: CourseChildDoc[]
  faq?: unknown
  heroSubtitle?: string
  heroCtaLabel?: string
  overviewHeading?: string
  overviewBody?: PortableTextBlock[]
  outcomesHeading?: string
  outcomes?: Array<{ title?: string; desc?: string }>
  whyUsHeading?: string
  whyUs?: Array<{ title?: string; desc?: string }>
  howItWorksHeading?: string
  howItWorks?: Array<{ label?: string; desc?: string }>
  feeSummaryHeading?: string
  feeSummaryItems?: Array<{ label?: string; amount?: string }>
  pricingHeading?: string
  pricingTables?: unknown[]
  ctaHeading?: string
  ctaSubtitle?: string
  ctaBtn1Label?: string
  ctaBtn2Label?: string
  promiseHeading?: string
  promiseBody?: string
  faqSectionHeading?: string
}

export type ServiceChildDoc = CourseChildDoc

export type ServiceDetailDoc = {
  _id: string
  title?: string
  slug?: { current?: string }
  excerpt?: string
  body?: PortableTextBlock[]
  icon?: SanityImageAsset
  featuredImage?: SanityImageAsset
  isBookable?: boolean
  price?: string
  seoTitle?: string
  seoDescription?: string
  parent?: AncestryNode | null
  children?: ServiceChildDoc[]
  faq?: unknown
  faqItems?: FaqSchemaItem[]
  heroImage?: SanityImageAsset
  heroSubtitle?: string
  heroBody?: PortableTextBlock[]
  whyUsImage?: SanityImageAsset
}
