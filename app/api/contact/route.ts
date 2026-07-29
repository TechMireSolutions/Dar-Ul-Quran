import { NextResponse } from 'next/server'
import { contactBodySchema } from '@/lib/contact-schema'
import { isContactEmailConfigured, sendContactNotification } from '@/lib/contact-notify'
import { rateLimitContact } from '@/lib/rate-limit'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { getWriteClient } from '@/sanity/lib/client'

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

    if (!isContactEmailConfigured()) {
      console.error('Contact form rejected: email is not configured')
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 503 })
    }

    await getWriteClient().create({
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
