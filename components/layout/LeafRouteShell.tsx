import type { ReactNode } from 'react'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import WebPageSchema from '@/components/seo/WebPageSchema'

type LeafRouteShellProps = {
  schemaTitle: string
  schemaDescription: string
  path: string
  sectionLabel: string
  sectionHref: string
  breadcrumbItems: Array<{ label: string; href?: string }>
  /** CourseSchema / ServiceSchema (already constructed by the page). */
  schema: ReactNode
  children: ReactNode
}

/** Shared catch-all leaf chrome: WebPage JSON-LD + breadcrumbs + body. */
export default function LeafRouteShell({
  schemaTitle,
  schemaDescription,
  path,
  sectionLabel,
  sectionHref,
  breadcrumbItems,
  schema,
  children,
}: LeafRouteShellProps) {
  return (
    <div>
      <WebPageSchema title={schemaTitle} description={schemaDescription} path={path} />
      {schema}
      <BreadcrumbNav
        sectionLabel={sectionLabel}
        sectionHref={sectionHref}
        items={breadcrumbItems}
      />
      {children}
    </div>
  )
}
