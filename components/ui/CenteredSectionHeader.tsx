import type { ReactNode } from 'react'
import {
  TW_EYEBROW,
  TW_EYEBROW_LINE,
  TW_PAGE_SUBTITLE,
  TW_SECTION_HEADER_CENTER,
  TW_SECTION_HEADER_CENTER_SM,
  TW_SECTION_TITLE,
  TW_SECTION_TITLE_COMPACT,
} from '@/lib/tailwind'

type CenteredSectionHeaderProps = {
  title: string
  eyebrow?: string
  subtitle?: string | null
  /** mb-10 instead of mb-12 */
  tight?: boolean
  compact?: boolean
  /** Extra classes on the H2 (e.g. text-white) */
  titleClassName?: string
  /** Content above the title (icons, chips) */
  topContent?: ReactNode
}

export default function CenteredSectionHeader({
  title,
  eyebrow,
  subtitle,
  tight = false,
  compact = false,
  titleClassName = '',
  topContent,
}: CenteredSectionHeaderProps) {
  const titleClass = compact ? TW_SECTION_TITLE_COMPACT : TW_SECTION_TITLE

  return (
    <div className={tight ? TW_SECTION_HEADER_CENTER_SM : TW_SECTION_HEADER_CENTER}>
      {topContent}
      {eyebrow && (
        <p className={`${TW_EYEBROW} justify-center mb-2`}>
          <span className={TW_EYEBROW_LINE} />
          {eyebrow}
        </p>
      )}
      <h2 className={`${titleClass} ${titleClassName}`.trim()}>{title}</h2>
      {subtitle && (
        <p className={`${TW_PAGE_SUBTITLE} mt-1.5 max-w-md mx-auto`}>{subtitle}</p>
      )}
    </div>
  )
}
