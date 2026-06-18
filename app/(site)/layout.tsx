import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButtonLazy'
import DeferredUrduFont from '@/components/ui/DeferredUrduFont'
import { safeFetch } from '@/sanity/lib/client'
import { siteSettingsQuery, headerNavQuery, footerServicesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { buildNavTree } from '@/lib/types'

export const revalidate = 300

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, headerNav, footerServices] = await Promise.all([
    safeFetch(siteSettingsQuery),
    safeFetch(headerNavQuery),
    safeFetch(footerServicesQuery),
  ])

  const logoUrl = settings?.logo
    ? urlFor(settings.logo).width(72).height(72).url()
    : null

  const navTree = buildNavTree(headerNav?.items)

  return (
    <>
      <a href="#main-content" className="skip-link">مرکزی مواد پر جائیں</a>
      <Header
        darulQuranUrl={settings?.darulQuranUrl}
        siteName={settings?.siteName}
        logoUrl={logoUrl}
        navItems={navTree}
        searchPlaceholder={settings?.searchPlaceholder}
      />
      <main id="main-content" aria-label="مرکزی مواد" className="min-h-screen">{children}</main>
      <Footer
        settings={settings}
        logoUrl={logoUrl}
        navItems={navTree}
        footerServices={footerServices}
      />
      {settings?.whatsapp && <WhatsAppButton number={settings.whatsapp} />}
      <DeferredUrduFont />
    </>
  )
}
