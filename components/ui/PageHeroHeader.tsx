import type { ReactNode } from 'react'
import Reveal from '@/components/ui/Reveal'
import { TW_EYEBROW, TW_EYEBROW_LINE, TW_PAGE_TITLE } from '@/lib/tailwind'

const MAX_WIDTH: Record<string, string> = {
  '3xl': 'max-w-3xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

type PageHeroHeaderProps = {
  eyebrow: string
  title: string
  subtitle?: string | null
  maxWidth?: keyof typeof MAX_WIDTH
  align?: 'start' | 'center'
  topContent?: ReactNode
  children?: ReactNode
}

export default function PageHeroHeader({
  eyebrow,
  title,
  subtitle,
  maxWidth = '7xl',
  align = 'start',
  topContent,
  children,
}: PageHeroHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : ''

  return (
    <div className="bg-white border-b border-gray-100">
      <Reveal
        animation="up"
        className={`${MAX_WIDTH[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${alignClass}`}
      >
        <div>
          {topContent}
          <p
            className={`${TW_EYEBROW} mb-3 ${
              align === 'center' ? 'justify-center' : ''
            }`}
          >
            <span className={TW_EYEBROW_LINE} />
            {eyebrow}
            {align === 'center' && <span className={TW_EYEBROW_LINE} />}
          </p>
          <h1 className={`${TW_PAGE_TITLE} mb-2`}>
            {title}
          </h1>
          {subtitle && (
            <p
              className={`text-[13.5px] text-gray-500 leading-relaxed ${
                align === 'center' ? 'mx-auto' : 'max-w-xl'
              }`}
            >
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </Reveal>
    </div>
  )
}
