'use client'
import { useEffect, useRef, type ReactNode } from 'react'

type Animation = 'up' | 'fade' | 'scale' | 'left' | 'right'

interface RevealProps {
  children: ReactNode
  className?: string
  animation?: Animation
  delay?: number
  once?: boolean
}

let sharedObserver: IntersectionObserver | null = null
const observed = new WeakMap<Element, { once: boolean }>()

function getSharedObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('rv-visible')
            const meta = observed.get(entry.target)
            if (meta?.once) sharedObserver?.unobserve(entry.target)
          } else {
            const meta = observed.get(entry.target)
            if (meta && !meta.once) entry.target.classList.remove('rv-visible')
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' },
    )
  }
  return sharedObserver
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
}

export default function Reveal({
  children,
  className = '',
  animation = 'up',
  delay = 0,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (delay) el.style.transitionDelay = `${delay}ms`

    if (prefersReducedMotion() || isMobileViewport()) {
      el.classList.add('rv-visible')
      return
    }

    const observer = getSharedObserver()
    if (!observer) {
      el.classList.add('rv-visible')
      return
    }

    observed.set(el, { once })
    observer.observe(el)
    return () => {
      observer.unobserve(el)
      observed.delete(el)
    }
  }, [delay, once])

  return (
    <div ref={ref} className={`rv rv-${animation} ${className}`}>
      {children}
    </div>
  )
}

interface StaggerProps {
  children: ReactNode[]
  className?: string
  animation?: Animation
  baseDelay?: number
  step?: number
  itemClass?: string
}

export function Stagger({
  children,
  className = '',
  animation = 'up',
  baseDelay = 0,
  step = 90,
  itemClass = '',
}: StaggerProps) {
  return (
    <div className={className}>
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <Reveal
          key={i}
          animation={animation}
          delay={baseDelay + i * step}
          className={itemClass}
        >
          {child}
        </Reveal>
      ))}
    </div>
  )
}
