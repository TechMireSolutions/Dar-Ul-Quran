import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { safeFetch } from '@/sanity/lib/client'
import { siteSettingsQuery, headerNavQuery, footerServicesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 300

interface NavNode {
  label:     string
  href:      string
  external?: boolean
  children?: NavNode[]
}

interface RawNavItem {
  label?:    string
  href?:     string
  external?: boolean
  children?: RawNavItem[]
}

function toNavNode(item: RawNavItem): NavNode {
  return {
    label:    item.label ?? '',
    href:     item.href  || '#',
    external: !!item.external,
    children: item.children?.length ? item.children.map(toNavNode) : undefined,
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, headerNav, footerServices] = await Promise.all([
    safeFetch(siteSettingsQuery),
    safeFetch(headerNavQuery),
    safeFetch(footerServicesQuery),
  ])

  const logoUrl = settings?.logo
    ? urlFor(settings.logo).width(72).height(72).url()
    : null

  const navTree = headerNav?.items?.length
    ? headerNav.items.map(toNavNode)
    : undefined

  return (
    <>
      <Header
        darulQuranUrl={settings?.darulQuranUrl}
        siteName={settings?.siteName}
        logoUrl={logoUrl}
        navItems={navTree}
        searchPlaceholder={settings?.searchPlaceholder}
      />
      <main className="min-h-screen">{children}</main>
      <Footer
        settings={settings}
        logoUrl={logoUrl}
        navItems={navTree}
        footerServices={footerServices}
      />
      {settings?.whatsapp && <WhatsAppButton number={settings.whatsapp} />}
    </>
  )
}
