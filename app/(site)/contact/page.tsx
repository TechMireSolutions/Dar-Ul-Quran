import type { Metadata } from 'next'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Mail, Phone, MessageCircle, MapPin, Globe, Play } from 'lucide-react'
import RichTextBody from '@/components/content/RichTextBody'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import { whatsappHref } from '@/lib/contact'
import { getCoursesForContactForm, getServicesForContactForm } from '@/sanity/lib/fetchers'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import ContactForm from './_components/ContactForm'
import Reveal from '@/components/ui/Reveal'
import { TW_CONTACT_INFO_ROW, TW_CONTACT_SOCIAL_CHIP, TW_CONTAINER_WIDE, TW_FEATURE_ICON, TW_PAGE_BODY } from '@/lib/tailwind'

export const revalidate = 300

type ContactInfoItem = {
  Icon: LucideIcon
  label: string
  value: string
  href: string | null
}

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: 'contact',
    path: '/contact',
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
    settings?.phone    && { Icon: Phone,         label: 'فون',      value: settings.phone,    href: `tel:${settings.phone}` },
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
    <div>
      <WebPageSchema title={pageTitle} description={pageDescription} path="/contact" />
      <PageHeroHeader
        eyebrow={page?.eyebrow || 'رابطہ کیجیے'}
        title={page?.title || 'ہم سے رابطہ کریں'}
        subtitle={page?.subtitle || 'خدمات، کورسز یا عام پوچھ گچھ کے لیے ہم سے رابطہ کریں'}
        maxWidth="6xl"
      />

      <div className={TW_PAGE_BODY}>
        <div className={TW_CONTAINER_WIDE}>

          {page?.body && (
            <Reveal animation="fade">
              <RichTextBody value={page.body} size="sm" className="max-w-2xl mb-8" />
            </Reveal>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-3">
              {contactItems.map(({ Icon, label, value, href }, i) => (
                <Reveal key={label} animation="left" delay={i * 70}>
                  <div className={TW_CONTACT_INFO_ROW}>
                    <div className={`${TW_FEATURE_ICON} mb-0 shrink-0`}>
                      <Icon size={14} className="text-dq-700" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-normal text-gray-400 mb-0.5">{label}</p>
                      {href ? (
                        <Link href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center text-[13px] text-slate-700 hover:text-dq-700 focus-visible:text-dq-700 transition-colors break-all"
                          {...(label === 'ای میل' || label === 'فون' || label === 'واٹس ایپ' ? { dir: 'ltr' as const } : {})}>
                          <bdi>{value}</bdi>
                        </Link>
                      ) : (
                        <p className="text-[13px] text-slate-700 whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}

              {(settings?.facebook || settings?.youtube) && (
                <Reveal animation="up" delay={contactItems.length * 70}>
                  <div className="flex gap-2 pt-1">
                    {settings?.facebook && (
                      <Link href={settings.facebook} target="_blank" rel="noopener noreferrer"
                        className={TW_CONTACT_SOCIAL_CHIP}>
                        <Globe size={13} /> فیس بک
                      </Link>
                    )}
                    {settings?.youtube && (
                      <Link href={settings.youtube} target="_blank" rel="noopener noreferrer"
                        className={TW_CONTACT_SOCIAL_CHIP}>
                        <Play size={13} /> یوٹیوب
                      </Link>
                    )}
                  </div>
                </Reveal>
              )}

              {contactItems.length === 0 && (
                <p className="text-[13px] text-gray-400 italic">رابطہ کی تفصیلات جلد دستیاب ہوں گی۔</p>
              )}
            </div>

            {/* Form */}
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
    </div>
  )
}
