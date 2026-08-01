import { describe, expect, it } from 'vitest'
import { CONTACT_KIND_LABELS } from '@/lib/contact'
import { buildFooterModel, FOOTER_COPY, formatFooterCopyright, resolveTagline } from '@/lib/footer'
import { DEFAULT_DONATE_CTA_LABEL, DEFAULT_SITE_NAME_URDU, DEFAULT_TAGLINE } from '@/lib/seo'
import { PATHS, SECTION_LABELS } from '@/lib/paths'

describe('FOOTER_COPY', () => {
  it('derives services and WhatsApp labels from shared authorities', () => {
    expect(FOOTER_COPY.services).toBe(SECTION_LABELS.services)
    expect(FOOTER_COPY.whatsappPrefix).toBe(`${CONTACT_KIND_LABELS.whatsapp}:`)
    expect(FOOTER_COPY.contactEmpty.length).toBeGreaterThan(0)
  })
})

describe('resolveTagline', () => {
  it('uses CMS tagline when present', () => {
    expect(resolveTagline(' حسبنا اللہ ')).toBe('حسبنا اللہ')
  })

  it('falls back to DEFAULT_TAGLINE', () => {
    expect(resolveTagline(undefined)).toBe(DEFAULT_TAGLINE)
    expect(resolveTagline('')).toBe(DEFAULT_TAGLINE)
  })
})

describe('formatFooterCopyright', () => {
  it('formats year, name, and rights', () => {
    expect(formatFooterCopyright(2026, 'دار القرآن', FOOTER_COPY.rights)).toBe(
      `© 2026 دار القرآن۔ ${FOOTER_COPY.rights}`,
    )
  })
})

describe('buildFooterModel', () => {
  it('assembles chrome defaults from empty CMS inputs', () => {
    const model = buildFooterModel({})
    expect(model.siteName).toBe(DEFAULT_SITE_NAME_URDU)
    expect(model.tagline).toBe(DEFAULT_TAGLINE)
    expect(model.donateHref).toBe(PATHS.donate)
    expect(model.donateLabel).toBe(DEFAULT_DONATE_CTA_LABEL)
    expect(model.copy).toEqual(FOOTER_COPY)
    expect(model.copyright).toBe(
      formatFooterCopyright(model.year, DEFAULT_SITE_NAME_URDU, FOOTER_COPY.rights),
    )
    expect(model.quickLinks[0]?.href).toBe(PATHS.home)
    expect(model.services.length).toBeGreaterThan(0)
    expect(model.contactRows).toEqual([])
    expect(model.showFabPad).toBe(false)
  })

  it('sets showFabPad when WhatsApp is configured', () => {
    expect(buildFooterModel({ settings: { whatsapp: '+92 300' } }).showFabPad).toBe(true)
  })

  it('wires settings and drops donate + related URLs from quick links', () => {
    const model = buildFooterModel({
      settings: {
        siteName: 'دار القرآن',
        tagline: 'خدمت',
        email: 'a@b.com',
        whatsapp: '+92 300',
        facebook: 'https://fb.example',
        darulQuranUrl: 'https://aabtaab.com',
      },
      navItems: [
        { label: 'رابطہ', href: PATHS.contact },
        { label: 'عطیات', href: PATHS.donate },
        { label: 'بیرونی', href: 'https://aabtaab.com/', external: true },
      ],
      footerServices: [{ _id: '1', title: 'قربانی', slug: 'qurbani' }],
    })

    expect(model.siteName).toBe('دار القرآن')
    expect(model.tagline).toBe('خدمت')
    expect(model.showFabPad).toBe(true)
    expect(model.contactRows.map((r) => r.kind)).toEqual(['email'])
    expect(model.socialLinks.map((l) => l.kind)).toEqual(['facebook', 'related'])
    expect(model.quickLinks.some((l) => l.href.includes('aabtaab'))).toBe(false)
    expect(model.quickLinks.some((l) => l.href === PATHS.donate)).toBe(false)
    expect(model.services).toEqual([{ label: 'قربانی', href: '/services/qurbani' }])
  })
})
