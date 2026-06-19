import { describe, expect, it } from 'vitest'
import { contactBodySchema } from '@/lib/contact-schema'

describe('contactBodySchema', () => {
  const valid = {
    firstName: 'علی',
    email: 'test@example.com',
    phone: '+923001234567',
    country: 'Pakistan',
    city: 'Karachi',
    message: 'یہ ایک ٹیسٹ پیغام ہے۔',
    purpose: 'general' as const,
  }

  it('accepts valid payload', () => {
    expect(contactBodySchema.safeParse(valid).success).toBe(true)
  })

  it('rejects short message', () => {
    expect(contactBodySchema.safeParse({ ...valid, message: 'short' }).success).toBe(false)
  })

  it('requires appliedFor for course purpose', () => {
    expect(
      contactBodySchema.safeParse({ ...valid, purpose: 'course' }).success,
    ).toBe(false)
  })

  it('accepts course with appliedFor', () => {
    expect(
      contactBodySchema.safeParse({ ...valid, purpose: 'course', appliedFor: 'Nazra' }).success,
    ).toBe(true)
  })
})
