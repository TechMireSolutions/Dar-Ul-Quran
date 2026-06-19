import type { Metadata } from 'next'
import { getPosts } from '@/sanity/lib/fetchers'
import { cardImageUrl } from '@/sanity/lib/image'
import {
  cmsPageMetadata,
  fetchCmsPage,
  hasPublishedSlug,
  resolveSeoDescription,
  resolveSeoTitle,
  toItemListEntries,
} from '@/lib/cmsPage'
import ContentCard from '@/components/ui/ContentCard'
import ListingIndexShell, { ListingCardGrid, ListingEmptyState } from '@/components/layout/ListingIndexShell'
import Reveal from '@/components/ui/Reveal'
import { TW_BTN_PRIMARY, TW_SEARCH_INPUT } from '@/lib/tailwind'

export const revalidate = 300

const PAGE_SLUG = 'articles'
const PAGE_PATH = '/articles'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const { q } = await searchParams
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: 'مضامین',
    descriptionFallback: 'اسلامی علم، خبریں اور مطالعات',
    noIndex: Boolean(q?.trim()),
  })
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim().toLowerCase() ?? ''

  const [{ page }, postsRaw] = await Promise.all([
    fetchCmsPage(PAGE_SLUG),
    getPosts(),
  ])
  const posts = postsRaw ?? []

  const filtered = query
    ? posts.filter(
        (post) =>
          post.title?.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query),
      )
    : posts

  const title = resolveSeoTitle(page, 'مضامین')
  const description = resolveSeoDescription(page, 'اسلامی علم، خبریں اور مطالعات')
  const listItems = toItemListEntries(filtered.filter(hasPublishedSlug), PAGE_PATH)

  return (
    <ListingIndexShell
      title={title}
      description={description}
      path={PAGE_PATH}
      itemListName="مضامین"
      listItems={listItems}
      eyebrow={page?.eyebrow || 'علم'}
      pageTitle={page?.title || 'مضامین'}
      pageSubtitle={page?.subtitle || 'اسلامی علم، خبریں اور مطالعات'}
      heroChildren={
        <form action={PAGE_PATH} method="get" role="search" className="max-w-md mt-5">
          <label htmlFor="article-search" className="sr-only">
            مضامین تلاش کریں
          </label>
          <div className="flex gap-2">
            <input
              id="article-search"
              name="q"
              type="search"
              defaultValue={q ?? ''}
              placeholder="مضمون تلاش کریں…"
              enterKeyHint="search"
              autoComplete="off"
              className={TW_SEARCH_INPUT}
            />
            <button
              type="submit"
              className={`${TW_BTN_PRIMARY} min-w-11`}
            >
              تلاش
            </button>
          </div>
        </form>
      }
    >
      {query && (
        <p className="text-[13px] text-gray-500 mb-6" role="status" aria-live="polite">
          {filtered.length > 0
            ? `”${q}“ کے لیے ${filtered.length} نتائج`
            : `”${q}“ کے لیے کوئی نتیجہ نہیں ملا`}
        </p>
      )}
      {filtered.length === 0 ? (
        <ListingEmptyState
          message={query ? 'کوئی مضمون نہیں ملا۔ دوسرا لفظ آزمائیں۔' : 'ابھی تک کوئی مضمون شائع نہیں ہوا۔'}
        />
      ) : (
        <ListingCardGrid>
          {filtered.map((post, i) => (
            <Reveal key={post._id} animation="up" delay={i * 70}>
              <ContentCard
                href={`/articles/${post.slug?.current ?? ''}`}
                image={post.mainImage ? cardImageUrl(post.mainImage) : null}
                title={post.title ?? ''}
                description={post.excerpt || null}
                badge={post.categories?.[0]?.title || null}
                ctaLabel="مزید پڑھیں"
              />
            </Reveal>
          ))}
        </ListingCardGrid>
      )}
    </ListingIndexShell>
  )
}
