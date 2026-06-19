import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import type { HomepageSettingsDoc } from '@/lib/types'
import { TW_CTA_ARROW, TW_CV_AUTO, TW_GOLD_CTA_DARK } from '@/lib/tailwind'

type HomeDonateCtaSectionProps = {
  settings?: HomepageSettingsDoc | null
}

export default function HomeDonateCtaSection({ settings }: HomeDonateCtaSectionProps) {
  return (
    <section className={`relative overflow-hidden bg-slate-50 border-y border-slate-200 py-10 sm:py-12 ${TW_CV_AUTO}`}>
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-dot-grid-slate bg-size-dot-grid-sm" />

      <Reveal animation="up" className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <div>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <span className="w-6 h-px bg-amber-400" />
            <span className="text-[9.5px] font-bold uppercase tracking-[0.28em] text-amber-600">في سبيل الله</span>
            <span className="w-6 h-px bg-amber-400" />
          </div>

          <h2 className="font-bold text-[28px] lg:text-[34px] text-slate-900 leading-tight tracking-[-0.02em] mb-3">
            {settings?.donateHeading || 'ہمارے مشن میں ساتھ دیں'}
          </h2>

          <p className="text-[13.5px] text-gray-500 leading-relaxed mb-6 max-w-sm mx-auto">
            {settings?.donateText ||
              'آپ کا صدقہ اور چندہ ہمیں اہل بیت (ع) کی تعلیمات پھیلاتے رہنے میں مدد کرتا ہے'}
          </p>

          <div className="relative max-w-lg mx-auto mb-7 bg-white border border-slate-200 rounded-xl px-6 py-5 shadow-sm">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center">
              <span className="text-amber-500 text-[15px] font-bold leading-none">&quot;</span>
            </div>
            <p className="text-[13.5px] text-slate-600 italic leading-relaxed">
              {settings?.donateQuote || 'صدقہ رب کے غضب کو بجھاتا اور بری موت کو دور کرتا ہے۔'}
            </p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="w-5 h-px bg-amber-300" />
              <cite className="not-italic text-[11px] font-semibold text-amber-600 tracking-wide">
                {settings?.donateQuoteAttribution || 'امام صادق (ع)'}
              </cite>
              <span className="w-5 h-px bg-amber-300" />
            </div>
          </div>

          <Link href="/donate" className={TW_GOLD_CTA_DARK}>
            {settings?.donateCtaLabel || 'ابھی عطیہ دیں'}
            <ArrowRight size={13} strokeWidth={2.5} className={TW_CTA_ARROW} />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
