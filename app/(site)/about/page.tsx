import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import { PATHS, SECTION_LABELS } from '@/lib/paths'
import { resolveSiteNameUrdu, DEFAULT_ABOUT_COURSES_CTA } from '@/lib/seo'
import CmsPageShell from '@/components/layout/CmsPageShell'
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
    titleFallback: SECTION_LABELS.about,
  })
}

export default async function AboutPage() {
  const { page, settings } = await fetchCmsPage('about')

  const siteName = resolveSiteNameUrdu(settings?.siteName)
  const pageTitle = resolveSeoTitle(page, SECTION_LABELS.about)
  const pageDescription = resolveSeoDescription(page)

  return (
    <CmsPageShell
      schemaTitle={pageTitle}
      schemaDescription={pageDescription}
      path={PATHS.about}
      eyebrow={page?.eyebrow || 'ہماری کہانی'}
      title={page?.title || SECTION_LABELS.about}
      subtitle={page?.subtitle || 'ہم کون ہیں اور ہمارا مقصد کیا ہے'}
      maxWidth="3xl"
    >
      <div className={`${TW_PAGE_BODY} transition-colors`}>
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
                {SECTION_LABELS.contact}
                <ArrowRight size={13} strokeWidth={2.5} className={TW_CTA_ARROW} />
              </Link>
              <Link href={PATHS.onlineCourses} className={TW_OUTLINE_PILL}>
                {DEFAULT_ABOUT_COURSES_CTA}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </CmsPageShell>
  )
}
