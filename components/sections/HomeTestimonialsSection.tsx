import Reveal from '@/components/ui/Reveal'
import type { HomepageSettingsDoc, TestimonialDoc } from '@/lib/types'
import { TW_CONTAINER, TW_CV_AUTO, TW_EYEBROW, TW_EYEBROW_LINE, TW_SECTION_TITLE_COMPACT } from '@/lib/tailwind'

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
          <div className="text-center mb-10">
            <p className={`${TW_EYEBROW} justify-center mb-3`}>
              <span className={`${TW_EYEBROW_LINE} w-6`} />
              {settings?.testimonialsEyebrow || 'برادری'}
              <span className={`${TW_EYEBROW_LINE} w-6`} />
            </p>
            <h2 className={`${TW_SECTION_TITLE_COMPACT} sm:text-[28px]`}>
              {settings?.testimonialsHeading || 'ہماری برادری کیا کہتی ہے'}
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} animation="up" delay={i * 90}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6 flex flex-col h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-[15px] leading-none">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-[13.5px] text-gray-600 leading-relaxed flex-1 mb-5">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-dq-100 flex items-center justify-center shrink-0">
                    <span className="text-[14px] font-bold text-dq-700">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-[11.5px] text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
