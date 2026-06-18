import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, MessageCircle, Mail, Phone } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import FaqAccordion from '@/components/content/FaqAccordion'
import TopicClusterRelated from '@/components/content/TopicClusterRelated'

type CourseLeafPageProps = {
  course: any
  site: any
  cluster: any
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
  return (
    <div>

          {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
          <section className="relative bg-dq-900 overflow-hidden">
            {heroImageUrl && (
              <Image
                src={heroImageUrl}
                alt={course.title}
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

              <h1 className="font-bold text-[34px] sm:text-[46px] lg:text-[54px] text-white leading-[1.1] tracking-[-0.03em] mb-5">
                {course.title}
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
                  className="group inline-flex items-center gap-2 bg-dq-500 hover:bg-dq-400 text-white font-bold text-[14px] px-8 py-3.5 rounded-full shadow-[0_4px_24px_rgba(184,144,14,0.45)] transition-all duration-200 hover:-translate-y-px"
                >
                  {course.heroCtaLabel || 'ابھی داخلہ لیں'}
                  <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </section>

          {/* ── 2. OVERVIEW ──────────────────────────────────────────────────── */}
          {(course.overviewHeading || course.overviewBody) && (
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                {course.overviewHeading && (
                  <h2 className="font-bold text-[24px] sm:text-[32px] text-slate-900 tracking-[-0.02em] mb-5">
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
          {course.outcomes?.length > 0 && (
            <section className="bg-slate-50 py-16 sm:py-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="font-bold text-[24px] sm:text-[32px] text-slate-900 tracking-[-0.02em]">
                    {course.outcomesHeading || 'آپ کیا حاصل کریں گے'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {course.outcomes.map((item: any, i: number) => (
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
          {course.whyUs?.length > 0 && (
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="font-bold text-[24px] sm:text-[32px] text-slate-900 tracking-[-0.02em]">
                    {course.whyUsHeading || 'ہمارا کورس کیوں منفرد ہے'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {course.whyUs.map((item: any, i: number) => (
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

          {/* ── 5. HOW IT WORKS ──────────────────────────────────────────────── */}
          {course.howItWorks?.length > 0 && (
            <section className="bg-dq-50 py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="font-bold text-[24px] sm:text-[32px] text-slate-900 tracking-[-0.02em]">
                    {course.howItWorksHeading || 'یہ کیسے کام کرتا ہے'}
                  </h2>
                </div>
                <ol className="space-y-4">
                  {course.howItWorks.map((step: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-5 bg-white rounded-2xl px-6 py-5 border border-dq-100 shadow-sm"
                    >
                      <span className="shrink-0 w-9 h-9 rounded-full bg-dq-600 text-white text-[13px] font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <div className="pt-0.5">
                        <span className="font-bold text-slate-900 text-[15px]">{step.label}</span>
                        {step.desc && (
                          <span className="text-gray-500 text-[14px]"> — {step.desc}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {/* ── 6a. FEE SUMMARY (simple) ─────────────────────────────────────── */}
          {course.feeSummaryItems?.length > 0 && (
            <section className="bg-white py-14 sm:py-20">
              <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
                    style={{ background: 'linear-gradient(135deg, #fdf8e8, #faefc4)', border: '1px solid rgba(212,168,32,0.3)' }}>
                    <span className="text-2xl leading-none">💰</span>
                  </div>
                  <h2 className="font-bold text-[24px] sm:text-[32px] text-slate-900 tracking-[-0.02em]">
                    {course.feeSummaryHeading || 'فیس'}
                  </h2>
                </div>

                {/* Fee rows */}
                <div className="space-y-3">
                  {course.feeSummaryItems.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-4 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4
                        hover:border-dq-100 hover:shadow-[0_4px_16px_rgba(184,144,14,0.08)] transition-all duration-200"
                    >
                      <span className="text-[14.5px] text-slate-700 font-medium">{item.label}</span>
                      <span
                        className="shrink-0 font-bold text-[15px] px-4 py-1.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #fdf8e8, #faefc4)', color: '#7c5d07', border: '1px solid rgba(212,168,32,0.3)' }}
                      >
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
          {course.pricingTables?.length > 0 && (
            <section className="bg-slate-50 py-16 sm:py-20">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-700 mb-2">
                    پلانز
                  </p>
                  <h2 className="font-bold text-[24px] sm:text-[32px] text-slate-900 tracking-[-0.02em]">
                    {course.pricingHeading || 'سستے پلانز'}
                  </h2>
                </div>
                <div className="space-y-10">
                  {course.pricingTables.map((table: any, ti: number) => (
                    <div key={ti}>
                      {table.label && (
                        <h3 className="font-bold text-[14.5px] text-slate-700 mb-4 flex items-center gap-2">
                          <span className="w-5 h-px bg-dq-400 inline-block" />
                          {table.label}
                        </h3>
                      )}
                      {table.rows?.length > 0 && (
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
                              {table.rows.map((row: any, ri: number) => (
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

          {/* ── 7. CTA BANNER ────────────────────────────────────────────────── */}
          {(course.ctaHeading || course.ctaSubtitle) && (
            <section className="bg-dq-900 py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                {course.ctaHeading && (
                  <h2 className="font-bold text-[26px] sm:text-[34px] text-white tracking-[-0.02em] mb-4">
                    {course.ctaHeading}
                  </h2>
                )}
                {course.ctaSubtitle && (
                  <p className="text-[15px] text-slate-400 mb-8 leading-relaxed">{course.ctaSubtitle}</p>
                )}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <Link
                    href={enrollHref}
                    target={course.enrollmentLink ? '_blank' : undefined}
                    rel={course.enrollmentLink ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2 bg-dq-500 hover:bg-dq-400 text-white font-bold text-[14px] px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(184,144,14,0.3)] transition-all duration-200 hover:-translate-y-px"
                  >
                    {course.ctaBtn1Label || 'ابھی شامل ہوں'}
                    <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[14px] font-semibold px-8 py-3.5 rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-px"
                  >
                    <MessageCircle size={14} />
                    {course.ctaBtn2Label || 'واٹس ایپ کریں'}
                  </Link>
                </div>
                {(site?.email || site?.phone) && (
                  <div className="flex flex-wrap justify-center gap-6 text-[13px] text-slate-500">
                    {site.email && (
                      <span className="flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-600" />
                        {site.email}
                      </span>
                    )}
                    {site.phone && (
                      <span className="flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-600" />
                        {site.phone}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── 8. OUR PROMISE ───────────────────────────────────────────────── */}
          {(course.promiseHeading || course.promiseBody) && (
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                {course.promiseHeading && (
                  <h2 className="font-bold text-[24px] sm:text-[30px] text-slate-900 tracking-[-0.02em] mb-5">
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

          {/* ── Extra body content (optional) ────────────────────────────────── */}
          {course.body?.length > 0 && (
            <section className="bg-white py-12 sm:py-16">
              <div className="max-w-3xl mx-auto px-4 sm:px-6
                prose prose-slate prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-dq-500 prose-a:no-underline hover:prose-a:underline">
                <PortableText value={course.body} />
              </div>
            </section>
          )}

          {cluster && (
            <section className="bg-white pb-12 sm:pb-16">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <TopicClusterRelated
                  clusterName={cluster.clusterName}
                  pillarKeyword={cluster.pillarKeyword}
                  relatedArticles={cluster.relatedArticles}
                />
              </div>
            </section>
          )}

    </div>
  )
}
