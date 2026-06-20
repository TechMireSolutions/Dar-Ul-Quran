/** Matches Tailwind `md` and mobile Reveal / hero breakpoints. */
export const MOBILE_MEDIA = '(max-width: 767px)'

export function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(MOBILE_MEDIA).matches
}
