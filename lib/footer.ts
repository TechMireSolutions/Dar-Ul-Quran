import {
  buildFooterContactRows,
  buildFooterSocialLinks,
  CONTACT_EMPTY_MESSAGE,
  CONTACT_KIND_LABELS,
  type FooterContactRow,
  type FooterSocialLink,
} from '@/lib/contact'
import { flattenFooterQuickLinks, footerServiceLinks, withoutHref } from '@/lib/navigation'
import { PATHS, SECTION_LABELS } from '@/lib/paths'
import {
  DEFAULT_DONATE_CTA_LABEL,
  DEFAULT_TAGLINE,
  resolveSiteNameUrdu,
} from '@/lib/seo'
import type { FooterServiceDoc, NavNode, SiteSettingsDoc } from '@/lib/types'

/** Urdu chrome copy owned by the footer model. */
export const FOOTER_COPY = {
  landmark: 'ذیلی معلومات',
  quickLinks: 'فوری روابط',
  services: SECTION_LABELS.services,
  contact: 'ہم سے رابطہ',
  contactEmpty: CONTACT_EMPTY_MESSAGE,
  /** Derived from CONTACT_KIND_LABELS — do not hardcode separately. */
  whatsappPrefix: `${CONTACT_KIND_LABELS.whatsapp}:`,
  rights: 'تمام حقوق محفوظ ہیں۔',
} as const

/** Stable heading ids for aria-labelledby. */
export const FOOTER_IDS = {
  quickLinks: 'footer-quick-heading',
  services: 'footer-services-heading',
  contact: 'footer-contact-heading',
} as const

export function resolveTagline(tagline?: string | null): string {
  const trimmed = tagline?.trim()
  return trimmed || DEFAULT_TAGLINE
}

/** © YEAR Name۔ rights */
export function formatFooterCopyright(year: number, siteName: string, rights: string): string {
  return `© ${year} ${siteName}۔ ${rights}`
}

export type FooterModel = {
  siteName: string
  tagline: string
  quickLinks: NavNode[]
  services: Array<{ label: string; href: string }>
  socialLinks: FooterSocialLink[]
  contactRows: FooterContactRow[]
  donateHref: typeof PATHS.donate
  donateLabel: string
  showFabPad: boolean
  year: number
  copyright: string
  copy: typeof FOOTER_COPY
  ids: typeof FOOTER_IDS
}

/** Single footer view-model — chrome components should not reassemble this. */
export function buildFooterModel(input: {
  settings?: SiteSettingsDoc | null
  navItems?: NavNode[] | null
  footerServices?: FooterServiceDoc[] | null
}): FooterModel {
  const { settings, navItems, footerServices } = input
  const siteName = resolveSiteNameUrdu(settings?.siteName)
  const year = new Date().getFullYear()

  // Drop related-site URL (chip) and donate (CTA) from the quick-link list.
  const quickLinks = withoutHref(
    withoutHref(flattenFooterQuickLinks(navItems), settings?.darulQuranUrl),
    PATHS.donate,
  )

  return {
    siteName,
    tagline: resolveTagline(settings?.tagline),
    quickLinks,
    services: footerServiceLinks(footerServices),
    socialLinks: buildFooterSocialLinks(settings),
    contactRows: buildFooterContactRows(settings),
    donateHref: PATHS.donate,
    donateLabel: DEFAULT_DONATE_CTA_LABEL,
    showFabPad: Boolean(settings?.whatsapp),
    year,
    copyright: formatFooterCopyright(year, siteName, FOOTER_COPY.rights),
    copy: FOOTER_COPY,
    ids: FOOTER_IDS,
  }
}
