import type { Metadata } from 'next'
import { Noto_Nastaliq_Urdu } from 'next/font/google'
import { safeFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import './globals.css'

const urduFont = Noto_Nastaliq_Urdu({
  subsets:  ['arabic'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-urdu',
  display:  'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await safeFetch(
      `*[_type == "siteSettings"][0]{ siteName, description, favicon }`,
      {},
      { next: { revalidate: 3600 } }
    )

    const siteName   = settings?.siteName   || 'Dar Ul Quran'
    const faviconUrl = settings?.favicon ? urlFor(settings.favicon).width(256).height(256).url() : undefined

    return {
      title:       { default: siteName, template: `%s | ${siteName}` },
      description: settings?.description || 'اسلامی علم، آنلائن کورسز اور خدمات',
      icons:       faviconUrl ? { icon: faviconUrl, apple: faviconUrl } : undefined,
    }
  } catch {
    return {
      title:       { default: 'Dar Ul Quran', template: '%s | Dar Ul Quran' },
      description: 'اسلامی علم، آنلائن کورسز اور خدمات',
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur" dir="rtl">
      <body
        className={`${urduFont.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
