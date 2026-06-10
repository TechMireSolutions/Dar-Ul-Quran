import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

if (!projectId) {
  console.warn('[Sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — data fetching will be skipped.')
}

export const client = createClient({
  projectId: projectId ?? 'missing',
  dataset,
  apiVersion: '2024-01-01',
  useCdn:     process.env.NODE_ENV === 'production',
})

interface FetchOptions {
  next?:  { revalidate?: number | false; tags?: string[] }
  cache?: RequestCache
}

export async function safeFetch<T = any>(
  query:    string,
  params?:  Record<string, unknown>,
  options?: FetchOptions
): Promise<T | null> {
  if (!projectId) return null   // skip fetch entirely if not configured

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (client.fetch as any)(query, params ?? {}, {
      next: { revalidate: 300 },
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
