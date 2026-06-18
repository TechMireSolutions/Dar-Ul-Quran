import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { cardImageUrl } from '@/sanity/lib/image'
import { topLevelCoursesQuery } from '@/sanity/lib/queries'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import ContentCard from '@/components/ui/ContentCard'
import ItemListSchema from '@/components/seo/ItemListSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import Reveal from '@/components/ui/Reveal'

export const revalidate = 300

const PAGE_SLUG = 'online-courses'
const PAGE_PATH = '/online-courses'

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: 'آنلائن کورسز',
    descriptionFallback: 'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ سیکھیں۔',
    keywords: ['آن لائن قرآن کورسز', 'Online Shia Quran classes', 'دار القرآن'],
  })
}

export default async function CoursesPage() {
  const [{ page }, coursesRaw] = await Promise.all([
    fetchCmsPage(PAGE_SLUG),
    safeFetch(topLevelCoursesQuery),
  ])
  const courses = coursesRaw ?? []

  const title = resolveSeoTitle(page, 'آنلائن کورسز')
  const description = resolveSeoDescription(
    page,
    'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ سیکھیں۔',
  )

  const listItems = courses.map((course: { title: string; slug: { current: string } }) => ({
    name: course.title,
    url: `${PAGE_PATH}/${course.slug.current}`,
  }))

  return (
    <div>
      <WebPageSchema title={title} description={description} path={PAGE_PATH} />
      <ItemListSchema name="آن لائن کورسز" path={PAGE_PATH} items={listItems} />

      <PageHeroHeader
        eyebrow={page?.eyebrow || 'تعلیم'}
        title={page?.title || 'آنلائن کورسز'}
        subtitle={page?.subtitle || 'اہل علماء سے سیکھیں — قرآن، نہج البلاغہ، فقہ، اخلاق اور تاریخ۔'}
      />

      <div className="py-8 sm:py-12 bg-slate-50/40 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {courses.length === 0 ? (
            <p className="text-center text-gray-400 text-[15px] py-24">کورسز جلد آ رہے ہیں۔</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course: any, i: number) => (
                <Reveal key={course._id} animation="up" delay={i * 70}>
                  <ContentCard
                    href={`${PAGE_PATH}/${course.slug.current}`}
                    image={course.featuredImage ? cardImageUrl(course.featuredImage) : null}
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
