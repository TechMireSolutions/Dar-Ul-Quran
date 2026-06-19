import type { PortableTextBlock } from '@portabletext/types'
import RichTextBody from '@/components/content/RichTextBody'

import { TW_CONTAINER_NARROW } from '@/lib/tailwind'

type PortableTextSectionProps = {
  value: PortableTextBlock[]
}

export default function PortableTextSection({ value }: PortableTextSectionProps) {
  if (!value.length) return null

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className={TW_CONTAINER_NARROW}>
        <RichTextBody value={value} />
      </div>
    </section>
  )
}
