'use client'

import dynamic from 'next/dynamic'
import type { ComponentProps } from 'react'

const WhatsAppButtonInner = dynamic(() => import('./WhatsAppButton'), { ssr: false })

type WhatsAppButtonLazyProps = ComponentProps<typeof WhatsAppButtonInner>

export default function WhatsAppButtonLazy(props: WhatsAppButtonLazyProps) {
  return <WhatsAppButtonInner {...props} />
}
