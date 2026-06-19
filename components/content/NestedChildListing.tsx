import ContentCard from '@/components/ui/ContentCard'
import { cardImageUrl } from '@/sanity/lib/image'
import type { SanityImageAsset } from '@/sanity/lib/image'
import { TW_CONTAINER, TW_EYEBROW, TW_EYEBROW_LINE, TW_PAGE_TITLE } from '@/lib/tailwind'

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
    <div className={`${TW_CONTAINER} py-8 sm:py-12`}>
      <p className={`${TW_EYEBROW} mb-3`}>
        <span className={TW_EYEBROW_LINE} />
        {eyebrow}
      </p>
      <h1 className={`${TW_PAGE_TITLE} mb-2`}>{title}</h1>
      {excerpt && (
        <p className="text-[14px] text-gray-500 mb-10 max-w-2xl leading-relaxed">{excerpt}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((child) => {
          const imageSource = child[imageField]
          const description =
            formatDescription?.(child) ??
            child.excerpt ??
            [child.price, child.duration].filter(Boolean).join(' · ') ??
            child.price ??
            null

          return (
            <ContentCard
              key={child._id}
              href={`${basePath}/${child.slug}`}
              image={imageSource ? cardImageUrl(imageSource) : null}
              title={child.title}
              description={description || null}
              ctaLabel={(child.childCount ?? 0) > 0 ? parentCtaLabel : leafCtaLabel}
            />
          )
        })}
      </div>
    </div>
  )
}
