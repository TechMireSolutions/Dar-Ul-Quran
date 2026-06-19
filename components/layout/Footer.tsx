import Link from 'next/link'
import { TW_CONTAINER, TW_CTA_ARROW, TW_FOOTER_DONATE_CTA } from '@/lib/tailwind'
import Image from 'next/image'
import { whatsappHref } from '@/lib/contact'
import type { NavNode, SiteSettingsDoc, FooterServiceDoc } from '@/lib/types'
import Reveal from '@/components/ui/Reveal'

function IconFacebook({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.932-1.956 1.888v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

function IconYoutube({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088C19.535 3.6 12 3.6 12 3.6s-7.535 0-9.407.517A3.007 3.007 0 0 0 .505 6.205 31.247 31.247 0 0 0 0 12a31.247 31.247 0 0 0 .505 5.795 3.007 3.007 0 0 0 2.088 2.088C4.465 20.4 12 20.4 12 20.4s7.535 0 9.407-.517a3.007 3.007 0 0 0 2.088-2.088A31.247 31.247 0 0 0 24 12a31.247 31.247 0 0 0-.505-5.795zM9.609 15.601V8.408L15.873 12z"/>
    </svg>
  )
}

function IconMail({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconPhone({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function IconMapPin({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconMessageCircle({ size = 12, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

function IconExternalLink({ size = 9 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

type FooterProps = {
  settings?:       SiteSettingsDoc | null
  logoUrl?:        string | null
  navItems?:       NavNode[]
  footerServices?: FooterServiceDoc[] | null
}

const FALLBACK_QUICK_LINKS: NavNode[] = [
  { label: 'ہوم',              href: '/' },
  { label: 'آنلائن کلاسز',    href: '/online-courses' },
  { label: 'خدمات',           href: '/services' },
  { label: 'مضامین',          href: '/articles' },
  { label: 'عطیہ',            href: '/donate' },
  { label: 'ہمارے بارے میں', href: '/about' },
  { label: 'رابطہ',           href: '/contact' },
]

const FALLBACK_SERVICES: FooterServiceDoc[] = [
  { _id: '1', title: 'نیابت زیارت', slug: 'niyabat-ziarat' },
  { _id: '2', title: 'زکوٰۃ',       slug: 'zakat' },
  { _id: '3', title: 'خمس',         slug: 'khums' },
  { _id: '4', title: 'اجارہ',       slug: 'ijara' },
  { _id: '5', title: 'کفارہ',       slug: 'expiation' },
  { _id: '6', title: 'قربانی',      slug: 'sacrifice' },
]

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2.5 sm:mb-4">
      {children}
    </h3>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-0 text-[12px] sm:text-[13px] text-gray-300 hover:text-dq-400 transition-colors duration-150"
      >
        <span className="inline-block w-0 overflow-hidden group-hover:w-3 transition-all duration-150 text-dq-400 text-[11px] leading-none">
          ›
        </span>
        {children}
      </Link>
    </li>
  )
}

export default function Footer({ settings, logoUrl, navItems, footerServices }: FooterProps) {
  const siteName   = settings?.siteName || 'دار القرآن'
  const tagline    = settings?.tagline  || 'اہل بیت (ع) کے نور کو تعلیم، مستند مواد اور روحانی خدمات کے ذریعے پھیلانا۔'
  const quickLinks = navItems?.length       ? navItems       : FALLBACK_QUICK_LINKS
  const services   = footerServices?.length ? footerServices.map(s => ({ label: s.title, href: `/services/${s.slug}` })) : FALLBACK_SERVICES.map(s => ({ label: s.title, href: `/services/${s.slug}` }))

  return (
    <footer className="bg-dq-900 border-t border-dq-800">

      {/* ── Main body ── */}
      <div className={`${TW_CONTAINER} py-6 sm:py-10 lg:py-12`}>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8 lg:gap-10">

          {/* Col 1 — Logo + Brand (full width on mobile) */}
          <Reveal animation="up" delay={0} className="col-span-2 lg:col-span-1">
            <div>
              <Link href="/" aria-label={siteName} className="inline-flex items-center gap-2.5 mb-3 group">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-dq-400 object-cover transition-transform duration-200 group-hover:scale-105 sm:w-[52px] sm:h-[52px]"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-[52px] sm:h-[52px] rounded-full bg-gradient-to-br from-dq-100 to-dq-200 border-2 border-dq-400 flex items-center justify-center text-xl sm:text-2xl select-none transition-transform duration-200 group-hover:scale-105" aria-hidden="true">
                    ⛵
                  </div>
                )}
                <span className="font-bold text-[16px] sm:text-[18px] text-white tracking-[-0.02em]">{siteName}</span>
              </Link>

              <p className="text-[12px] sm:text-[13px] text-gray-300 leading-relaxed mb-3 sm:mb-5 max-w-[280px] line-clamp-2 sm:line-clamp-none">
                {tagline}
              </p>

              {/* Social + external links */}
              <div className="flex items-center gap-2 flex-wrap">
                {settings?.facebook && (
                  <Link href={settings.facebook} target="_blank" rel="noopener noreferrer" aria-label="فیس بک"
                    className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-dq-800 border border-dq-700 flex items-center justify-center text-gray-300 hover:border-dq-400 hover:text-dq-300 transition-all duration-200">
                    <IconFacebook size={14} />
                  </Link>
                )}
                {settings?.youtube && (
                  <Link href={settings.youtube} target="_blank" rel="noopener noreferrer" aria-label="یوٹیوب"
                    className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-dq-800 border border-dq-700 flex items-center justify-center text-gray-300 hover:border-dq-400 hover:text-dq-300 transition-all duration-200">
                    <IconYoutube size={12} />
                  </Link>
                )}
                {settings?.darulQuranUrl && (
                  <Link href={settings.darulQuranUrl} target="_blank" rel="noopener noreferrer"
                    aria-label="دار القرآن (نئی ونڈو میں کھلتا ہے)"
                    className="flex items-center gap-1 text-[11px] font-medium text-gray-300 hover:text-dq-400 bg-dq-800 border border-dq-700 hover:border-dq-400 rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 transition-all duration-200">
                    دار القرآن <IconExternalLink size={9} />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>

          {/* Col 2 — Quick Links */}
          <Reveal animation="up" delay={80}>
            <nav aria-label="فوری روابط">
              <ColHeading>فوری روابط</ColHeading>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {quickLinks.map(({ label, href }) => (
                  <NavLink key={href} href={href}>{label}</NavLink>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Col 3 — Services */}
          <Reveal animation="up" delay={160}>
            <nav aria-label="خدمات">
              <ColHeading>خدمات</ColHeading>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {services.map(({ label, href }) => (
                  <NavLink key={href} href={href}>{label}</NavLink>
                ))}
              </ul>
            </nav>
          </Reveal>

          {/* Col 4 — Contact (full width on mobile) */}
          <Reveal animation="up" delay={240} className="col-span-2 lg:col-span-1"><div>
            <ColHeading>ہم سے رابطہ</ColHeading>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2 sm:gap-y-3">
              {settings?.email && (
                <li>
                  <Link href={`mailto:${settings.email}`}
                    className="flex items-center gap-2 text-[12px] sm:text-[12.5px] text-gray-300 hover:text-dq-400 transition-colors duration-150">
                    <IconMail size={12} className="text-dq-400 shrink-0" />
                    <span className="truncate">{settings.email}</span>
                  </Link>
                </li>
              )}
              {settings?.phone && (
                <li>
                  <Link href={`tel:${settings.phone}`}
                    className="flex items-center gap-2 text-[12px] sm:text-[12.5px] text-gray-300 hover:text-dq-400 transition-colors duration-150">
                    <IconPhone size={12} className="text-dq-400 shrink-0" />
                    {settings.phone}
                  </Link>
                </li>
              )}
              {settings?.whatsapp && (
                <li>
                  <Link href={whatsappHref(settings.whatsapp)}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[12px] sm:text-[12.5px] text-gray-300 hover:text-dq-400 transition-colors duration-150">
                    <IconMessageCircle size={12} className="text-dq-400 shrink-0" />
                    واٹس ایپ: {settings.whatsapp}
                  </Link>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-2">
                  <IconMapPin size={12} className="text-dq-400 shrink-0 mt-0.5" />
                  <p className="text-[12px] sm:text-[12.5px] text-gray-300 leading-relaxed whitespace-pre-line">
                    {settings.address}
                  </p>
                </li>
              )}
              {!settings?.email && !settings?.phone && !settings?.address && (
                <li className="text-[12px] text-gray-400 italic">
                  سنیٹی اسٹوڈیو میں رابطہ کی معلومات شامل کریں
                </li>
              )}
            </ul>

            <Link
              href="/donate"
              className={TW_FOOTER_DONATE_CTA}
            >
              ابھی عطیہ دیں
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
                className={TW_CTA_ARROW}>
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div></Reveal>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-dq-950 bg-dq-950">
        <div className={`${TW_CONTAINER} py-4 flex flex-col sm:flex-row items-center justify-between gap-2`}>
          <p className="text-[11.5px] text-gray-300">
            &copy; {new Date().getFullYear()} {siteName}۔ تمام حقوق محفوظ ہیں۔
          </p>
          <div className="flex items-center gap-1 text-dq-400">
            <Link href="/about"   className="px-3 py-2 text-[12px] text-gray-300 hover:text-white transition-colors">ہمارے بارے میں</Link>
            <span className="text-dq-400">·</span>
            <Link href="/contact" className="px-3 py-2 text-[12px] text-gray-300 hover:text-white transition-colors">رابطہ</Link>
            <span className="text-dq-400">·</span>
            <Link href="/donate"  className="px-3 py-2 text-[12px] text-gray-300 hover:text-white transition-colors">عطیہ</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
