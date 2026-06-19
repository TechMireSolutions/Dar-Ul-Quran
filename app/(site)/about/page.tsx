import type { Metadata } from 'next'
import Link from 'next/link'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import RichTextBody from '@/components/content/RichTextBody'
import { ArrowRight, BookOpen, Heart, Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { TW_CTA_ARROW, TW_FEATURE_ICON, TW_GOLD_CTA_DARK } from '@/lib/tailwind'

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: 'about',
    path: '/about',
    titleFallback: 'ہمارے بارے میں',
  })
}

export default async function AboutPage() {
  const { page, settings } = await fetchCmsPage('about')

  const siteName = settings?.siteName || 'دار القرآن'

  const features = [
    { Icon: BookOpen, title: 'تعلیم',    desc: 'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ کے آنلائن کورسز' },
    { Icon: Heart,    title: 'خدمات',    desc: 'مستند مذہبی خدمات — نیابت زیارت، زکوٰۃ، خمس اور مزید' },
    { Icon: Star,     title: 'برادری',   desc: 'مجالس، پروگرامز اور امت کے لیے قابل اعتماد اسلامی مواد' },
  ]

  const pageTitle = resolveSeoTitle(page, 'ہمارے بارے میں')
  const pageDescription = resolveSeoDescription(page)

  return (
    <div>
      <WebPageSchema title={pageTitle} description={pageDescription} path="/about" />
      <PageHeroHeader
        eyebrow={page?.eyebrow || 'ہماری کہانی'}
        title={page?.title || 'ہمارے بارے میں'}
        subtitle={page?.subtitle || 'ہم کون ہیں اور ہمارا مقصد کیا ہے'}
        maxWidth="3xl"
      />

      <div className="py-8 sm:py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {page?.body ? (
            <Reveal animation="fade">
              <RichTextBody value={page.body} />
            </Reveal>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              <Reveal animation="up">
                <p className="text-[14.5px] text-gray-600 leading-[1.8]">
                  <strong className="text-slate-900">{siteName}</strong> اسلامی علم کے فروغ کا ایک خصوصی پلیٹ فارم ہے جو قرآن مجید اور اہل بیت (ع) کی تعلیمات پر مبنی ہے۔ ہمارا نام —
                  جس کے معنی <em>&ldquo;گھرِ قرآن&rdquo;</em> — قرآن کو تعلیم اور مستند اسلامی مواد کی بنیاد بنانے کے ہمارے مشن کی عکاسی کرتا ہے۔
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map(({ Icon, title, desc }, i) => (
                  <Reveal key={title} animation="up" delay={i * 80}>
                    <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-gray-100 h-full">
                      <div className={TW_FEATURE_ICON}>
                        <Icon size={15} className="text-dq-600" strokeWidth={1.75} />
                      </div>
                      <h3 className="font-semibold text-slate-900 text-[14px] mb-1">{title}</h3>
                      <p className="text-[13px] text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal animation="up" delay={80}>
                <div className="bg-slate-50 rounded-xl p-4 sm:p-6 border border-gray-100">
                  <h3 className="font-semibold text-slate-900 mb-2 text-[15px]">دار القرآن</h3>
                  <p className="text-[13.5px] text-gray-600 leading-relaxed">
                    ہم <strong className="text-slate-800">دار القرآن</strong> سے وابستہ ہیں، جو ہمارا خصوصی قرآنی ادارہ ہے اور ہر عمر کے طلبہ کے لیے منظم قرآنی تعلیمی پروگرام فراہم کرتا ہے۔
                  </p>
                </div>
              </Reveal>
            </div>
          )}

          <Reveal animation="up" delay={100}>
            <div className="mt-8 sm:mt-10 pt-7 sm:pt-8 border-t border-gray-100 flex flex-wrap gap-3">
              <Link href="/contact" className={TW_GOLD_CTA_DARK}>
                ہم سے رابطہ کریں
                <ArrowRight size={13} strokeWidth={2.5} className={TW_CTA_ARROW} />
              </Link>
              <Link href="/online-courses"
                className="inline-flex items-center text-[13.5px] font-medium text-slate-700 hover:text-slate-900
                  border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50
                  px-5 sm:px-6 py-2.5 rounded-full transition-all duration-200">
                ہمارے کورسز
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  )
}
