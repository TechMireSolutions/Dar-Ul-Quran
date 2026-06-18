import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButtonLazy'
import DeferredUrduFont from '@/components/ui/DeferredUrduFont'
import { getSiteSettings, getHeaderNav, getFooterServices } from '@/sanity/lib/fetchers'
import { urlFor } from '@/sanity/lib/image'
import { buildNavTree } from '@/lib/types'

export const revalidate = 300

type SiteLayoutProps = { children: React.ReactNode }

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const [settings, headerNav, footerServices] = await Promise.all([
    getSiteSettings(),
    getHeaderNav(),
    getFooterServices(),
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
