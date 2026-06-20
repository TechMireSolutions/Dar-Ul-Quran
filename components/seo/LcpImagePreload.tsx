/** Hoisted to document head by Next.js — starts LCP image fetch before body parse. */
type LcpImagePreloadProps = {
  href: string
  /** Scope preload to matching viewport — use `(min-width: 768px)` when image is desktop-only. */
  media?: string
}

export default function LcpImagePreload({ href, media }: LcpImagePreloadProps) {
  return (
    <link
      rel="preload"
      as="image"
      href={href}
      fetchPriority="high"
      {...(media ? { media } : {})}
    />
  )
}
