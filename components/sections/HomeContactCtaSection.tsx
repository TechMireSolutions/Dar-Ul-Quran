import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { PATHS } from '@/lib/paths'
import { TW_CONTAINER, TW_CV_AUTO, TW_GOLD_CTA } from '@/lib/tailwind'

export default function HomeContactCtaSection() {
  return (
    <section className={`py-12 md:py-16 bg-white dark:bg-slate-950 transition-colors ${TW_CV_AUTO}`}>
      <div className={TW_CONTAINER}>
        <Reveal animation="up">
          <div className="relative overflow-hidden bg-slate-900 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-lg border border-slate-800">
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 end-0 -mr-20 -mt-20 w-72 h-72 bg-dq-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex-1 text-center md:text-start relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-heading tracking-normal mb-3">
                رابطہ کریں
              </h2>
              <p className="text-slate-300 text-[15px] leading-urdu max-w-2xl mx-auto md:mx-0">
                کورسز، تقریبات یا خدمات کے بارے میں سوالات ہیں؟ ہمیں ایک پیغام بھیجیں — ہمیں آپ کی مدد کر کے خوشی ہوگی۔
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link 
                href={PATHS.contact} 
                className={TW_GOLD_CTA}
              >
                ہم سے رابطہ کریں
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
