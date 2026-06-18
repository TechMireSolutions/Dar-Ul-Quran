import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageCircle, Check } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import FaqAccordion from '@/components/content/FaqAccordion'
import TopicClusterRelated from '@/components/content/TopicClusterRelated'

type ServiceLeafPageProps = {
  service: any
  cluster: any
  heroImageUrl: string | null
  whyUsImageUrl: string | null
  whatsappLink: string
}

export default function ServiceLeafPage({
  service,
  cluster,
  heroImageUrl,
  whyUsImageUrl,
  whatsappLink,
}: ServiceLeafPageProps) {
  return (
    <div>

          {/* ── 1. HERO ────────────────────────────────────────────────────── */}
          <section className="relative bg-dq-900 overflow-hidden min-h-[340px] flex items-center justify-center">
            {heroImageUrl && (
              <Image
                src={heroImageUrl}
                alt={service.title}
                fill
                className="object-cover opacity-[0.18]"
                priority
                fetchPriority="high"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-dq-900/60 via-transparent to-dq-900/80 pointer-events-none" />

            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
              {service.price && (
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-dq-400 border border-dq-700/60 rounded-full px-3.5 py-1 bg-dq-950/40 mb-6">
                  {service.price}
                </span>
              )}
              <h1 className="font-bold text-[36px] sm:text-[50px] text-white tracking-[-0.03em] leading-[1.1] mb-5">
                {service.title}
              </h1>
              {service.heroSubtitle && (
                <p className="text-[16px] sm:text-[18px] font-semibold text-white/90 mb-4 leading-relaxed">
                  {service.heroSubtitle}
                </p>
              )}
              {(service.heroBody || (!service.heroSubtitle && service.excerpt)) && (
                <p className="text-[15px] text-slate-300 max-w-2xl mx-auto leading-[1.85]">
                  {service.heroBody || service.excerpt}
                </p>
              )}
            </div>
          </section>

          {/* ── 2. WHY USE OUR PLATFORM ──────────────────────────────────── */}
          {service.whyUs?.length > 0 && (
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                  {/* Left: image */}
                  <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                    {whyUsImageUrl ? (
                      <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <Image src={whyUsImageUrl} alt={service.whyUsHeading || service.title} fill sizes="(max-width: 640px) 100vw, 384px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-full max-w-sm aspect-square rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center">
                        <span className="text-[12px] text-gray-400">اسٹوڈیو میں تصویر شامل کریں</span>
                      </div>
                    )}
                  </div>

                  {/* Right: features */}
                  <div className="order-1 lg:order-2">
                    <h2 className="font-bold text-[24px] sm:text-[30px] text-slate-900 tracking-[-0.02em] mb-8">
                      {service.whyUsHeading || 'ہمارا پلیٹ فارم کیوں استعمال کریں؟'}
                    </h2>
                    <ul className="space-y-4">
                      {service.whyUs.map((item: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-md bg-dq-50 border border-dq-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={13} className="text-dq-600" strokeWidth={2.5} />
                          </div>
                          <p className="text-[14.5px] text-slate-700 leading-relaxed">
                            <span className="font-semibold text-slate-900">{item.title}:</span>
                            {item.desc && <span className="text-gray-600"> {item.desc}</span>}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </section>
          )}

          {/* ── 3. OUR COMMITMENT ────────────────────────────────────────── */}
          {service.commitment?.length > 0 && (
            <section className="bg-dq-900 py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                <h2 className="font-bold text-[24px] sm:text-[32px] text-white tracking-[-0.02em] mb-10">
                  {service.commitmentHeading || 'ہمارا عہد'}
                </h2>
                <ul className="space-y-5">
                  {service.commitment.map((item: any, i: number) => (
                    <li key={i} className="text-[14.5px] text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white">{item.title}:</span>
                      {item.desc && <span> {item.desc}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ── 4. HOW IT WORKS ──────────────────────────────────────────── */}
          {service.howItWorks?.length > 0 && (
            <section className="bg-dq-50 py-16 sm:py-20">
              <div className="max-w-2xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                  <h2 className="font-bold text-[24px] sm:text-[32px] text-slate-900 tracking-[-0.02em]">
                    {service.howItWorksHeading || 'یہ کیسے کام کرتا ہے'}
                  </h2>
                </div>
                <ol className="space-y-4">
                  {service.howItWorks.map((step: any, i: number) => (
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

          {/* ── 5. CTA BANNER ────────────────────────────────────────────── */}
          {(service.ctaHeading || service.ctaSubtitle) && (
            <section className="bg-dq-900 py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                {service.ctaHeading && (
                  <h2 className="font-bold text-[26px] sm:text-[34px] text-white tracking-[-0.02em] mb-4">
                    {service.ctaHeading}
                  </h2>
                )}
                {service.ctaSubtitle && (
                  <p className="text-[15px] text-slate-400 mb-8 leading-relaxed">{service.ctaSubtitle}</p>
                )}
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/contact"
                    className="group inline-flex items-center gap-2 bg-dq-500 hover:bg-dq-400 text-white font-bold text-[14px] px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(184,144,14,0.3)] transition-all duration-200 hover:-translate-y-px">
                    {service.ctaBtn1Label || 'شروع کریں'}
                    <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                  </Link>
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[14px] font-semibold px-8 py-3.5 rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-px">
                    <MessageCircle size={14} />
                    {service.ctaBtn2Label || 'واٹس ایپ کریں'}
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* ── Extra rich text body (optional) ──────────────────────────── */}
          {service.body?.length > 0 && (
            <section className="bg-white py-12 sm:py-16">
              <div className="max-w-3xl mx-auto px-4 sm:px-6
                prose prose-slate prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-dq-500 prose-a:no-underline hover:prose-a:underline">
                <PortableText value={service.body} />
              </div>
            </section>
          )}

          <FaqAccordion
            heading={service.faqSectionHeading || 'اکثر پوچھے گئے سوالات'}
            items={service.faq ?? []}
            icon="plus"
          />

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
