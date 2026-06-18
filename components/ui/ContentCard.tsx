import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface ContentCardProps {
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
          ? 'shadow-[0_4px_24px_rgba(184,144,14,0.16)] border-dq-200/80 hover:shadow-[0_12px_36px_rgba(184,144,14,0.22)]'
          : 'shadow-[0_1px_4px_rgba(0,0,0,0.06)] border-gray-100 hover:shadow-[0_12px_36px_rgba(0,0,0,0.1)] hover:border-dq-100'
        }`}
    >
      {/* Gold top accent stripe — slides in on hover */}
      <div className={`absolute top-0 inset-x-0 h-[3px] z-10 transition-transform duration-300 origin-right
        bg-gradient-to-r from-dq-400 via-dq-500 to-dq-300
        ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-hover:origin-left'}`} />

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
          <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center
            opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
            transition-all duration-300 shadow-sm">
            <ArrowUpRight size={12} strokeWidth={2.5} className="text-dq-700" />
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 px-4 pt-4 pb-5">
        {badge && (
          <span className="w-fit text-[10px] font-bold uppercase tracking-[0.12em] text-dq-700 bg-dq-50 border border-dq-100/80 rounded-full px-2.5 py-0.5 mb-3
            transition-colors duration-200 group-hover:bg-dq-100 group-hover:border-dq-200">
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
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-dq-700
            py-2 transition-all duration-200 group/cta
            relative after:absolute after:bottom-0 after:right-0 after:h-px after:w-0
            after:bg-dq-400 after:transition-all after:duration-300 hover:after:w-full"
        >
          {ctaLabel}
          <ArrowUpRight
            size={12}
            strokeWidth={2.5}
            className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  )
}
