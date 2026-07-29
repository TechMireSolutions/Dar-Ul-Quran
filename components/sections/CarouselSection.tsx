'use client'
import { useRef, useState, useEffect, useId } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ContentCard from '@/components/ui/ContentCard'
import SectionHeaderRow from '@/components/ui/SectionHeaderRow'
import type { CarouselItem } from '@/lib/types/ui'
import { DEFAULT_VIEW_ALL_LABEL } from '@/lib/seo'
import { isMobileViewport } from '@/lib/viewport'
import { TW_CAROUSEL_NAV_BTN, TW_CAROUSEL_NAV_BTN_OFF, TW_CAROUSEL_NAV_BTN_ON, TW_CONTAINER, TW_CV_AUTO, TW_SCROLLBAR_HIDE } from '@/lib/tailwind'

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
  viewAllLabel = DEFAULT_VIEW_ALL_LABEL,
  bg = 'white',
}: CarouselSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const startSentinelRef = useRef<HTMLDivElement>(null)
  const endSentinelRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(() => items.length > 1)
  const [active, setActive] = useState(false)
  const headingId = useId()

  // Mobile: native touch scroll only — no observers (IO still forces layout on narrow viewports).
  useEffect(() => {
    if (isMobileViewport()) return

    const el = trackRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setActive(true)
      },
      { rootMargin: '120px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [items.length])

  // Edge sentinels replace scrollWidth / scrollLeft reads for prev/next button state (desktop only).
  useEffect(() => {
    if (!active || isMobileViewport()) return

    const track = trackRef.current
    const start = startSentinelRef.current
    const end = endSentinelRef.current
    if (!track || !start || !end) return

    const edgeIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === start) setCanPrev(!entry.isIntersecting)
          if (entry.target === end) setCanNext(!entry.isIntersecting)
        }
      },
      { root: track, threshold: 0.99 },
    )

    edgeIo.observe(start)
    edgeIo.observe(end)
    return () => edgeIo.disconnect()
  }, [active, items.length])

  /** Prev/next relative to flex start — flips physical `left` under `dir=rtl`. */
  function scrollByDir(dir: 'prev' | 'next') {
    const el = trackRef.current
    if (!el) return
    const rtl = getComputedStyle(el).direction === 'rtl'
    const towardEnd = dir === 'next'
    const delta = (rtl ? !towardEnd : towardEnd) ? CARD_SCROLL_STEP : -CARD_SCROLL_STEP
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  if (!items.length) return null

  const bgClass = bg === 'gray' ? 'bg-slate-50' : 'bg-white'

  return (
    <section aria-labelledby={headingId} className={`py-10 md:py-16 border-b border-gray-100 ${bgClass} ${TW_CV_AUTO}`}>
      <div className={TW_CONTAINER}>

        <SectionHeaderRow
          eyebrow={eyebrow}
          title={title}
          titleId={headingId}
          subtitle={subtitle}
          viewAllHref={viewAllHref}
          viewAllLabel={viewAllLabel}
          actions={
            <div className="hidden md:flex items-center gap-1.5" role="group" aria-label="کاروسل کنٹرول">
              <button
                type="button"
                onClick={() => scrollByDir('prev')}
                disabled={!active || !canPrev}
                aria-label="پچھلا"
                aria-disabled={!active || !canPrev}
                className={`${TW_CAROUSEL_NAV_BTN} ${active && canPrev ? TW_CAROUSEL_NAV_BTN_ON : TW_CAROUSEL_NAV_BTN_OFF}`}
              >
                <ChevronLeft size={16} strokeWidth={2} className="rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scrollByDir('next')}
                disabled={!active || !canNext}
                aria-label="اگلا"
                aria-disabled={!active || !canNext}
                className={`${TW_CAROUSEL_NAV_BTN} ${active && canNext ? TW_CAROUSEL_NAV_BTN_ON : TW_CAROUSEL_NAV_BTN_OFF}`}
              >
                <ChevronRight size={16} strokeWidth={2} className="rtl:rotate-180" />
              </button>
            </div>
          }
        />

        {/* Scroll track + edge fades */}
        <div className="relative">
          <div
            className={`absolute start-0 top-0 bottom-0 w-10 z-10 pointer-events-none hidden md:block
              ltr:bg-gradient-to-r rtl:bg-gradient-to-l ${bg === 'gray' ? 'from-slate-50' : 'from-white'} to-transparent
              transition-opacity duration-200 ${active && canPrev ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            className={`absolute end-0 top-0 bottom-0 w-10 z-10 pointer-events-none hidden md:block
              ltr:bg-gradient-to-l rtl:bg-gradient-to-r ${bg === 'gray' ? 'from-slate-50' : 'from-white'} to-transparent
              transition-opacity duration-200 ${active && canNext ? 'opacity-100' : 'opacity-0'}`}
          />

          <div
            ref={trackRef}
            role="region"
            aria-label={`${title} — سلائیڈر`}
            className={`flex gap-6 overflow-x-auto ${TW_SCROLLBAR_HIDE} pb-2 snap-x snap-mandatory overscroll-x-contain touch-pan-x`}
          >
            <div
              ref={startSentinelRef}
              className="shrink-0 w-px self-stretch pointer-events-none"
              aria-hidden="true"
            />
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
            <div
              ref={endSentinelRef}
              className="shrink-0 w-px self-stretch pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
