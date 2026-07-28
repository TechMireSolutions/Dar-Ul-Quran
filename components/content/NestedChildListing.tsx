import ContentCard from '@/components/ui/ContentCard'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import { ListingCardGrid } from '@/components/layout/ListingIndexShell'
import { cardImageUrl } from '@/sanity/lib/image'
import type { SanityImageAsset } from '@/sanity/lib/image'
import { TW_CONTAINER, TW_CV_AUTO, TW_PAGE_BODY } from '@/lib/tailwind'

type NestedChild = {
  _id: string
  slug: string
  title: string
  excerpt?: string
  price?: string
  duration?: string
  childCount?: number
  featuredImage?: SanityImageAsset
  icon?: SanityImageAsset
}

type NestedChildListingProps = {
  eyebrow: string
  title: string
  excerpt?: string | null
  basePath: string
  items: NestedChild[]
  imageField: 'featuredImage' | 'icon'
  parentCtaLabel: string
  leafCtaLabel: string
  formatDescription?: (child: NestedChild) => string | null
}

export default function NestedChildListing({
  eyebrow,
  title,
  excerpt,
  basePath,
  items,
  imageField,
  parentCtaLabel,
  leafCtaLabel,
  formatDescription,
}: NestedChildListingProps) {
  return (
    <>
      <PageHeroHeader eyebrow={eyebrow} title={title} subtitle={excerpt} />
      <div className={`${TW_PAGE_BODY} min-h-[50vh] ${TW_CV_AUTO}`}>
        <div className={TW_CONTAINER}>
          <ListingCardGrid>
            {items.map((child) => {
              const imageSource = child[imageField]
              const meta = [child.price, child.duration].filter(Boolean).join(' · ')
              const description =
                formatDescription?.(child) ?? child.excerpt ?? (meta || null)

              return (
                <ContentCard
                  key={child._id}
                  href={`${basePath}/${child.slug}`}
                  image={imageSource ? cardImageUrl(imageSource) : null}
                  title={child.title}
                  description={description}
                  ctaLabel={(child.childCount ?? 0) > 0 ? parentCtaLabel : leafCtaLabel}
                />
              )
            })}
          </ListingCardGrid>
        </div>
      </div>
    </>
  )
}
