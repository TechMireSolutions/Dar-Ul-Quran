import { cache } from 'react'
import { safeFetch } from './client'
import {
  pageBySlugQuery,
  siteSettingsQuery,
  courseBySlugDeepQuery,
  serviceBySlugDeepQuery,
  postBySlugQuery,
  courseSchemaQuery,
  topicClusterForPostQuery,
  topicClusterForPillarQuery,
} from './queries'
import type { CourseSchemaData } from '@/lib/types'

export const getSiteSettings = cache(() => safeFetch(siteSettingsQuery))

export const getPageBySlug = cache((slug: string) => safeFetch(pageBySlugQuery, { slug }))

export const getCourseBySlug = cache((slug: string) => safeFetch(courseBySlugDeepQuery, { slug }))

export const getServiceBySlug = cache((slug: string) => safeFetch(serviceBySlugDeepQuery, { slug }))

export const getPostBySlug = cache((slug: string) => safeFetch(postBySlugQuery, { slug }))

export const getCourseSchema = cache((slug: string) =>
  safeFetch<CourseSchemaData>(courseSchemaQuery, { slug }),
)

export const getTopicClusterForPost = cache((postId: string) =>
  safeFetch(topicClusterForPostQuery, { postId }),
)

export const getTopicClusterForPillar = cache((pillarId: string) =>
  safeFetch(topicClusterForPillarQuery, { pillarId }),
)
