import { PATHS } from '@/lib/paths'
import { DEFAULT_RELATED_SITE_LABEL } from '@/lib/seo'

/** Normalize a phone number into a tel: href (digits and leading + only). */
export function telHref(number: string): string {
  return `tel:${number.trim().replace(/[^\d+]/g, '')}`
}

/** target/rel (+ optional Urdu aria) for links that open a new tab. */
export function externalLinkAttrs(label?: string): {
  target: '_blank'
  rel: 'noopener noreferrer'
  'aria-label'?: string
} {
  return {
    target: '_blank',
    rel: 'noopener noreferrer',
    ...(label ? { 'aria-label': `${label} (نئی ونڈو میں کھلتا ہے)` } : {}),
  }
}

export type FooterContactRow =
  | { kind: 'email'; href: string; value: string }
  | { kind: 'phone'; href: string; value: string }
  | { kind: 'whatsapp'; href: string; value: string }
  | { kind: 'address'; href: null; value: string }

type FooterContactSource = {
  email?: string
  phone?: string
  whatsapp?: string
  address?: string
} | null | undefined

/** Contact rows for footer (and similar chrome). */
export function buildFooterContactRows(settings: FooterContactSource): FooterContactRow[] {
  const rows: FooterContactRow[] = []
  if (settings?.email) rows.push({ kind: 'email', href: `mailto:${settings.email}`, value: settings.email })
  if (settings?.phone) rows.push({ kind: 'phone', href: telHref(settings.phone), value: settings.phone })
  if (settings?.whatsapp) {
    rows.push({ kind: 'whatsapp', href: whatsappHref(settings.whatsapp), value: settings.whatsapp })
  }
  if (settings?.address) rows.push({ kind: 'address', href: null, value: settings.address })
  return rows
}

export type FooterSocialLink =
  | { kind: 'facebook'; href: string; label: 'فیس بک' }
  | { kind: 'youtube'; href: string; label: 'یوٹیوب' }
  | { kind: 'related'; href: string; label: string }

type FooterSocialSource = {
  facebook?: string
  youtube?: string
  darulQuranUrl?: string
} | null | undefined

/** Social / related-site chips for footer. */
export function buildFooterSocialLinks(
  settings: FooterSocialSource,
  relatedLabel: string = DEFAULT_RELATED_SITE_LABEL,
): FooterSocialLink[] {
  const links: FooterSocialLink[] = []
  if (settings?.facebook) links.push({ kind: 'facebook', href: settings.facebook, label: 'فیس بک' })
  if (settings?.youtube) links.push({ kind: 'youtube', href: settings.youtube, label: 'یوٹیوب' })
  if (settings?.darulQuranUrl) {
    links.push({ kind: 'related', href: settings.darulQuranUrl, label: relatedLabel })
  }
  return links
}

/** Normalize a phone/WhatsApp number into a wa.me link. */
export function whatsappHref(number: string, text?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, '')}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/** Site WhatsApp link or contact page fallback. */
export function resolveWhatsappLink(whatsapp?: string | null): string {
  return whatsapp ? whatsappHref(String(whatsapp)) : PATHS.contact
}
