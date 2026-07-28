import type { ReactNode } from 'react'
import Link from 'next/link'
import ContentCard from '@/components/ui/ContentCard'
import ItemListSchema from '@/components/seo/ItemListSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import Reveal from '@/components/ui/Reveal'
import WebPageSchema from '@/components/seo/WebPageSchema'
import { HOME_LABEL, PATHS } from '@/lib/paths'
import { TW_BODY_MUTED, TW_BTN_PRIMARY, TW_CARD_GRID, TW_CONTAINER, TW_CV_AUTO, TW_PAGE_BODY } from '@/lib/tailwind'

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
  return <div className={TW_CARD_GRID}>{children}</div>
}

export type ListingCardItem = {
  id: string
  href: string
  title: string
  description?: string | null
  image?: string | null
  badge?: string | null
  ctaLabel: string
}

/** Shared Reveal + ContentCard grid for listing indexes. */
export function ListingContentCards({ items }: { items: ListingCardItem[] }) {
  return (
    <ListingCardGrid>
      {items.map((item, i) => (
        <Reveal key={item.id} animation="up" delay={i * 70}>
          <ContentCard
            href={item.href}
            image={item.image}
            title={item.title}
            description={item.description}
            badge={item.badge}
            ctaLabel={item.ctaLabel}
          />
        </Reveal>
      ))}
    </ListingCardGrid>
  )
}

export function ListingEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
      <p className={`${TW_BODY_MUTED} text-[15px]`}>{message}</p>
      <Link href={PATHS.home} className={TW_BTN_PRIMARY}>
        {HOME_LABEL} پر جائیں
      </Link>
    </div>
  )
}
