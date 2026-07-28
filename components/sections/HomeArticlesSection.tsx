import { cardImageUrl } from '@/sanity/lib/image'
import ContentCard from '@/components/ui/ContentCard'
import Reveal from '@/components/ui/Reveal'
import SectionHeaderRow from '@/components/ui/SectionHeaderRow'
import type { HomepageSettingsDoc, PostListItemDoc } from '@/lib/types'
import { articlePath, PATHS } from '@/lib/paths'
import { TW_CARD_GRID, TW_CONTAINER, TW_CV_AUTO } from '@/lib/tailwind'

type HomeArticlesSectionProps = {
  posts: PostListItemDoc[] | null | undefined
  settings?: HomepageSettingsDoc | null
}

export default function HomeArticlesSection({ posts, settings }: HomeArticlesSectionProps) {
  if (!posts?.length) return null

  return (
    <section className={`py-10 md:py-16 border-b border-gray-100 bg-white ${TW_CV_AUTO}`}>
      <div className={TW_CONTAINER}>
        <Reveal animation="up">
          <SectionHeaderRow
            eyebrow="علم"
            title={settings?.articlesHeading || 'تازہ ترین مضامین'}
            subtitle={settings?.articlesSubheading}
            compact
            viewAllHref={PATHS.articles}
          />
        </Reveal>
        <div className={TW_CARD_GRID}>
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post._id} animation="up" delay={i * 80}>
              <ContentCard
                href={articlePath(post.slug?.current ?? '')}
                image={post.mainImage ? cardImageUrl(post.mainImage) : null}
                title={post.title ?? ''}
                description={post.excerpt || null}
                badge={post.categories?.[0]?.title || null}
                ctaLabel="مزید پڑھیں"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
