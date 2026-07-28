import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '@/sanity/lib/image'
import { TW_RICH_TEXT_LG, TW_RICH_TEXT_SM } from '@/lib/tailwind'

type RichTextBodyProps = {
  value: PortableTextBlock[]
  size?: 'sm' | 'lg'
  className?: string
}

type PortableImageValue = {
  asset?: { _ref?: string; _type?: string }
  alt?: string
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value?: PortableImageValue }) => {
      if (!value?.asset) return null
      const alt = value.alt?.trim() ?? ''
      const src = urlFor(value as SanityImageSource)
        .width(900)
        .auto('format')
        .quality(80)
        .url()

      return (
        <figure className="my-6">
          <Image
            src={src}
            alt={alt}
            width={900}
            height={560}
            sizes="(max-width: 768px) 100vw, 720px"
            className="h-auto w-full rounded-xl"
            loading="lazy"
            decoding="async"
          />
        </figure>
      )
    },
  },
}

export default function RichTextBody({ value, size = 'lg', className }: RichTextBodyProps) {
  if (!value?.length) return null

  const proseClass = size === 'sm' ? TW_RICH_TEXT_SM : TW_RICH_TEXT_LG
  const classes = className ? `${proseClass} ${className}` : proseClass

  return (
    <div className={classes}>
      <PortableText value={value} components={portableTextComponents} />
    </div>
  )
}
