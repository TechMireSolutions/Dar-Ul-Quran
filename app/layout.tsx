import type { Metadata, Viewport } from 'next'
import { Noto_Nastaliq_Urdu } from 'next/font/google'
import { safeFetch } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import './globals.css'

const urduFont = Noto_Nastaliq_Urdu({
  subsets:   ['arabic'],
  weight:    ['400', '700'],
  variable:  '--font-urdu',
  // 'optional' never causes CLS — font only shows if loaded within ~100ms.
  // 'preload: false' removes the <link rel="preload"> that competed with the
  // LCP hero image for bandwidth (Lighthouse reported 125ms waste from this).
  // The font will be downloaded lazily and used once cached on the next visit.
  display:   'optional',
  preload:   false,
  // Automatic fallback metric adjustment targets cap-height, but Nastaliq's
  // CLS source is ascent/descent — disable it and handle via globals.css.
  adjustFontFallback: false,
  fallback: [
    'Noto Nastaliq Urdu',      // Android system font — zero network cost
    'Jameel Noori Nastaleeq',  // Windows Urdu font
    'Geeza Pro',               // iOS / macOS Arabic fallback
    'serif',
  ],
})

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://darulquran.pk')
  try {
    const settings = await safeFetch(siteSettingsQuery)

    const siteName   = settings?.siteName   || 'Dar Ul Quran'
    const faviconUrl = settings?.favicon ? urlFor(settings.favicon).width(256).height(256).url() : undefined
    const description = settings?.description || 'اسلامی علم، آنلائن کورسز اور خدمات'

    return {
      metadataBase: baseUrl,
      title:       { default: siteName, template: `%s | ${siteName}` },
      description,
      icons:       faviconUrl ? { icon: faviconUrl, apple: faviconUrl } : undefined,
      verification: { google: 'HlwG4YjRAkH3E4L7nQg1wNUk4Qy8b8LCSd9ccfxgZto' },
      alternates: { canonical: '/' },
      openGraph: {
        title: siteName,
        description,
        siteName,
        locale: 'ur_PK',
        type: 'website',
        images: [{ url: `${baseUrl.origin}/og-default.jpg`, width: 1200, height: 630, alt: siteName }],
      },
      twitter: {
        card: 'summary_large_image',
        title: siteName,
        description,
      },
    }
  } catch {
    return {
      metadataBase: baseUrl,
      title:       { default: 'دار القرآن', template: '%s | دار القرآن' },
      description: 'اسلامی علم، آنلائن کورسز اور خدمات',
      verification: { google: 'HlwG4YjRAkH3E4L7nQg1wNUk4Qy8b8LCSd9ccfxgZto' },
      alternates: { canonical: '/' },
      openGraph: {
        title: 'دار القرآن',
        description: 'اسلامی علم، آنلائن کورسز اور خدمات',
        siteName: 'دار القرآن',
        locale: 'ur_PK',
        type: 'website',
        images: [{ url: `${baseUrl.origin}/og-default.jpg`, width: 1200, height: 630, alt: 'دار القرآن' }],
      },
      twitter: {
        card: 'summary_large_image',
        title: 'دار القرآن',
        description: 'اسلامی علم، آنلائن کورسز اور خدمات',
      },
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Dar-Ul-Quran',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://darulquran.pk',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://darulquran.pk'}/favicon.ico`,
    description: 'اسلامی علم، آنلائن کورسز اور خدمات',
  }

  return (
    <html lang="ur" dir="rtl" className={urduFont.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <meta name="google-site-verification" content="HlwG4YjRAkH3E4L7nQg1wNUk4Qy8b8LCSd9ccfxgZto" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
