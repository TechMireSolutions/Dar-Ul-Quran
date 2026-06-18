import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { urlFor, ogImageUrl } from '@/sanity/lib/image'
import { allCoursePathsQuery } from '@/sanity/lib/queries'
import {
  getCourseBySlug,
  getCourseSchema,
  getSiteSettings,
  getTopicClusterForPillar,
} from '@/sanity/lib/fetchers'
import { safeFetch } from '@/sanity/lib/client'
import CourseSchema from '@/components/seo/CourseSchema'
import BreadcrumbNav from '@/components/seo/BreadcrumbNav'
import NestedChildListing from '@/components/content/NestedChildListing'
import CourseLeafPage from './_components/CourseLeafPage'
import { ancestryFromParent, breadcrumbHref, staticParamsFromPaths } from '@/lib/paths'
import { whatsappHref } from '@/lib/contact'
import { mergeFaqItems } from '@/lib/topicCluster'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

const SECTION_PATH = '/online-courses'

export async function generateStaticParams() {
  const paths = await safeFetch(allCoursePathsQuery)
  return staticParamsFromPaths(paths)
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
  if (!course) return { title: 'کورس | دار القرآن' }

  const canonicalPath = `${SECTION_PATH}/${slug.join('/')}`
  const title = course.seoTitle || `${course.title} | دار القرآن`
  const description =
    course.seoDescription ||
    course.excerpt ||
    `آن لائن ${course.title}${course.subject ? ` — ${course.subject}` : ''}۔ پاکستان اور دنیا بھر کے شیعہ خاندانوں کے لیے مستند اسلامی تعلیم۔`
  const image = course.featuredImage ? ogImageUrl(course.featuredImage) : null

  return pageMetadata({
    title,
    description,
    path: canonicalPath,
    image,
    imageAlt: course.title,
    keywords: [
      course.title,
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

  const [site, schemaData, cluster] = await Promise.all([
    getSiteSettings(),
    getCourseSchema(currentSlug),
    getTopicClusterForPillar(course._id),
  ])

  const hasChildren = course.children?.length > 0
  const ancestry = ancestryFromParent(course)
  const currentPath = `${SECTION_PATH}/${slug.join('/')}`
  const heroImageUrl = course.featuredImage
    ? urlFor(course.featuredImage).width(1400).height(700).url()
    : null

  const enrollHref = course.enrollmentLink || '/contact'
  const whatsappLink = site?.whatsapp ? whatsappHref(String(site.whatsapp)) : '/contact'

  return (
    <div>
      {schemaData && (
        <CourseSchema
          data={{
            ...schemaData,
            slugPath: slug.join('/'),
            breadcrumbLabels: Object.fromEntries(ancestry.map((a) => [a.slug, a.title])),
            faqItems: mergeFaqItems(schemaData.faqItems, cluster?.faqItems),
          }}
        />
      )}

      <BreadcrumbNav
        sectionLabel="آنلائن کورسز"
        sectionHref={SECTION_PATH}
        items={[
          ...ancestry.map(({ title }, i) => ({
            label: title,
            href: breadcrumbHref(SECTION_PATH, ancestry, i),
          })),
          { label: course.title },
        ]}
      />

      {hasChildren ? (
        <NestedChildListing
          eyebrow="کورسز"
          title={course.title}
          excerpt={course.excerpt}
          basePath={currentPath}
          items={course.children}
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
