import type { Metadata, Viewport } from 'next'
import { getSiteSettings } from '@/sanity/lib/fetchers'
import { urlFor, defaultOgImage } from '@/sanity/lib/image'
import SiteGraphSchema from '@/components/seo/SiteGraphSchema'
import { SITE_URL, DEFAULT_SITE_NAME_URDU, DEFAULT_SITE_DESCRIPTION, resolveSiteNameUrdu } from '@/lib/seo'
import './globals.css'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = new URL(SITE_URL)
  try {
    const settings = await getSiteSettings()

    const siteName   = resolveSiteNameUrdu(settings?.siteName)
    const faviconUrl = settings?.favicon ? urlFor(settings.favicon).width(256).height(256).url() : undefined
    const description = settings?.description || DEFAULT_SITE_DESCRIPTION
    const ogImageUrl = defaultOgImage(settings)

    return {
      metadataBase: baseUrl,
      title:       { default: siteName, template: `%s | ${siteName}` },
      description,
      icons:       faviconUrl ? { icon: faviconUrl, apple: faviconUrl } : undefined,
      verification: { google: 'HlwG4YjRAkH3E4L7nQg1wNUk4Qy8b8LCSd9ccfxgZto' },
      openGraph: {
        title: siteName,
        description,
        siteName,
        locale: 'ur_PK',
        type: 'website',
        ...(ogImageUrl
          ? { images: [{ url: ogImageUrl, width: 1200, height: 630, alt: siteName }] }
          : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title: siteName,
        description,
        ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
      },
      appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: siteName,
      },
      formatDetection: {
        telephone: true,
        email: true,
        address: false,
      },
    }
  } catch {
    return {
      metadataBase: baseUrl,
      title:       { default: DEFAULT_SITE_NAME_URDU, template: `%s | ${DEFAULT_SITE_NAME_URDU}` },
      description: DEFAULT_SITE_DESCRIPTION,
      verification: { google: 'HlwG4YjRAkH3E4L7nQg1wNUk4Qy8b8LCSd9ccfxgZto' },
      openGraph: {
        title: DEFAULT_SITE_NAME_URDU,
        description: DEFAULT_SITE_DESCRIPTION,
        siteName: DEFAULT_SITE_NAME_URDU,
        locale: 'ur_PK',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: DEFAULT_SITE_NAME_URDU,
        description: DEFAULT_SITE_DESCRIPTION,
      },
    }
  }
}

type RootLayoutProps = { children: React.ReactNode }

export default async function RootLayout({ children }: RootLayoutProps) {
  const settings = await getSiteSettings()
  const orgLogoUrl = settings?.logo
    ? urlFor(settings.logo).width(512).height(512).url()
    : settings?.favicon
      ? urlFor(settings.favicon).width(512).height(512).url()
      : `${SITE_URL}/favicon.ico`

  return (
    <html lang="ur" dir="rtl" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased leading-urdu" suppressHydrationWarning>
        <SiteGraphSchema
          siteName={settings?.siteName}
          description={settings?.description}
          email={settings?.email}
          phone={settings?.phone}
          logoUrl={orgLogoUrl}
        />
        {children}
      </body>
    </html>
  )
}
