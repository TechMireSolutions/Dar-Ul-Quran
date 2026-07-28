import type { Metadata } from 'next'
import { Mail, Phone, MessageCircle, MapPin, type LucideIcon } from 'lucide-react'
import RichTextBody from '@/components/content/RichTextBody'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import { buildFooterContactRows, CONTACT_KIND_LABELS, type FooterContactRow } from '@/lib/contact'
import { PATHS, SECTION_LABELS } from '@/lib/paths'
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
    titleFallback: SECTION_LABELS.contact,
  })
}

export default async function ContactPage() {
  const [{ page, settings }, courses, services] = await Promise.all([
    fetchCmsPage('contact'),
    getCoursesForContactForm(),
    getServicesForContactForm(),
  ])

  const contactIcons: Record<FooterContactRow['kind'], LucideIcon> = {
    email: Mail,
    phone: Phone,
    whatsapp: MessageCircle,
    address: MapPin,
  }
  const contactItems: ContactInfoItem[] = buildFooterContactRows(settings).map((row) => ({
    Icon: contactIcons[row.kind],
    label: CONTACT_KIND_LABELS[row.kind],
    value: row.value,
    href: row.href,
  }))

  const subjects: string[] = settings?.contactFormSubjects?.length
    ? settings.contactFormSubjects
    : ['عام پوچھ گچھ', 'کورس داخلہ', 'خدمت کی درخواست', 'عطیہ']

  const submitLabel: string = settings?.contactFormSubmitLabel || 'پیغام بھیجیں'

  const pageTitle = resolveSeoTitle(page, SECTION_LABELS.contact)
  const pageDescription = resolveSeoDescription(page)

  return (
    <CmsPageShell
      schemaTitle={pageTitle}
      schemaDescription={pageDescription}
      path={PATHS.contact}
      eyebrow={page?.eyebrow || 'رابطہ کیجیے'}
      title={page?.title || SECTION_LABELS.contact}
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
