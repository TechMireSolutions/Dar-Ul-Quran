import { describe, expect, it } from 'vitest'
import { cmsTypeTag, CMS_TAG, courseTag, postTag, serviceTag } from '@/lib/cache-tags'

describe('cache-tags', () => {
  it('exports cms tag constants', () => {
    expect(CMS_TAG).toBe('cms')
    expect(cmsTypeTag('course')).toBe('cms:course')
    expect(courseTag('nazra')).toBe('course:nazra')
    expect(serviceTag('nikah')).toBe('service:nikah')
    expect(postTag('ramadan')).toBe('post:ramadan')
  })
})
