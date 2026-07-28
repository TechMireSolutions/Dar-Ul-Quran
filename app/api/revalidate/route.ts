import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { CMS_TAG, cmsTypeTag, courseTag, postTag, serviceTag } from '@/lib/cache-tags'
import { secretsEqual } from '@/lib/secrets'
import { ancestryFromParent, expectedPathFromAncestry, PATHS } from '@/lib/paths'
import { getCourseBySlug, getServiceBySlug } from '@/sanity/lib/fetchers'

type SanityWebhookBody = {
  _type?: string
  slug?: { current?: string }
  projectId?: string
  dataset?: string
}

const TYPE_PATHS: Record<string, string[]> = {
  siteSettings: [PATHS.home],
  homepageSettings: [PATHS.home],
  headerNav: [PATHS.home],
  navigation: [PATHS.home],
  course: [PATHS.onlineCourses],
  service: [PATHS.services],
  post: [PATHS.articles],
  page: [PATHS.about, PATHS.contact, PATHS.donate],
  testimonial: [PATHS.home],
}

export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret')
  const expected = process.env.REVALIDATE_SECRET

  if (!secretsEqual(secret, expected)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  let body: SanityWebhookBody = {}
  try {
    body = (await req.json()) as SanityWebhookBody
  } catch {
    body = {}
  }

  const type = body._type ?? 'unknown'
  revalidateTag(CMS_TAG, 'max')
  revalidateTag(cmsTypeTag(type), 'max')

  const paths = new Set<string>(['/', ...(TYPE_PATHS[type] ?? [])])
  if (body.slug?.current) {
    const slug = body.slug.current
    if (type === 'post') {
      revalidateTag(postTag(slug), 'max')
      paths.add(`/articles/${slug}`)
    }
    if (type === 'page') paths.add(`/${slug}`)
    if (type === 'course') {
      revalidateTag(courseTag(slug), 'max')
      paths.add(`/online-courses/${slug}`)
      try {
        const course = await getCourseBySlug(slug)
        if (course) {
          const leafSlug = course.slug?.current ?? slug
          const ancestry = ancestryFromParent(course)
          paths.add(expectedPathFromAncestry('/online-courses', ancestry, leafSlug))
        }
      } catch (err) {
        console.error('Revalidate course path resolve failed:', err)
      }
    }
    if (type === 'service') {
      revalidateTag(serviceTag(slug), 'max')
      paths.add(`/services/${slug}`)
      try {
        const service = await getServiceBySlug(slug)
        if (service) {
          const leafSlug = service.slug?.current ?? slug
          const ancestry = ancestryFromParent(service)
          paths.add(expectedPathFromAncestry('/services', ancestry, leafSlug))
        }
      } catch (err) {
        console.error('Revalidate service path resolve failed:', err)
      }
    }
  }

  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({
    revalidated: true,
    type,
    paths: [...paths],
    now: Date.now(),
  })
}
