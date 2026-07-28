import Link from 'next/link'
import { ArrowRight, Check, Mail, Phone } from 'lucide-react'
import FaqAccordion from '@/components/content/FaqAccordion'
import HowItWorksSection from '@/components/content/HowItWorksSection'
import LeafCtaBanner from '@/components/content/LeafCtaBanner'
import LeafHero from '@/components/content/LeafHero'
import LeafTopicClusterBlock from '@/components/content/LeafTopicClusterBlock'
import PortableTextSection from '@/components/content/PortableTextSection'
import CenteredSectionHeader from '@/components/ui/CenteredSectionHeader'
import type { CourseDetailDoc, SiteSettingsDoc, TopicClusterDoc } from '@/lib/types'
import { TW_CARD_GRID, TW_CARD_SURFACE, TW_CARD_SURFACE_PADDED, TW_CONTAINER_NARROW, TW_CONTAINER_PRICING, TW_CONTAINER_PROSE, TW_CONTAINER_WIDE, TW_CTA_ARROW, TW_EYEBROW_LINE, TW_FEATURE_ICON, TW_GOLD_CTA, TW_HERO_CHIP_GOLD, TW_HERO_CHIP_MUTED, TW_PAGE_SUBTITLE, TW_SECTION_PY, TW_SECTION_TITLE } from '@/lib/tailwind'

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
          <LeafHero
            title={courseTitle}
            imageUrl={heroImageUrl}
            chips={
              (course.subject || course.duration || course.instructor) ? (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {course.subject && (
                    <span className={TW_HERO_CHIP_GOLD}>{course.subject}</span>
                  )}
                  {course.duration && (
                    <span className={TW_HERO_CHIP_MUTED}>{course.duration}</span>
                  )}
                  {course.instructor && (
                    <span className={TW_HERO_CHIP_MUTED}>{course.instructor}</span>
                  )}
                </div>
              ) : null
            }
            subtitle={course.heroSubtitle || course.excerpt || null}
            cta={
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
            }
          />

          {/* ── 2. OVERVIEW ──────────────────────────────────────────────────── */}
          {(course.overviewHeading || course.overviewBody) && (
            <section className={`bg-white ${TW_SECTION_PY}`}>
              <div className={`${TW_CONTAINER_NARROW} text-center`}>
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
            <section className={`bg-slate-50 ${TW_SECTION_PY}`}>
              <div className={TW_CONTAINER_WIDE}>
                <CenteredSectionHeader title={course.outcomesHeading || 'آپ کیا حاصل کریں گے'} />
                <div className={TW_CARD_GRID}>
                  {course.outcomes!.map((item, i) => (
                    <div
                      key={i}
                      className={`${TW_CARD_SURFACE_PADDED} hover:shadow-md transition-shadow duration-200`}
                    >
                      <div className={`${TW_FEATURE_ICON} w-10 h-10 mb-4`}>
                        <Check size={17} className="text-dq-600" strokeWidth={2.5} />
                      </div>
                      <h3 className="font-bold text-[15px] text-slate-900 mb-2">{item.title}</h3>
                      {item.desc && (
                        <p className={TW_PAGE_SUBTITLE}>{item.desc}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── 4. WHY OUR COURSE STANDS OUT ─────────────────────────────────── */}
          {(course.whyUs?.length ?? 0) > 0 && (
            <section className={`bg-white ${TW_SECTION_PY}`}>
              <div className={TW_CONTAINER_WIDE}>
                <CenteredSectionHeader title={course.whyUsHeading || 'ہمارا کورس کیوں منفرد ہے'} />
                <div className={TW_CARD_GRID}>
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
                          <p className={TW_PAGE_SUBTITLE}>{item.desc}</p>
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
            <section className={`bg-white ${TW_SECTION_PY}`}>
              <div className={`${TW_CONTAINER_PROSE} lg:px-8`}>
                <CenteredSectionHeader
                  title={course.feeSummaryHeading || 'فیس'}
                  tight
                  topContent={
                    <div className="inline-flex items-center justify-center size-14 rounded-2xl mb-4 bg-gradient-to-br from-dq-50 to-dq-100 border border-dq-400/30">
                      <span className="text-2xl leading-none" aria-hidden="true">💰</span>
                    </div>
                  }
                />

                {/* Fee rows */}
                <div className="space-y-3">
                  {course.feeSummaryItems!.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between gap-4 ${TW_CARD_SURFACE} shadow-sm px-6 py-4
                        hover:border-dq-100 hover:shadow-gold-subtle transition-all duration-200`}
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
            <section className={`bg-slate-50 ${TW_SECTION_PY}`}>
              <div className={TW_CONTAINER_PRICING}>
                <CenteredSectionHeader
                  title={course.pricingHeading || 'سستے پلانز'}
                  eyebrow="پلانز"
                />
                <div className="space-y-10">
                  {course.pricingTables!.map((table, ti) => (
                    <div key={ti}>
                      {table.label && (
                        <h3 className="font-bold text-[14.5px] text-slate-700 mb-4 flex items-center gap-2">
                          <span className={TW_EYEBROW_LINE} />
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
            <section className={`bg-white ${TW_SECTION_PY}`}>
              <div className={`${TW_CONTAINER_NARROW} text-center`}>
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
