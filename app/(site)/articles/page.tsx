import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { postsQuery, pageBySlugQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { pageMetadata } from '@/lib/seo'
import ContentCard from '@/components/ui/ContentCard'
import ItemListSchema from '@/components/seo/ItemListSchema'
import Reveal from '@/components/ui/Reveal'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    safeFetch(pageBySlugQuery, { slug: 'articles' }),
    safeFetch(siteSettingsQuery),
  ])
  return pageMetadata({
    title: page?.seoTitle || page?.title || 'مضامین',
    description: page?.seoDescription || page?.subtitle || 'اسلامی علم، خبریں اور مطالعات',
    path: '/articles',
    settings,
  })
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = q?.trim().toLowerCase() ?? ''

  const [postsRaw, page] = await Promise.all([
    safeFetch(postsQuery),
    safeFetch(pageBySlugQuery, { slug: 'articles' }),
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

  return (
    <div>
      <ItemListSchema name="مضامین" path="/articles" items={listItems} />

      <div className="bg-white border-b border-gray-100">
        <Reveal animation="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div>
            <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">
              <span className="w-5 h-px bg-dq-400 inline-block" />
              {page?.eyebrow || 'علم'}
            </p>
            <h1 className="font-bold text-[26px] sm:text-[30px] text-slate-900 tracking-[-0.02em] mb-2">
              {page?.title || 'مضامین'}
            </h1>
            <p className="text-[13.5px] text-gray-500 mb-5">
              {page?.subtitle || 'اسلامی علم، خبریں اور مطالعات'}
            </p>

            <form action="/articles" method="get" role="search" className="max-w-md">
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
          </div>
        </Reveal>
      </div>

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
                    image={post.mainImage ? urlFor(post.mainImage).width(600).height(450).url() : null}
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
