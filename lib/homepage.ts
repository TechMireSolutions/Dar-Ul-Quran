import type { CarouselItem } from '@/lib/types/ui'
import { carouselImageUrl } from '@/sanity/lib/image'
import { hasPublishedSlug, toItemListEntries } from '@/lib/cmsPage'
import type { CourseListItemDoc, ServiceListItemDoc } from '@/lib/types'

export { hasPublishedSlug, toItemListEntries }

export function coursesToCarouselItems(courses: CourseListItemDoc[] | null | undefined): CarouselItem[] {
  return (courses ?? [])
    .filter(hasPublishedSlug)
    .map((course) => ({
      id: course._id,
      image: course.featuredImage ? carouselImageUrl(course.featuredImage) : null,
      title: course.title,
      description: [course.price, course.duration].filter(Boolean).join(' · ') || null,
      href: `/online-courses/${course.slug.current}`,
      badge: course.subject ?? null,
      ctaLabel: 'ابھی داخلہ لیں',
    }))
}

export function servicesToCarouselItems(services: ServiceListItemDoc[] | null | undefined): CarouselItem[] {
  return (services ?? [])
    .filter(hasPublishedSlug)
    .map((service) => ({
      id: service._id,
      image: service.icon ? carouselImageUrl(service.icon) : null,
      title: service.title,
      description: (service.children?.length ?? 0) > 0
        ? service.children!.slice(0, 4).map((child) => child.title).filter(Boolean).join(' · ')
        : service.price || null,
      href: `/services/${service.slug.current}`,
      badge: null,
      ctaLabel: 'ابھی بک کریں',
    }))
}
