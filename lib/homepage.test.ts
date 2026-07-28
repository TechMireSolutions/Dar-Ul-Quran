import { describe, expect, it } from 'vitest'
import { buildHomeHeroModel, resolveHomeCopy } from '@/lib/homepage'
import { DEFAULT_HOME_DESCRIPTION, DEFAULT_SITE_NAME_URDU } from '@/lib/seo'

describe('resolveHomeCopy', () => {
  it('falls back to defaults', () => {
    expect(resolveHomeCopy(null, null)).toEqual({
      title: DEFAULT_SITE_NAME_URDU,
      description: DEFAULT_HOME_DESCRIPTION,
    })
  })

  it('prefers site description then hero subtitle', () => {
    expect(
      resolveHomeCopy(
        { siteName: 'دار القرآن', description: 'سائٹ' },
        { heroSubtitle: 'ہیرو' },
      ),
    ).toEqual({ title: 'دار القرآن', description: 'سائٹ' })

    expect(resolveHomeCopy({ siteName: 'دار القرآن' }, { heroSubtitle: 'ہیرو' })).toEqual({
      title: 'دار القرآن',
      description: 'ہیرو',
    })
  })
})

describe('buildHomeHeroModel', () => {
  it('maps CMS fields and LCP image props', () => {
    const model = buildHomeHeroModel(
      {
        heroArabicText: 'عربی',
        heroTitle: 'خط\\nدو',
        heroSubtitle: 'سب',
        heroCta1Label: 'داخلہ',
        heroCta1Link: '/contact',
        aboutStat1Value: '۱',
        aboutStat1Label: 'طلبہ',
        heroImage: { asset: { _ref: 'image-1' } },
        heroImageLqip: 'data:blur',
      },
      () => ({
        src: '/hero.jpg',
        srcSet: '/hero.jpg 828w',
        sizes: '58vw',
        preloadHref: '/hero.jpg',
      }),
    )

    expect(model.title).toBe('خط\nدو')
    expect(model.heroImage).toBe('/hero.jpg')
    expect(model.preloadHref).toBe('/hero.jpg')
    expect(model.stats[0]).toEqual({ value: '۱', label: 'طلبہ' })
  })

  it('handles missing homepage settings', () => {
    const model = buildHomeHeroModel(null, null)
    expect(model.heroImage).toBeNull()
    expect(model.preloadHref).toBeNull()
    expect(model.stats).toHaveLength(3)
  })
})
