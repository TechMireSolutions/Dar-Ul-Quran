import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import HomeAboutQuotePanel from './HomeAboutQuotePanel'
import { FALLBACK_QUOTES } from '@/lib/fallbacks/quotes'
import type { HomepageSettingsDoc } from '@/lib/types'
import {
  DEFAULT_ABOUT_CTA_LABEL,
  DEFAULT_SITE_NAME_URDU,
} from '@/lib/seo'
import { PATHS } from '@/lib/paths'
import {
  TW_BODY_MUTED,
  TW_CONTAINER,
  TW_CTA_ARROW,
  TW_CV_AUTO,
  TW_EYEBROW,
  TW_EYEBROW_LINE,
  TW_GOLD_CTA_DARK,
  TW_SECTION_TITLE,
} from '@/lib/tailwind'

type HomeAboutSectionProps = {
  settings?: HomepageSettingsDoc | null
}

export default function HomeAboutSection({ settings }: HomeAboutSectionProps) {
  return (
    <section className={`relative py-14 md:py-20 bg-white dark:bg-slate-900 overflow-hidden border-b border-gray-100 dark:border-slate-800 transition-colors ${TW_CV_AUTO}`}>
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-dot-grid bg-size-dot-grid" />
      <div className={`relative ${TW_CONTAINER}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal animation="up">
            <div>
              <p className={`${TW_EYEBROW} mb-3`}>
                <span className={`${TW_EYEBROW_LINE}`} />
                {settings?.aboutEyebrow || 'ہم کون ہیں'}
              </p>
              <h2 className={`${TW_SECTION_TITLE} mb-4`}>
                {settings?.aboutHeading || 'دنیا کے ہر کونے میں شیعہ اسلامی علم پہنچانا'}
              </h2>
              {(settings?.aboutBody1 || true) && (
                <p className={`${TW_BODY_MUTED} mb-4`}>
                  {settings?.aboutBody1 ||
                    `${DEFAULT_SITE_NAME_URDU} ایک واحد مقصد کے ساتھ قائم کیا گیا — ہر مسلمان تک مستند شیعہ اسلامی تعلیم اور مذہبی خدمات کی رسائی، چاہے وہ کہیں بھی ہو۔`}
                </p>
              )}
              {(settings?.aboutBody2 || true) && (
                <p className={`${TW_BODY_MUTED} mb-7`}>
                  {settings?.aboutBody2 ||
                    'اہل علماء کے آنلائن کورسز اور نیابت زیارت و اجارہ جیسی خدمات کے ذریعے ہم دنیا بھر میں ہزاروں خاندانوں کی خدمت کرتے ہیں۔'}
                </p>
              )}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {(settings?.aboutPillars?.length
                  ? settings.aboutPillars
                  : ['ایمان', 'علم', 'رسائی', 'اخلاص']
                ).map((pillar: string) => (
                  <span
                    key={pillar}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-dq-50 border border-dq-100 text-[12px] font-semibold text-dq-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dq-500 shrink-0" />
                    {pillar}
                  </span>
                ))}
              </div>
              <Link href={PATHS.about} className={TW_GOLD_CTA_DARK}>
                {settings?.aboutCtaLabel || DEFAULT_ABOUT_CTA_LABEL}
                <ArrowRight size={13} strokeWidth={2.5} className={TW_CTA_ARROW} />
              </Link>
            </div>
          </Reveal>

          <Reveal animation="scale" delay={120}>
            <HomeAboutQuotePanel 
              homepage={settings || null}
              quotes={FALLBACK_QUOTES}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
