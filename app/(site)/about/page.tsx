import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import { PATHS } from '@/lib/paths'
import { resolveSiteNameUrdu } from '@/lib/seo'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import RichTextBody from '@/components/content/RichTextBody'
import Reveal from '@/components/ui/Reveal'
import AboutFallback from './_components/AboutFallback'
import {
  TW_CONTAINER_NARROW,
  TW_CTA_ARROW,
  TW_GOLD_CTA_DARK,
  TW_OUTLINE_PILL,
  TW_PAGE_BODY,
} from '@/lib/tailwind'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: 'about',
    path: PATHS.about,
    titleFallback: 'ہمارے بارے میں',
  })
}

export default async function AboutPage() {
  const { page, settings } = await fetchCmsPage('about')

  const siteName = resolveSiteNameUrdu(settings?.siteName)

  const pageTitle = resolveSeoTitle(page, 'ہمارے بارے میں')
  const pageDescription = resolveSeoDescription(page)

  return (
    <div>
      <WebPageSchema title={pageTitle} description={pageDescription} path={PATHS.about} />
      <PageHeroHeader
        eyebrow={page?.eyebrow || 'ہماری کہانی'}
        title={page?.title || 'ہمارے بارے میں'}
        subtitle={page?.subtitle || 'ہم کون ہیں اور ہمارا مقصد کیا ہے'}
        maxWidth="3xl"
      />

      <div className={`${TW_PAGE_BODY} bg-white`}>
        <div className={`${TW_CONTAINER_NARROW} lg:px-8`}>

          {page?.body ? (
            <Reveal animation="fade">
              <RichTextBody value={page.body} />
            </Reveal>
          ) : (
            <AboutFallback siteName={siteName} />
          )}

          <Reveal animation="up" delay={100}>
            <div className="mt-8 sm:mt-10 pt-7 sm:pt-8 border-t border-gray-100 flex flex-wrap gap-3">
              <Link href={PATHS.contact} className={TW_GOLD_CTA_DARK}>
                ہم سے رابطہ کریں
                <ArrowRight size={13} strokeWidth={2.5} className={TW_CTA_ARROW} />
              </Link>
              <Link href={PATHS.onlineCourses} className={TW_OUTLINE_PILL}>
                ہمارے کورسز
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </div>
  )
}
