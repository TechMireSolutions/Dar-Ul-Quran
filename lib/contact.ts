/** Normalize a phone/WhatsApp number into a wa.me link. */
export function whatsappHref(number: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}`
}

/** Site WhatsApp link or contact page fallback. */
export function resolveWhatsappLink(whatsapp?: string | null): string {
  return whatsapp ? whatsappHref(String(whatsapp)) : '/contact'
}
