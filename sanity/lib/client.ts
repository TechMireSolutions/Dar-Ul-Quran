import { createClient } from 'next-sanity'
import { CMS_TAG } from '@/lib/cache-tags'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2025-01-01'

if (!projectId) {
  console.warn('[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — data fetching will be skipped.')
}

export const client = createClient({
  projectId: projectId ?? 'missing',
  dataset,
  apiVersion,
  useCdn:     process.env.NODE_ENV === 'production',
})

/** Mutations (contact submissions, etc.) — CDN off, requires SANITY_API_TOKEN. */
export function getWriteClient() {
  const token = process.env.SANITY_API_TOKEN
  if (!projectId || !token) {
    throw new Error('Sanity write is not configured')
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  })
}

type FetchOptions = {
  next?: { revalidate?: number | false; tags?: string[] }
  cache?: RequestCache
  tags?: string[]
}

export async function safeFetch<T = unknown>(
  query:    string,
  params?:  Record<string, unknown>,
  options?: FetchOptions
): Promise<T | null> {
  if (!projectId) return null   // skip fetch entirely if not configured

  try {
    const tags = [CMS_TAG, ...(options?.tags ?? []), ...(options?.next?.tags ?? [])]
    return await client.fetch<T>(query, params ?? {}, {
      next: { revalidate: 300, tags },
      ...options,
    })
  } catch (err) {
    const msg = (err as Error).message ?? String(err)
    // Only log in development — keeps production logs clean
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[Sanity] fetch failed:', msg)
    }
    return null
  }
}
