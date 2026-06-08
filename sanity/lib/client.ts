import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

export async function safeFetch<T = any>(
  query: string,
  params?: Record<string, unknown>,
  options?: Parameters<typeof client.fetch>[2]
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params ?? {}, options)
  } catch (err) {
    console.error('[Sanity] fetch failed:', (err as Error).message)
    return null
  }
}
