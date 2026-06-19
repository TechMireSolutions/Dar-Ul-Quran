'use client'
import { useRef, useState, useEffect, useCallback, useId } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import ContentCard from '@/components/ui/ContentCard'
import type { CarouselItem } from '@/lib/types/ui'
import { TW_CTA_ARROW, TW_CV_AUTO, TW_EYEBROW, TW_EYEBROW_LINE, TW_SCROLLBAR_HIDE, TW_SECTION_TITLE, TW_VIEW_ALL_LINK } from '@/lib/tailwind'

type CarouselSectionProps = {
  eyebrow:       string
  title:         string
  subtitle?:     string
  items:         CarouselItem[]
  viewAllHref:   string
  viewAllLabel?: string
  bg?:           'white' | 'gray'
}

// lg card width (316px) + gap-6 (24px) — fixed step avoids layout reads in scrollBy()
const CARD_SCROLL_STEP = 340

export default function CarouselSection({
  eyebrow,
  title,
  subtitle,
  items,
  viewAllHref,
  viewAllLabel = 'سب دیکھیں',
  bg = 'white',
}: CarouselSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canLeft,  setCanLeft]  = useState(false)
  const [canRight, setCanRight] = useState(false)
  const [active,   setActive]   = useState(false)
  const headingId = useId()
  const measureRaf = useRef(0)

  const measure = useCallback(() => {
    cancelAnimationFrame(measureRaf.current)
    measureRaf.current = requestAnimationFrame(() => {
      const el = trackRef.current
      if (!el || !el.isConnected) return
      const left = el.scrollLeft
      const max = el.scrollWidth - el.clientWidth
      setCanLeft(left > 4)
      setCanRight(left < max - 4)
    })
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true)
          measure()
        }
      },
      { rootMargin: '120px' },
    )
    io.observe(el)

    el.addEventListener('scroll', measure, { passive: true })

    let resizeRaf = 0
    const onResize = () => {
      cancelAnimationFrame(resizeRaf)
      resizeRaf = requestAnimationFrame(measure)
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      io.disconnect()
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(measureRaf.current)
      cancelAnimationFrame(resizeRaf)
    }
  }, [measure, items])

  function scrollBy(dir: 'left' | 'right') {
    trackRef.current?.scrollBy({
      left: dir === 'left' ? -CARD_SCROLL_STEP : CARD_SCROLL_STEP,
      behavior: 'smooth',
    })
  }

  if (!items.length) return null

  const bgClass = bg === 'gray' ? 'bg-slate-50' : 'bg-white'

  return (
    <section aria-labelledby={headingId} className={`py-10 md:py-16 border-b border-gray-100 ${bgClass} ${TW_CV_AUTO}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7 sm:mb-10">
          <div>
            <p className={`${TW_EYEBROW} mb-2`}>
              <span className={`${TW_EYEBROW_LINE} w-6`} />
              {eyebrow}
            </p>
            <h2 id={headingId} className={TW_SECTION_TITLE}>{title}</h2>
            {subtitle && (
              <p className="text-[13.5px] text-gray-500 mt-1.5 max-w-md">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0 sm:ms-6">
            {/* Prev / Next — only wire scroll state once carousel is near viewport */}
            <div className="flex items-center gap-1.5" role="group" aria-label="کاروسل کنٹرول">
              <button
                onClick={() => scrollBy('left')}
                disabled={!active || !canLeft}
                aria-label="پچھلا"
                aria-disabled={!active || !canLeft}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center
                  transition-all duration-200
                  ${active && canLeft
                    ? 'border-gray-200 text-gray-500 hover:border-dq-500 hover:text-dq-700 hover:bg-dq-50'
                    : 'border-gray-100 text-gray-300 cursor-not-allowed'}`}
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                onClick={() => scrollBy('right')}
                disabled={!active || !canRight}
                aria-label="اگلا"
                aria-disabled={!active || !canRight}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center
                  transition-all duration-200
                  ${active && canRight
                    ? 'border-gray-200 text-gray-500 hover:border-dq-500 hover:text-dq-700 hover:bg-dq-50'
                    : 'border-gray-100 text-gray-300 cursor-not-allowed'}`}
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>

            <Link
              href={viewAllHref}
              className={TW_VIEW_ALL_LINK}
            >
              {viewAllLabel}
              <ArrowRight
                size={13}
                strokeWidth={2.5}
                className={TW_CTA_ARROW}
              />
            </Link>
          </div>
        </div>

        {/* Scroll track + edge fades */}
        <div className="relative">
          {/* Left fade */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none
              bg-gradient-to-r ${bg === 'gray' ? 'from-slate-50' : 'from-white'} to-transparent
              transition-opacity duration-200 ${active && canLeft ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Right fade */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none
              bg-gradient-to-l ${bg === 'gray' ? 'from-slate-50' : 'from-white'} to-transparent
              transition-opacity duration-200 ${active && canRight ? 'opacity-100' : 'opacity-0'}`}
          />

          <div
            ref={trackRef}
            role="region"
            aria-label={`${title} — سلائیڈر`}
            className={`flex gap-6 overflow-x-auto ${TW_SCROLLBAR_HIDE} pb-2 snap-x snap-mandatory overscroll-x-contain`}
          >
            {items.map((item) => (
              <div
                key={item.id}
                data-card
                className="shrink-0 snap-start w-[272px] sm:w-[296px] lg:w-[316px]"
              >
                <ContentCard
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  badge={item.badge}
                  ctaLabel={item.ctaLabel}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
