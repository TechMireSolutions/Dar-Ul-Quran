import Image from 'next/image'
import { Check } from 'lucide-react'
import FaqAccordion from '@/components/content/FaqAccordion'
import HowItWorksSection from '@/components/content/HowItWorksSection'
import LeafCtaBanner from '@/components/content/LeafCtaBanner'
import LeafHero from '@/components/content/LeafHero'
import LeafTopicClusterBlock from '@/components/content/LeafTopicClusterBlock'
import PortableTextSection from '@/components/content/PortableTextSection'
import CenteredSectionHeader from '@/components/ui/CenteredSectionHeader'
import type { ServiceDetailDoc, TopicClusterDoc } from '@/lib/types'
import type { FaqDisplayItem } from '@/lib/topicCluster'
import { PATHS } from '@/lib/paths'
import { DEFAULT_FAQ_HEADING } from '@/lib/seo'
import { TW_CONTAINER_NARROW, TW_CONTAINER_WIDE, TW_HERO_CHIP_GOLD, TW_SECTION_PY, TW_SECTION_TITLE } from '@/lib/tailwind'

type ServiceLeafPageProps = {
  service: ServiceDetailDoc
  cluster: TopicClusterDoc | null
  heroImageUrl: string | null
  whyUsImageUrl: string | null
  whatsappLink: string
  faqItems: FaqDisplayItem[]
}

export default function ServiceLeafPage({
  service,
  cluster,
  heroImageUrl,
  whyUsImageUrl,
  whatsappLink,
  faqItems,
}: ServiceLeafPageProps) {
  const serviceTitle = service.title ?? 'خدمت'

  return (
    <div>

          {/* ── 1. HERO ────────────────────────────────────────────────────── */}
          <LeafHero
            tall
            title={serviceTitle}
            imageUrl={heroImageUrl}
            chips={
              service.price ? (
                <span className={`inline-block ${TW_HERO_CHIP_GOLD} mb-6`}>
                  {service.price}
                </span>
              ) : null
            }
            subtitle={service.heroSubtitle || null}
            body={
              service.heroBody ||
              (!service.heroSubtitle ? service.excerpt : null) ||
              null
            }
          />

          {/* ── 2. WHY USE OUR PLATFORM ──────────────────────────────────── */}
          {(service.whyUs?.length ?? 0) > 0 && (
            <section className={`bg-white ${TW_SECTION_PY}`}>
              <div className={TW_CONTAINER_WIDE}>
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
                          <p className="text-[14.5px] text-slate-700 leading-urdu">
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
            <section className={`bg-dq-900 ${TW_SECTION_PY}`}>
              <div className={`${TW_CONTAINER_NARROW} text-center`}>
                <CenteredSectionHeader
                  title={service.commitmentHeading || 'ہمارا عہد'}
                  tight
                  titleClassName="text-white"
                />
                <ul className="space-y-5">
                  {service.commitment!.map((item, i) => (
                    <li key={i} className="text-[14.5px] text-slate-300 leading-urdu">
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
            primaryHref={PATHS.contact}
            primaryLabel={service.ctaBtn1Label || 'شروع کریں'}
            whatsappHref={whatsappLink}
            whatsappLabel={service.ctaBtn2Label}
          />

          {service.body && <PortableTextSection value={service.body} />}

          <FaqAccordion
            heading={service.faqSectionHeading || DEFAULT_FAQ_HEADING}
            items={faqItems}
            icon="plus"
          />

          <LeafTopicClusterBlock cluster={cluster} />

    </div>
  )
}
