import { describe, expect, it } from 'vitest'
import {
  buildFooterContactRows,
  buildFooterSocialLinks,
  externalLinkAttrs,
  resolveWhatsappLink,
  telHref,
  whatsappHref,
} from '@/lib/contact'

describe('telHref', () => {
  it('strips spaces and punctuation from phone numbers', () => {
    expect(telHref('+92 348 1000767')).toBe('tel:+923481000767')
    expect(telHref('+92-348-1000767')).toBe('tel:+923481000767')
  })

  it('keeps a leading plus', () => {
    expect(telHref(' +92 300 ')).toBe('tel:+92300')
  })
})

describe('externalLinkAttrs', () => {
  it('sets safe new-tab attrs and optional Urdu aria-label', () => {
    expect(externalLinkAttrs()).toEqual({
      target: '_blank',
      rel: 'noopener noreferrer',
    })
    expect(externalLinkAttrs('فیس بک')['aria-label']).toBe('فیس بک (نئی ونڈو میں کھلتا ہے)')
  })
})

describe('buildFooterContactRows', () => {
  it('builds rows in stable order and skips empties', () => {
    expect(
      buildFooterContactRows({
        email: 'a@b.com',
        phone: '+92 300',
        whatsapp: '+92 300',
        address: 'کراچی',
      }),
    ).toEqual([
      { kind: 'email', href: 'mailto:a@b.com', value: 'a@b.com' },
      { kind: 'phone', href: 'tel:+92300', value: '+92 300' },
      { kind: 'whatsapp', href: 'https://wa.me/92300', value: '+92 300' },
      { kind: 'address', href: null, value: 'کراچی' },
    ])
    expect(buildFooterContactRows(null)).toEqual([])
  })
})

describe('buildFooterSocialLinks', () => {
  it('includes related chip with provided label', () => {
    expect(
      buildFooterSocialLinks(
        { facebook: 'https://fb.example', darulQuranUrl: 'https://aabtaab.com' },
        'متعلقہ ویب سائٹ',
      ),
    ).toEqual([
      { kind: 'facebook', href: 'https://fb.example', label: 'فیس بک' },
      { kind: 'related', href: 'https://aabtaab.com', label: 'متعلقہ ویب سائٹ' },
    ])
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
