/** Normalize a phone number into a tel: href (digits and leading + only). */
export function telHref(number: string): string {
  return `tel:${number.trim().replace(/[^\d+]/g, '')}`
}

/** Normalize a phone/WhatsApp number into a wa.me link. */
export function whatsappHref(number: string, text?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, '')}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

/** Site WhatsApp link or contact page fallback. */
export function resolveWhatsappLink(whatsapp?: string | null): string {
  return whatsapp ? whatsappHref(String(whatsapp)) : '/contact'
}
