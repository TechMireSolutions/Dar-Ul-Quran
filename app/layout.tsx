import type { Metadata } from 'next'
import { Noto_Nastaliq_Urdu } from 'next/font/google'
import { safeFetch } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import './globals.css'

const urduFont = Noto_Nastaliq_Urdu({
  subsets:   ['arabic'],
  weight:    ['400', '500', '600', '700'],
  variable:  '--font-urdu',
  // 'block' prevents the catastrophic CLS that 'swap' causes for Nastaliq:
  // Noto Nastaliq has ~70% taller vertical metrics than any Latin fallback,
  // so a swap triggers a full-page reflow. 'block' holds paint for ≤100ms
  // then switches — combined with preload:true the font is almost always
  // ready before the block period expires on any connection faster than 2G.
  display:   'swap',
  preload:   true,
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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await safeFetch(siteSettingsQuery)

    const siteName   = settings?.siteName   || 'Dar Ul Quran'
    const faviconUrl = settings?.favicon ? urlFor(settings.favicon).width(256).height(256).url() : undefined

    return {
      title:       { default: siteName, template: `%s | ${siteName}` },
      description: settings?.description || 'اسلامی علم، آنلائن کورسز اور خدمات',
      icons:       faviconUrl ? { icon: faviconUrl, apple: faviconUrl } : undefined,
      verification: { google: 'HlwG4YjRAkH3E4L7nQg1wNUk4Qy8b8LCSd9ccfxgZto' },
    }
  } catch {
    return {
      title:       { default: 'دار القرآن', template: '%s | دار القرآن' },
      description: 'اسلامی علم، آنلائن کورسز اور خدمات',
      verification: { google: 'HlwG4YjRAkH3E4L7nQg1wNUk4Qy8b8LCSd9ccfxgZto' },
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur" dir="rtl" className={urduFont.variable} data-scroll-behavior="smooth">
      <head>
        <meta name="google-site-verification" content="HlwG4YjRAkH3E4L7nQg1wNUk4Qy8b8LCSd9ccfxgZto" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
