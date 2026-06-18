/** Hoisted to document head by Next.js — starts LCP image fetch before body parse. */
export default function LcpImagePreload({ href }: { href: string }) {
  return <link rel="preload" as="image" href={href} fetchPriority="high" />
}
