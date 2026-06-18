import type { Metadata } from 'next'
import { safeFetch } from '@/sanity/lib/client'
import { cardImageUrl } from '@/sanity/lib/image'
import { topLevelServicesQuery } from '@/sanity/lib/queries'
import { cmsPageMetadata, fetchCmsPage, resolveSeoDescription, resolveSeoTitle } from '@/lib/cmsPage'
import ContentCard from '@/components/ui/ContentCard'
import ItemListSchema from '@/components/seo/ItemListSchema'
import WebPageSchema from '@/components/seo/WebPageSchema'
import PageHeroHeader from '@/components/ui/PageHeroHeader'
import Reveal from '@/components/ui/Reveal'

export const revalidate = 300

const PAGE_SLUG = 'services'
const PAGE_PATH = '/services'

export async function generateMetadata(): Promise<Metadata> {
  return cmsPageMetadata({
    slug: PAGE_SLUG,
    path: PAGE_PATH,
    titleFallback: 'خدمات',
  })
}

export default async function ServicesPage() {
  const [{ page }, servicesRaw] = await Promise.all([
    fetchCmsPage(PAGE_SLUG),
    safeFetch(topLevelServicesQuery),
  ])
  const services = servicesRaw ?? []

  const title = resolveSeoTitle(page, 'خدمات')
  const description = resolveSeoDescription(page)

  const listItems = services.map((service: { title: string; slug: { current: string } }) => ({
    name: service.title,
    url: `${PAGE_PATH}/${service.slug.current}`,
  }))

  return (
    <div>
      <WebPageSchema title={title} description={description} path={PAGE_PATH} />
      <ItemListSchema name="خدمات" path={PAGE_PATH} items={listItems} />

      <PageHeroHeader
        eyebrow={page?.eyebrow || 'ہم کیا پیش کرتے ہیں'}
        title={page?.title || 'خدمات'}
        subtitle={page?.subtitle || 'اخلاص کے ساتھ پیش کی گئی مذہبی خدمات — نیابت زیارت، زکوٰۃ، خمس اور مزید۔'}
      />

      <div className="py-8 sm:py-12 bg-slate-50/40 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <p className="text-center text-gray-400 text-[15px] py-24">خدمات جلد آ رہی ہیں۔</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map((svc: any, i: number) => (
                <Reveal key={svc._id} animation="up" delay={i * 70}>
                  <ContentCard
                    href={`${PAGE_PATH}/${svc.slug.current}`}
                    image={svc.icon ? cardImageUrl(svc.icon) : null}
                    title={svc.title}
                    description={svc.excerpt || svc.price || null}
                    ctaLabel={svc.childCount > 0 ? 'خدمات دیکھیں' : 'ابھی بک کریں'}
                  />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
