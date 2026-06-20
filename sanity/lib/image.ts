import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function ogImageUrl(source: SanityImageSource): string {
  return urlFor(source).width(1200).height(630).fit('crop').auto('format').url()
}

export function cardImageUrl(source: SanityImageSource): string {
  return urlFor(source).width(600).height(450).url()
}

export function carouselImageUrl(source: SanityImageSource): string {
  return urlFor(source).width(480).height(360).auto('format').quality(75).url()
}

/** Homepage hero LCP — desktop only (hidden below md). */
const LCP_HERO_WIDTHS = [640, 828, 1200] as const

export function lcpHeroImageProps(source: SanityImageSource) {
  const srcSet = LCP_HERO_WIDTHS.map((w) => {
    const h = Math.round(w * (552 / 828))
    const url = urlFor(source).width(w).height(h).fit('crop').auto('format').quality(70).url()
    return `${url} ${w}w`
  }).join(', ')

  const src = urlFor(source).width(828).height(552).fit('crop').auto('format').quality(70).url()

  return {
    src,
    srcSet,
    sizes: '(min-width: 768px) 58vw, 1px',
    preloadHref: src,
  }
}

/** Leaf page hero background (full-width, low opacity). */
export function leafHeroImageUrl(source: SanityImageSource): string {
  return urlFor(source).width(1200).height(600).fit('crop').auto('format').quality(70).url()
}

/** Article inline featured image (below H1). */
export function articleFeaturedImageUrl(source: SanityImageSource): string {
  return urlFor(source).width(900).height(500).fit('crop').auto('format').quality(80).url()
}

// Typed image shape for use with SanityImage component.
// Queries must expand asset->{ metadata { lqip, dimensions } } to enable blur placeholder.
export type SanityImageAsset = {
  asset?: {
    _ref?: string
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: { width: number; height: number; aspectRatio: number }
    }
  }
  alt?: string
  hotspot?: { x: number; y: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}
