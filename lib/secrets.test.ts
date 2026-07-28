import { describe, expect, it } from 'vitest'
import { secretsEqual } from '@/lib/secrets'

describe('secretsEqual', () => {
  it('matches equal secrets', () => {
    expect(secretsEqual('abc123', 'abc123')).toBe(true)
  })

  it('rejects mismatched or missing values', () => {
    expect(secretsEqual('abc123', 'abc124')).toBe(false)
    expect(secretsEqual(null, 'abc123')).toBe(false)
    expect(secretsEqual('abc123', undefined)).toBe(false)
    expect(secretsEqual('short', 'longer-secret')).toBe(false)
  })
})
