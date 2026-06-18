import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

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
  whatsappLabel = 'واٹس ایپ کریں',
  footer,
}: LeafCtaBannerProps) {
  if (!heading && !subtitle) return null

  return (
    <section className="bg-dq-900 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {heading && (
          <h2 className="font-bold text-[26px] sm:text-[34px] text-white tracking-[-0.02em] mb-4">
            {heading}
          </h2>
        )}
        {subtitle && (
          <p className="text-[15px] text-slate-400 mb-8 leading-relaxed">{subtitle}</p>
        )}
        <div className={`flex flex-wrap justify-center gap-3${footer ? ' mb-8' : ''}`}>
          <Link
            href={primaryHref}
            target={primaryExternal ? '_blank' : undefined}
            rel={primaryExternal ? 'noopener noreferrer' : undefined}
            className="group inline-flex items-center gap-2 bg-dq-500 hover:bg-dq-400 text-white font-bold text-[14px] px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(184,144,14,0.3)] transition-all duration-200 hover:-translate-y-px"
          >
            {primaryLabel}
            <ArrowRight size={14} strokeWidth={2.5} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[14px] font-semibold px-8 py-3.5 rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-px"
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
