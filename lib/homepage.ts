import type { CarouselItem } from '@/lib/types/ui'
import { courseCtaLabel, hasPublishedSlug, serviceCtaLabel } from '@/lib/cmsPage'
import { coursePath, servicePath } from '@/lib/paths'
import { DEFAULT_HOME_DESCRIPTION, resolveSiteNameUrdu } from '@/lib/seo'
import type {
  CourseListItemDoc,
  HomepageSettingsDoc,
  SanityImageAsset,
  ServiceListItemDoc,
  SiteSettingsDoc,
} from '@/lib/types'

type ToImageUrl = (source: SanityImageAsset) => string

/** Shared home title + description for metadata and WebPage schema. */
export function resolveHomeCopy(
  settings?: Pick<SiteSettingsDoc, 'siteName' | 'description'> | null,
  homepageSettings?: Pick<HomepageSettingsDoc, 'heroSubtitle'> | null,
): { title: string; description: string } {
  return {
    title: resolveSiteNameUrdu(settings?.siteName),
    description:
      settings?.description ||
      homepageSettings?.heroSubtitle ||
      DEFAULT_HOME_DESCRIPTION,
  }
}

export function coursesToCarouselItems(
  courses: CourseListItemDoc[] | null | undefined,
  toImageUrl: ToImageUrl,
): CarouselItem[] {
  return (courses ?? [])
    .filter(hasPublishedSlug)
    .map((course) => ({
      id: course._id,
      image: course.featuredImage ? toImageUrl(course.featuredImage) : null,
      title: course.title,
      description: [course.price, course.duration].filter(Boolean).join(' · ') || null,
      href: coursePath(course.slug.current),
      badge: course.subject ?? null,
      ctaLabel: courseCtaLabel(course.childCount ?? 0),
    }))
}

export function servicesToCarouselItems(
  services: ServiceListItemDoc[] | null | undefined,
  toImageUrl: ToImageUrl,
): CarouselItem[] {
  return (services ?? [])
    .filter(hasPublishedSlug)
    .map((service) => {
      const childCount = service.childCount ?? service.children?.length ?? 0
      const childTitles = service.children
        ?.slice(0, 4)
        .map((child) => child.title)
        .filter(Boolean)
        .join(' · ')
      return {
        id: service._id,
        image: service.icon ? toImageUrl(service.icon) : null,
        title: service.title,
        description: childCount > 0 ? childTitles || null : service.price || null,
        href: servicePath(service.slug.current),
        badge: null,
        ctaLabel: serviceCtaLabel(childCount),
      }
    })
}
