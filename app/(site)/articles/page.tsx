import type { Metadata } from 'next'
import { getPosts } from '@/sanity/lib/fetchers'
import { cardImageUrl } from '@/sanity/lib/image'
import {
  cmsPageMetadata,
  DEFAULT_ARTICLES_DESCRIPTION,
  fetchCmsPage,
  hasPublishedSlug,
  resolveSeoDescription,
  resolveSeoTitle,
  toItemListEntries,
} from '@/lib/cmsPage'
import ListingIndexShell, { ListingContentCards, ListingEmptyState } from '@/components/layout/ListingIndexShell'
import ArticlesSearchForm from './_components/ArticlesSearchForm'
import { TW_PAGE_SUBTITLE } from '@/lib/tailwind'
import { articlePath, PATHS, SECTION_LABELS } from '@/lib/paths'
import { DEFAULT_ARTICLE_CTA } from '@/lib/seo'

export const revalidate = 300

const PAGE_SLUG = 'articles'
const PAGE_PATH = PATHS.articles

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const { q } = await searchParams
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: SECTION_LABELS.articles,
    descriptionFallback: DEFAULT_ARTICLES_DESCRIPTION,
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

  const title = resolveSeoTitle(page, SECTION_LABELS.articles)
  const description = resolveSeoDescription(page, DEFAULT_ARTICLES_DESCRIPTION)
  const listItems = toItemListEntries(filtered.filter(hasPublishedSlug), PAGE_PATH)

  return (
    <ListingIndexShell
      title={title}
      description={description}
      path={PAGE_PATH}
      itemListName={SECTION_LABELS.articles}
      listItems={listItems}
      eyebrow={page?.eyebrow || 'علم'}
      pageTitle={page?.title || SECTION_LABELS.articles}
      pageSubtitle={page?.subtitle || DEFAULT_ARTICLES_DESCRIPTION}
      heroChildren={<ArticlesSearchForm defaultQuery={q ?? ''} />}
    >
      {query && (
        <p className={`${TW_PAGE_SUBTITLE} mb-6`} role="status" aria-live="polite">
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
        <ListingContentCards
          items={filtered.map((post) => ({
            id: post._id,
            href: articlePath(post.slug?.current ?? ''),
            image: post.mainImage ? cardImageUrl(post.mainImage) : null,
            title: post.title ?? '',
            description: post.excerpt || null,
            badge: post.categories?.[0]?.title || null,
            ctaLabel: DEFAULT_ARTICLE_CTA,
          }))}
        />
      )}
    </ListingIndexShell>
  )
}
