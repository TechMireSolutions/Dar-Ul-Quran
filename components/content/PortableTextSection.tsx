import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { PROSE_LEAF_CLASSES } from '@/lib/prose'

type PortableTextSectionProps = {
  value: PortableTextBlock[]
}

export default function PortableTextSection({ value }: PortableTextSectionProps) {
  if (!value.length) return null

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className={`max-w-3xl mx-auto px-4 sm:px-6 ${PROSE_LEAF_CLASSES}`}>
        <PortableText value={value} />
      </div>
    </section>
  )
}
