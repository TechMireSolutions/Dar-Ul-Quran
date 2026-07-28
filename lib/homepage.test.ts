import { describe, expect, it } from 'vitest'
import { resolveHomeCopy } from '@/lib/homepage'
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
