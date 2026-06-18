/** Normalize a phone/WhatsApp number into a wa.me link. */
export function whatsappHref(number: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}`
}
