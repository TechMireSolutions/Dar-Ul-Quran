import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { cardImageUrl } from '@/sanity/lib/image'
import { postsQuery } from '@/sanity/lib/queries'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import ContentCard from '@/components/ui/ContentCard'
import ItemListSchema from '@/components/seo/ItemListSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import Reveal from '@/components/ui/Reveal'

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
    safeFetch(postsQuery),
  ])
  const posts = postsRaw ?? []

  const filtered = query
    ? posts.filter(
        (post: { title?: string; excerpt?: string }) =>
          post.title?.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query),
      )
    : posts

  const listItems = filtered.map((post: { title: string; slug: { current: string } }) => ({
    name: post.title,
    url: `/articles/${post.slug.current}`,
  }))

  const title = resolveSeoTitle(page, 'مضامین')
  const description = resolveSeoDescription(page, 'اسلامی علم، خبریں اور مطالعات')

  return (
    <div>
      <WebPageSchema title={title} description={description} path={PAGE_PATH} />
      <ItemListSchema name="مضامین" path={PAGE_PATH} items={listItems} />

      <PageHeroHeader
        eyebrow={page?.eyebrow || 'علم'}
        title={page?.title || 'مضامین'}
        subtitle={page?.subtitle || 'اسلامی علم، خبریں اور مطالعات'}
      >
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
              className="flex-1 min-h-[44px] px-4 rounded-xl border border-gray-200 text-[14px] text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-dq-400/40 focus:border-dq-400"
            />
            <button
              type="submit"
              className="min-h-[44px] min-w-[44px] px-4 rounded-xl bg-dq-600 text-white text-[14px] font-semibold hover:bg-dq-700 transition-colors"
            >
              تلاش
            </button>
          </div>
        </form>
      </PageHeroHeader>

      <div className="py-8 sm:py-12 bg-slate-50/40 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {query && (
            <p className="text-[13px] text-gray-500 mb-6" role="status" aria-live="polite">
              {filtered.length > 0
                ? `”${q}“ کے لیے ${filtered.length} نتائج`
                : `”${q}“ کے لیے کوئی نتیجہ نہیں ملا`}
            </p>
          )}
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 text-[15px] py-24">
              {query ? 'کوئی مضمون نہیں ملا۔ دوسرا لفظ آزمائیں۔' : 'ابھی تک کوئی مضمون شائع نہیں ہوا۔'}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((post: any, i: number) => (
                <Reveal key={post._id} animation="up" delay={i * 70}>
                  <ContentCard
                    href={`/articles/${post.slug.current}`}
                    image={post.mainImage ? cardImageUrl(post.mainImage) : null}
                    title={post.title}
                    description={post.excerpt || null}
                    badge={post.categories?.[0]?.title || null}
                    ctaLabel="مزید پڑھیں"
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
