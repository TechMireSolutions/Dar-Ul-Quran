import { describe, expect, it } from 'vitest'
import { mergeFaqForDisplay, mergeFaqItems } from '@/lib/topicCluster'

describe('mergeFaqItems', () => {
  const page = [
    { question: 'فیس کتنی ہے؟', answer: 'ماہانہ' },
    { question: 'دورانیہ؟', answer: '۳ ماہ' },
  ]
  const cluster = [
    { question: 'فیس کتنی ہے؟', answer: 'کلسٹر جواب' },
    { question: 'کیسے داخلہ لیں؟', answer: 'رابطہ کریں' },
  ]

  it('returns page items when cluster is empty', () => {
    expect(mergeFaqItems(page, undefined)).toEqual(page)
    expect(mergeFaqItems(page, [])).toEqual(page)
  })

  it('returns cluster items when page is empty', () => {
    expect(mergeFaqItems(undefined, cluster)).toEqual(cluster)
    expect(mergeFaqItems([], cluster)).toEqual(cluster)
  })

  it('merges without duplicate questions (case/trim insensitive)', () => {
    expect(
      mergeFaqItems(page, [
        { question: '  فیس کتنی ہے؟  ', answer: 'duplicate' },
        { question: 'کیسے داخلہ لیں؟', answer: 'رابطہ کریں' },
      ]),
    ).toEqual([
      ...page,
      { question: 'کیسے داخلہ لیں؟', answer: 'رابطہ کریں' },
    ])
  })
})

describe('mergeFaqForDisplay', () => {
  const pageBlocks = [
    { question: 'فیس کتنی ہے؟', answer: [{ _type: 'block', children: [] }] },
  ]
  const cluster = [
    { question: 'فیس کتنی ہے؟', answer: 'کلسٹر جواب' },
    { question: 'کیسے داخلہ لیں؟', answer: 'رابطہ کریں' },
  ]

  it('keeps Portable Text page answers and appends new cluster FAQs', () => {
    expect(mergeFaqForDisplay(pageBlocks, cluster)).toEqual([
      pageBlocks[0],
      { question: 'کیسے داخلہ لیں؟', answer: 'رابطہ کریں' },
    ])
  })

  it('returns cluster-only when page FAQ is empty', () => {
    expect(mergeFaqForDisplay(undefined, cluster)).toEqual(cluster)
    expect(mergeFaqForDisplay([], cluster)).toEqual(cluster)
  })

  it('returns page-only when cluster is empty', () => {
    expect(mergeFaqForDisplay(pageBlocks, undefined)).toEqual(pageBlocks)
    expect(mergeFaqForDisplay(pageBlocks, [])).toEqual(pageBlocks)
  })
})
