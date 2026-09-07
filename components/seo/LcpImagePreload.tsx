/** Hoisted to document head by Next.js — starts LCP image fetch before body parse. */
type LcpImagePreloadProps = {
  href?: string | null
  /** Scope preload to matching viewport — use `(min-width: 768px)` when image is desktop-only. */
  media?: string
  imageSrcSet?: string
  imageSizes?: string
}

export default function LcpImagePreload({ href, media, imageSrcSet, imageSizes }: LcpImagePreloadProps) {
  if (!href && !imageSrcSet) return null
  return (
    <link
      rel="preload"
      as="image"
      href={imageSrcSet ? undefined : (href || undefined)}
      imageSrcSet={imageSrcSet}
      imageSizes={imageSizes}
      fetchPriority="high"
      {...(media ? { media } : {})}
    />
  )
}
