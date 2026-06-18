import { ChevronRight, Plus } from 'lucide-react'
import { PortableText } from '@portabletext/react'

type FaqItem = {
  question: string
  answer?: unknown
}

type FaqAccordionProps = {
  heading?: string
  items: FaqItem[]
  icon?: 'chevron' | 'plus'
}

export default function FaqAccordion({ heading, items, icon = 'chevron' }: FaqAccordionProps) {
  if (!items.length) return null

  const Icon = icon === 'plus' ? Plus : ChevronRight
  const iconClass =
    icon === 'plus'
      ? 'shrink-0 text-gray-400 group-open:rotate-45 transition-transform duration-200'
      : 'shrink-0 text-gray-400 group-open:rotate-90 transition-transform duration-200'

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {heading && (
          <div className="text-center mb-10">
            <h2 className="font-bold text-[24px] sm:text-[30px] text-slate-900 tracking-[-0.02em]">
              {heading}
            </h2>
          </div>
        )}
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-[15px] text-slate-900 hover:text-dq-700 transition-colors">
                {item.question}
                <Icon size={icon === 'plus' ? 16 : 15} strokeWidth={icon === 'plus' ? 2 : undefined} className={iconClass} />
              </summary>
              {Array.isArray(item.answer) && item.answer.length > 0 && (
                <div className="px-6 pb-5 pt-1 text-[14px] text-gray-600 leading-relaxed border-t border-gray-50 prose prose-sm max-w-none">
                  <PortableText value={item.answer} />
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
