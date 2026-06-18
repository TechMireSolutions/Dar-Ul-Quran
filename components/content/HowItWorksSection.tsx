import type { LabelDescItemDoc } from '@/lib/types'

type HowItWorksSectionProps = {
  heading?: string
  steps: LabelDescItemDoc[]
  maxWidth?: '2xl' | '3xl'
}

const MAX_WIDTH_CLASS = {
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
} as const

export default function HowItWorksSection({
  heading = 'یہ کیسے کام کرتا ہے',
  steps,
  maxWidth = '3xl',
}: HowItWorksSectionProps) {
  if (!steps.length) return null

  return (
    <section className="bg-dq-50 py-16 sm:py-20">
      <div className={`${MAX_WIDTH_CLASS[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="text-center mb-12">
          <h2 className="font-bold text-[24px] sm:text-[32px] text-slate-900 tracking-[-0.02em]">
            {heading}
          </h2>
        </div>
        <ol className="space-y-4">
          {steps.map((step, i) => (
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
  )
}
