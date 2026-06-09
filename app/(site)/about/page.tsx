import type { Metadata } from 'next'
import Link from 'next/link'
import { safeFetch } from '@/sanity/lib/client'
import { pageBySlugQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { ArrowRight, BookOpen, Heart, Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await safeFetch(pageBySlugQuery, { slug: 'about' })
  return {
    title: page?.seoTitle || page?.title || 'ہمارے بارے میں',
    description: page?.seoDescription || page?.subtitle,
  }
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([
    safeFetch(pageBySlugQuery, { slug: 'about' }),
    safeFetch(siteSettingsQuery),
  ])

  const siteName = settings?.siteName || 'Dar Ul Quran'

  const features = [
    { Icon: BookOpen, title: 'تعلیم',    desc: 'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ کے آنلائن کورسز' },
    { Icon: Heart,    title: 'خدمات',    desc: 'مستند مذہبی خدمات — نیابت زیارت، زکوٰۃ، خمس اور مزید' },
    { Icon: Star,     title: 'برادری',   desc: 'مجالس، پروگرامز اور امت کے لیے قابل اعتماد اسلامی مواد' },
  ]

  return (
    <div>
      <div className="bg-white border-b border-gray-100">
        <Reveal animation="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div>
            <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">
              <span className="w-5 h-px bg-dq-400 inline-block" />
              {page?.eyebrow || 'ہماری کہانی'}
            </p>
            <h1 className="font-bold text-[26px] sm:text-[30px] text-slate-900 tracking-[-0.02em] mb-2">
              {page?.title || 'ہمارے بارے میں'}
            </h1>
            <p className="text-[13.5px] text-gray-500">
              {page?.subtitle || 'ہم کون ہیں اور ہمارا مقصد کیا ہے'}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="py-8 sm:py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {page?.body ? (
            <Reveal animation="fade">
              <div className="prose prose-slate prose-base sm:prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-a:text-dq-500 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-slate-900">
                <PortableText value={page.body} />
              </div>
            </Reveal>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              <Reveal animation="up">
                <p className="text-[14.5px] text-gray-600 leading-[1.8]">
                  <strong className="text-slate-900">{siteName}</strong> is a dedicated platform for the promotion of
                  Islamic knowledge rooted in the teachings of the Holy Quran and the Ahlul Bayt (A.S.). Our name —
                  جس کے معنی <em>&ldquo;گھرِ قرآن&rdquo;</em> — قرآن کو تعلیم اور مستند اسلامی مواد کی بنیاد بنانے کے ہمارے مشن کی عکاسی کرتا ہے۔
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {features.map(({ Icon, title, desc }, i) => (
                  <Reveal key={title} animation="up" delay={i * 80}>
                    <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-gray-100 h-full">
                      <div className="w-9 h-9 bg-dq-50 border border-dq-100 rounded-xl flex items-center justify-center mb-3">
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
                  <h3 className="font-semibold text-slate-900 mb-2 text-[15px]">Dar Ul Quran</h3>
                  <p className="text-[13.5px] text-gray-600 leading-relaxed">
                    We are affiliated with <strong className="text-slate-800">Dar Ul Quran</strong>, our dedicated
                    Quranic institute providing structured Quran education programs for students of all ages.
                  </p>
                </div>
              </Reveal>
            </div>
          )}

          <Reveal animation="up" delay={100}>
            <div className="mt-8 sm:mt-10 pt-7 sm:pt-8 border-t border-gray-100 flex flex-wrap gap-3">
              <Link href="/contact"
                className="group inline-flex items-center gap-2 bg-dq-600 hover:bg-dq-700 text-white text-[13.5px] font-semibold px-5 sm:px-6 py-2.5 rounded-full
                  shadow-[0_4px_16px_rgba(184,144,14,0.3)] transition-all duration-200 hover:-translate-y-px">
                ہم سے رابطہ کریں
                <ArrowRight size={13} strokeWidth={2.5} className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-150" />
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
