/** Hoisted to document head by Next.js — starts LCP image fetch before body parse. */
type LcpImagePreloadProps = { href: string }

export default function LcpImagePreload({ href }: LcpImagePreloadProps) {
  return <link rel="preload" as="image" href={href} fetchPriority="high" />
}
