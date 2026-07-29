import Link from 'next/link'
import type { Metadata } from 'next'
import { pageMetadata, DEFAULT_SITE_NAME_URDU } from '@/lib/seo'
import { HOME_LABEL, PATHS } from '@/lib/paths'
import { TW_BODY_MUTED, TW_BTN_PRIMARY, TW_EYEBROW, TW_PAGE_TITLE } from '@/lib/tailwind'

export const metadata: Metadata = pageMetadata({
  title: 'صفحہ نہیں ملا',
  description: `یہ صفحہ موجود نہیں ہے۔ ${DEFAULT_SITE_NAME_URDU} کی دیگر صفحات دیکھیں۔`,
  path: PATHS.notFound,
  noIndex: true,
  siteName: DEFAULT_SITE_NAME_URDU,
})

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className={`${TW_EYEBROW} mb-3`}>۴۰۴</p>
      <h1 className={`${TW_PAGE_TITLE} mb-3`}>صفحہ نہیں ملا</h1>
      <p className={`${TW_BODY_MUTED} mb-8 max-w-md`}>
        جس صفحے کی آپ تلاش کر رہے ہیں وہ موجود نہیں ہے یا منتقل ہو چکا ہے۔
      </p>
      <Link
        href={PATHS.home}
        className={TW_BTN_PRIMARY}
      >
        {HOME_LABEL} پر واپس جائیں
      </Link>
    </div>
  )
}
