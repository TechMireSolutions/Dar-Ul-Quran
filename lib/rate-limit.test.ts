import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { rateLimitContact } from '@/lib/rate-limit'

describe('rateLimitContact (in-memory)', () => {
  const prevUrl = process.env.UPSTASH_REDIS_REST_URL
  const prevToken = process.env.UPSTASH_REDIS_REST_TOKEN

  beforeEach(() => {
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  afterEach(() => {
    if (prevUrl === undefined) delete process.env.UPSTASH_REDIS_REST_URL
    else process.env.UPSTASH_REDIS_REST_URL = prevUrl
    if (prevToken === undefined) delete process.env.UPSTASH_REDIS_REST_TOKEN
    else process.env.UPSTASH_REDIS_REST_TOKEN = prevToken
  })

  it('allows the first five requests then blocks', async () => {
    const ip = `test-ip-${Date.now()}-${Math.random()}`

    for (let i = 0; i < 5; i++) {
      const result = await rateLimitContact(ip)
      expect(result.success).toBe(true)
      expect(result.remaining).toBe(4 - i)
    }

    const blocked = await rateLimitContact(ip)
    expect(blocked.success).toBe(false)
    expect(blocked.remaining).toBe(0)
  })

  it('tracks buckets per IP independently', async () => {
    const a = `ip-a-${Date.now()}`
    const b = `ip-b-${Date.now()}`
    expect((await rateLimitContact(a)).success).toBe(true)
    expect((await rateLimitContact(b)).success).toBe(true)
  })
})
