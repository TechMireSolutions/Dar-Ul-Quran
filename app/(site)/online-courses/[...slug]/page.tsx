import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'
import { ogImageUrl, leafHeroImageUrl, defaultOgImage } from '@/sanity/lib/image'
import {
  getCourseBySlug,
  getCourseSchema,
  getSiteSettings,
  getTopicClusterForPillar,
  getAllCoursePaths,
} from '@/sanity/lib/fetchers'
import CourseSchema from '@/components/seo/CourseSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import NestedChildListing from '@/components/content/NestedChildListing'
import CourseLeafPage from './_components/CourseLeafPage'
import {
  breadcrumbLabelsFromAncestry,
  buildBreadcrumbNavItems,
  parseCatchAllSlug,
  PATHS,
  resolveLeafCanonical,
  sectionRelativePath,
  staticParamsFromPaths,
} from '@/lib/paths'
import { resolveWhatsappLink } from '@/lib/contact'
import { courseCtaLabel, resolveLeafDescription } from '@/lib/cmsPage'
import { mergeFaqItems } from '@/lib/topicCluster'
import { pageMetadata, DEFAULT_SITE_NAME_URDU, resolveOgImage } from '@/lib/seo'

export const revalidate = 300

const SECTION_PATH = PATHS.onlineCourses

export async function generateStaticParams() {
  const paths = await getAllCoursePaths()
  return staticParamsFromPaths(paths)
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string | string[] }> }
): Promise<Metadata> {
  const { slug: rawSlug } = await params
  const { segments, leafSlug } = parseCatchAllSlug(rawSlug)
  if (!leafSlug) notFound()
  const [course, settings] = await Promise.all([
    getCourseBySlug(leafSlug),
    getSiteSettings(),
  ])
  if (!course) notFound()

  const resolved = resolveLeafCanonical(SECTION_PATH, segments, course)
  if (!resolved) notFound()
  const { canonicalPath } = resolved
  const courseTitle = course.title ?? 'کورس'
  const title = course.seoTitle || courseTitle
  const description = resolveLeafDescription(
    course,
    `آن لائن ${courseTitle}${course.subject ? ` — ${course.subject}` : ''}۔ پاکستان اور دنیا بھر کے شیعہ خاندانوں کے لیے مستند اسلامی تعلیم۔`,
  )
  const image = resolveOgImage(
    course.featuredImage ? ogImageUrl(course.featuredImage) : null,
    defaultOgImage(settings),
  )

  return pageMetadata({
    title,
    description,
    path: canonicalPath,
    image,
    imageAlt: courseTitle,
    keywords: [
      courseTitle,
      'Online Shia Quran classes',
      'Shia Quran classes Pakistan',
      'Online Quran for kids',
      'Jafari Islamic education online',
      'Shia Islamic school online',
      ...(course.subject ? [course.subject] : []),
      DEFAULT_SITE_NAME_URDU,
      'آن لائن قرآن کلاسز',
    ],
    settings,
    authors: course.instructor ? [course.instructor] : undefined,
  })
}

export default async function CourseCatchAllPage(
  { params }: { params: Promise<{ slug: string | string[] }> }
) {
  // Prevent wrong-parent URLs from sharing a statically cached leaf response.
  noStore()
  const { slug: rawSlug } = await params
  const { segments, leafSlug } = parseCatchAllSlug(rawSlug)
  if (!leafSlug) notFound()

  const course = await getCourseBySlug(leafSlug)
  if (!course) notFound()

  const resolved = resolveLeafCanonical(SECTION_PATH, segments, course)
  if (!resolved) notFound()
  const { ancestry, canonicalPath: currentPath } = resolved

  const [site, schemaData, cluster] = await Promise.all([
    getSiteSettings(),
    getCourseSchema(leafSlug),
    getTopicClusterForPillar(course._id),
  ])

  const hasChildren = (course.children?.length ?? 0) > 0
  const heroImageUrl = course.featuredImage
    ? leafHeroImageUrl(course.featuredImage)
    : null

  const enrollHref = course.enrollmentLink || PATHS.contact
  const whatsappLink = resolveWhatsappLink(site?.whatsapp)

  const courseTitle = course.title ?? 'کورس'
  const pageDescription = resolveLeafDescription(
    course,
    `آن لائن ${courseTitle}${course.subject ? ` — ${course.subject}` : ''}۔`,
  )

  return (
    <div>
      <WebPageSchema title={courseTitle} description={pageDescription} path={currentPath} />
      {schemaData && (
        <CourseSchema
          data={{
            ...schemaData,
            slugPath: sectionRelativePath(SECTION_PATH, currentPath),
            breadcrumbLabels: breadcrumbLabelsFromAncestry(ancestry),
            faqItems: mergeFaqItems(schemaData.faqItems, cluster?.faqItems),
          }}
        />
      )}

      <BreadcrumbNav
        sectionLabel="آنلائن کورسز"
        sectionHref={SECTION_PATH}
        items={buildBreadcrumbNavItems(SECTION_PATH, ancestry, courseTitle)}
      />

      {hasChildren ? (
        <NestedChildListing
          eyebrow="کورسز"
          title={courseTitle}
          excerpt={course.excerpt}
          basePath={currentPath}
          items={course.children ?? []}
          imageField="featuredImage"
          resolveCtaLabel={courseCtaLabel}
        />
      ) : (
        <CourseLeafPage
          course={course}
          site={site}
          cluster={cluster}
          heroImageUrl={heroImageUrl}
          enrollHref={enrollHref}
          whatsappLink={whatsappLink}
        />
      )}
    </div>
  )
}
