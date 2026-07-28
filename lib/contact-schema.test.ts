import { describe, expect, it } from 'vitest'
import { contactBodySchema, PURPOSE_LABEL } from '@/lib/contact-schema'

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
    const result = contactBodySchema.safeParse(valid)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.purpose).toBe('general')
      expect(result.data.firstName).toBe('علی')
    }
  })

  it('defaults purpose to general when omitted', () => {
    const { purpose: _omit, ...withoutPurpose } = valid
    const result = contactBodySchema.safeParse(withoutPurpose)
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.purpose).toBe('general')
  })

  it('trims whitespace fields', () => {
    const result = contactBodySchema.safeParse({
      ...valid,
      firstName: '  علی  ',
      email: '  test@example.com  ',
      city: '  Karachi  ',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.firstName).toBe('علی')
      expect(result.data.email).toBe('test@example.com')
      expect(result.data.city).toBe('Karachi')
    }
  })

  it('rejects empty firstName', () => {
    expect(contactBodySchema.safeParse({ ...valid, firstName: '' }).success).toBe(false)
    expect(contactBodySchema.safeParse({ ...valid, firstName: '   ' }).success).toBe(false)
  })

  it('rejects invalid email', () => {
    expect(contactBodySchema.safeParse({ ...valid, email: 'not-an-email' }).success).toBe(false)
  })

  it('rejects short phone', () => {
    expect(contactBodySchema.safeParse({ ...valid, phone: '123' }).success).toBe(false)
  })

  it('rejects short message', () => {
    expect(contactBodySchema.safeParse({ ...valid, message: 'short' }).success).toBe(false)
  })

  it('rejects message over 5000 chars', () => {
    expect(
      contactBodySchema.safeParse({ ...valid, message: 'ا'.repeat(5001) }).success,
    ).toBe(false)
  })

  it('requires appliedFor for course purpose', () => {
    expect(
      contactBodySchema.safeParse({ ...valid, purpose: 'course' }).success,
    ).toBe(false)
  })

  it('requires appliedFor for service purpose', () => {
    expect(
      contactBodySchema.safeParse({ ...valid, purpose: 'service' }).success,
    ).toBe(false)
  })

  it('accepts course with appliedFor', () => {
    expect(
      contactBodySchema.safeParse({
        ...valid,
        purpose: 'course',
        appliedFor: 'Nazra',
      }).success,
    ).toBe(true)
  })

  it('accepts service with appliedFor', () => {
    expect(
      contactBodySchema.safeParse({
        ...valid,
        purpose: 'service',
        appliedFor: 'نیابت زیارت',
      }).success,
    ).toBe(true)
  })

  it('accepts other purpose without appliedFor', () => {
    expect(
      contactBodySchema.safeParse({ ...valid, purpose: 'other' }).success,
    ).toBe(true)
  })

  it('rejects unknown purpose', () => {
    expect(
      contactBodySchema.safeParse({ ...valid, purpose: 'spam' }).success,
    ).toBe(false)
  })

  it('allows optional lastName and turnstileToken', () => {
    const result = contactBodySchema.safeParse({
      ...valid,
      lastName: 'خان',
      turnstileToken: 'tok_abc',
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.lastName).toBe('خان')
      expect(result.data.turnstileToken).toBe('tok_abc')
    }
  })
})

describe('PURPOSE_LABEL', () => {
  it('covers every purpose enum value', () => {
    expect(PURPOSE_LABEL.general).toBeTruthy()
    expect(PURPOSE_LABEL.course).toBeTruthy()
    expect(PURPOSE_LABEL.service).toBeTruthy()
    expect(PURPOSE_LABEL.other).toBeTruthy()
  })
})
