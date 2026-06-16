import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImageAsset } from '@/sanity/lib/image'

type Props = {
  image: SanityImageAsset | null | undefined
  /** Target render width in px — drives CDN URL generation and srcset */
  width: number
  /** Target render height in px */
  height: number
  /** true for above-the-fold images — injects <link rel="preload"> and skips lazy load */
  priority?: boolean
  className?: string
  /**
   * Responsive sizes string matching your CSS breakpoints.
   * Default covers a full-width image on mobile, half on tablet, third on desktop.
   */
  sizes?: string
  quality?: number
}

export default function SanityImage({
  image,
  width,
  height,
  priority = false,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  quality = 85,
}: Props) {
  if (!image?.asset) return null

  const lqip = image.asset.metadata?.lqip
  const dimensions = image.asset.metadata?.dimensions

  const src = urlFor(image)
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format') // WebP for supporting browsers, JPEG fallback
    .quality(quality)
    .url()

  // Use Sanity's intrinsic dimensions when available to avoid layout shift
  const finalWidth = dimensions?.width ?? width
  const finalHeight = dimensions?.height ?? height

  return (
    <Image
      src={src}
      alt={image.alt ?? ''}
      width={finalWidth}
      height={finalHeight}
      priority={priority}
      placeholder={lqip ? 'blur' : 'empty'}
      blurDataURL={lqip}
      sizes={sizes}
      quality={quality}
      className={className}
      decoding="async"
    />
  )
}
