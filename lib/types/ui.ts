/** Carousel card item — shared by homepage helpers and CarouselSection */
export type CarouselItem = {
  id: string
  image?: string | null
  title: string
  description?: string | null
  href: string
  badge?: string | null
  ctaLabel?: string
}
