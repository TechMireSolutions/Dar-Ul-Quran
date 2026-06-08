import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { postsQuery, pageBySlugQuery } from '@/sanity/lib/queries'
import ContentCard from '@/components/ui/ContentCard'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await safeFetch(pageBySlugQuery, { slug: 'articles' })
  return {
    title: page?.seoTitle || page?.title || 'مضامین',
    description: page?.seoDescription || page?.subtitle,
  }
}

export default async function ArticlesPage() {
  const [posts, page] = await Promise.all([
    safeFetch(postsQuery),
    safeFetch(pageBySlugQuery, { slug: 'articles' }),
  ])

  return (
    <div>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">
            <span className="w-5 h-px bg-dq-400 inline-block" />
            {page?.eyebrow || 'علم'}
          </p>
          <h1 className="font-bold text-[26px] sm:text-[30px] text-slate-900 tracking-[-0.02em] mb-2">
            {page?.title || 'مضامین'}
          </h1>
          <p className="text-[13.5px] text-gray-500">
            {page?.subtitle || 'اسلامی علم، خبریں اور مطالعات'}
          </p>
        </div>
      </div>

      <div className="py-8 sm:py-12 bg-slate-50/40 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400 text-[15px] py-24">ابھی تک کوئی مضمون شائع نہیں ہوا۔</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {posts.map((post: any) => (
                <ContentCard
                  key={post._id}
                  href={`/articles/${post.slug.current}`}
                  image={post.mainImage ? urlFor(post.mainImage).width(600).height(450).url() : null}
                  title={post.title}
                  description={post.excerpt || null}
                  badge={post.categories?.[0]?.title || null}
                  ctaLabel="مزید پڑھیں"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
