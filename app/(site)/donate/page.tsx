import type { Metadata } from 'next'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import CmsPageShell from '@/components/layout/CmsPageShell'
import DonateContent from './_components/DonateContent'
import { PATHS } from '@/lib/paths'
import { DEFAULT_SITE_NAME_URDU } from '@/lib/seo'
import { TW_CONTAINER_NARROW, TW_PAGE_BODY } from '@/lib/tailwind'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: 'donate',
    path: PATHS.donate,
    titleFallback: 'عطیہ',
  })
}

export default async function DonatePage() {
  const { page, settings } = await fetchCmsPage('donate')

  const causes: { title: string; desc: string }[] = settings?.donateCauses?.length
    ? settings.donateCauses
    : [
        { title: 'عمومی عطیہ', desc: `${DEFAULT_SITE_NAME_URDU} کے مجموعی مشن میں معاونت` },
        { title: 'قرآنی تعلیم', desc: 'بچوں کی مفت قرآنی کلاسوں کی مالی معاونت' },
        { title: 'محرم پروگرامز', desc: 'مجالس اور عزاداری کی تقاریب منظم کرنے میں مدد' },
        { title: `${DEFAULT_SITE_NAME_URDU} معاونت`, desc: 'ہمارے قرآنی ادارے میں حصہ ڈالیں' },
      ]

  const pageTitle = resolveSeoTitle(page, 'عطیہ')
  const pageDescription = resolveSeoDescription(page)

  return (
    <CmsPageShell
      schemaTitle={pageTitle}
      schemaDescription={pageDescription}
      path={PATHS.donate}
      eyebrow={page?.eyebrow || 'عطا کیجیے'}
      title={page?.title || 'عطیہ'}
      subtitle={page?.subtitle || 'آپ کی سخاوت اہل بیت (ع) کے نور کو زندہ رکھتی ہے۔ ہر عطیہ — چھوٹا یا بڑا — فرق ڈالتا ہے۔'}
      maxWidth="5xl"
      align="center"
      topContent={
        <p className="text-[20px] sm:text-[22px] text-dq-700 mb-3 leading-none">
          {settings?.donateArabicVerse || 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ'}
        </p>
      }
    >
      <div className={TW_PAGE_BODY}>
        <div className={`${TW_CONTAINER_NARROW} lg:px-8`}>
          <DonateContent
            body={page?.body}
            causes={causes}
            howToHeading={settings?.donateHowToHeading || 'عطیہ کیسے دیں'}
            howToText={settings?.donateHowToText || 'بینک ٹرانسفر کی تفصیل کے لیے ہم سے رابطہ کریں یا نیچے آنلائن ادائیگی کا لنک استعمال کریں۔'}
            donateUrl={settings?.donateUrl}
            payOnlineLabel={settings?.donatePayOnlineLabel || 'آنلائن عطیہ دیں'}
            contactLabel={settings?.donateContactLabel || 'ہم سے رابطہ کریں'}
            closingMessage={settings?.donateClosingMessage || 'جزاک اللہ خیر — اللہ (سبحانہ و تعالیٰ) آپ کے عطیات قبول فرمائے۔'}
          />
        </div>
      </div>
    </CmsPageShell>
  )
}
