import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { CMS_TAG, cmsTypeTag, courseTag, postTag, serviceTag } from '@/lib/cache-tags'

type SanityWebhookBody = {
  _type?: string
  slug?: { current?: string }
  projectId?: string
  dataset?: string
}

const TYPE_PATHS: Record<string, string[]> = {
  siteSettings: ['/'],
  homepageSettings: ['/'],
  headerNav: ['/'],
  navigation: ['/'],
  course: ['/online-courses'],
  service: ['/services'],
  post: ['/articles'],
  page: ['/about', '/contact', '/donate'],
  testimonial: ['/'],
}

export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret')
  const expected = process.env.REVALIDATE_SECRET

  if (!expected || secret !== expected) {
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
    }
    if (type === 'service') {
      revalidateTag(serviceTag(slug), 'max')
      paths.add(`/services/${slug}`)
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
