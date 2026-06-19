import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { TW_BADGE_SM, TW_CARD_LINK, TW_CTA_ARROW } from '@/lib/tailwind'

type ContentCardProps = {
  image?:       string | null
  title:        string
  description?: string | null
  href:         string
  ctaLabel?:    string
  badge?:       string | null
  active?:      boolean
}

export default function ContentCard({
  image,
  title,
  description,
  href,
  ctaLabel = 'مزید جانیں',
  badge,
  active = false,
}: ContentCardProps) {
  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white
        border transition-all duration-300 ease-out
        hover:-translate-y-2
        ${active
          ? 'shadow-gold-lg border-dq-200/80 hover:shadow-gold-glow'
          : 'shadow-card border-gray-100 hover:shadow-card-hover hover:border-dq-100'
        }`}
    >
      {/* Gold top accent stripe — slides in on hover */}
      <div className={`absolute top-0 inset-x-0 h-[3px] z-10 transition-transform duration-300 origin-inline-end
        bg-gradient-to-r from-dq-400 via-dq-500 to-dq-300
        ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-inline-start'}`} />

      {/* Image — aria-hidden to avoid duplicate tab stop with the title link below */}
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden shrink-0">
        <div className="relative w-full aspect-[3/2] bg-slate-100">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              loading="lazy"
              decoding="async"
              quality={75}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.07]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dq-50 via-dq-50 to-slate-100">
              <span className="text-5xl opacity-20 select-none transition-transform duration-300 group-hover:scale-110" aria-hidden="true">📖</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-dq-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Corner arrow that appears on hover */}
          <div className="absolute top-3 start-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center
            opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
            transition-all duration-300 shadow-sm">
            <ArrowUpRight size={12} strokeWidth={2.5} className="text-dq-700" />
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-5">
        {badge && (
          <span className={`${TW_BADGE_SM} mb-3`}>
            {badge}
          </span>
        )}

        <h3 className="font-semibold text-slate-900 text-[15px] leading-snug mb-2 line-clamp-2">
          <Link href={href} className="hover:text-dq-700 transition-colors duration-150">
            {title}
          </Link>
        </h3>

        {description && (
          <p className="text-[12.5px] text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-4">
            {description}
          </p>
        )}

        {/* CTA */}
        <Link href={href} className={TW_CARD_LINK}>
          {ctaLabel}
          <ArrowUpRight
            size={12}
            strokeWidth={2.5}
            className={`${TW_CTA_ARROW} group-hover/cta:-translate-y-0.5`}
          />
        </Link>
      </div>
    </div>
  )
}
