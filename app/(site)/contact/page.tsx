import type { Metadata } from 'next'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { Mail, Phone, MessageCircle, MapPin, Globe, Play } from 'lucide-react'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import { whatsappHref } from '@/lib/contact'
import { getCoursesForContactForm, getServicesForContactForm } from '@/sanity/lib/fetchers'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import ContactForm from './_components/ContactForm'
import Reveal from '@/components/ui/Reveal'

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

      <div className="py-8 sm:py-12 bg-slate-50/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {page?.body && (
            <Reveal animation="fade">
              <div className="prose prose-sm max-w-2xl mb-8 text-gray-700">
                <PortableText value={page.body} />
              </div>
            </Reveal>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-3">
              {contactItems.map(({ Icon, label, value, href }, i) => (
                <Reveal key={label} animation="left" delay={i * 70}>
                  <div className="flex items-start gap-3 sm:gap-3.5 bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-dq-50 border border-dq-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-dq-700" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 mb-0.5">{label}</p>
                      {href ? (
                        <Link href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                          className="text-[13px] text-slate-700 hover:text-dq-700 transition-colors break-all">
                          {value}
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
                        className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-dq-700 bg-white border border-gray-200 rounded-lg px-3 py-2 transition-colors">
                        <Globe size={13} /> فیس بک
                      </Link>
                    )}
                    {settings?.youtube && (
                      <Link href={settings.youtube} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-dq-700 bg-white border border-gray-200 rounded-lg px-3 py-2 transition-colors">
                        <Play size={13} /> یوٹیوب
                      </Link>
                    )}
                  </div>
                </Reveal>
              )}

              {contactItems.length === 0 && (
                <p className="text-[13px] text-gray-400 italic">سنیٹی اسٹوڈیو میں رابطہ کی تفصیلات شامل کریں۔</p>
              )}
            </div>

            {/* Form */}
            <Reveal animation="right" delay={100} className="lg:col-span-3">
              <div>
                <ContactForm
                  subjects={subjects}
                  submitLabel={submitLabel}
                  courses={courses  ?? []}
                  services={services ?? []}
                />
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </div>
  )
}
