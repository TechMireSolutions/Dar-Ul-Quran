import type { LabelDescItemDoc } from '@/lib/types'
import CenteredSectionHeader from '@/components/ui/CenteredSectionHeader'
import {
  TW_BODY_MUTED,
  TW_CARD_SURFACE,
  TW_CONTAINER_NARROW,
  TW_CONTAINER_PROSE,
  TW_SECTION_PY,
} from '@/lib/tailwind'

type HowItWorksSectionProps = {
  heading?: string
  steps: LabelDescItemDoc[]
  maxWidth?: '2xl' | '3xl'
}

const MAX_WIDTH_CLASS = {
  '2xl': TW_CONTAINER_PROSE,
  '3xl': `${TW_CONTAINER_NARROW} lg:px-8`,
} as const

export default function HowItWorksSection({
  heading = 'یہ کیسے کام کرتا ہے',
  steps,
  maxWidth = '3xl',
}: HowItWorksSectionProps) {
  if (!steps.length) return null

  return (
    <section className={`bg-dq-50 dark:bg-transparent transition-colors ${TW_SECTION_PY}`}>
      <div className={MAX_WIDTH_CLASS[maxWidth]}>
        <CenteredSectionHeader title={heading} />
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li
              key={i}
              className={`flex items-start gap-5 ${TW_CARD_SURFACE} px-6 py-5 border border-dq-100 dark:border-slate-700 shadow-sm transition-colors`}
            >
              <span className="shrink-0 w-9 h-9 rounded-full bg-dq-600 text-white text-[13px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="pt-0.5">
                <span className="font-bold text-slate-900 dark:text-white transition-colors text-[15px] leading-loose py-1">{step.label}</span>
                {step.desc && (
                  <span className={TW_BODY_MUTED}> — {step.desc}</span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
