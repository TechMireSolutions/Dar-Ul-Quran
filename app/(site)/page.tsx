import type { Metadata } from 'next'
import { urlFor, lcpHeroImageProps } from '@/sanity/lib/image'
import {
  getSiteSettings,
  getHomepageSettings,
  getFeaturedPosts,
  getTopLevelServices,
  getTopLevelCourses,
  getTestimonials,
} from '@/sanity/lib/fetchers'
import { pageMetadata, resolveSiteNameUrdu, DEFAULT_SITE_NAME_URDU, DEFAULT_HOME_DESCRIPTION } from '@/lib/seo'
import { coursesToCarouselItems, servicesToCarouselItems } from '@/lib/homepage'
import { PATHS } from '@/lib/paths'
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

  const title = resolveSiteNameUrdu(settings?.siteName)
  const description =
    settings?.description ||
    homepageSettings?.heroSubtitle ||
    DEFAULT_HOME_DESCRIPTION

  const ogImage = homepageSettings?.heroImage
    ? urlFor(homepageSettings.heroImage).width(1200).height(630).fit('crop').auto('format').quality(80).url()
    : settings?.logo
      ? urlFor(settings.logo).width(1200).height(630).fit('crop').auto('format').url()
      : null

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

  const homeTitle = resolveSiteNameUrdu(settings?.siteName)
  const homeDescription =
    settings?.description ||
    homepageSettings?.heroSubtitle ||
    DEFAULT_HOME_DESCRIPTION

  const heroImage = homepageSettings?.heroImage
    ? lcpHeroImageProps(homepageSettings.heroImage)
    : null
  const heroImageBlur = homepageSettings?.heroImageLqip ?? undefined

  const courseItems = coursesToCarouselItems(courses)
  const serviceItems = servicesToCarouselItems(services)

  return (
    <>
      {heroImage && (
        <LcpImagePreload href={heroImage.preloadHref} media="(min-width: 768px)" />
      )}
      <WebPageSchema title={homeTitle} description={homeDescription} path={PATHS.home} />

      <HeroSection
        subtitle={homepageSettings?.heroArabicText || undefined}
        title={homepageSettings?.heroTitle ? homepageSettings.heroTitle.replace(/\\n/g, '\n') : undefined}
        description={homepageSettings?.heroSubtitle || undefined}
        heroImage={heroImage?.src ?? null}
        heroImageSrcSet={heroImage?.srcSet}
        heroImageSizes={heroImage?.sizes}
        heroImageBlur={heroImageBlur}
        cta1Label={homepageSettings?.heroCta1Label || undefined}
        cta1Link={homepageSettings?.heroCta1Link || undefined}
        cta2Label={homepageSettings?.heroCta2Label || undefined}
        cta2Link={homepageSettings?.heroCta2Link || undefined}
        stats={[
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
        ]}
      />

      <HomeAboutSection settings={homepageSettings} />

      {courseItems.length > 0 && (
        <CarouselSection
          eyebrow="تعلیم"
          title={homepageSettings?.coursesHeading || 'آنلائن کورسز'}
          subtitle={homepageSettings?.coursesSubheading || 'اہل علماء سے سیکھیں — قرآن، فقہ، اخلاق اور مزید'}
          items={courseItems}
          viewAllHref={PATHS.onlineCourses}
          viewAllLabel="تمام کورسز"
          bg="white"
        />
      )}

      {serviceItems.length > 0 && (
        <CarouselSection
          eyebrow="ہماری خدمات"
          title={homepageSettings?.servicesHeading || 'ہماری خدمات'}
          subtitle={homepageSettings?.servicesSubheading || 'اخلاص اور توجہ کے ساتھ ادا کی گئی مذہبی خدمات'}
          items={serviceItems}
          viewAllHref={PATHS.services}
          viewAllLabel="تمام خدمات"
          bg="gray"
        />
      )}

      <HomeArticlesSection posts={posts} settings={homepageSettings} />
      <HomeTestimonialsSection testimonials={testimonials} settings={homepageSettings} />
      <HomeDonateCtaSection settings={homepageSettings} />
    </>
  )
}
