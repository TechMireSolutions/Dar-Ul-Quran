import Link from 'next/link'
import { TW_CONTAINER, TW_TEXT_LINK_MUTED } from '@/lib/tailwind'

type BreadcrumbItem = {
  label: string
  href?: string
}

type BreadcrumbNavProps = {
  items: BreadcrumbItem[]
  sectionLabel: string
  sectionHref: string
}

function ChevronSep() {
  return (
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gray-300 rtl:rotate-180 shrink-0">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function BreadcrumbNav({ items, sectionLabel, sectionHref }: BreadcrumbNavProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div className={`${TW_CONTAINER} py-1 sm:py-2`}>
        <nav aria-label="بریڈ کرمب" className="flex items-center flex-wrap gap-x-0.5 gap-y-1 text-[12.5px] text-gray-400">
          <Link href={sectionHref} className={`${TW_TEXT_LINK_MUTED} font-medium`}>
            {sectionLabel}
          </Link>
          {items.map((item, i) =>
            item.href ? (
              <span key={`${item.label}-${i}`} className="flex items-center gap-0.5">
                <ChevronSep />
                <Link href={item.href} className={TW_TEXT_LINK_MUTED}>
                  {item.label}
                </Link>
              </span>
            ) : (
              <span key={`${item.label}-${i}`} className="flex items-center gap-0.5">
                <ChevronSep />
                <span className="inline-flex min-h-11 items-center px-1.5 text-slate-700 dark:text-slate-200 font-medium transition-colors" aria-current="page">
                  {item.label}
                </span>
              </span>
            ),
          )}
        </nav>
      </div>
    </div>
  )
}
