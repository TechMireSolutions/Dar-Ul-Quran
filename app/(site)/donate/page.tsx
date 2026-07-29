import type { Metadata } from 'next'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import CmsPageShell from '@/components/layout/CmsPageShell'
import DonateContent from './_components/DonateContent'
import { PATHS, SECTION_LABELS } from '@/lib/paths'
import {
  DEFAULT_DONATE_ARABIC_VERSE,
  DEFAULT_DONATE_CAUSES,
  DEFAULT_DONATE_CLOSING_MESSAGE,
  DEFAULT_DONATE_CONTACT_LABEL,
  DEFAULT_DONATE_HOW_TO_HEADING,
  DEFAULT_DONATE_HOW_TO_TEXT,
  DEFAULT_DONATE_PAY_ONLINE_LABEL,
} from '@/lib/seo'
import { TW_CONTAINER_NARROW, TW_PAGE_BODY } from '@/lib/tailwind'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: 'donate',
    path: PATHS.donate,
    titleFallback: SECTION_LABELS.donate,
  })
}

export default async function DonatePage() {
  const { page, settings } = await fetchCmsPage('donate')

  const causes = settings?.donateCauses?.length
    ? settings.donateCauses
    : DEFAULT_DONATE_CAUSES

  const pageTitle = resolveSeoTitle(page, SECTION_LABELS.donate)
  const pageDescription = resolveSeoDescription(page)

  return (
    <CmsPageShell
      schemaTitle={pageTitle}
      schemaDescription={pageDescription}
      path={PATHS.donate}
      eyebrow={page?.eyebrow || 'عطا کیجیے'}
      title={page?.title || SECTION_LABELS.donate}
      subtitle={page?.subtitle || 'آپ کی سخاوت اہل بیت (ع) کے نور کو زندہ رکھتی ہے۔ ہر عطیہ — چھوٹا یا بڑا — فرق ڈالتا ہے۔'}
      maxWidth="5xl"
      align="center"
      topContent={
        <p className="text-[20px] sm:text-[22px] text-dq-700 mb-3 leading-none">
          {settings?.donateArabicVerse || DEFAULT_DONATE_ARABIC_VERSE}
        </p>
      }
    >
      <div className={TW_PAGE_BODY}>
        <div className={`${TW_CONTAINER_NARROW} lg:px-8`}>
          <DonateContent
            body={page?.body}
            causes={causes}
            howToHeading={settings?.donateHowToHeading || DEFAULT_DONATE_HOW_TO_HEADING}
            howToText={settings?.donateHowToText || DEFAULT_DONATE_HOW_TO_TEXT}
            donateUrl={settings?.donateUrl}
            payOnlineLabel={settings?.donatePayOnlineLabel || DEFAULT_DONATE_PAY_ONLINE_LABEL}
            contactLabel={settings?.donateContactLabel || DEFAULT_DONATE_CONTACT_LABEL}
            closingMessage={settings?.donateClosingMessage || DEFAULT_DONATE_CLOSING_MESSAGE}
          />
        </div>
      </div>
    </CmsPageShell>
  )
}
