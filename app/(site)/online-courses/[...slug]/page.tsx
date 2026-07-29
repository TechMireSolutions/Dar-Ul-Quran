import type { Metadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache'
import { ogImageUrl, leafHeroImageUrl, defaultOgImage } from '@/sanity/lib/image'
import {
  getCourseBySlug,
  getSiteSettings,
  getTopicClusterForPillar,
  getAllCoursePaths,
} from '@/sanity/lib/fetchers'
import CourseSchema from '@/components/seo/CourseSchema'
import NestedChildListing from '@/components/content/NestedChildListing'
import LeafRouteShell from '@/components/layout/LeafRouteShell'
import CourseLeafPage from './_components/CourseLeafPage'
import {
  breadcrumbLabelsFromAncestry,
  buildBreadcrumbNavItems,
  PATHS,
  SECTION_LABELS,
  sectionRelativePath,
  staticParamsFromPaths,
} from '@/lib/paths'
import { loadCatchAllLeaf, mergeLeafFaqs } from '@/lib/leafRoute'
import { resolveWhatsappLink } from '@/lib/contact'
import { courseCtaLabel, defaultCourseDescription, resolveLeafDescription } from '@/lib/cmsPage'
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
  const [{ doc: course, canonicalPath }, settings] = await Promise.all([
    loadCatchAllLeaf(rawSlug, SECTION_PATH, getCourseBySlug),
    getSiteSettings(),
  ])
  const courseTitle = course.title ?? 'کورس'
  const title = course.seoTitle || courseTitle
  const description = resolveLeafDescription(course, defaultCourseDescription(course))
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
  const {
    doc: course,
    ancestry,
    canonicalPath: currentPath,
  } = await loadCatchAllLeaf(rawSlug, SECTION_PATH, getCourseBySlug)

  const [site, cluster] = await Promise.all([
    getSiteSettings(),
    getTopicClusterForPillar(course._id),
  ])

  const hasChildren = (course.children?.length ?? 0) > 0
  const heroImageUrl = course.featuredImage
    ? leafHeroImageUrl(course.featuredImage)
    : null

  const enrollHref = course.enrollmentLink || PATHS.contact
  const whatsappLink = resolveWhatsappLink(site?.whatsapp)
  const { faqItems, faqDisplayItems } = mergeLeafFaqs(
    course.faq,
    course.faqItems,
    cluster?.faqItems,
  )

  const courseTitle = course.title ?? 'کورس'
  const pageDescription = resolveLeafDescription(
    course,
    defaultCourseDescription(course, { short: true }),
  )

  return (
    <LeafRouteShell
      schemaTitle={courseTitle}
      schemaDescription={pageDescription}
      path={currentPath}
      sectionLabel={SECTION_LABELS.onlineCourses}
      sectionHref={SECTION_PATH}
      breadcrumbItems={buildBreadcrumbNavItems(SECTION_PATH, ancestry, courseTitle)}
      schema={
        <CourseSchema
          data={{
            title: courseTitle,
            seoTitle: course.seoTitle,
            seoDescription: course.seoDescription,
            excerpt: course.excerpt,
            subject: course.subject,
            duration: course.duration,
            instructor: course.instructor,
            pricingMin: course.pricingMin,
            outcomes: course.outcomes?.map((o) => ({ title: o.title ?? '' })),
            slugPath: sectionRelativePath(SECTION_PATH, currentPath),
            breadcrumbLabels: breadcrumbLabelsFromAncestry(ancestry),
            faqItems,
            orgName: site?.siteName,
          }}
        />
      }
    >
      {hasChildren ? (
        <NestedChildListing
          eyebrow={SECTION_LABELS.onlineCourses}
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
          faqItems={faqDisplayItems}
        />
      )}
    </LeafRouteShell>
  )
}
