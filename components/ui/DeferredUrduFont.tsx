'use client'

import { useEffect } from 'react'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=optional'

/** Loads Urdu webfont after idle — keeps ~250 KiB off the LCP critical path. */
export default function DeferredUrduFont() {
  useEffect(() => {
    const id = 'deferred-urdu-font'
    if (document.getElementById(id)) return

    const load = () => {
      const link = document.createElement('link')
      link.id = id
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)
    }

    const schedule = typeof requestIdleCallback === 'function'
      ? (fn: () => void) => requestIdleCallback(fn, { timeout: 4000 })
      : (fn: () => void) => { window.setTimeout(fn, 1500) }

    schedule(load)
  }, [])

  return null
}
