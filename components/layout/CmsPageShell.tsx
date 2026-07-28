import type { ReactNode } from 'react'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'

type CmsPageShellProps = {
  schemaTitle: string
  schemaDescription?: string
  path: string
  eyebrow: string
  title: string
  subtitle?: string | null
  maxWidth?: '3xl' | '5xl' | '6xl' | '7xl'
  align?: 'start' | 'center'
  topContent?: ReactNode
  children: ReactNode
}

/** Shared chrome for flat CMS pages (about / contact / donate). */
export default function CmsPageShell({
  schemaTitle,
  schemaDescription,
  path,
  eyebrow,
  title,
  subtitle,
  maxWidth,
  align,
  topContent,
  children,
}: CmsPageShellProps) {
  return (
    <div>
      <WebPageSchema title={schemaTitle} description={schemaDescription} path={path} />
      <PageHeroHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        maxWidth={maxWidth}
        align={align}
        topContent={topContent}
      />
      {children}
    </div>
  )
}
