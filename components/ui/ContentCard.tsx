import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { DEFAULT_CARD_CTA } from '@/lib/seo'
import { TW_BADGE_SM, TW_CARD_LINK, TW_CTA_ARROW } from '@/lib/tailwind'

type ContentCardProps = {
  image?:       string | null
  title:        string
  description?: string | null
  href:         string
  ctaLabel?:    string
  badge?:       string | null
  active?:      boolean
  imageAlt?:    string
}

export default function ContentCard({
  image,
  title,
  description,
  href,
  ctaLabel = DEFAULT_CARD_CTA,
  badge,
  active = false,
  imageAlt,
}: ContentCardProps) {
  return (
    <article
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-slate-800
        border transition-all duration-300 ease-out
        hover:-translate-y-2 motion-reduce:hover:translate-y-0
        ${active
          ? 'shadow-gold-lg border-dq-200/80 hover:shadow-gold-glow'
          : 'shadow-card border-gray-100 dark:border-slate-700 hover:shadow-card-hover hover:border-dq-100 dark:hover:border-slate-600'
        }`}
    >
      {/* Gold top accent stripe — slides in on hover */}
      <div className={`absolute top-0 inset-x-0 h-[3px] z-10 transition-transform duration-300 origin-inline-end pointer-events-none
        ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-dq-400 via-dq-500 to-dq-300
        ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-inline-start'}`} />

      {/* Single primary link wraps media + title for one keyboard stop */}
      <Link
        href={href}
        className="flex flex-col flex-1 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50 focus-visible:ring-offset-2"
      >
        <div className="block overflow-hidden shrink-0">
          <div className="relative w-full aspect-[3/2] bg-slate-100 dark:bg-slate-900/50">
            {image ? (
              <Image
                src={image}
                alt={imageAlt?.trim() ?? ''}
                fill
                loading="lazy"
                decoding="async"
                quality={75}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07] motion-reduce:group-hover:scale-100"
              />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-dq-50 via-dq-100/40 to-slate-100 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900"
                aria-hidden="true"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-dq-400/50 transition-transform duration-300 group-hover:scale-110"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="M8 7h8M8 11h6" />
                </svg>
                <span className="text-[11px] font-medium text-dq-600/45 tracking-normal">تصویر جلد</span>
              </div>
            )}
            <div className="absolute inset-0 bg-dq-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:opacity-0" />
          </div>
        </div>

        <div className="flex flex-col flex-1 px-4 pt-4 pb-5">
          {badge && (
            <span className={`${TW_BADGE_SM} mb-3`}>
              {badge}
            </span>
          )}

          <h3 className="font-semibold text-slate-900 dark:text-white text-[15px] leading-urdu-tight mb-2 line-clamp-2 group-hover:text-dq-700 dark:group-hover:text-dq-400 transition-colors duration-150">
            {title}
          </h3>

          {description && (
            <p className="text-[12.5px] text-gray-500 dark:text-slate-400 leading-urdu line-clamp-2 flex-1 mb-4">
              {description}
            </p>
          )}

          <span className={TW_CARD_LINK} aria-hidden="true">
            {ctaLabel}
            <ArrowRight
              size={12}
              strokeWidth={2.5}
              className={TW_CTA_ARROW}
            />
          </span>
        </div>
      </Link>
    </article>
  )
}
