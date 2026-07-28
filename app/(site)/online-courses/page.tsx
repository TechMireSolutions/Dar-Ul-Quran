import type { Metadata } from 'next'
import { getTopLevelCourses } from '@/sanity/lib/fetchers'
import { cardImageUrl } from '@/sanity/lib/image'
import {
  cmsPageMetadata,
  courseCtaLabel,
  DEFAULT_COURSES_DESCRIPTION,
  DEFAULT_COURSES_SUBTITLE,
  fetchCmsPage,
  hasPublishedSlug,
  resolveCourseCardImage,
  resolveSeoDescription,
  resolveSeoTitle,
  toItemListEntries,
} from '@/lib/cmsPage'
import { DEFAULT_SITE_NAME_URDU } from '@/lib/seo'
import ListingIndexShell, { ListingContentCards, ListingEmptyState } from '@/components/layout/ListingIndexShell'
import { coursePath, PATHS, SECTION_LABELS } from '@/lib/paths'

export const revalidate = 300

const PAGE_SLUG = 'online-courses'
const PAGE_PATH = PATHS.onlineCourses

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: SECTION_LABELS.onlineCourses,
    descriptionFallback: DEFAULT_COURSES_DESCRIPTION,
    keywords: ['آن لائن قرآن کورسز', 'Online Shia Quran classes', DEFAULT_SITE_NAME_URDU],
  })
}

export default async function CoursesPage() {
  const [{ page }, coursesRaw] = await Promise.all([
    fetchCmsPage(PAGE_SLUG),
    getTopLevelCourses(),
  ])
  const courses = coursesRaw ?? []

  const title = resolveSeoTitle(page, SECTION_LABELS.onlineCourses)
  const description = resolveSeoDescription(page, DEFAULT_COURSES_DESCRIPTION)
  const listItems = toItemListEntries(courses.filter(hasPublishedSlug), PAGE_PATH)

  return (
    <ListingIndexShell
      title={title}
      description={description}
      path={PAGE_PATH}
      itemListName={SECTION_LABELS.onlineCourses}
      listItems={listItems}
      eyebrow={page?.eyebrow || 'تعلیم'}
      pageTitle={page?.title || SECTION_LABELS.onlineCourses}
      pageSubtitle={page?.subtitle || DEFAULT_COURSES_SUBTITLE}
    >
      {courses.length === 0 ? (
        <ListingEmptyState message="کورسز جلد آ رہے ہیں۔" />
      ) : (
        <ListingContentCards
          items={courses.map((course) => {
            const image = resolveCourseCardImage(course)
            return {
              id: course._id,
              href: coursePath(course.slug?.current ?? ''),
              image: image ? cardImageUrl(image) : null,
              title: course.title ?? '',
              description:
                course.excerpt || [course.price, course.duration].filter(Boolean).join(' · ') || null,
              ctaLabel: courseCtaLabel(course.childCount ?? 0),
            }
          })}
        />
      )}
    </ListingIndexShell>
  )
}
