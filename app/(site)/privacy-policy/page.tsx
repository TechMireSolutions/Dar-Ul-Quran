import type { Metadata } from 'next'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import { PATHS, SECTION_LABELS } from '@/lib/paths'
import CmsPageShell from '@/components/layout/CmsPageShell'
import RichTextBody from '@/components/content/RichTextBody'
import Reveal from '@/components/ui/Reveal'
import {
  TW_CONTAINER_NARROW,
  TW_PAGE_BODY,
} from '@/lib/tailwind'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: 'privacy-policy',
    path: PATHS.privacy,
    titleFallback: SECTION_LABELS.privacy,
  })
}

export default async function PrivacyPolicyPage() {
  const { page } = await fetchCmsPage('privacy-policy')

  const pageTitle = resolveSeoTitle(page, SECTION_LABELS.privacy)
  const pageDescription = resolveSeoDescription(page)

  return (
    <CmsPageShell
      schemaTitle={pageTitle}
      schemaDescription={pageDescription}
      path={PATHS.privacy}
      eyebrow={page?.eyebrow || 'قانونی معلومات'}
      title={page?.title || SECTION_LABELS.privacy}
      subtitle={page?.subtitle || 'ہماری پرائیویسی پالیسی کے بارے میں جانیے'}
      maxWidth="3xl"
    >
      <div className={`${TW_PAGE_BODY} transition-colors`}>
        <div className={`${TW_CONTAINER_NARROW} lg:px-8`}>
          {page?.body ? (
            <Reveal animation="fade">
              <RichTextBody value={page.body} />
            </Reveal>
          ) : (
            <Reveal animation="fade">
              <div className="prose prose-slate dark:prose-invert prose-p:leading-urdu">
                <p dir="rtl" className="text-center text-gray-500 py-12">
                  پرائیویسی پالیسی کا تفصیلی مواد جلد ہی یہاں اپ ڈیٹ کر دیا جائے گا۔ دارالقرآن اپنے صارفین کی معلومات کو محفوظ رکھنے اور ان کی رازداری کا احترام کرنے کے لیے پرعزم ہے۔
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </CmsPageShell>
  )
}
