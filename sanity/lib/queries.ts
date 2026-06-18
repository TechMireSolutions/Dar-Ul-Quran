// ─── GROQ fragments ──────────────────────────────────────────────────────────

const PARENT_CHAIN_WITH_TITLES = `
  "parent": parent->{
    _id, title, "slug": slug.current,
    "parent": parent->{
      _id, title, "slug": slug.current,
      "parent": parent->{
        _id, title, "slug": slug.current
      }
    }
  }
`

const PARENT_SLUG_CHAIN = `
  "parent": parent->{
    "slug": slug.current,
    "parent": parent->{
      "slug": slug.current,
      "parent": parent->{ "slug": slug.current }
    }
  }
`

const TOPIC_CLUSTER_PILLAR_FIELDS = `
  clusterName,
  pillarKeyword,
  aiContextStatement,
  "faqItems": faqItems[]{ question, answer },
  "relatedArticles": supportingArticles[]->{
    _id,
    title,
    "slug": slug.current,
    excerpt
  }
`

// ─── Posts / Articles ────────────────────────────────────────────────────────

export const postsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, mainImage, excerpt, publishedAt, featured,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image }
  }
`

export const featuredPostsQuery = `
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...6] {
    _id, title, slug, mainImage, excerpt, publishedAt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name }
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, mainImage, body, publishedAt, _updatedAt, excerpt,
    "categories": categories[]->{ _id, title, slug },
    "author": author->{ name, image, bio }
  }
`

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`

// ─── Courses ─────────────────────────────────────────────────────────────────

export const topLevelCoursesQuery = `
  *[_type == "course" && !defined(parent)] | order(order asc) {
    _id, title, slug, excerpt, subject, featuredImage, price, duration, instructor,
    "childCount": count(*[_type == "course" && references(^._id)])
  }
`

export const courseBySlugDeepQuery = `
  *[_type == "course" && slug.current == $slug][0] {
    _id, title, slug, excerpt, body, subject, featuredImage,
    price, duration, instructor, enrollmentLink, faq,
    "seoTitle": seoTitle, "seoDescription": seoDescription,

    heroSubtitle, heroCtaLabel,
    overviewHeading, overviewBody,
    outcomesHeading, outcomes[]{ title, desc },
    whyUsHeading, whyUs[]{ title, desc },
    howItWorksHeading, howItWorks[]{ label, desc },
    feeSummaryHeading, feeSummaryItems[]{ label, amount },
    pricingHeading,
    pricingTables[]{ label, rows[]{ plan, weeklyFrequency, monthlyClasses, feePerClass, monthlyTotal } },
    ctaHeading, ctaSubtitle, ctaBtn1Label, ctaBtn2Label,
    promiseHeading, promiseBody,
    faqSectionHeading,

    ${PARENT_CHAIN_WITH_TITLES},
    "children": *[_type == "course" && references(^._id)] | order(order asc) {
      _id, title, "slug": slug.current, excerpt, featuredImage, price, duration,
      "childCount": count(*[_type == "course" && references(^._id)])
    }
  }
`

export const allCoursePathsQuery = `
  *[_type == "course" && defined(slug.current)] {
    "slug": slug.current,
    ${PARENT_SLUG_CHAIN}
  }
`

// ─── Services ────────────────────────────────────────────────────────────────

export const topLevelServicesQuery = `
  *[_type == "service" && !defined(parent)] | order(order asc) {
    _id, title, slug, excerpt, icon, price,
    "childCount": count(*[_type == "service" && references(^._id)])
  }
`

export const serviceBySlugDeepQuery = `
  *[_type == "service" && slug.current == $slug][0] {
    _id, title, slug, excerpt, body, icon, isBookable, price, faq,
    "faqItems": faq[]{ question, "answer": pt::text(answer) },
    "seoTitle": seoTitle, "seoDescription": seoDescription,

    heroImage, heroSubtitle, heroBody,
    whyUsHeading, whyUsImage, whyUs[]{ title, desc },
    commitmentHeading, commitment[]{ title, desc },
    howItWorksHeading, howItWorks[]{ label, desc },
    ctaHeading, ctaSubtitle, ctaBtn1Label, ctaBtn2Label,
    faqSectionHeading,

    ${PARENT_CHAIN_WITH_TITLES},
    "children": *[_type == "service" && references(^._id)] | order(order asc) {
      _id, title, "slug": slug.current, excerpt, icon, price,
      "childCount": count(*[_type == "service" && references(^._id)])
    }
  }
`

export const allServicePathsQuery = `
  *[_type == "service" && defined(slug.current)] {
    "slug": slug.current,
    ${PARENT_SLUG_CHAIN}
  }
`

// ─── Pages ───────────────────────────────────────────────────────────────────

export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    _id, title, slug, eyebrow, subtitle, body, seoTitle, seoDescription
  }
