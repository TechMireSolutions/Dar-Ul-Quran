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
    slug: 'terms-conditions',
    path: PATHS.terms,
    titleFallback: SECTION_LABELS.terms,
  })
}

export default async function TermsConditionsPage() {
  const { page } = await fetchCmsPage('terms-conditions')

  const pageTitle = resolveSeoTitle(page, SECTION_LABELS.terms)
  const pageDescription = resolveSeoDescription(page)

  return (
    <CmsPageShell
      schemaTitle={pageTitle}
      schemaDescription={pageDescription}
      path={PATHS.terms}
      eyebrow={page?.eyebrow || 'قانونی معلومات'}
      title={page?.title || SECTION_LABELS.terms}
      subtitle={page?.subtitle || 'ہماری شرائط و ضوابط'}
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
                  دارالقرآن کی شرائط و ضوابط کا تفصیلی مواد جلد ہی شائع کر دیا جائے گا۔ کسی بھی قسم کی رہنمائی یا سوال کے لیے آپ ہم سے براہ راست رابطہ کر سکتے ہیں۔
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </CmsPageShell>
  )
}
