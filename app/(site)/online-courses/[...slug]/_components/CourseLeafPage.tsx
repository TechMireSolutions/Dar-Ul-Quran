import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, Mail, Phone } from 'lucide-react'
import FaqAccordion from '@/components/content/FaqAccordion'
import HowItWorksSection from '@/components/content/HowItWorksSection'
import LeafCtaBanner from '@/components/content/LeafCtaBanner'
import LeafTopicClusterBlock from '@/components/content/LeafTopicClusterBlock'
import PortableTextSection from '@/components/content/PortableTextSection'
import type { CourseDetailDoc, SiteSettingsDoc, TopicClusterDoc } from '@/lib/types'
import { TW_CTA_ARROW, TW_EYEBROW, TW_GOLD_CTA, TW_HERO_TITLE, TW_SECTION_TITLE } from '@/lib/tailwind'

type CourseLeafPageProps = {
  course: CourseDetailDoc
  site: SiteSettingsDoc | null
  cluster: TopicClusterDoc | null
  heroImageUrl: string | null
  enrollHref: string
  whatsappLink: string
}

export default function CourseLeafPage({
  course,
  site,
  cluster,
  heroImageUrl,
  enrollHref,
  whatsappLink,
}: CourseLeafPageProps) {
  const courseTitle = course.title ?? 'کورس'

  return (
    <div>

          {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
          <section className="relative bg-dq-900 overflow-hidden">
            {heroImageUrl && (
              <Image
                src={heroImageUrl}
                alt={courseTitle}
                fill
                className="object-cover opacity-[0.18]"
                priority
                fetchPriority="high"
              />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-dq-900/60 via-transparent to-dq-900/80 pointer-events-none" />

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
              {/* Eyebrow tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {course.subject && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-dq-400 border border-dq-700/60 rounded-full px-3.5 py-1 bg-dq-950/40">
                    {course.subject}
                  </span>
                )}
                {course.duration && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 border border-slate-700/60 rounded-full px-3.5 py-1 bg-slate-800/40">
                    {course.duration}
                  </span>
                )}
                {course.instructor && (
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 border border-slate-700/60 rounded-full px-3.5 py-1 bg-slate-800/40">
                    {course.instructor}
                  </span>
                )}
              </div>

              <h1 className={`${TW_HERO_TITLE} mb-5`}>
                {courseTitle}
              </h1>

              {(course.heroSubtitle || course.excerpt) && (
                <p className="text-[16px] sm:text-[18px] text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
                  {course.heroSubtitle || course.excerpt}
                </p>
              )}

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href={enrollHref}
                  target={course.enrollmentLink ? '_blank' : undefined}
                  rel={course.enrollmentLink ? 'noopener noreferrer' : undefined}
                  className={`${TW_GOLD_CTA} shadow-gold-lg`}
                >
                  {course.heroCtaLabel || 'ابھی داخلہ لیں'}
                  <ArrowRight size={14} strokeWidth={2.5} className={TW_CTA_ARROW} />
                </Link>
              </div>
            </div>
          </section>

          {/* ── 2. OVERVIEW ──────────────────────────────────────────────────── */}
          {(course.overviewHeading || course.overviewBody) && (
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                {course.overviewHeading && (
                  <h2 className={`${TW_SECTION_TITLE} mb-5`}>
                    {course.overviewHeading}
                  </h2>
                )}
                {course.overviewBody && (
                  <p className="text-[16px] text-gray-600 leading-[1.9]">{course.overviewBody}</p>
                )}
              </div>
            </section>
          )}

          {/* ── 3. WHAT YOU'LL ACHIEVE ───────────────────────────────────────── */}
          {(course.outcomes?.length ?? 0) > 0 && (
            <section className="bg-slate-50 py-16 sm:py-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className={TW_SECTION_TITLE}>
                    {course.outcomesHeading || 'آپ کیا حاصل کریں گے'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {course.outcomes!.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="w-10 h-10 rounded-xl bg-dq-50 border border-dq-100 flex items-center justify-center mb-4">
                        <Check size={17} className="text-dq-600" strokeWidth={2.5} />
                      </div>
                      <h3 className="font-bold text-[15px] text-slate-900 mb-2">{item.title}</h3>
                      {item.desc && (
                        <p className="text-[13.5px] text-gray-500 leading-relaxed">{item.desc}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── 4. WHY OUR COURSE STANDS OUT ─────────────────────────────────── */}
          {(course.whyUs?.length ?? 0) > 0 && (
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className={TW_SECTION_TITLE}>
                    {course.whyUsHeading || 'ہمارا کورس کیوں منفرد ہے'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {course.whyUs!.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-dq-100 hover:bg-dq-50/30 transition-colors duration-200"
                    >
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-dq-600 text-white text-[12px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-[15px] text-slate-900 mb-1.5">{item.title}</h3>
                        {item.desc && (
                          <p className="text-[13.5px] text-gray-500 leading-relaxed">{item.desc}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <HowItWorksSection
            heading={course.howItWorksHeading}
            steps={course.howItWorks ?? []}
          />

          {/* ── 6a. FEE SUMMARY (simple) ─────────────────────────────────────── */}
          {(course.feeSummaryItems?.length ?? 0) > 0 && (
            <section className="bg-white py-14 sm:py-20">
              <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center size-14 rounded-2xl mb-4 bg-gradient-to-br from-dq-50 to-dq-100 border border-dq-400/30">
                    <span className="text-2xl leading-none">💰</span>
                  </div>
                  <h2 className={TW_SECTION_TITLE}>
                    {course.feeSummaryHeading || 'فیس'}
                  </h2>
                </div>

                {/* Fee rows */}
                <div className="space-y-3">
                  {course.feeSummaryItems!.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4
                        hover:border-dq-100 hover:shadow-gold-subtle transition-all duration-200"
                    >
                      <span className="text-[14.5px] text-slate-700 font-medium">{item.label}</span>
                      <span className="shrink-0 font-bold text-[15px] px-4 py-1.5 rounded-full bg-gradient-to-br from-dq-50 to-dq-100 text-dq-700 border border-dq-400/30">
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Enroll nudge */}
                <p className="text-center text-[12.5px] text-gray-400 mt-6">
                  داخلے کے لیے ہم سے رابطہ کریں — جگہ محدود ہے۔
                </p>
              </div>
            </section>
          )}

          {/* ── 6b. PRICING TABLES (multi-column) ────────────────────────────── */}
          {(course.pricingTables?.length ?? 0) > 0 && (
            <section className="bg-slate-50 py-16 sm:py-20">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <p className={`${TW_EYEBROW} mb-2`}>
                    پلانز
                  </p>
                  <h2 className={TW_SECTION_TITLE}>
                    {course.pricingHeading || 'سستے پلانز'}
                  </h2>
                </div>
                <div className="space-y-10">
                  {course.pricingTables!.map((table, ti) => (
                    <div key={ti}>
                      {table.label && (
                        <h3 className="font-bold text-[14.5px] text-slate-700 mb-4 flex items-center gap-2">
                          <span className="w-5 h-px bg-dq-400 inline-block" />
                          {table.label}
                        </h3>
                      )}
                      {(table.rows?.length ?? 0) > 0 && (
                        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                          <table className="w-full text-[13.5px] border-collapse">
                            <thead>
                              <tr className="bg-slate-800 text-white">
                                <th className="text-right font-semibold px-5 py-4 rounded-tr-2xl">مطالعہ پلان</th>
                                <th className="text-right font-semibold px-5 py-4">ہفتہ وار تعداد</th>
                                <th className="text-right font-semibold px-5 py-4">ماہانہ کلاسز</th>
                                <th className="text-right font-semibold px-5 py-4">فی کلاس فیس</th>
                                <th className="text-right font-semibold px-5 py-4 rounded-tl-2xl">ماہانہ کل</th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows!.map((row, ri) => (
                                <tr
                                  key={ri}
                                  className={`border-t border-gray-100 ${ri % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                                >
                                  <td className="px-5 py-3.5 font-semibold text-slate-900">{row.plan}</td>
                                  <td className="px-5 py-3.5 text-gray-600">{row.weeklyFrequency}</td>
                                  <td className="px-5 py-3.5 text-gray-600">{row.monthlyClasses}</td>
                                  <td className="px-5 py-3.5 text-gray-600">{row.feePerClass}</td>
                                  <td className="px-5 py-3.5 font-semibold text-dq-700">{row.monthlyTotal}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <LeafCtaBanner
            heading={course.ctaHeading}
            subtitle={course.ctaSubtitle}
            primaryHref={enrollHref}
            primaryLabel={course.ctaBtn1Label || 'ابھی شامل ہوں'}
            primaryExternal={Boolean(course.enrollmentLink)}
            whatsappHref={whatsappLink}
            whatsappLabel={course.ctaBtn2Label || 'واٹس ایپ کریں'}
            footer={
              (site?.email || site?.phone) ? (
                <div className="flex flex-wrap justify-center gap-6 text-[13px] text-slate-500">
                  {site?.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-600" />
                      {site.email}
                    </span>
                  )}
                  {site?.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone size={12} className="text-slate-600" />
                      {site.phone}
                    </span>
                  )}
                </div>
              ) : undefined
            }
          />

          {/* ── 8. OUR PROMISE ───────────────────────────────────────────────── */}
          {(course.promiseHeading || course.promiseBody) && (
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                {course.promiseHeading && (
                  <h2 className={`${TW_SECTION_TITLE} mb-5`}>
                    {course.promiseHeading}
                  </h2>
                )}
                {course.promiseBody && (
                  <p className="text-[15px] text-gray-600 leading-[1.9]">{course.promiseBody}</p>
                )}
              </div>
            </section>
          )}

          <FaqAccordion
            heading={course.faqSectionHeading || 'اکثر پوچھے گئے سوالات'}
            items={course.faq ?? []}
          />

          {course.body && <PortableTextSection value={course.body} />}

          <LeafTopicClusterBlock cluster={cluster} />

    </div>
  )
}
