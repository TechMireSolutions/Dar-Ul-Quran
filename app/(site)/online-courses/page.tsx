import type { Metadata } from 'next'
import { getTopLevelCourses } from '@/sanity/lib/fetchers'
import { cardImageUrl } from '@/sanity/lib/image'
import {
  cmsPageMetadata,
  courseCtaLabel,
  fetchCmsPage,
  hasPublishedSlug,
  resolveSeoDescription,
  resolveSeoTitle,
  toItemListEntries,
} from '@/lib/cmsPage'
import { DEFAULT_SITE_NAME_URDU } from '@/lib/seo'
import ContentCard from '@/components/ui/ContentCard'
import ListingIndexShell, { ListingCardGrid, ListingEmptyState } from '@/components/layout/ListingIndexShell'
import Reveal from '@/components/ui/Reveal'
import { coursePath, PATHS } from '@/lib/paths'

export const revalidate = 300

const PAGE_SLUG = 'online-courses'
const PAGE_PATH = PATHS.onlineCourses

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: 'آنلائن کورسز',
    descriptionFallback: 'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ سیکھیں۔',
    keywords: ['آن لائن قرآن کورسز', 'Online Shia Quran classes', DEFAULT_SITE_NAME_URDU],
  })
}

export default async function CoursesPage() {
  const [{ page }, coursesRaw] = await Promise.all([
    fetchCmsPage(PAGE_SLUG),
    getTopLevelCourses(),
  ])
  const courses = coursesRaw ?? []

  const title = resolveSeoTitle(page, 'آنلائن کورسز')
  const description = resolveSeoDescription(
    page,
    'اہل علماء سے قرآن، فقہ، اخلاق اور تاریخ سیکھیں۔',
  )
  const listItems = toItemListEntries(courses.filter(hasPublishedSlug), PAGE_PATH)

  return (
    <ListingIndexShell
      title={title}
      description={description}
      path={PAGE_PATH}
      itemListName="آن لائن کورسز"
      listItems={listItems}
      eyebrow={page?.eyebrow || 'تعلیم'}
      pageTitle={page?.title || 'آنلائن کورسز'}
      pageSubtitle={page?.subtitle || 'اہل علماء سے سیکھیں — قرآن، نہج البلاغہ، فقہ، اخلاق اور تاریخ۔'}
    >
      {courses.length === 0 ? (
        <ListingEmptyState message="کورسز جلد آ رہے ہیں۔" />
      ) : (
        <ListingCardGrid>
          {courses.map((course, i) => (
            <Reveal key={course._id} animation="up" delay={i * 70}>
              <ContentCard
                href={coursePath(course.slug?.current ?? '')}
                image={course.featuredImage ? cardImageUrl(course.featuredImage) : null}
                title={course.title ?? ''}
                description={course.excerpt || [course.price, course.duration].filter(Boolean).join(' · ') || null}
                ctaLabel={courseCtaLabel(course.childCount ?? 0)}
              />
            </Reveal>
          ))}
        </ListingCardGrid>
      )}
    </ListingIndexShell>
  )
}
