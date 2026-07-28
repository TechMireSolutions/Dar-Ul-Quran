import { describe, expect, it } from 'vitest'
import {
  DEFAULT_SITE_NAME_URDU,
  resolveDocumentTitle,
  resolveOgImage,
  resolveSiteNameUrdu,
} from '@/lib/seo'

describe('resolveSiteNameUrdu', () => {
  it('returns CMS name when present', () => {
    expect(resolveSiteNameUrdu('دار القرآن')).toBe('دار القرآن')
  })

  it('falls back to the Urdu default', () => {
    expect(resolveSiteNameUrdu(undefined)).toBe(DEFAULT_SITE_NAME_URDU)
    expect(resolveSiteNameUrdu('')).toBe(DEFAULT_SITE_NAME_URDU)
    expect(resolveSiteNameUrdu('   ')).toBe(DEFAULT_SITE_NAME_URDU)
  })
})

describe('resolveOgImage', () => {
  it('prefers explicit image then fallback URL', () => {
    expect(resolveOgImage('https://a/page.jpg', 'https://a/logo.jpg')).toBe('https://a/page.jpg')
    expect(resolveOgImage(null, 'https://a/logo.jpg')).toBe('https://a/logo.jpg')
    expect(resolveOgImage(undefined, undefined)).toBeUndefined()
  })
})

describe('pageMetadata site name', () => {
  it('uses Urdu fallback when settings omit siteName', async () => {
    const { pageMetadata } = await import('@/lib/seo')
    const meta = pageMetadata({
      title: 'رابطہ',
      path: '/contact',
      settings: {},
    })
    expect(meta.openGraph?.siteName).toBe(DEFAULT_SITE_NAME_URDU)
    expect((meta.title as { absolute?: string }).absolute).toBe(
      `رابطہ | ${DEFAULT_SITE_NAME_URDU}`,
    )
  })
})

describe('resolveDocumentTitle', () => {
  it('keeps home title as site name alone', () => {
    expect(resolveDocumentTitle(DEFAULT_SITE_NAME_URDU, DEFAULT_SITE_NAME_URDU)).toBe(
      DEFAULT_SITE_NAME_URDU,
    )
  })

  it('appends site name once for plain titles', () => {
    expect(resolveDocumentTitle('رابطہ', DEFAULT_SITE_NAME_URDU)).toBe(
      `رابطہ | ${DEFAULT_SITE_NAME_URDU}`,
    )
  })

  it('does not double an existing brand suffix', () => {
    expect(
      resolveDocumentTitle(`بالغان | ${DEFAULT_SITE_NAME_URDU}`, DEFAULT_SITE_NAME_URDU),
    ).toBe(`بالغان | ${DEFAULT_SITE_NAME_URDU}`)
  })
})
