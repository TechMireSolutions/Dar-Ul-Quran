'use client'
import { useEffect, useRef, ReactNode } from 'react'

type Animation = 'up' | 'fade' | 'scale' | 'left' | 'right'

interface RevealProps {
  children:    ReactNode
  className?:  string
  animation?:  Animation
  delay?:      number
  threshold?:  number
  once?:       boolean
}

export default function Reveal({
  children,
  className  = '',
  animation  = 'up',
  delay      = 0,
  threshold  = 0.12,
  once       = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('rv-visible')
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.classList.remove('rv-visible')
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold, once])

  return (
    <div ref={ref} className={`rv rv-${animation} ${className}`}>
      {children}
    </div>
  )
}

/** Stagger a list — each child gets an increasing delay */
interface StaggerProps {
  children:   ReactNode[]
  className?: string
  animation?: Animation
  baseDelay?: number
  step?:      number
  threshold?: number
  itemClass?: string
}

export function Stagger({
  children,
  className  = '',
  animation  = 'up',
  baseDelay  = 0,
  step       = 90,
  threshold  = 0.08,
  itemClass  = '',
}: StaggerProps) {
  return (
    <div className={className}>
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <Reveal key={i} animation={animation} delay={baseDelay + i * step} threshold={threshold} className={itemClass}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
