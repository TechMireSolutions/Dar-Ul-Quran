import Link from 'next/link'
import { ArrowRight, Users, BookOpen, GraduationCap } from 'lucide-react'
import { TW_CTA_ARROW, TW_TEXT_GRADIENT_GOLD } from '@/lib/tailwind'

type HeroSectionProps = {
  subtitle?:    string
  title?:       string
  description?: string
  heroImage?:   string | null
  heroImageBlur?: string
  cta1Label?:   string
  cta1Link?:    string
  cta2Label?:   string
  cta2Link?:    string
}

const DEFAULT_LINES = ['قرآن، فقہ اور مزید', 'شیعہ علماء سے', 'سیکھیں۔']

const STATS = [
  { value: '500+', label: 'طلباء',  Icon: Users         },
  { value: '20+',  label: 'کورسز',  Icon: BookOpen      },
  { value: '10+',  label: 'علماء',  Icon: GraduationCap },
]

function heroDelay(ms: number): React.CSSProperties {
  return { '--hero-delay': `${ms}ms` } as React.CSSProperties
}

export default function HeroSection({
  subtitle    = 'دار القرآن — ایمان۔ علم۔ رسائی۔',
  title,
  description = 'دار القرآن میں ہم ہر شخص کے لیے آسان اور سستی شیعہ اسلامی تعلیم پیش کرتے ہیں، چاہے آپ دنیا میں کہیں بھی ہوں۔',
  heroImage,
  heroImageBlur,
  cta1Label   = 'کورسز دیکھیں',
  cta1Link    = '/online-courses',
  cta2Label   = 'ہماری خدمات',
  cta2Link    = '/services',
}: HeroSectionProps) {
  const titleLines = title ? title.split('\n') : DEFAULT_LINES

  return (
    <section
      aria-label="صفحۂ اول کا تعارف"
      className="relative w-full overflow-hidden min-h-[400px] md:min-h-[720px] bg-hero-surface"
    >

      {/* Dot-grid texture */}
      <div className="absolute inset-0 pointer-events-none bg-dot-grid-gold bg-size-dot-grid-lg opacity-[0.55]" />

      {/* Gold radial glow behind content (right in RTL) */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none bg-gold-radial" />

      {/* Decorative corner arcs */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.18] size-[260px] rounded-bl-full border-[1.5px] border-dq-400 translate-x-[35%] -translate-y-[35%]" />
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.12] size-40 rounded-bl-full border-[1.5px] border-dq-400 translate-x-[22%] -translate-y-[22%]" />

      {/* Hero image — desktop only */}
      <div className="absolute inset-0 hidden md:block md:inset-auto md:right-0 rtl:md:right-auto rtl:md:left-0 md:top-0 md:h-full md:w-[58%] pointer-events-none select-none">
        {heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- intentional LCP optimization
          <img
            src={heroImage}
            alt={title ? `دار القرآن - ${title.replace(/\n/g, ' ')}` : 'دار القرآن - اسلامی علم اور کورسز'}
            fetchPriority="high"
            decoding="async"
            width={828}
            height={552}
            className={`absolute inset-0 size-full object-cover object-center${heroImageBlur ? ' bg-cover bg-center' : ''}`}
            style={heroImageBlur ? { backgroundImage: `url(${heroImageBlur})` } : undefined}
          />
        ) : (
          <div className="size-full bg-hero-fallback" />
        )}

        <div className="absolute inset-0 hidden md:block bg-hero-fade-rtl" />
        <div className="absolute inset-0 hidden md:block rtl:hidden bg-hero-fade-ltr" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 hidden md:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 flex flex-col justify-center min-h-[400px] md:min-h-[720px] py-10 md:py-0">
        <div className="w-full md:max-w-[500px]">

          {/* Enrollment badge */}
          <div style={heroDelay(0)} className="hero-item mb-5">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-emerald-100/70 border border-emerald-400/35">
              <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-[11px] font-bold text-emerald-700 leading-snug">
                داخلے جاری ہیں
              </span>
            </span>
          </div>

          {/* Subtitle */}
          <p
            dir="rtl"
            style={heroDelay(80)}
            className="hero-item text-[12.5px] font-medium mb-4 tracking-wide text-dq-500/80 leading-normal"
          >
            {subtitle}
          </p>

          {/* Headline */}
          <h1 className="mb-4 leading-none">
            {titleLines.map((line, i) => (
              <span
                key={i}
                className="hero-item block font-extrabold tracking-tight text-[clamp(32px,7.5vw,68px)]"
                style={heroDelay(130 + i * 80)}
              >
                {i === titleLines.length - 1 ? (
                  <span className={TW_TEXT_GRADIENT_GOLD}>{line}</span>
                ) : (
                  <span className="text-dq-950">{line}</span>
                )}
              </span>
            ))}
          </h1>

          {/* Gold decorative divider */}
          <div style={heroDelay(310)} className="hero-item flex items-center gap-2 mb-5">
            <span className="h-0.5 w-16 rounded-full shrink-0 bg-gold-line" />
            <span className="size-2 rounded-full shrink-0 bg-gradient-to-br from-dq-400 to-dq-600 shadow-[0_0_6px_rgb(212_168_32/0.5)]" />
            <span className="h-px w-8 rounded-full shrink-0 bg-dq-400/30" />
          </div>

          {/* Description */}
          <p
            style={heroDelay(380)}
            className="hero-item text-sm sm:text-[14.5px] text-gray-600 mb-8 max-w-[430px] leading-[1.9]"
          >
            {description}
          </p>

          {/* CTAs */}
          <div style={heroDelay(460)} className="hero-item flex items-center gap-3 flex-wrap">
            <Link
              href={cta1Link}
              className="group inline-flex items-center gap-2 text-white font-bold text-[13.5px] rounded-full px-7 py-3.5 leading-snug bg-gold-cta shadow-gold-lg shadow-[inset_0_1px_0_rgb(255_255_255/0.18)] transition-all duration-200 hover:-translate-y-0.5"
            >
              {cta1Label}
              <ArrowRight size={14} strokeWidth={2.5} className={TW_CTA_ARROW} />
            </Link>

            <Link
              href={cta2Link}
              className="inline-flex items-center font-semibold text-[13.5px] rounded-full px-[26px] py-3.5 text-dq-700 border-[1.5px] border-dq-400/45 bg-dq-50/90 leading-snug transition-all duration-200 hover:-translate-y-0.5"
            >
              {cta2Label}
            </Link>
          </div>

          {/* Stats */}
          <div
            style={heroDelay(560)}
            className="hero-item flex items-center flex-wrap gap-y-4 mt-10 pt-7 border-t border-dq-400/20"
          >
            {STATS.map(({ value, label, Icon }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl flex items-center justify-center shrink-0 bg-gold-icon border border-dq-400/40 shadow-[0_2px_8px_rgb(184_144_14/0.12)]">
                    <Icon size={17} strokeWidth={1.5} className="text-dq-600" />
                  </div>
                  <div>
                    <p className="font-bold leading-none tracking-tight text-[22px] text-dq-950">
                      {value}
                    </p>
                    <p className="text-[11px] mt-1 text-gray-400">{label}</p>
                  </div>
                </div>
                {i < STATS.length - 1 && (
                  <div className="h-9 w-px mx-5 shrink-0 hidden sm:block bg-gold-divider" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
