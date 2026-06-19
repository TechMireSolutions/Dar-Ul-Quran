import type { Metadata } from 'next'
import Link from 'next/link'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import RichTextBody from '@/components/content/RichTextBody'
import { ArrowRight } from 'lucide-react'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import Reveal from '@/components/ui/Reveal'
import { TW_CONTAINER_NARROW, TW_CTA_ARROW, TW_FEATURE_ICON, TW_PAGE_BODY, TW_PAYPAL_CTA } from '@/lib/tailwind'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: 'donate',
    path: '/donate',
    titleFallback: 'عطیہ',
  })
}

export default async function DonatePage() {
  const { page, settings } = await fetchCmsPage('donate')

  const causes: { title: string; desc: string }[] = settings?.donateCauses?.length
    ? settings.donateCauses
    : [
        { title: 'عمومی عطیہ',      desc: 'دار القرآن کے مجموعی مشن میں معاونت' },
        { title: 'قرآنی تعلیم',     desc: 'بچوں کی مفت قرآنی کلاسوں کی مالی معاونت' },
        { title: 'محرم پروگرامز',   desc: 'مجالس اور عزاداری کی تقاریب منظم کرنے میں مدد' },
        { title: 'دار القرآن معاونت', desc: 'ہمارے قرآنی ادارے میں حصہ ڈالیں' },
      ]

  const pageTitle = resolveSeoTitle(page, 'عطیہ')
  const pageDescription = resolveSeoDescription(page)

  return (
    <div>
      <WebPageSchema title={pageTitle} description={pageDescription} path="/donate" />
      <PageHeroHeader
        topContent={
          <p className="text-[20px] sm:text-[22px] text-dq-700 mb-3 leading-none">
            {settings?.donateArabicVerse || 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ'}
          </p>
        }
        eyebrow={page?.eyebrow || 'عطا کیجیے'}
        title={page?.title || 'عطیہ'}
        subtitle={page?.subtitle || 'آپ کی سخاوت اہل بیت (ع) کے نور کو زندہ رکھتی ہے۔ ہر عطیہ — چھوٹا یا بڑا — فرق ڈالتا ہے۔'}
        maxWidth="5xl"
        align="center"
      />

      <div className={TW_PAGE_BODY}>
        <div className={`${TW_CONTAINER_NARROW} lg:px-8`}>

          {page?.body && (
            <Reveal animation="fade">
              <RichTextBody value={page.body} size="sm" className="mb-8 sm:mb-10" />
            </Reveal>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 sm:mb-10">
            {causes.map(({ title, desc }, i) => (
              <Reveal key={i} animation="up" delay={i * 80}>
                <div className="bg-white border border-gray-100 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full">
                  <div className={TW_FEATURE_ICON}>
                    <span className="text-dq-700 font-bold text-[16px] leading-none">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-[14px] mb-1">{title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal animation="scale" delay={60}>
            <div className="bg-dq-900 rounded-2xl p-6 sm:p-8 text-center">
              <h2 className="font-bold text-[20px] sm:text-[22px] text-white tracking-[-0.02em] mb-2">
                {settings?.donateHowToHeading || 'عطیہ کیسے دیں'}
              </h2>
              <p className="text-[13px] sm:text-[13.5px] text-slate-400 mb-6 max-w-sm mx-auto leading-relaxed">
                {settings?.donateHowToText || 'بینک ٹرانسفر کی تفصیل کے لیے ہم سے رابطہ کریں یا نیچے آنلائن ادائیگی کا لنک استعمال کریں۔'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={settings?.donateUrl || 'https://www.paypal.com/donate/?hosted_button_id=Q22WVGY8WWZ4C'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={TW_PAYPAL_CTA}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.28a.78.78 0 0 1 .77-.65h7.794c2.728 0 4.636.602 5.668 1.79.49.56.802 1.147.952 1.795.157.676.13 1.484-.08 2.47l-.007.045v.387l.277.157c.232.13.442.29.625.472.31.318.524.72.636 1.194.115.483.103 1.056-.036 1.705-.164.76-.428 1.42-.785 1.963a5.09 5.09 0 0 1-1.247 1.39c-.478.365-1.04.64-1.674.82-.617.175-1.32.264-2.09.264h-.497a1.41 1.41 0 0 0-1.393 1.19l-.112.61-.58 3.672-.026.14a.78.78 0 0 1-.77.648z" />
                  </svg>
                  {settings?.donatePayOnlineLabel || 'آنلائن عطیہ دیں'}
                  <ArrowRight size={14} strokeWidth={2.5} className={TW_CTA_ARROW} />
                </a>
                <Link href="/contact"
                  className="inline-flex items-center justify-center text-[13px] font-medium text-slate-300 hover:text-white border border-white/20 hover:border-white/50 px-6 py-3 rounded-full transition-all duration-200">
                  {settings?.donateContactLabel || 'ہم سے رابطہ کریں'}
                </Link>
              </div>
            </div>
          </Reveal>

          <p className="text-center text-[12px] text-gray-400 mt-6">
            {settings?.donateClosingMessage || 'جزاک اللہ خیر — اللہ (سبحانہ و تعالیٰ) آپ کے عطیات قبول فرمائے۔'}
          </p>

        </div>
      </div>
    </div>
  )
}
