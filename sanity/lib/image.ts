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
