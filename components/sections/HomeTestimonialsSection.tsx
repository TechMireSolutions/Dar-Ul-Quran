import Reveal from '@/components/ui/Reveal'
import CenteredSectionHeader from '@/components/ui/CenteredSectionHeader'
import type { HomepageSettingsDoc, TestimonialDoc } from '@/lib/types'
import { TW_CARD_SURFACE, TW_CONTAINER, TW_CV_AUTO, TW_EYEBROW, TW_EYEBROW_LINE } from '@/lib/tailwind'

type HomeTestimonialsSectionProps = {
  testimonials: TestimonialDoc[] | null | undefined
  settings?: HomepageSettingsDoc | null
}

export default function HomeTestimonialsSection({ testimonials, settings }: HomeTestimonialsSectionProps) {
  if (!testimonials?.length) return null

  return (
    <section className={`py-12 md:py-16 bg-slate-50 border-b border-gray-100 ${TW_CV_AUTO}`}>
      <div className={TW_CONTAINER}>
        <Reveal animation="up">
          <CenteredSectionHeader
            title={settings?.testimonialsHeading || 'ہماری برادری کیا کہتی ہے'}
            compact
            tight
            titleClassName="sm:text-[28px]"
            topContent={
              <p className={`${TW_EYEBROW} justify-center mb-3`}>
                <span className={TW_EYEBROW_LINE} />
                {settings?.testimonialsEyebrow || 'برادری'}
                <span className={TW_EYEBROW_LINE} />
              </p>
            }
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} animation="up" delay={i * 90}>
              <div className={`${TW_CARD_SURFACE} shadow-sm px-6 py-6 flex flex-col h-full`}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-[15px] leading-none">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[13.5px] text-gray-600 leading-urdu flex-1 mb-5">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-semibold text-[13.5px] text-slate-900">{testimonial.name}</p>
                  {testimonial.role && (
                    <p className="text-[12px] text-gray-400 mt-0.5">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
