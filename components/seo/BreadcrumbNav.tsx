import Link from 'next/link'

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
    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gray-300 rtl:rotate-180">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function BreadcrumbNav({ items, sectionLabel, sectionHref }: BreadcrumbNavProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav aria-label="بریڈ کرمب" className="flex items-center flex-wrap gap-1 text-[12.5px] text-gray-400">
          <Link href={sectionHref} className="hover:text-dq-700 transition-colors font-medium">
            {sectionLabel}
          </Link>
          {items.map((item, i) =>
            item.href ? (
              <span key={`${item.label}-${i}`} className="flex items-center gap-1">
                <ChevronSep />
                <Link href={item.href} className="hover:text-dq-700 transition-colors">
                  {item.label}
                </Link>
              </span>
            ) : (
              <span key={`${item.label}-${i}`} className="flex items-center gap-1">
                <ChevronSep />
                <span className="text-slate-700 font-medium" aria-current="page">
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
