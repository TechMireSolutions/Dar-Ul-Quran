'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { TW_BTN_PRIMARY, TW_BTN_SECONDARY, TW_EYEBROW, TW_PAGE_TITLE } from '@/lib/tailwind'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className={`${TW_EYEBROW} mb-3`}>خرابی</p>
      <h1 className={`${TW_PAGE_TITLE} mb-3`}>کچھ غلط ہو گیا</h1>
      <p className="text-[14px] text-gray-500 mb-8 max-w-md">
        صفحہ لوڈ نہیں ہو سکا۔ براہِ کرم دوبارہ کوشش کریں یا صفحۂ اول پر واپس جائیں۔
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className={TW_BTN_PRIMARY}
        >
          دوبارہ کوشش کریں
        </button>
        <Link
          href="/"
          className={TW_BTN_SECONDARY}
        >
          صفحۂ اول
        </Link>
      </div>
    </div>
  )
}
