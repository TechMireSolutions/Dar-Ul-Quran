import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { topLevelCoursesQuery, pageBySlugQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { pageMetadata } from '@/lib/seo'
import ContentCard from '@/components/ui/ContentCard'
import ItemListSchema from '@/components/seo/ItemListSchema'
import Reveal from '@/components/ui/Reveal'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const [page, settings] = await Promise.all([
    safeFetch(pageBySlugQuery, { slug: 'online-courses' }),
    safeFetch(siteSettingsQuery),
  ])
  return pageMetadata({
    title: page?.seoTitle || page?.title || 'آنلائن کورسز',
    description: page?.seoDescription || page?.subtitle || 'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ سیکھیں۔',
    path: '/online-courses',
    settings,
    keywords: ['آن لائن قرآن کورسز', 'Online Shia Quran classes', 'دار القرآن'],
  })
}

export default async function CoursesPage() {
  const [coursesRaw, page] = await Promise.all([
    safeFetch(topLevelCoursesQuery),
    safeFetch(pageBySlugQuery, { slug: 'online-courses' }),
  ])
  const courses = coursesRaw ?? []

  const listItems = courses.map((course: { title: string; slug: { current: string } }) => ({
    name: course.title,
    url: `/online-courses/${course.slug.current}`,
  }))

  return (
    <div>
      <ItemListSchema name="آن لائن کورسز" path="/online-courses" items={listItems} />

      <div className="bg-white border-b border-gray-100">
        <Reveal animation="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div>
            <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">
              <span className="w-5 h-px bg-dq-400 inline-block" />
              {page?.eyebrow || 'تعلیم'}
            </p>
            <h1 className="font-bold text-[26px] sm:text-[30px] text-slate-900 tracking-[-0.02em] mb-2">
              {page?.title || 'آنلائن کورسز'}
            </h1>
            <p className="text-[13.5px] text-gray-500 max-w-xl leading-relaxed">
              {page?.subtitle || 'اہل علماء سے سیکھیں — قرآن، نہج البلاغہ، فقہ، اخلاق اور تاریخ۔'}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="py-8 sm:py-12 bg-slate-50/40 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {courses.length === 0 ? (
            <p className="text-center text-gray-400 text-[15px] py-24">کورسز جلد آ رہے ہیں۔</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course: any, i: number) => (
                <Reveal key={course._id} animation="up" delay={i * 70}>
                  <ContentCard
                    href={`/online-courses/${course.slug.current}`}
                    image={course.featuredImage ? urlFor(course.featuredImage).width(600).height(450).url() : null}
                    title={course.title}
                    description={course.excerpt || [course.price, course.duration].filter(Boolean).join(' · ') || null}
                    ctaLabel={course.childCount > 0 ? 'کورسز دیکھیں' : 'ابھی داخلہ لیں'}
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
