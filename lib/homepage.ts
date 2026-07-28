import type { CarouselItem } from '@/lib/types/ui'
import { courseCtaLabel, hasPublishedSlug, resolveCourseCardImage, serviceCtaLabel } from '@/lib/cmsPage'
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
    .map((course) => {
      const image = resolveCourseCardImage(course)
      return {
        id: course._id,
        image: image ? toImageUrl(image) : null,
        title: course.title,
        description: [course.price, course.duration].filter(Boolean).join(' · ') || null,
        href: coursePath(course.slug.current),
        badge: course.subject ?? null,
        ctaLabel: courseCtaLabel(course.childCount ?? 0),
      }
    })
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

export type HomeHeroModel = {
  subtitle?: string
  title?: string
  description?: string
  heroImage: string | null
  heroImageSrcSet?: string
  heroImageSizes?: string
  heroImageBlur?: string
  preloadHref: string | null
  cta1Label?: string
  cta1Link?: string
  cta2Label?: string
  cta2Link?: string
  stats: Array<{ value: string; label: string }>
}

type LcpHeroImageProps = {
  src: string
  srcSet: string
  sizes: string
  preloadHref: string
}

/** Assemble homepage HeroSection props from CMS settings. */
export function buildHomeHeroModel(
  homepageSettings: HomepageSettingsDoc | null | undefined,
  lcpProps: ((source: SanityImageAsset) => LcpHeroImageProps) | null,
): HomeHeroModel {
  const heroImage = homepageSettings?.heroImage && lcpProps
    ? lcpProps(homepageSettings.heroImage)
    : null

  return {
    subtitle: homepageSettings?.heroArabicText || undefined,
    title: homepageSettings?.heroTitle
      ? homepageSettings.heroTitle.replace(/\\n/g, '\n')
      : undefined,
    description: homepageSettings?.heroSubtitle || undefined,
    heroImage: heroImage?.src ?? null,
    heroImageSrcSet: heroImage?.srcSet,
    heroImageSizes: heroImage?.sizes,
    heroImageBlur: homepageSettings?.heroImageLqip ?? undefined,
    preloadHref: heroImage?.preloadHref ?? null,
    cta1Label: homepageSettings?.heroCta1Label || undefined,
    cta1Link: homepageSettings?.heroCta1Link || undefined,
    cta2Label: homepageSettings?.heroCta2Label || undefined,
    cta2Link: homepageSettings?.heroCta2Link || undefined,
    stats: [
      {
        value: homepageSettings?.aboutStat1Value ?? '',
        label: homepageSettings?.aboutStat1Label ?? '',
      },
      {
        value: homepageSettings?.aboutStat2Value ?? '',
        label: homepageSettings?.aboutStat2Label ?? '',
      },
      {
        value: homepageSettings?.aboutStat3Value ?? '',
        label: homepageSettings?.aboutStat3Label ?? '',
      },
    ],
  }
}
