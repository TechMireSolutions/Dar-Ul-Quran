import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { safeFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  featuredPostsQuery,
  topLevelServicesQuery,
  topLevelCoursesQuery,
  homepageSettingsQuery,
  testimonialsQuery,
} from '@/sanity/lib/queries'
import HeroSection from '@/components/sections/HeroSection'
import type { CarouselItem } from '@/components/sections/CarouselSection'
import nextDynamic from 'next/dynamic'
import ContentCard from '@/components/ui/ContentCard'

const CarouselSection = nextDynamic(() => import('@/components/sections/CarouselSection'), {
  loading: () => (
    <div className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-72 rounded-2xl bg-gray-100 animate-pulse" />
      </div>
    </div>
  ),
})
import Reveal from '@/components/ui/Reveal'

export const revalidate = 300

export default async function HomePage() {
  const [posts, services, courses, hp, testimonials] = await Promise.all([
    safeFetch(featuredPostsQuery),
    safeFetch(topLevelServicesQuery),
    safeFetch(topLevelCoursesQuery),
    safeFetch(homepageSettingsQuery),
    safeFetch(testimonialsQuery),
  ])

  const heroImageUrl = hp?.heroImage
    ? urlFor(hp.heroImage).width(1400).height(800).url()
    : null

  const courseItems: CarouselItem[] = courses.map((c: any) => ({
    id:          c._id,
    image:       c.featuredImage ? urlFor(c.featuredImage).width(600).height(450).url() : null,
    title:       c.title,
    description: [c.price, c.duration].filter(Boolean).join(' · ') || null,
    href:        `/online-courses/${c.slug.current}`,
    badge:       c.subject,
    ctaLabel:    'ابھی داخلہ لیں',
  }))

  const serviceItems: CarouselItem[] = services.map((s: any) => ({
    id:          s._id,
    image:       s.icon ? urlFor(s.icon).width(600).height(450).url() : null,
    title:       s.title,
    description: s.children?.length
      ? s.children.slice(0, 4).map((c: any) => c.title).join(' · ')
      : s.price || null,
    href:        `/services/${s.slug.current}`,
    badge:       null,
    ctaLabel:    'ابھی بک کریں',
  }))

  return (
    <>
      {/* ── Hero ── */}
      <HeroSection
        subtitle={hp?.heroArabicText    || undefined}
        title={hp?.heroTitle ? hp.heroTitle.replace(/\\n/g, '\n') : undefined}
        description={hp?.heroSubtitle   || undefined}
        heroImage={heroImageUrl}
        cta1Label={hp?.heroCta1Label    || undefined}
        cta1Link={hp?.heroCta1Link      || undefined}
        cta2Label={hp?.heroCta2Label    || undefined}
        cta2Link={hp?.heroCta2Link      || undefined}
      />

      {/* ── About Us ── */}
      <section className="relative py-14 md:py-20 bg-white overflow-hidden border-b border-gray-100">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #dde5ef 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text */}
            <Reveal animation="up">
              <div>
                <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">
                  <span className="w-6 h-px bg-dq-400 inline-block" />
                  {hp?.aboutEyebrow || 'ہم کون ہیں'}
                </p>
                <h2 className="font-bold text-[26px] sm:text-[32px] text-slate-900 leading-tight tracking-[-0.02em] mb-4">
                  {hp?.aboutHeading || 'دنیا کے ہر کونے میں شیعہ اسلامی علم پہنچانا'}
                </h2>
                {(hp?.aboutBody1 || true) && (
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-4">
                    {hp?.aboutBody1 || 'دار القرآن ایک واحد مقصد کے ساتھ قائم کیا گیا — ہر مسلمان تک مستند شیعہ اسلامی تعلیم اور مذہبی خدمات کی رسائی، چاہے وہ کہیں بھی ہو۔'}
                  </p>
                )}
                {(hp?.aboutBody2 || true) && (
                  <p className="text-[14px] text-gray-500 leading-relaxed mb-7">
                    {hp?.aboutBody2 || 'اہل علماء کے آنلائن کورسز اور نیابت زیارت و اجارہ جیسی خدمات کے ذریعے ہم دنیا بھر میں ہزاروں خاندانوں کی خدمت کرتے ہیں۔'}
                  </p>
                )}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  {(hp?.aboutPillars?.length ? hp.aboutPillars : ['ایمان', 'علم', 'رسائی', 'اخلاص']).map((pillar: string) => (
                    <span
                      key={pillar}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-dq-50 border border-dq-100 text-[12px] font-semibold text-dq-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-dq-500 flex-shrink-0" />
                      {pillar}
                    </span>
                  ))}
                </div>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 bg-dq-600 hover:bg-dq-700 text-white
                    text-[13px] font-semibold px-6 py-3 rounded-full
                    shadow-[0_4px_16px_rgba(184,144,14,0.3)] hover:shadow-[0_6px_22px_rgba(184,144,14,0.45)]
                    transition-all duration-200 hover:-translate-y-px"
                >
                  {hp?.aboutCtaLabel || 'ہمارے بارے میں جانیں'}
                  <ArrowRight size={13} strokeWidth={2.5} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-150" />
                </Link>
              </div>
            </Reveal>

            {/* Visual card */}
            <Reveal animation="scale" delay={120}>
              <div className="relative pb-10">
                <div className="bg-dq-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(184,144,14,0.6) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
                  />
                  <p className="text-center text-[28px] sm:text-[32px] leading-relaxed text-amber-400 font-light mb-3" dir="rtl">
                    {hp?.aboutHadithArabic || 'اطلبوا العلم من المهد إلى اللحد'}
                  </p>
                  <div className="w-10 h-px bg-amber-400/40 mx-auto mb-3" />
                  <p className="text-center text-[13px] text-gray-400 italic leading-relaxed">
                    &quot;{hp?.aboutHadithTranslation || 'علم حاصل کرو گہوارے سے لحد تک۔'}&quot;
                  </p>
                  <p className="text-center text-[11px] text-amber-500 font-semibold mt-2 tracking-wide">
                    — {hp?.aboutHadithAttribution || 'حضرت محمد (ص)'}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                    {[
                      { value: hp?.aboutStat1Value || '500+', label: hp?.aboutStat1Label || 'طلباء' },
                      { value: hp?.aboutStat2Value || '10+',  label: hp?.aboutStat2Label || 'علماء' },
                      { value: hp?.aboutStat3Value || '5+',   label: hp?.aboutStat3Label || 'ممالک' },
                    ].map(s => (
                      <div key={s.label} className="text-center">
                        <p className="text-[22px] font-bold text-white leading-none">{s.value}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute bottom-0 left-6 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold text-[16px]">✓</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-slate-800">{hp?.aboutBadgeText || 'اہل علماء'}</p>
                    <p className="text-[11px] text-gray-400">{hp?.aboutBadgeSubtext || 'تصدیق شدہ و قابل اعتماد'}</p>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Online Courses Carousel ── */}
      {courseItems.length > 0 && (
        <CarouselSection
          eyebrow="تعلیم"
          title={hp?.coursesHeading    || 'آنلائن کورسز'}
          subtitle={hp?.coursesSubheading || 'اہل علماء سے سیکھیں — قرآن، فقہ، اخلاق اور مزید'}
          items={courseItems}
          viewAllHref="/online-courses"
          viewAllLabel="تمام کورسز"
          bg="white"
        />
      )}

      {/* ── Services Carousel ── */}
      {serviceItems.length > 0 && (
        <CarouselSection
          eyebrow="ہماری خدمات"
          title={hp?.servicesHeading    || 'ہماری خدمات'}
          subtitle={hp?.servicesSubheading || 'اخلاص اور توجہ کے ساتھ ادا کی گئی مذہبی خدمات'}
          items={serviceItems}
          viewAllHref="/services"
          viewAllLabel="تمام خدمات"
          bg="gray"
        />
      )}

      {/* ── Latest Articles ── */}
      {posts?.length > 0 && (
        <section className="py-10 md:py-16 border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal animation="up">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7 sm:mb-10">
                <div>
                  <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-2">
                    <span className="w-6 h-px bg-dq-400 inline-block" />
                    علم
                  </p>
                  <h2 className="font-bold text-[24px] sm:text-[27px] text-slate-900 leading-tight tracking-[-0.02em]">
                    {hp?.articlesHeading || 'تازہ ترین مضامین'}
                  </h2>
                  {hp?.articlesSubheading && (
                    <p className="text-[13px] text-gray-500 mt-1.5">{hp.articlesSubheading}</p>
                  )}
                </div>
                <Link
                  href="/articles"
                  className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-dq-600 hover:text-dq-700 transition-colors flex-shrink-0 sm:ml-6 py-2"
                >
                  سب دیکھیں
                  <ArrowRight size={13} strokeWidth={2.5} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-150" />
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post: any, i: number) => (
                <Reveal key={post._id} animation="up" delay={i * 80}>
                  <ContentCard
                    href={`/articles/${post.slug.current}`}
                    image={post.mainImage ? urlFor(post.mainImage).width(600).height(450).url() : null}
                    title={post.title}
                    description={post.excerpt || null}
                    badge={post.categories?.[0]?.title || null}
                    ctaLabel="مزید پڑھیں"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      {testimonials?.length > 0 && (
      <section className="py-12 md:py-16 bg-slate-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal animation="up">
            <div className="text-center mb-10">
              <p className="flex items-center justify-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">
                <span className="w-6 h-px bg-dq-400 inline-block" />
                {hp?.testimonialsEyebrow || 'برادری'}
                <span className="w-6 h-px bg-dq-400 inline-block" />
              </p>
              <h2 className="font-bold text-[24px] sm:text-[28px] text-slate-900 leading-tight tracking-[-0.02em]">
                {hp?.testimonialsHeading || 'ہماری برادری کیا کہتی ہے'}
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t: any, i: number) => (
              <Reveal key={t.name} animation="up" delay={i * 90}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6 flex flex-col h-full">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-amber-400 text-[15px] leading-none">★</span>
                    ))}
                  </div>
                  <p className="text-[13.5px] text-gray-600 leading-relaxed flex-1 mb-5">
                    &quot;{t.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-dq-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-[14px] font-bold text-dq-700">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-slate-800">{t.name}</p>
                      <p className="text-[11.5px] text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── Donate CTA ── */}
      <section className="relative overflow-hidden bg-slate-50 border-y border-slate-200 py-10 sm:py-12">
        <div className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)', backgroundSize: '24px 24px' }}/>

        <Reveal animation="up" className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div>
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-amber-400"/>
              <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-amber-600">في سبيل الله</span>
              <span className="w-6 h-px bg-amber-400"/>
            </div>

            <h2 className="font-bold text-[28px] lg:text-[34px] text-slate-900 leading-tight tracking-[-0.02em] mb-3">
              {hp?.donateHeading || 'ہمارے مشن میں ساتھ دیں'}
            </h2>

            <p className="text-[13.5px] text-gray-500 leading-relaxed mb-6 max-w-sm mx-auto">
              {hp?.donateText || 'آپ کا صدقہ اور چندہ ہمیں اہل بیت (ع) کی تعلیمات پھیلاتے رہنے میں مدد کرتا ہے'}
            </p>

            <div className="relative max-w-lg mx-auto mb-7 bg-white border border-slate-200 rounded-xl px-6 py-5 shadow-sm">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center">
                <span className="text-amber-500 text-[15px] font-bold leading-none">&quot;</span>
              </div>
              <p className="text-[13.5px] text-slate-600 italic leading-relaxed">
                {hp?.donateQuote || 'صدقہ رب کے غضب کو بجھاتا اور بری موت کو دور کرتا ہے۔'}
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="w-5 h-px bg-amber-300"/>
                <cite className="not-italic text-[11px] font-semibold text-amber-600 tracking-wide">{hp?.donateQuoteAttribution || 'امام صادق (ع)'}</cite>
                <span className="w-5 h-px bg-amber-300"/>
              </div>
            </div>

            <Link
              href="/donate"
              className="group inline-flex items-center gap-2 bg-dq-600 hover:bg-dq-700 text-white
                text-[13px] font-semibold px-7 py-3 rounded-full
                shadow-[0_4px_16px_rgba(184,144,14,0.3)] hover:shadow-[0_6px_22px_rgba(184,144,14,0.45)]
                transition-all duration-200 hover:-translate-y-px"
            >
              {hp?.donateCtaLabel || 'ابھی عطیہ دیں'}
              <ArrowRight size={13} strokeWidth={2.5} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-150"/>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
