import { ChevronRight, Plus } from 'lucide-react'
import type { PortableTextBlock } from '@portabletext/types'
import RichTextBody from '@/components/content/RichTextBody'
import CenteredSectionHeader from '@/components/ui/CenteredSectionHeader'
import { TW_CARD_SURFACE, TW_CONTAINER_NARROW, TW_SECTION_PY } from '@/lib/tailwind'

type FaqItem = {
  question: string
  answer?: unknown
}

type FaqAccordionProps = {
  heading?: string
  items: FaqItem[]
  icon?: 'chevron' | 'plus'
}

function FaqAnswer({ answer }: { answer?: unknown }) {
  if (Array.isArray(answer) && answer.length > 0) {
    return (
      <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-urdu border-t border-gray-50">
        <RichTextBody value={answer as PortableTextBlock[]} size="sm" />
      </div>
    )
  }

  if (typeof answer === 'string' && answer.trim()) {
    return (
      <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-urdu border-t border-gray-50">
        <p className="leading-urdu tracking-normal">{answer}</p>
      </div>
    )
  }

  return null
}

export default function FaqAccordion({ heading, items, icon = 'chevron' }: FaqAccordionProps) {
  if (!items.length) return null

  const Icon = icon === 'plus' ? Plus : ChevronRight
  const iconClass =
    icon === 'plus'
      ? 'shrink-0 text-gray-400 group-open:rotate-45 transition-transform duration-200'
      : 'shrink-0 text-gray-400 transition-transform duration-200 rtl:rotate-180 group-open:rotate-90 group-open:rtl:rotate-90'

  return (
    <section className={`bg-slate-50 ${TW_SECTION_PY}`}>
      <div className={TW_CONTAINER_NARROW}>
        {heading && <CenteredSectionHeader title={heading} tight />}
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className={`group ${TW_CARD_SURFACE} overflow-hidden shadow-sm`}
            >
              <summary className="flex min-h-11 items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[15px] text-slate-900 hover:text-dq-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50 focus-visible:ring-inset">
                {item.question}
                <Icon size={icon === 'plus' ? 16 : 15} strokeWidth={icon === 'plus' ? 2 : undefined} className={iconClass} />
              </summary>
              <FaqAnswer answer={item.answer} />
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
