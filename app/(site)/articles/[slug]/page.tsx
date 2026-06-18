import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, User } from 'lucide-react'
import { safeFetch } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import ArticleSchema from '@/components/seo/ArticleSchema'
import { pageMetadata } from '@/lib/seo'

export const revalidate = 300

export async function generateStaticParams() {
  const slugs = await safeFetch(postSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await safeFetch(postBySlugQuery, { slug })
  const title = post?.seoTitle ?? post?.title ?? 'مضمون'
  const description = post?.seoDescription ?? post?.excerpt
  const image = post?.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').auto('format').url()
    : null

  return pageMetadata({
    title,
    description,
    path: `/articles/${slug}`,
    image,
    imageAlt: post?.mainImage?.alt ?? title,
    type: 'article',
  })
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await safeFetch(postBySlugQuery, { slug })
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white">
      <ArticleSchema post={post} slug={slug} />

      {/* Back nav */}
      <div className="border-b border-gray-100 bg-white sticky top-[68px] z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link href="/articles"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-slate-900 transition-colors group">
            <ArrowLeft size={13} strokeWidth={2} className="rtl:rotate-180 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 transition-transform" />
            مضامین پر واپس
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {post.categories?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
            {post.categories.map((cat: { _id: string; title: string }) => (
              <span key={cat._id}
                className="text-[10.5px] font-bold uppercase tracking-[0.1em] bg-dq-50 text-dq-700 border border-dq-100 px-3 py-1 rounded-full">
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <h1 className="font-bold text-[26px] sm:text-[30px] lg:text-[38px] text-slate-900 leading-[1.12] tracking-[-0.02em] mb-4 sm:mb-5">
          {post.title}
        </h1>

        <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-[12.5px] sm:text-[13px] text-gray-400 mb-8 pb-7 border-b border-gray-100">
          {post.author?.name && (
            <span className="flex items-center gap-1.5">
              <User size={13} strokeWidth={2} />
              <span className="font-medium text-gray-600">{post.author.name}</span>
            </span>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} strokeWidth={2} />
              {new Date(post.publishedAt).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
        </div>

        {post.mainImage && (
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] rounded-xl sm:rounded-2xl overflow-hidden mb-8 sm:mb-10 shadow-sm">
            <Image
              src={urlFor(post.mainImage).width(900).height(500).url()}
              alt={post.mainImage.alt ?? post.title}
              fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover"
            />
          </div>
        )}

        {post.body && (
          <div className="prose prose-slate prose-base sm:prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
            prose-p:text-gray-700 prose-p:leading-[1.8]
            prose-a:text-dq-500 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 prose-strong:font-semibold
            prose-blockquote:border-l-4 prose-blockquote:border-dq-400 prose-blockquote:text-slate-600 prose-blockquote:not-italic
            prose-li:text-gray-700">
            <PortableText value={post.body} />
          </div>
        )}

      </article>
    </div>
  )
}
