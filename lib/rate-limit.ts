type RateLimitResult = { success: boolean; remaining: number }

const WINDOW_MS = 15 * 60 * 1000
const MAX_REQUESTS = 5

const memoryBuckets = new Map<string, { count: number; resetAt: number }>()

function rateLimitMemory(key: string): RateLimitResult {
  const now = Date.now()
  let bucket = memoryBuckets.get(key)
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS }
    memoryBuckets.set(key, bucket)
  }
  bucket.count += 1
  const remaining = Math.max(0, MAX_REQUESTS - bucket.count)
  return { success: bucket.count <= MAX_REQUESTS, remaining }
}

/** Contact form rate limit — Upstash when configured, else in-memory (single VPS). */
export async function rateLimitContact(ip: string): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN

  if (url && token) {
    const { Ratelimit } = await import('@upstash/ratelimit')
    const { Redis } = await import('@upstash/redis')
    const ratelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(MAX_REQUESTS, '15 m'),
      prefix: 'dq:contact',
    })
    const result = await ratelimit.limit(ip)
    return { success: result.success, remaining: result.remaining }
  }

  return rateLimitMemory(ip)
}
