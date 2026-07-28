import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  TW_CTA_ARROW,
  TW_EYEBROW,
  TW_EYEBROW_LINE,
  TW_PAGE_SUBTITLE,
  TW_SECTION_HEADER_ROW,
  TW_SECTION_TITLE,
  TW_SECTION_TITLE_COMPACT,
  TW_VIEW_ALL_LINK,
} from '@/lib/tailwind'

type SectionHeaderRowProps = {
  eyebrow: string
  title: string
  titleId?: string
  subtitle?: string | null
  /** Compact H2 for denser homepage blocks */
  compact?: boolean
  viewAllHref?: string
  viewAllLabel?: string
  /** Extra controls beside view-all (e.g. carousel arrows) */
  actions?: ReactNode
}

export default function SectionHeaderRow({
  eyebrow,
  title,
  titleId,
  subtitle,
  compact = false,
  viewAllHref,
  viewAllLabel = 'سب دیکھیں',
  actions,
}: SectionHeaderRowProps) {
  const titleClass = compact ? TW_SECTION_TITLE_COMPACT : TW_SECTION_TITLE

  return (
    <div className={TW_SECTION_HEADER_ROW}>
      <div>
        <p className={`${TW_EYEBROW} mb-2`}>
          <span className={TW_EYEBROW_LINE} />
          {eyebrow}
        </p>
        <h2 id={titleId} className={titleClass}>
          {title}
        </h2>
        {subtitle && (
          <p className={`${TW_PAGE_SUBTITLE} mt-1.5 max-w-md`}>{subtitle}</p>
        )}
      </div>

      {(viewAllHref || actions) && (
        <div className="flex items-center gap-3 shrink-0 sm:ms-6">
          {actions}
          {viewAllHref && (
            <Link href={viewAllHref} className={TW_VIEW_ALL_LINK}>
              {viewAllLabel}
              <ArrowRight size={13} strokeWidth={2.5} className={TW_CTA_ARROW} />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
