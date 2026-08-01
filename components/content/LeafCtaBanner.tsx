import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { externalLinkAttrs } from '@/lib/contact'
import { DEFAULT_WHATSAPP_CTA_LABEL } from '@/lib/seo'
import { TW_CONTAINER_NARROW, TW_CTA_ARROW, TW_GOLD_CTA, TW_LEAF_WHATSAPP_CTA, TW_SECTION_TITLE } from '@/lib/tailwind'

type LeafCtaBannerProps = {
  heading?: string
  subtitle?: string
  primaryHref: string
  primaryLabel: string
  primaryExternal?: boolean
  whatsappHref: string
  whatsappLabel?: string
  footer?: ReactNode
}

export default function LeafCtaBanner({
  heading,
  subtitle,
  primaryHref,
  primaryLabel,
  primaryExternal = false,
  whatsappHref,
  whatsappLabel = DEFAULT_WHATSAPP_CTA_LABEL,
  footer,
}: LeafCtaBannerProps) {
  if (!heading && !subtitle) return null

  return (
    <section className="bg-dq-900 dark:bg-slate-900 transition-colors pt-16 sm:pt-20 pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] sm:pb-20">
      <div className={`${TW_CONTAINER_NARROW} text-center`}>
        {heading && (
          <h2 className={`${TW_SECTION_TITLE} text-white mb-4`}>
            {heading}
          </h2>
        )}
        {subtitle && (
          <p className="text-[15px] text-slate-400 mb-8 leading-urdu">{subtitle}</p>
        )}
        <div className={`flex flex-wrap justify-center gap-3${footer ? ' mb-8' : ''}`}>
          <Link
            href={primaryHref}
            {...(primaryExternal ? externalLinkAttrs() : {})}
            className={TW_GOLD_CTA}
          >
            {primaryLabel}
            <ArrowRight size={14} strokeWidth={2.5} className={TW_CTA_ARROW} />
          </Link>
          <Link
            href={whatsappHref}
            {...externalLinkAttrs()}
            className={TW_LEAF_WHATSAPP_CTA}
          >
            <MessageCircle size={14} />
            {whatsappLabel}
          </Link>
        </div>
        {footer}
      </div>
    </section>
  )
}
