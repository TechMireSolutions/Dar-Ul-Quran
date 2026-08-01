import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
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
            <div className="relative pb-10">
              <div className="bg-dq-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 end-0 size-72 rounded-full pointer-events-none opacity-20 bg-gold-radial-sm ltr:translate-x-[30%] rtl:-translate-x-[30%] -translate-y-[30%]" />
                <p className="text-center text-[28px] sm:text-[32px] leading-urdu text-amber-400 font-light mb-3" dir="rtl">
                  {settings?.aboutHadithArabic || 'اطلبوا العلم من المهد إلى اللحد'}
                </p>
                <div className="w-10 h-px bg-amber-400/40 mx-auto mb-3" />
                <p className="text-center text-[13px] text-gray-400 italic leading-urdu">
                  &quot;{settings?.aboutHadithTranslation || 'علم حاصل کرو گہوارے سے لحد تک۔'}&quot;
                </p>
                <p className="text-center text-[11px] text-amber-500 font-semibold mt-2 tracking-normal">
                  — {settings?.aboutHadithAttribution || 'حضرت محمد (ص)'}
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                  {[
                    { value: settings?.aboutStat1Value || '500+', label: settings?.aboutStat1Label || 'طلباء' },
                    { value: settings?.aboutStat2Value || '10+', label: settings?.aboutStat2Label || 'علماء' },
                    { value: settings?.aboutStat3Value || '5+', label: settings?.aboutStat3Label || 'ممالک' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-[22px] font-bold text-white leading-none">{stat.value}</p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-urdu-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 start-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center shrink-0">
                  <span className="text-emerald-600 font-bold text-[16px]">✓</span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-slate-800 dark:text-slate-100">{settings?.aboutBadgeText || 'اہل علماء'}</p>
                  <p className="text-[11px] text-gray-400">{settings?.aboutBadgeSubtext || 'تصدیق شدہ و قابل اعتماد'}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
