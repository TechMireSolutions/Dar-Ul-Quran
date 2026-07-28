import { describe, expect, it } from 'vitest'
import { cmsTypeTag, CMS_TAG, courseTag, postTag, serviceTag } from '@/lib/cache-tags'

describe('cache-tags', () => {
  it('exports the shared cms root tag', () => {
    expect(CMS_TAG).toBe('cms')
  })

  it('builds type, course, service, and post tags', () => {
    expect(cmsTypeTag('course')).toBe('cms:course')
    expect(cmsTypeTag('post')).toBe('cms:post')
    expect(courseTag('nazra')).toBe('course:nazra')
    expect(serviceTag('nikah')).toBe('service:nikah')
    expect(postTag('ramadan')).toBe('post:ramadan')
  })

  it('preserves nested slug segments in tag ids', () => {
    expect(courseTag('fiqh/usul')).toBe('course:fiqh/usul')
    expect(serviceTag('zakat/fitrana')).toBe('service:zakat/fitrana')
  })
})
