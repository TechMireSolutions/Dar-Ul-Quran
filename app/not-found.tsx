import Link from 'next/link'
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'صفحہ نہیں ملا',
  description: 'یہ صفحہ موجود نہیں ہے۔ دار القرآن کی دیگر صفحات دیکھیں۔',
  path: '/404',
  noIndex: true,
})

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-dq-600 mb-3">۴۰۴</p>
      <h1 className="font-bold text-[26px] sm:text-[32px] text-slate-900 mb-3">صفحہ نہیں ملا</h1>
      <p className="text-[14px] text-gray-500 mb-8 max-w-md">
        جس صفحے کی آپ تلاش کر رہے ہیں وہ موجود نہیں ہے یا منتقل ہو چکا ہے۔
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl bg-dq-600 text-white text-[14px] font-semibold hover:bg-dq-700 transition-colors"
      >
        صفحۂ اول پر واپس جائیں
      </Link>
    </div>
  )
}
