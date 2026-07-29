import type { Metadata } from 'next'
import { lcpHeroImageProps, carouselImageUrl, defaultOgImage, ogImageUrl } from '@/sanity/lib/image'
import {
  getSiteSettings,
  getHomepageSettings,
  getFeaturedPosts,
  getTopLevelServices,
  getTopLevelCourses,
  getTestimonials,
} from '@/sanity/lib/fetchers'
import { pageMetadata, DEFAULT_SITE_NAME_URDU, DEFAULT_COURSE_ALL_CTA, DEFAULT_SERVICE_ALL_CTA, DEFAULT_SERVICES_SECTION_HEADING } from '@/lib/seo'
import {
  buildHomeHeroModel,
  coursesToCarouselItems,
  resolveHomeCopy,
  servicesToCarouselItems,
} from '@/lib/homepage'
import { PATHS, SECTION_LABELS } from '@/lib/paths'
import WebPageSchema from '@/components/seo/WebPageSchema'
import LcpImagePreload from '@/components/seo/LcpImagePreload'
import HeroSection from '@/components/sections/HeroSection'
import HomeAboutSection from '@/components/sections/HomeAboutSection'
import HomeArticlesSection from '@/components/sections/HomeArticlesSection'
import HomeTestimonialsSection from '@/components/sections/HomeTestimonialsSection'
import HomeDonateCtaSection from '@/components/sections/HomeDonateCtaSection'
import nextDynamic from 'next/dynamic'
import { TW_CONTAINER } from '@/lib/tailwind'

const CarouselSection = nextDynamic(() => import('@/components/sections/CarouselSection'), {
  loading: () => (
    <div className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className={TW_CONTAINER}>
        <div className="h-72 rounded-2xl bg-gray-100 animate-pulse" />
      </div>
    </div>
  ),
})

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const [settings, homepageSettings] = await Promise.all([
    getSiteSettings(),
    getHomepageSettings(),
  ])

  const { title, description } = resolveHomeCopy(settings, homepageSettings)

  const ogImage = homepageSettings?.heroImage
    ? ogImageUrl(homepageSettings.heroImage)
    : defaultOgImage(settings)

  return pageMetadata({
    title,
    description,
    path: PATHS.home,
    image: ogImage,
    imageAlt: title,
    settings,
    keywords: [
      DEFAULT_SITE_NAME_URDU,
      'آن لائن قرآن کورسز',
      'شیعہ اسلامی تعلیم',
      'Online Quran classes',
      'Shia Islamic education',
    ],
  })
}

export default async function HomePage() {
  const [posts, services, courses, homepageSettings, testimonials, settings] = await Promise.all([
    getFeaturedPosts(),
    getTopLevelServices(),
    getTopLevelCourses(),
    getHomepageSettings(),
    getTestimonials(),
    getSiteSettings(),
  ])

  const { title: homeTitle, description: homeDescription } = resolveHomeCopy(settings, homepageSettings)
  const hero = buildHomeHeroModel(homepageSettings, lcpHeroImageProps)
  const courseItems = coursesToCarouselItems(courses, carouselImageUrl)
  const serviceItems = servicesToCarouselItems(services, carouselImageUrl)

  return (
    <>
      {hero.preloadHref && (
        <LcpImagePreload href={hero.preloadHref} media="(min-width: 768px)" />
      )}
      <WebPageSchema title={homeTitle} description={homeDescription} path={PATHS.home} />

      <HeroSection
        subtitle={hero.subtitle}
        title={hero.title}
        description={hero.description}
        heroImage={hero.heroImage}
        heroImageSrcSet={hero.heroImageSrcSet}
        heroImageSizes={hero.heroImageSizes}
        heroImageBlur={hero.heroImageBlur}
        cta1Label={hero.cta1Label}
        cta1Link={hero.cta1Link}
        cta2Label={hero.cta2Label}
        cta2Link={hero.cta2Link}
        stats={hero.stats}
      />

      <HomeAboutSection settings={homepageSettings} />

      {courseItems.length > 0 && (
        <CarouselSection
          eyebrow="تعلیم"
          title={homepageSettings?.coursesHeading || SECTION_LABELS.onlineCourses}
          subtitle={homepageSettings?.coursesSubheading || 'اہل علماء سے سیکھیں — قرآن، فقہ، اخلاق اور مزید'}
          items={courseItems}
          viewAllHref={PATHS.onlineCourses}
          viewAllLabel={DEFAULT_COURSE_ALL_CTA}
          bg="white"
        />
      )}

      {serviceItems.length > 0 && (
        <CarouselSection
          eyebrow={DEFAULT_SERVICES_SECTION_HEADING}
          title={homepageSettings?.servicesHeading || DEFAULT_SERVICES_SECTION_HEADING}
          subtitle={homepageSettings?.servicesSubheading || 'اخلاص اور توجہ کے ساتھ ادا کی گئی مذہبی خدمات'}
          items={serviceItems}
          viewAllHref={PATHS.services}
          viewAllLabel={DEFAULT_SERVICE_ALL_CTA}
          bg="gray"
        />
      )}

      <HomeArticlesSection posts={posts} settings={homepageSettings} />
      <HomeTestimonialsSection testimonials={testimonials} settings={homepageSettings} />
      <HomeDonateCtaSection settings={homepageSettings} />
    </>
  )
}