`

// ─── Navigation ──────────────────────────────────────────────────────────────

export const headerNavQuery = `
  *[_type == "navigation" && title == "header"][0]{
    items[]{
      label, href, external,
      "children": children[]{
        label, href, external,
        "children": children[]{
          label, href, external,
          "children": children[]{ label, href, external }
        }
      }
    }
  }
`

export const footerServicesQuery = `
  *[_type == "service" && !defined(parent)] | order(order asc) {
    _id, title, "slug": slug.current
  }
`

// ─── Homepage ────────────────────────────────────────────────────────────────

export const homepageSettingsQuery = `
  *[_type == "homepageSettings"][0] {
    heroImage,
    "heroImageLqip": heroImage.asset->metadata.lqip,
    heroArabicText, heroTitle, heroSubtitle,
    heroCta1Label, heroCta1Link, heroCta2Label, heroCta2Link,
    aboutEyebrow, aboutHeading, aboutBody1, aboutBody2, aboutPillars,
    aboutCtaLabel, aboutHadithArabic, aboutHadithTranslation, aboutHadithAttribution,
    aboutStat1Value, aboutStat1Label, aboutStat2Value, aboutStat2Label,
    aboutStat3Value, aboutStat3Label, aboutBadgeText, aboutBadgeSubtext,
    coursesHeading, coursesSubheading, servicesHeading, servicesSubheading,
    articlesHeading, articlesSubheading,
    testimonialsEyebrow, testimonialsHeading,
    donateHeading, donateText, donateQuote, donateQuoteAttribution, donateCtaLabel
  }
`

export const testimonialsQuery = `
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, name, role
  }
`

// ─── Site Settings ───────────────────────────────────────────────────────────

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    siteName, description, tagline, email, phone, whatsapp,
    favicon, logo, facebook, instagram, twitter, youtube,
    darulQuranUrl, searchPlaceholder
  }
`

// ─── Contact Form — Courses & Services flat lists ─────────────────────────────

export const allCoursesForFormQuery = `
  *[_type == "course"] | order(order asc) {
    _id, title, "parentTitle": parent->title
  }
`

export const allServicesForFormQuery = `
  *[_type == "service"] | order(order asc) {
    _id, title, "parentTitle": parent->title
  }
`

// ─── Course JSON-LD / Schema.org ──────────────────────────────────────────────

export const courseSchemaQuery = `
  *[_type == "course" && slug.current == $slug][0] {
    title,
    seoTitle,
    seoDescription,
    excerpt,
    subject,
    duration,
    instructor,
    "faqItems": faq[]{ question, "answer": pt::text(answer) },
    "pricingMin": pricingTables[0].rows[0].feePerClass,
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    "outcomes": outcomes[]{ title },
    "orgName": *[_type == "siteSettings"][0].siteName
  }
`

// ─── Sitemap / LLM feeds ─────────────────────────────────────────────────────

export const sitemapQuery = `{
  "courses": *[_type == "course"] | order(order asc) {
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    "grandparentSlug": parent->parent->slug.current,
    _updatedAt,
    "hasChildren": count(*[_type == "course" && parent._ref == ^._id]) > 0
  },
  "articles": *[_type == "post"] | order(publishedAt desc) {
    "slug": slug.current,
    _updatedAt
  },
  "services": *[_type == "service"] | order(order asc) {
    "slug": slug.current,
    "parentSlug": parent->slug.current,
    _updatedAt,
    "hasChildren": count(*[_type == "service" && parent._ref == ^._id]) > 0
  }
}`

export const llmFeedQuery = `{
  "settings": *[_type == "siteSettings"][0] {
    siteName, description, whatsapp, email
  },
  "courses": *[_type == "course" && !defined(parent)] | order(order asc) {
    title,
    "slug": slug.current,
    subject,
    duration,
    seoDescription,
    "children": *[_type == "course" && parent._ref == ^._id] | order(order asc) {
      title,
      "slug": slug.current,
      subject,
      seoDescription,
      "grandchildren": *[_type == "course" && parent._ref == ^._id] | order(order asc) {
        title,
        "slug": slug.current,
        seoDescription
      }
    }
  },
  "articles": *[_type == "post"] | order(publishedAt desc) [0..14] {
    title,
    "slug": slug.current,
    excerpt,
    "categories": categories[]->{ title }
  },
  "testimonials": *[_type == "testimonial"] | order(order asc) [0..4] {
    name, quote
  }
}`

// ─── Topic clusters (SEO pillar strategy) ────────────────────────────────────

export const topicClusterForPostQuery = `
  *[_type == "topicCluster" && $postId in supportingArticles[]._ref][0] {
    clusterName,
    pillarKeyword,
    "pillarPage": pillarPage->{
      _type,
      title,
      "slug": slug.current,
      "parentSlug": parent->slug.current,
      "grandparentSlug": parent->parent->slug.current
    },
    "relatedArticles": supportingArticles[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt
    }
  }
`

export const topicClusterForPillarQuery = `
  *[_type == "topicCluster" && pillarPage._ref == $pillarId][0] {
    ${TOPIC_CLUSTER_PILLAR_FIELDS}
  }
`
