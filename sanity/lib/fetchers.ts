import { cache } from 'react'
import { safeFetch } from './client'
import { cmsTypeTag, courseTag, postTag, serviceTag } from '@/lib/cache-tags'
import {
  pageBySlugQuery,
  siteSettingsQuery,
  headerNavQuery,
  footerServicesQuery,
  homepageSettingsQuery,
  featuredPostsQuery,
  topLevelServicesQuery,
  topLevelCoursesQuery,
  testimonialsQuery,
  allCoursesForFormQuery,
  allServicesForFormQuery,
  postsQuery,
  courseBySlugDeepQuery,
  serviceBySlugDeepQuery,
  postBySlugQuery,
  courseSchemaQuery,
  topicClusterForPostQuery,
  topicClusterForPillarQuery,
  allCoursePathsQuery,
  allServicePathsQuery,
  postSlugsQuery,
  sitemapQuery,
  llmFeedQuery,
} from './queries'
import type {
  CourseSchemaData,
  PageDoc,
  SiteSettingsDoc,
  HeaderNavDoc,
  FooterServiceDoc,
  HomepageSettingsDoc,
  TestimonialDoc,
  ContactFormOptionDoc,
  PostDoc,
  PostListItemDoc,
  CourseListItemDoc,
  ServiceListItemDoc,
  SlugPathDoc,
  TopicClusterDoc,
  CourseDetailDoc,
  ServiceDetailDoc,
} from '@/lib/types'
import type { SitemapData, LlmFeedData } from '@/lib/types/feed'

export const getSiteSettings = cache(() => safeFetch<SiteSettingsDoc>(siteSettingsQuery))

export const getPageBySlug = cache((slug: string) =>
  safeFetch<PageDoc>(pageBySlugQuery, { slug }),
)

export const getHeaderNav = cache(() => safeFetch<HeaderNavDoc>(headerNavQuery))

export const getFooterServices = cache(() =>
  safeFetch<FooterServiceDoc[]>(footerServicesQuery),
)

export const getHomepageSettings = cache(() =>
  safeFetch<HomepageSettingsDoc>(homepageSettingsQuery),
)

export const getFeaturedPosts = cache(() => safeFetch<PostListItemDoc[]>(featuredPostsQuery))

export const getTopLevelServices = cache(() => safeFetch<ServiceListItemDoc[]>(topLevelServicesQuery))

export const getTopLevelCourses = cache(() => safeFetch<CourseListItemDoc[]>(topLevelCoursesQuery))

export const getTestimonials = cache(() => safeFetch<TestimonialDoc[]>(testimonialsQuery))

export const getPosts = cache(() => safeFetch<PostListItemDoc[]>(postsQuery))

export const getCoursesForContactForm = cache(() =>
  safeFetch<ContactFormOptionDoc[]>(allCoursesForFormQuery),
)

export const getServicesForContactForm = cache(() =>
  safeFetch<ContactFormOptionDoc[]>(allServicesForFormQuery),
)

export const getCourseBySlug = cache((slug: string) =>
  safeFetch<CourseDetailDoc>(courseBySlugDeepQuery, { slug }, {
    tags: [cmsTypeTag('course'), courseTag(slug)],
  }),
)

export const getServiceBySlug = cache((slug: string) =>
  safeFetch<ServiceDetailDoc>(serviceBySlugDeepQuery, { slug }, {
    tags: [cmsTypeTag('service'), serviceTag(slug)],
  }),
)

export const getPostBySlug = cache((slug: string) =>
  safeFetch<PostDoc>(postBySlugQuery, { slug }, {
    tags: [cmsTypeTag('post'), postTag(slug)],
  }),
)

export const getCourseSchema = cache((slug: string) =>
  safeFetch<CourseSchemaData>(courseSchemaQuery, { slug }, {
    tags: [cmsTypeTag('course'), courseTag(slug)],
  }),
)

export const getTopicClusterForPost = cache(async (postId: string) => {
  const rows = await safeFetch<TopicClusterDoc[]>(topicClusterForPostQuery, { postId })
  return rows?.[0] ?? null
})

export const getTopicClusterForPillar = cache((pillarId: string) =>
  safeFetch<TopicClusterDoc>(topicClusterForPillarQuery, { pillarId }),
)

export const getAllCoursePaths = cache(() => safeFetch<SlugPathDoc[]>(allCoursePathsQuery))

export const getAllServicePaths = cache(() => safeFetch<SlugPathDoc[]>(allServicePathsQuery))

export const getPostSlugs = cache(() => safeFetch<Array<{ slug: string }>>(postSlugsQuery))

export const getSitemapData = cache(() => safeFetch<SitemapData>(sitemapQuery))

export const getLlmFeedData = cache(() => safeFetch<LlmFeedData>(llmFeedQuery))
