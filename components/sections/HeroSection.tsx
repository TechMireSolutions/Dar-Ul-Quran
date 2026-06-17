'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, BookOpen, GraduationCap } from 'lucide-react'

interface HeroSectionProps {
  subtitle?:    string
  title?:       string
  description?: string
  heroImage?:   string | null
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

export default function HeroSection({
  subtitle    = 'دار القرآن — ایمان۔ علم۔ رسائی۔',
  title,
  description = 'دار القرآن میں ہم ہر شخص کے لیے آسان اور سستی شیعہ اسلامی تعلیم پیش کرتے ہیں، چاہے آپ دنیا میں کہیں بھی ہوں۔',
  heroImage,
  cta1Label   = 'کورسز دیکھیں',
  cta1Link    = '/online-courses',
  cta2Label   = 'ہماری خدمات',
  cta2Link    = '/services',
}: HeroSectionProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(id)
  }, [])

  function animStyle(delay: number, dist = 22): React.CSSProperties {
    return {
      opacity:    show ? 1 : 0,
      transform:  show ? 'none' : `translateY(${dist}px)`,
      transition: `opacity 0.7s ease ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }
  }

  const titleLines = title ? title.split('\n') : DEFAULT_LINES

  return (
    <section
      className="relative w-full overflow-hidden min-h-[600px] md:min-h-[720px]"
      style={{ background: 'linear-gradient(155deg, #fdfbf2 0%, #ffffff 55%, #fdfbf0 100%)' }}
    >

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(212,168,32,0.2) 1px, transparent 1px)',
          backgroundSize:  '32px 32px',
          opacity: 0.55,
        }}
      />

      {/* Gold radial glow behind content (right in RTL) */}
      <div
        className="absolute top-0 right-0 w-[50%] h-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 75% 35%, rgba(184,144,14,0.1) 0%, transparent 60%)' }}
      />

      {/* Decorative corner arcs */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.18]"
        style={{ width: 260, height: 260, borderRadius: '0 0 0 100%', border: '1.5px solid #d4a820', transform: 'translate(35%, -35%)' }} />
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.12]"
        style={{ width: 160, height: 160, borderRadius: '0 0 0 100%', border: '1.5px solid #d4a820', transform: 'translate(22%, -22%)' }} />

      {/* Hero image — left panel in RTL */}
      <div
        className="absolute inset-0 md:inset-auto md:right-0 rtl:md:right-auto rtl:md:left-0 md:top-0 md:h-full md:w-[58%] pointer-events-none select-none"
      >
        {heroImage ? (
          <Image src={heroImage} alt={title ? `دار القرآن - ${title.replace(/\n/g, ' ')}` : "دار القرآن - اسلامی علم اور کورسز"} fill priority fetchPriority="high" unoptimized sizes="(max-width: 768px) 100vw, 58vw" className="object-cover object-center" />
        ) : (
          <div className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #f0d89a 0%, #fdf3d0 60%, #fff 100%)' }} />
        )}

        {/* Mobile overlay */}
        <div className="absolute inset-0 md:hidden" style={{ background: 'rgba(253,251,242,0.88)' }} />

        {/* Desktop RTL: fade right edge (content side) to warm-white */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to left, #fdfbf2 0%, rgba(253,251,242,0.88) 16%, rgba(253,251,242,0.2) 46%, transparent 68%)' }}
        />
        {/* LTR fallback */}
        <div
          className="absolute inset-0 hidden md:block rtl:hidden"
          style={{ background: 'linear-gradient(to right, #fdfbf2 0%, rgba(253,251,242,0.88) 16%, rgba(253,251,242,0.2) 46%, transparent 68%)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 hidden md:block" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-14 flex flex-col justify-center
        min-h-[600px] md:min-h-[720px] py-16 md:py-0">
        <div className="w-full md:max-w-[500px]">

          {/* Enrollment badge */}
          <div style={animStyle(0)} className="mb-5">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
              style={{ background: 'rgba(209,250,229,0.7)', border: '1px solid rgba(52,211,153,0.35)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
              <span className="text-[11px] font-bold text-emerald-700" style={{ lineHeight: 1.3 }}>
                داخلے جاری ہیں
              </span>
            </span>
          </div>

          {/* Subtitle */}
          <p
            dir="rtl"
            style={{ ...animStyle(80), color: 'rgba(184,144,14,0.8)', lineHeight: 1.5 }}
            className="text-[12.5px] font-medium mb-4 tracking-wide"
          >
            {subtitle}
          </p>

          {/* Headline */}
          <h1 className="mb-4" style={{ lineHeight: 1.05 }}>
            {titleLines.map((line, i) => (
              <span
                key={i}
                style={{
                  ...animStyle(130 + i * 80),
                  display: 'block',
                  fontSize: 'clamp(38px, 5.8vw, 68px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                }}
              >
                {i === titleLines.length - 1 ? (
                  <span style={{
                    background: 'linear-gradient(135deg, #d4a820 0%, #b8900e 50%, #9a7509 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {line}
                  </span>
                ) : (
                  <span style={{ color: '#160f00' }}>{line}</span>
                )}
              </span>
            ))}
          </h1>

          {/* Gold decorative divider */}
          <div style={animStyle(310)} className="flex items-center gap-2 mb-5">
            <span
              className="h-[2px] w-16 rounded-full flex-shrink-0"
              style={{ background: 'linear-gradient(to right, #d4a820, rgba(212,168,32,0))' }}
            />
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: 'radial-gradient(circle, #d4a820, #9a7509)', boxShadow: '0 0 6px rgba(212,168,32,0.5)' }}
            />
            <span
              className="h-[1px] w-8 rounded-full flex-shrink-0"
              style={{ background: 'rgba(212,168,32,0.3)' }}
            />
          </div>

          {/* Description */}
          <p
            style={{ ...animStyle(380), lineHeight: 1.9 }}
            className="text-[14px] sm:text-[14.5px] text-gray-600 mb-8 max-w-[430px]"
          >
            {description}
          </p>

          {/* CTAs */}
          <div style={animStyle(460)} className="flex items-center gap-3 flex-wrap">
            <Link
              href={cta1Link}
              className="group inline-flex items-center gap-2 text-white font-bold text-[13.5px] rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{
                padding:    '14px 28px',
                background: 'linear-gradient(135deg, #c49a18 0%, #9a7509 100%)',
                boxShadow:  '0 4px 22px rgba(184,144,14,0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
                lineHeight: 1.3,
              }}
            >
              {cta1Label}
              <ArrowRight
                size={14} strokeWidth={2.5}
                className="rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-150 flex-shrink-0"
              />
            </Link>

            <Link
              href={cta2Link}
              className="inline-flex items-center font-semibold text-[13.5px] rounded-full transition-all duration-200 hover:-translate-y-0.5"
              style={{
                padding:    '14px 26px',
                color:      '#7c5d07',
                border:     '1.5px solid rgba(212,168,32,0.45)',
                background: 'rgba(253,250,242,0.9)',
                lineHeight: 1.3,
              }}
            >
              {cta2Label}
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              ...animStyle(560),
              borderTop:  '1px solid rgba(212,168,32,0.22)',
              marginTop:  '2.5rem',
              paddingTop: '1.75rem',
            }}
            className="flex items-center flex-wrap gap-y-4"
          >
            {STATS.map(({ value, label, Icon }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #fdf8e8 0%, #faefc4 100%)',
                      border:     '1px solid rgba(212,168,32,0.4)',
                      boxShadow:  '0 2px 8px rgba(184,144,14,0.12)',
                    }}
                  >
                    <Icon size={17} strokeWidth={1.5} style={{ color: '#9a7509' }} />
                  </div>
                  <div>
                    <p className="font-bold leading-none tracking-tight" style={{ fontSize: '22px', color: '#160f00' }}>
                      {value}
                    </p>
                    <p className="text-[11px] mt-1" style={{ color: '#9ca3af' }}>{label}</p>
                  </div>
                </div>
                {i < STATS.length - 1 && (
                  <div
                    className="h-9 w-px mx-5 flex-shrink-0 hidden sm:block"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(212,168,32,0.3), transparent)' }}
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
