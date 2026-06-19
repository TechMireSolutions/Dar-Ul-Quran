import Image from 'next/image'
import { Check } from 'lucide-react'
import FaqAccordion from '@/components/content/FaqAccordion'
import HowItWorksSection from '@/components/content/HowItWorksSection'
import LeafCtaBanner from '@/components/content/LeafCtaBanner'
import LeafTopicClusterBlock from '@/components/content/LeafTopicClusterBlock'
import PortableTextSection from '@/components/content/PortableTextSection'
import type { ServiceDetailDoc, TopicClusterDoc } from '@/lib/types'
import { TW_SECTION_TITLE } from '@/lib/tailwind'

type ServiceLeafPageProps = {
  service: ServiceDetailDoc
  cluster: TopicClusterDoc | null
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
  const serviceTitle = service.title ?? 'خدمت'

  return (
    <div>

          {/* ── 1. HERO ────────────────────────────────────────────────────── */}
          <section className="relative bg-dq-900 overflow-hidden min-h-[340px] flex items-center justify-center">
            {heroImageUrl && (
              <Image
                src={heroImageUrl}
                alt={serviceTitle}
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
                {serviceTitle}
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
          {(service.whyUs?.length ?? 0) > 0 && (
            <section className="bg-white py-16 sm:py-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                  {/* Left: image */}
                  <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                    {whyUsImageUrl ? (
                      <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                        <Image src={whyUsImageUrl} alt={service.whyUsHeading || serviceTitle} fill sizes="(max-width: 640px) 100vw, 384px" className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-full max-w-sm aspect-square rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center">
                        <span className="text-[12px] text-gray-400">اسٹوڈیو میں تصویر شامل کریں</span>
                      </div>
                    )}
                  </div>

                  {/* Right: features */}
                  <div className="order-1 lg:order-2">
                    <h2 className={`${TW_SECTION_TITLE} mb-8`}>
                      {service.whyUsHeading || 'ہمارا پلیٹ فارم کیوں استعمال کریں؟'}
                    </h2>
                    <ul className="space-y-4">
                      {service.whyUs!.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-md bg-dq-50 border border-dq-100 flex items-center justify-center shrink-0 mt-0.5">
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
          {(service.commitment?.length ?? 0) > 0 && (
            <section className="bg-dq-900 py-16 sm:py-20">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                <h2 className={`${TW_SECTION_TITLE} text-white mb-10`}>
                  {service.commitmentHeading || 'ہمارا عہد'}
                </h2>
                <ul className="space-y-5">
                  {service.commitment!.map((item, i) => (
                    <li key={i} className="text-[14.5px] text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white">{item.title}:</span>
                      {item.desc && <span> {item.desc}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <HowItWorksSection
            heading={service.howItWorksHeading}
            steps={service.howItWorks ?? []}
            maxWidth="2xl"
          />

          <LeafCtaBanner
            heading={service.ctaHeading}
            subtitle={service.ctaSubtitle}
            primaryHref="/contact"
            primaryLabel={service.ctaBtn1Label || 'شروع کریں'}
            whatsappHref={whatsappLink}
            whatsappLabel={service.ctaBtn2Label || 'واٹس ایپ کریں'}
          />

          {service.body && <PortableTextSection value={service.body} />}

          <FaqAccordion
            heading={service.faqSectionHeading || 'اکثر پوچھے گئے سوالات'}
            items={service.faq ?? []}
            icon="plus"
          />

          <LeafTopicClusterBlock cluster={cluster} />

    </div>
  )
}
