import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import RichTextBody from '@/components/content/RichTextBody'
import Reveal from '@/components/ui/Reveal'
import { PATHS } from '@/lib/paths'
import {
  TW_CTA_ARROW,
  TW_FEATURE_CARD,
  TW_FEATURE_CARD_DESC,
  TW_FEATURE_CARD_TITLE,
  TW_FEATURE_ICON,
  TW_GRID_2,
  TW_OUTLINE_PILL,
  TW_PAYPAL_CTA,
} from '@/lib/tailwind'
import type { PortableTextBlock } from '@portabletext/types'

type DonateCause = { title: string; desc: string }

type DonateContentProps = {
  body?: PortableTextBlock[] | null
  causes: DonateCause[]
  howToHeading: string
  howToText: string
  donateUrl?: string | null
  payOnlineLabel: string
  contactLabel: string
  closingMessage: string
}

export default function DonateContent({
  body,
  causes,
  howToHeading,
  howToText,
  donateUrl,
  payOnlineLabel,
  contactLabel,
  closingMessage,
}: DonateContentProps) {
  return (
    <>
      {body && (
        <Reveal animation="fade">
          <RichTextBody value={body} size="sm" className="mb-8 sm:mb-10" />
        </Reveal>
      )}

      <div className={`${TW_GRID_2} mb-8 sm:mb-10`}>
        {causes.map(({ title, desc }, i) => (
          <Reveal key={i} animation="up" delay={i * 80}>
            <div className={`${TW_FEATURE_CARD} bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 transition-all duration-200 h-full`}>
              <div className={TW_FEATURE_ICON}>
                <span className="text-dq-700 font-bold text-[16px] leading-none">{i + 1}</span>
              </div>
              <h3 className={TW_FEATURE_CARD_TITLE}>{title}</h3>
              <p className={TW_FEATURE_CARD_DESC}>{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal animation="scale" delay={60}>
        <div className="bg-dq-900 rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="font-bold text-[20px] sm:text-[22px] text-white tracking-normal leading-heading mb-2">
            {howToHeading}
          </h2>
          <p className="text-[13px] sm:text-[13.5px] text-slate-400 mb-6 max-w-sm mx-auto leading-urdu">
            {howToText}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {donateUrl ? (
              <a
                href={donateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={TW_PAYPAL_CTA}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.28a.78.78 0 0 1 .77-.65h7.794c2.728 0 4.636.602 5.668 1.79.49.56.802 1.147.952 1.795.157.676.13 1.484-.08 2.47l-.007.045v.387l.277.157c.232.13.442.29.625.472.31.318.524.72.636 1.194.115.483.103 1.056-.036 1.705-.164.76-.428 1.42-.785 1.963a5.09 5.09 0 0 1-1.247 1.39c-.478.365-1.04.64-1.674.82-.617.175-1.32.264-2.09.264h-.497a1.41 1.41 0 0 0-1.393 1.19l-.112.61-.58 3.672-.026.14a.78.78 0 0 1-.77.648z" />
                </svg>
                {payOnlineLabel}
                <ArrowRight size={14} strokeWidth={2.5} className={TW_CTA_ARROW} />
              </a>
            ) : null}
            <Link
              href={PATHS.contact}
              className={`${TW_OUTLINE_PILL} border-white/20 bg-transparent text-slate-300 hover:border-white/50 hover:bg-white/5 hover:text-white`}
            >
              {contactLabel}
            </Link>
          </div>
        </div>
      </Reveal>

      <p className="text-center text-[12px] text-gray-400 mt-6">
        {closingMessage}
      </p>
    </>
  )
}
