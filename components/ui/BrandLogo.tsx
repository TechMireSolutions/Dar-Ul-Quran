import Image from 'next/image'
import Link from 'next/link'
import { PATHS } from '@/lib/paths'
import { TW_BRAND_LOGO_FALLBACK, TW_BRAND_LOGO_RING } from '@/lib/tailwind'

type BrandLogoVariant = 'header' | 'footer' | 'drawer'

type BrandLogoProps = {
  siteName: string
  logoUrl?: string | null
  variant?: BrandLogoVariant
  onNavigate?: () => void
  titleId?: string
  nameClassName?: string
  className?: string
}

const VARIANT = {
  header: {
    box: 'w-[42px] h-[42px]',
    px: 42,
    sizes: '42px',
    fallbackText: 'text-lg',
    nameDefault: 'font-bold text-[17px] text-white tracking-normal hidden md:block',
  },
  footer: {
    box: 'w-10 h-10 sm:w-[52px] sm:h-[52px]',
    px: 52,
    sizes: '(min-width: 640px) 52px, 40px',
    fallbackText: 'text-lg sm:text-xl',
    nameDefault: 'font-bold text-[16px] sm:text-[18px] text-white tracking-normal',
  },
  drawer: {
    box: 'size-10',
    px: 40,
    sizes: '40px',
    fallbackText: 'text-lg',
    nameDefault: 'truncate font-bold text-[16px] text-slate-900 tracking-normal',
  },
} as const

/** Shared site mark + name link (header, footer, mobile drawer). */
export default function BrandLogo({
  siteName,
  logoUrl,
  variant = 'header',
  onNavigate,
  titleId,
  nameClassName,
  className,
}: BrandLogoProps) {
  const v = VARIANT[variant]
  const mark = siteName.trim().charAt(0) || 'د'

  return (
    <Link
      href={PATHS.home}
      aria-label={siteName}
      onClick={onNavigate}
      className={`group inline-flex min-h-11 min-w-0 items-center gap-2.5 shrink-0 ${className ?? ''}`}
    >
      <div className={`${v.box} ${TW_BRAND_LOGO_RING}`}>
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt=""
            width={v.px}
            height={v.px}
            sizes={v.sizes}
            className="object-cover w-full h-full"
            {...(variant === 'footer' ? { loading: 'lazy' as const } : {})}
          />
        ) : (
          <div className={`${TW_BRAND_LOGO_FALLBACK} ${v.fallbackText}`} aria-hidden="true">
            {mark}
          </div>
        )}
      </div>
      <span id={titleId} className={nameClassName ?? v.nameDefault}>
        {siteName}
      </span>
    </Link>
  )
}
