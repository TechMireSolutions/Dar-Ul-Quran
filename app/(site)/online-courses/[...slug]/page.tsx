import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { ogImageUrl, leafHeroImageUrl } from '@/sanity/lib/image'
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
  ancestryFromParent,
  assertSlugAncestry,
  breadcrumbLabelsFromAncestry,
  buildBreadcrumbNavItems,
  expectedPathFromAncestry,
  staticParamsFromPaths,
} from '@/lib/paths'
import { resolveWhatsappLink } from '@/lib/contact'
import { mergeFaqItems } from '@/lib/topicCluster'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

const SECTION_PATH = '/online-courses'

export async function generateStaticParams() {
  const paths = await getAllCoursePaths()
  return staticParamsFromPaths(paths)
}

function courseCanonical(
  slug: string[],
  course: { slug?: { current?: string }; parent?: Parameters<typeof ancestryFromParent>[0]['parent'] },
) {
  const leafSlug = course.slug?.current ?? slug[slug.length - 1]
  const ancestry = ancestryFromParent(course)
  return {
    leafSlug,
    ancestry,
    canonicalPath: expectedPathFromAncestry(SECTION_PATH, ancestry, leafSlug),
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string[] }> }
): Promise<Metadata> {
  const { slug } = await params
  const currentSlug = slug[slug.length - 1]
  const [course, settings] = await Promise.all([
    getCourseBySlug(currentSlug),
    getSiteSettings(),
  ])
  if (!course) notFound()

  const { canonicalPath } = courseCanonical(slug, course)
  const courseTitle = course.title ?? 'کورس'
  const title = course.seoTitle || courseTitle
  const description =
    course.seoDescription ||
    course.excerpt ||
    `آن لائن ${courseTitle}${course.subject ? ` — ${course.subject}` : ''}۔ پاکستان اور دنیا بھر کے شیعہ خاندانوں کے لیے مستند اسلامی تعلیم۔`
  const image = course.featuredImage ? ogImageUrl(course.featuredImage) : null

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
      'دار القرآن',
      'آن لائن قرآن کلاسز',
    ],
    settings,
    authors: course.instructor ? [course.instructor] : undefined,
  })
}

export default async function CourseCatchAllPage(
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const currentSlug = slug[slug.length - 1]

  const course = await getCourseBySlug(currentSlug)
  if (!course) notFound()

  const { leafSlug, ancestry, canonicalPath: currentPath } = courseCanonical(slug, course)
  if (!assertSlugAncestry(slug, ancestry, leafSlug)) {
    permanentRedirect(currentPath)
  }

  const [site, schemaData, cluster] = await Promise.all([
    getSiteSettings(),
    getCourseSchema(currentSlug),
    getTopicClusterForPillar(course._id),
  ])

  const hasChildren = (course.children?.length ?? 0) > 0
  const heroImageUrl = course.featuredImage
    ? leafHeroImageUrl(course.featuredImage)
    : null

  const enrollHref = course.enrollmentLink || '/contact'
  const whatsappLink = resolveWhatsappLink(site?.whatsapp)

  const courseTitle = course.title ?? 'کورس'
  const pageDescription =
    course.seoDescription ||
    course.excerpt ||
    `آن لائن ${courseTitle}${course.subject ? ` — ${course.subject}` : ''}۔`

  return (
    <div>
      <WebPageSchema title={courseTitle} description={pageDescription} path={currentPath} />
      {schemaData && (
        <CourseSchema
          data={{
            ...schemaData,
            slugPath: currentPath.replace(`${SECTION_PATH}/`, ''),
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
          parentCtaLabel="کورسز دیکھیں"
          leafCtaLabel="ابھی داخلہ لیں"
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
