import { createClient, type SanityClient } from '@sanity/client'
import { NextResponse } from 'next/server'
import { contactBodySchema } from '@/lib/contact-schema'
import { sendContactNotification } from '@/lib/contact-notify'
import { rateLimitContact } from '@/lib/rate-limit'
import { verifyTurnstileToken } from '@/lib/turnstile'

function createSanityClient(): SanityClient {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !dataset || !token) {
    throw new Error('Sanity is not configured')
  }

  return createClient({
    projectId,
    dataset,
    token,
    apiVersion: '2025-01-01',
    useCdn: false,
  })
}

function clientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function POST(req: Request) {
  try {
    const ip = clientIp(req)
    const { success, remaining } = await rateLimitContact(ip)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '900', 'X-RateLimit-Remaining': String(remaining) } },
      )
    }

    const json = await req.json()
    const parsed = contactBodySchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid submission' }, { status: 400 })
    }

    const data = parsed.data
    if (data.website?.trim()) {
      return NextResponse.json({ success: true })
    }

    const turnstileOk = await verifyTurnstileToken(data.turnstileToken, ip)
    if (!turnstileOk) {
      return NextResponse.json({ error: 'Bot verification failed' }, { status: 403 })
    }

    await createSanityClient().create({
      _type: 'contactSubmission',
      firstName: data.firstName,
      lastName: data.lastName || undefined,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      purpose: data.purpose,
      appliedFor: data.appliedFor || undefined,
      message: data.message,
      submittedAt: new Date().toISOString(),
      status: 'new',
    })

    await sendContactNotification(data)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 })
  }
}
