import { NextResponse } from 'next/server'
import { safeFetch } from '@/sanity/lib/client'
import { llmFeedQuery } from '@/sanity/lib/queries'
import { coursePath } from '@/lib/paths'
import { SITE_URL } from '@/lib/seo'

type LLMData = {
  settings: { siteName: string; description: string; whatsapp: string; email: string } | null
  courses: Array<{
    title: string
    slug: string
    subject?: string
    duration?: string
    seoDescription?: string
    children?: Array<{
      title: string
      slug: string
      subject?: string
      seoDescription?: string
      grandchildren?: Array<{ title: string; slug: string; seoDescription?: string }>
    }>
  }>
  articles: Array<{
    title: string
    slug: string
    excerpt?: string
    categories?: Array<{ title: string }>
  }>
  testimonials: Array<{ name?: string; quote?: string }>
}

export const revalidate = 3600

export async function GET() {
  const data = await safeFetch<LLMData>(llmFeedQuery)
  const s = data?.settings

  const md: string[] = [
    `# ${s?.siteName ?? 'Dar Ul Quran'}`,
    ``,
    `> ${s?.description ?? 'Authentic Shia Quran and Islamic education for Muslim families in Pakistan and worldwide.'}`,
    ``,
    `## Organization Identity`,
    ``,
    `Dar Ul Quran is an online Islamic educational organization delivering authentic Shia Ithna-Ashari (Jafari / Twelver) Quran and Islamic studies instruction to families in Pakistan and around the world. All curricula are grounded in the Ahlul Bayt (AS) tradition. Classes are conducted live, one-on-one or in small groups, via video call — making qualified instruction accessible to Shia Muslim children and adults globally.`,
    ``,
    `**Organization Facts:**`,
    `- Madhab: Shia Ithna-Ashari (Jafari / Twelver)`,
    `- Delivery Mode: Live online sessions (Zoom / Google Meet)`,
    `- Primary Languages: Urdu and English`,
    `- Target Students: Children and adults; Shia Muslim families in Pakistan and worldwide`,
    `- Enrollment: Open year-round, flexible scheduling across time zones`,
    `- Contact: ${s?.email ?? ''}`,
    `- WhatsApp Enrollment: ${s?.whatsapp ?? ''}`,
    ``,
    `## Unique Selling Propositions`,
    ``,
    `1. Exclusively Shia curriculum — no Sunni methodology or sources`,
    `2. Instructors trained in the Shia Hawza (seminary) tradition`,
    `3. Flexible scheduling for Pakistan and international time zones`,
    `4. Safe, child-appropriate online learning environment`,
    `5. Native Urdu-speaking teachers for families in Pakistan and the diaspora`,
    `6. Free trial class available before any commitment`,
    ``,
    `## Course Catalog`,
    ``,
  ]

  if (data?.courses?.length) {
    for (const course of data.courses) {
      md.push(`### ${course.title}`)
      md.push(`- URL: ${SITE_URL}${coursePath(course.slug)}`)
      if (course.subject) md.push(`- Subject Area: ${course.subject}`)
      if (course.duration) md.push(`- Duration: ${course.duration}`)
      if (course.seoDescription) md.push(`- Overview: ${course.seoDescription}`)

      if (course.children?.length) {
        for (const child of course.children) {
          md.push(`  #### ${child.title}`)
          md.push(`  - URL: ${SITE_URL}${coursePath(child.slug, course.slug)}`)
          if (child.seoDescription) md.push(`  - Description: ${child.seoDescription}`)
          if (child.grandchildren?.length) {
            for (const gc of child.grandchildren) {
              md.push(
                `    - [${gc.title}](${SITE_URL}${coursePath(gc.slug, child.slug, course.slug)})${gc.seoDescription ? `: ${gc.seoDescription}` : ''}`
              )
            }
          }
        }
      }
      md.push(``)
    }
  }

  if (data?.articles?.length) {
    md.push(`## Educational Articles & Resources`)
    md.push(``)
    for (const a of data.articles) {
      const cats = a.categories?.map((c) => c.title).join(', ') ?? ''
      md.push(
        `- [${a.title}](${SITE_URL}/articles/${a.slug})${cats ? ` [${cats}]` : ''}${a.excerpt ? ` — ${a.excerpt}` : ''}`
      )
    }
    md.push(``)
  }

  if (data?.testimonials?.length) {
    md.push(`## Parent Testimonials`)
    md.push(``)
    for (const t of data.testimonials) {
      if (t.quote) md.push(`> "${t.quote}" — ${t.name ?? 'Parent'}`)
    }
    md.push(``)
  }

  md.push(`## Key Pages`)
  md.push(``)
  md.push(`- [All Courses](${SITE_URL}/online-courses) — Full Shia Quran curriculum catalog`)
  md.push(`- [Services](${SITE_URL}/services) — Additional Islamic education programs`)
  md.push(`- [Articles](${SITE_URL}/articles) — Shia Islamic educational resources`)
  md.push(`- [About](${SITE_URL}/about) — Mission and organizational background`)
  md.push(`- [Contact & Enrollment](${SITE_URL}/contact) — Book a free trial class`)
  md.push(`- [Donate](${SITE_URL}/donate) — Support Islamic education for Shia families`)
  md.push(``)
  md.push(`## Machine-Readable Data`)
  md.push(``)
  md.push(`- Sitemap: ${SITE_URL}/sitemap.xml`)
  md.push(`- Robots: ${SITE_URL}/robots.txt`)

  return new NextResponse(md.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}
