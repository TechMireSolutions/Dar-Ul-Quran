/** Next.js cache tags for on-demand revalidation (Sanity webhook). */
export const CMS_TAG = 'cms'

export function cmsTypeTag(type: string): string {
  return `cms:${type}`
}

export function courseTag(slug: string): string {
  return `course:${slug}`
}

export function serviceTag(slug: string): string {
  return `service:${slug}`
}

export function postTag(slug: string): string {
  return `post:${slug}`
}
