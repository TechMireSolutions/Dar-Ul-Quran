import type { ReactNode } from 'react'
import WebPageSchema from '@/components/seo/WebPageSchema'
import ItemListSchema from '@/components/seo/ItemListSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import { TW_CONTAINER, TW_CV_AUTO, TW_PAGE_BODY } from '@/lib/tailwind'

type ListingIndexShellProps = {
  title: string
  description?: string
  path: string
  itemListName: string
  listItems: { name: string; url: string }[]
  eyebrow: string
  pageTitle: string
  pageSubtitle: string
  heroChildren?: ReactNode
  children: ReactNode
}

export default function ListingIndexShell({
  title,
  description,
  path,
  itemListName,
  listItems,
  eyebrow,
  pageTitle,
  pageSubtitle,
  heroChildren,
  children,
}: ListingIndexShellProps) {
  return (
    <div>
      <WebPageSchema title={title} description={description} path={path} />
      <ItemListSchema name={itemListName} path={path} items={listItems} />

      <PageHeroHeader eyebrow={eyebrow} title={pageTitle} subtitle={pageSubtitle}>
        {heroChildren}
      </PageHeroHeader>

      <div className={`${TW_PAGE_BODY} min-h-[50vh] ${TW_CV_AUTO}`}>
        <div className={TW_CONTAINER}>
          {children}
        </div>
      </div>
    </div>
  )
}

export function ListingCardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {children}
    </div>
  )
}

export function ListingEmptyState({ message }: { message: string }) {
  return <p className="text-center text-gray-400 text-[15px] py-24">{message}</p>
}
