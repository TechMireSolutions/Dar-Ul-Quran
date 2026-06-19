import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { TW_RICH_TEXT_LG, TW_RICH_TEXT_SM } from '@/lib/tailwind'

type RichTextBodyProps = {
  value: PortableTextBlock[]
  size?: 'sm' | 'lg'
  className?: string
}

export default function RichTextBody({ value, size = 'lg', className }: RichTextBodyProps) {
  if (!value?.length) return null

  const proseClass = size === 'sm' ? TW_RICH_TEXT_SM : TW_RICH_TEXT_LG
  const classes = className ? `${proseClass} ${className}` : proseClass

  return (
    <div className={classes}>
      <PortableText value={value} />
    </div>
  )
}
