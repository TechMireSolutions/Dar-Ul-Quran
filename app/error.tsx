'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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
      <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">خرابی</p>
      <h1 className="font-bold text-[26px] sm:text-[32px] text-slate-900 mb-3">کچھ غلط ہو گیا</h1>
      <p className="text-[14px] text-gray-500 mb-8 max-w-md">
        صفحہ لوڈ نہیں ہو سکا۔ براہِ کرم دوبارہ کوشش کریں یا صفحۂ اول پر واپس جائیں۔
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl bg-dq-600 text-white text-[14px] font-semibold hover:bg-dq-700 transition-colors"
        >
          دوبارہ کوشش کریں
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl border border-gray-200 text-slate-700 text-[14px] font-semibold hover:bg-gray-50 transition-colors"
        >
          صفحۂ اول
        </Link>
      </div>
    </div>
  )
}
