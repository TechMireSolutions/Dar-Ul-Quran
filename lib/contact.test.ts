import { describe, expect, it } from 'vitest'
import { resolveWhatsappLink, telHref, whatsappHref } from '@/lib/contact'

describe('telHref', () => {
  it('strips spaces and punctuation from phone numbers', () => {
    expect(telHref('+92 348 1000767')).toBe('tel:+923481000767')
    expect(telHref('+92-348-1000767')).toBe('tel:+923481000767')
  })

  it('keeps a leading plus', () => {
    expect(telHref(' +92 300 ')).toBe('tel:+92300')
  })
})

describe('whatsappHref', () => {
  it('strips non-digits from the number', () => {
    expect(whatsappHref('+92 300-1234567')).toBe('https://wa.me/923001234567')
  })

  it('appends encoded prefill text when provided', () => {
    expect(whatsappHref('923001234567', 'السلام علیکم')).toBe(
      `https://wa.me/923001234567?text=${encodeURIComponent('السلام علیکم')}`,
    )
  })
})

describe('resolveWhatsappLink', () => {
  it('returns wa.me when a number is set', () => {
    expect(resolveWhatsappLink('+92-300-1111111')).toBe('https://wa.me/923001111111')
  })

  it('falls back to contact page when missing', () => {
    expect(resolveWhatsappLink(null)).toBe('/contact')
    expect(resolveWhatsappLink(undefined)).toBe('/contact')
    expect(resolveWhatsappLink('')).toBe('/contact')
  })
})
