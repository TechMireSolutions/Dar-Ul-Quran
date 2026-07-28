import type { ReactNode } from 'react'
import Image from 'next/image'
import {
  TW_CONTAINER_LEAF_HERO,
  TW_HERO_TITLE,
  TW_LEAF_HERO_BODY,
  TW_LEAF_HERO_OVERLAY,
  TW_LEAF_HERO_SUBTITLE,
} from '@/lib/tailwind'

type LeafHeroProps = {
  title: string
  imageUrl?: string | null
  chips?: ReactNode
  subtitle?: string | null
  body?: string | null
  cta?: ReactNode
  /** Taller flex-centered shell (services) */
  tall?: boolean
}

export default function LeafHero({
  title,
  imageUrl,
  chips,
  subtitle,
  body,
  cta,
  tall = false,
}: LeafHeroProps) {
  return (
    <section
      className={`relative bg-dq-900 overflow-hidden ${
        tall ? 'min-h-[340px] flex items-center justify-center' : ''
      }`}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18]"
          priority
          fetchPriority="high"
        />
      )}
      <div className={TW_LEAF_HERO_OVERLAY} />

      <div className={TW_CONTAINER_LEAF_HERO}>
        {chips}
        <h1 className={`${TW_HERO_TITLE} mb-5`}>{title}</h1>
        {subtitle && (
          <p className={`${TW_LEAF_HERO_SUBTITLE} ${body ? 'mb-4 font-semibold text-white/90' : 'mb-10'}`}>
            {subtitle}
          </p>
        )}
        {body && (
          <p className={TW_LEAF_HERO_BODY}>
            {body}
          </p>
        )}
        {cta}
      </div>
    </section>
  )
}
