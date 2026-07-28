import { BookOpen, Heart, Star } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { SECTION_LABELS } from '@/lib/paths'
import {
  TW_FEATURE_CARD,
  TW_FEATURE_CARD_DESC,
  TW_FEATURE_CARD_TITLE,
  TW_FEATURE_ICON,
} from '@/lib/tailwind'

const FEATURES = [
  { Icon: BookOpen, title: 'تعلیم', desc: 'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ کے آنلائن کورسز' },
  { Icon: Heart, title: SECTION_LABELS.services, desc: 'مستند مذہبی خدمات — نیابت زیارت، زکوٰۃ، خمس اور مزید' },
  { Icon: Star, title: 'برادری', desc: 'مجالس، پروگرامز اور امت کے لیے قابل اعتماد اسلامی مواد' },
] as const

type AboutFallbackProps = {
  siteName: string
}

export default function AboutFallback({ siteName }: AboutFallbackProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <Reveal animation="up">
        <p className="text-[14.5px] text-gray-600 leading-urdu">
          <strong className="text-slate-900">{siteName}</strong> اسلامی علم کے فروغ کا ایک خصوصی پلیٹ فارم ہے جو قرآن مجید اور اہل بیت (ع) کی تعلیمات پر مبنی ہے۔ ہمارا نام —
          جس کے معنی <em>&ldquo;گھرِ قرآن&rdquo;</em> — قرآن کو تعلیم اور مستند اسلامی مواد کی بنیاد بنانے کے ہمارے مشن کی عکاسی کرتا ہے۔
        </p>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {FEATURES.map(({ Icon, title, desc }, i) => (
          <Reveal key={title} animation="up" delay={i * 80}>
            <div className={`${TW_FEATURE_CARD} h-full`}>
              <div className={TW_FEATURE_ICON}>
                <Icon size={15} className="text-dq-600" strokeWidth={1.75} />
              </div>
              <h3 className={TW_FEATURE_CARD_TITLE}>{title}</h3>
              <p className={TW_FEATURE_CARD_DESC}>{desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal animation="up" delay={80}>
        <div className={TW_FEATURE_CARD}>
          <h3 className="font-semibold text-slate-900 mb-2 text-[15px] leading-urdu-tight">{siteName}</h3>
          <p className="text-[13.5px] text-gray-600 leading-urdu">
            ہم <strong className="text-slate-800">{siteName}</strong> سے وابستہ ہیں، جو ہمارا خصوصی قرآنی ادارہ ہے اور ہر عمر کے طلبہ کے لیے منظم قرآنی تعلیمی پروگرام فراہم کرتا ہے۔
          </p>
        </div>
      </Reveal>
    </div>
  )
}
