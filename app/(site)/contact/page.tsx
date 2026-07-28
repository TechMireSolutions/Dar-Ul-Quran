import type { Metadata } from 'next'
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import RichTextBody from '@/components/content/RichTextBody'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import { whatsappHref, telHref } from '@/lib/contact'
import { PATHS } from '@/lib/paths'
import { getCoursesForContactForm, getServicesForContactForm } from '@/sanity/lib/fetchers'
import CmsPageShell from '@/components/layout/CmsPageShell'
import ContactForm from './_components/ContactForm'
import ContactInfo, { type ContactInfoItem } from './_components/ContactInfo'
import Reveal from '@/components/ui/Reveal'
import { TW_CONTAINER_WIDE, TW_PAGE_BODY } from '@/lib/tailwind'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: 'contact',
    path: PATHS.contact,
    titleFallback: 'رابطہ کریں',
  })
}

export default async function ContactPage() {
  const [{ page, settings }, courses, services] = await Promise.all([
    fetchCmsPage('contact'),
    getCoursesForContactForm(),
    getServicesForContactForm(),
  ])

  const contactItems = [
    settings?.email    && { Icon: Mail,          label: 'ای میل',   value: settings.email,    href: `mailto:${settings.email}` },
    settings?.phone    && { Icon: Phone,         label: 'فون',      value: settings.phone,    href: telHref(settings.phone) },
    settings?.whatsapp && { Icon: MessageCircle, label: 'واٹس ایپ', value: settings.whatsapp, href: whatsappHref(settings.whatsapp) },
    settings?.address  && { Icon: MapPin,        label: 'پتہ',      value: settings.address,  href: null },
  ].filter(Boolean) as ContactInfoItem[]

  const subjects: string[] = settings?.contactFormSubjects?.length
    ? settings.contactFormSubjects
    : ['عام پوچھ گچھ', 'کورس داخلہ', 'خدمت کی درخواست', 'عطیہ']

  const submitLabel: string = settings?.contactFormSubmitLabel || 'پیغام بھیجیں'

  const pageTitle = resolveSeoTitle(page, 'ہم سے رابطہ کریں')
  const pageDescription = resolveSeoDescription(page)

  return (
    <CmsPageShell
      schemaTitle={pageTitle}
      schemaDescription={pageDescription}
      path={PATHS.contact}
      eyebrow={page?.eyebrow || 'رابطہ کیجیے'}
      title={page?.title || 'ہم سے رابطہ کریں'}
      subtitle={page?.subtitle || 'خدمات، کورسز یا عام پوچھ گچھ کے لیے ہم سے رابطہ کریں'}
      maxWidth="6xl"
    >
      <div className={TW_PAGE_BODY}>
        <div className={TW_CONTAINER_WIDE}>
          {page?.body && (
            <Reveal animation="fade">
              <RichTextBody value={page.body} size="sm" className="max-w-2xl mb-8" />
            </Reveal>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <ContactInfo
              items={contactItems}
              facebook={settings?.facebook}
              youtube={settings?.youtube}
            />

            <Reveal animation="right" delay={100} className="lg:col-span-3">
              <div>
                <ContactForm
                  submitLabel={submitLabel}
                  courses={courses ?? []}
                  services={services ?? []}
                  subjects={subjects}
                  turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </CmsPageShell>
  )
}
