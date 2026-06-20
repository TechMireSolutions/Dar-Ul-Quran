'use client'

import { useEffect, useRef, useState } from 'react'

type TurnstileFieldProps = {
  siteKey: string
  onToken: (token: string | null) => void
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string
          callback: (token: string) => void
          'expired-callback': () => void
        },
      ) => string
      remove: (widgetId: string) => void
    }
  }
}

const SCRIPT_ID = 'cf-turnstile-script'

export default function TurnstileField({ siteKey, onToken }: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | undefined>(undefined)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { rootMargin: '120px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return

    let cancelled = false

    function renderWidget() {
      if (cancelled || !containerRef.current || !window.turnstile) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token) => onToken(token),
        'expired-callback': () => onToken(null),
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.onload = () => renderWidget()
      document.head.appendChild(script)
    } else {
      const interval = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(interval)
          renderWidget()
        }
      }, 100)
    }

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
  }, [visible, siteKey, onToken])

  return <div ref={containerRef} className="flex justify-center min-h-[65px]" />
}
