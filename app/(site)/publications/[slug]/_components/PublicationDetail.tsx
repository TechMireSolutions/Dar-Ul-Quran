import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, CalendarDays, Download, ExternalLink, FileText, HardDrive, User } from 'lucide-react'
import ContentCard from '@/components/ui/ContentCard'
import Reveal from '@/components/ui/Reveal'
import { formatPublishedDate } from '@/lib/format-date'
import { PATHS, publicationPath } from '@/lib/paths'
import {
  TW_ARTICLE_TITLE,
  TW_BADGE,
  TW_BODY_MUTED,
  TW_BTN_PRIMARY,
  TW_BTN_SECONDARY,
  TW_CARD_GRID,
  TW_CONTAINER,
  TW_SECTION_TITLE_COMPACT,
  TW_VIEW_ALL_LINK,
} from '@/lib/tailwind'
import { bookCoverImageUrl, bookThumbnailUrl } from '@/sanity/lib/image'
import type { PublicationDoc } from '@/lib/types'

type PublicationDetailProps = {
  publication: PublicationDoc
  otherPublications?: PublicationDoc[]
}

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return ''
  const mb = bytes / (1024 * 1024)
  if (mb < 0.1) {
    const kb = Math.round(bytes / 1024)
    return `${kb} کے بی`
  }
  return `${mb.toFixed(1)} ایم بی`
}

export default function PublicationDetail({
  publication,
  otherPublications = [],
}: PublicationDetailProps) {
  const pageTitle = publication.title ?? 'کتاب'
  const coverUrl = publication.coverImage ? bookCoverImageUrl(publication.coverImage) : null
  const sizeLabel = formatFileSize(publication.fileSize)
  const hasDownload = Boolean(publication.fileUrl)
  const hasExternal = Boolean(publication.externalLink)

  return (
    <article className={`${TW_CONTAINER} py-8 sm:py-12 lg:py-16`}>
      {/* Top 2-Column Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
        {/* Book Cover Column */}
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 group">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={pageTitle}
                fill
                priority
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 360px, 400px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center bg-gradient-to-br from-dq-50 via-dq-100/30 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
                aria-hidden="true"
              >
                <div className="w-16 h-16 rounded-full bg-dq-100 dark:bg-dq-900/40 flex items-center justify-center text-dq-600 dark:text-dq-400">
                  <BookOpen size={32} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  تصویر جلد دستیاب نہیں
                </span>
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-2xl pointer-events-none" />
          </div>
        </div>

        {/* Book Info Column */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={TW_BADGE}>کتاب / مطبوعات</span>
            {publication.author && (
              <span className="text-2xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                {publication.author}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className={`${TW_ARTICLE_TITLE}`}>
            {pageTitle}
          </h1>

          {/* Meta row */}
          <div className="flex items-center flex-wrap gap-4 text-[13px] text-gray-500 dark:text-slate-400 pb-5 border-b border-gray-100 dark:border-slate-800">
            {publication.author && (
              <span className="flex items-center gap-1.5">
                <User size={14} strokeWidth={2} className="text-dq-600 dark:text-dq-400" />
                <span>مصنف / مرتب:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{publication.author}</span>
              </span>
            )}

            {publication.publishedAt && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} strokeWidth={2} className="text-dq-600 dark:text-dq-400" />
                <span>تاریخ اشاعت:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {formatPublishedDate(publication.publishedAt)}
                </span>
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <FileText size={14} strokeWidth={2} className="text-dq-600 dark:text-dq-400" />
              <span>فارمیٹ:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">پی ڈی ایف</span>
            </span>

            {sizeLabel && (
              <span className="flex items-center gap-1.5">
                <HardDrive size={14} strokeWidth={2} className="text-dq-600 dark:text-dq-400" />
                <span>حجم:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{sizeLabel}</span>
              </span>
            )}
          </div>

          {/* Download & Read Action Card */}
          <div className="rounded-2xl border border-dq-200/80 dark:border-slate-700 bg-gradient-to-br from-dq-50/60 via-white to-dq-50/20 dark:from-slate-800 dark:via-slate-800/90 dark:to-slate-900 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-heading">
              مطالعہ اور ڈاؤن لوڈ کی سہولت
            </h2>
            <p className="text-[13.5px] text-gray-600 dark:text-slate-300 mb-5 leading-urdu">
              یہ کتاب دار القرآن کے توسط سے قارئین کے استفادے کے لیے پیش کی گئی ہے۔ آپ اسے براہ راست اپنے پاس محفوظ کر سکتے ہیں۔
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {hasDownload && (
                <a
                  href={publication.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${TW_BTN_PRIMARY} gap-2 shadow-gold-sm hover:shadow-gold-hover`}
                >
                  <Download size={16} strokeWidth={2} className="shrink-0" />
                  <span>کتاب ڈاؤن لوڈ کریں</span>
                  {sizeLabel && (
                    <span className="text-xs opacity-90 font-medium">({sizeLabel})</span>
                  )}
                </a>
              )}

              {hasExternal && (
                <a
                  href={publication.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${TW_BTN_SECONDARY} gap-2`}
                >
                  <ExternalLink size={15} strokeWidth={2} className="shrink-0" />
                  <span>آن لائن مطالعہ / متبادل لنک</span>
                </a>
              )}

              {!hasDownload && !hasExternal && (
                <p className={`${TW_BODY_MUTED}`}>
                  یہ کتاب جلد ڈاؤن لوڈ اور آن لائن مطالعہ کے لیے دستیاب ہوگی۔
                </p>
              )}
            </div>
          </div>

          {/* Book Overview / Description */}
          {publication.description && (
            <div className="pt-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-heading">
                کتاب کا تعارف و تفصیلات
              </h2>
              <div className="rounded-2xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800/60 p-5 sm:p-6 shadow-sm">
                <p className="text-[14.5px] sm:text-[15.5px] text-slate-700 dark:text-slate-200 leading-urdu whitespace-pre-line">
                  {publication.description}
                </p>
              </div>
            </div>
          )}

          {/* Book Specifications */}
          <div className="pt-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 leading-heading">
              کتاب کی تکنیکی معلومات
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700">
                <span className="text-gray-500 dark:text-slate-400">کتاب کا نام:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{pageTitle}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700">
                <span className="text-gray-500 dark:text-slate-400">مصنف / مرتب:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {publication.author || 'دار القرآن'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700">
                <span className="text-gray-500 dark:text-slate-400">زبان:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">اردو</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700">
                <span className="text-gray-500 dark:text-slate-400">فائل کی قسم:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">پی ڈی ایف ای بک</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related / Other Publications */}
      {otherPublications.length > 0 && (
        <section className="pt-12 border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className={TW_SECTION_TITLE_COMPACT}>
              دیگر کتب و اشاعتیں
            </h2>
            <Link href={PATHS.publications} className={TW_VIEW_ALL_LINK}>
              <span>تمام مطبوعات دیکھیں</span>
              <span aria-hidden="true" className="rtl:rotate-180">←</span>
            </Link>
          </div>

          <div className={TW_CARD_GRID}>
            {otherPublications.map((pub, i) => (
              <Reveal key={pub._id} animation="up" delay={i * 70}>
                <ContentCard
                  href={pub.slug ? publicationPath(pub.slug) : (pub.fileUrl || pub.externalLink || '#')}
                  image={pub.coverImage ? bookThumbnailUrl(pub.coverImage) : null}
                  title={pub.title ?? ''}
                  description={pub.description || null}
                  badge={pub.author || null}
                  ctaLabel="تفصیلات دیکھیں"
                  aspectRatio="aspect-[3/4]"
                  imageFit="cover"
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
