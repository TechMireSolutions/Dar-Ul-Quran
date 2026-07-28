import type { PortableTextBlock } from '@portabletext/types'
import type { FaqSchemaItem } from './schema'
import type { RawNavItem } from './navigation'

/** CMS image field shape — queries expand asset metadata for LQIP when needed. */
export type SanityImageAsset = {
  asset?: {
    _ref?: string
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: { width: number; height: number; aspectRatio: number }
    }
  }
  alt?: string
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

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
  /** Own featuredImage, else first child with an image (list/carousel cards). */
  cardImage?: SanityImageAsset
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
  icon?: SanityImageAsset
  price?: string
  childCount?: number
  children?: Array<{ title?: string }>
}

export type TitleDescItemDoc = { title?: string; desc?: string }

export type LabelDescItemDoc = { label?: string; desc?: string }

export type FeeSummaryItemDoc = { label?: string; amount?: string }

export type PricingTableRowDoc = {
  plan?: string
  weeklyFrequency?: string
  monthlyClasses?: string
  feePerClass?: string
  monthlyTotal?: string
}

export type PricingTableDoc = {
  label?: string
  rows?: PricingTableRowDoc[]
}

export type FaqBlockItemDoc = {
  question: string
  answer?: unknown
}

export type ParentSlugNode = { slug: string; parent?: ParentSlugNode | null } | null

export type SlugPathDoc = {
  slug: string
  parent: ParentSlugNode
}

type AncestryNode = { title: string; slug: string; parent?: AncestryNode | null }

/** Nested course/service child card on parent listings. */
export type NestedChildDoc = {
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

export type CourseChildDoc = NestedChildDoc

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
  faq?: FaqBlockItemDoc[]
  faqItems?: FaqSchemaItem[]
  pricingMin?: string
  heroSubtitle?: string
  heroCtaLabel?: string
  overviewHeading?: string
  overviewBody?: string
  outcomesHeading?: string
  outcomes?: TitleDescItemDoc[]
  whyUsHeading?: string
  whyUs?: TitleDescItemDoc[]
  howItWorksHeading?: string
  howItWorks?: LabelDescItemDoc[]
  feeSummaryHeading?: string
  feeSummaryItems?: FeeSummaryItemDoc[]
  pricingHeading?: string
  pricingTables?: PricingTableDoc[]
  ctaHeading?: string
  ctaSubtitle?: string
  ctaBtn1Label?: string
  ctaBtn2Label?: string
  promiseHeading?: string
  promiseBody?: string
  faqSectionHeading?: string
}

export type ServiceChildDoc = NestedChildDoc

export type ServiceDetailDoc = {
  _id: string
  title?: string
  slug?: { current?: string }
  excerpt?: string
  body?: PortableTextBlock[]
  icon?: SanityImageAsset
  isBookable?: boolean
  price?: string
  seoTitle?: string
  seoDescription?: string
  parent?: AncestryNode | null
  children?: ServiceChildDoc[]
  faq?: FaqBlockItemDoc[]
  faqItems?: FaqSchemaItem[]
  heroImage?: SanityImageAsset
  heroSubtitle?: string
  heroBody?: string
  whyUsImage?: SanityImageAsset
  whyUsHeading?: string
  whyUs?: TitleDescItemDoc[]
  commitmentHeading?: string
  commitment?: TitleDescItemDoc[]
  howItWorksHeading?: string
  howItWorks?: LabelDescItemDoc[]
  ctaHeading?: string
  ctaSubtitle?: string
  ctaBtn1Label?: string
  ctaBtn2Label?: string
  faqSectionHeading?: string
}
