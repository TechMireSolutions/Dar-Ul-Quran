import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import type { ContactBody } from '@/lib/contact-schema'
import { PURPOSE_LABEL } from '@/lib/contact-schema'
import { DEFAULT_SITE_NAME } from '@/lib/seo'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildContactEmailHtml(data: ContactBody, fullName: string, purposeText: string): string {
  const appliedRow = data.appliedFor
    ? `<tr><td style="padding:8px 0;color:#64748b">Applied For</td><td style="padding:8px 0;font-weight:600;color:#b8900e">${escapeHtml(data.appliedFor)}</td></tr>`
    : ''

  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
      <div style="background:#b8900e;padding:24px 28px;border-radius:10px 10px 0 0">
        <h2 style="margin:0;color:#fff;font-size:18px">New Contact Form Submission</h2>
      </div>
      <div style="background:#f8fafc;padding:24px 28px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 10px 10px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#64748b;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${escapeHtml(fullName)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(data.email)}" style="color:#b8900e">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0">${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Country</td><td style="padding:8px 0">${escapeHtml(data.country)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">City</td><td style="padding:8px 0">${escapeHtml(data.city)}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b">Purpose</td><td style="padding:8px 0">${escapeHtml(purposeText)}</td></tr>
          ${appliedRow}
        </table>
        <div style="margin-top:16px;padding:16px;background:#fff;border:1px solid #e2e8f0;border-radius:8px">
          <p style="margin:0 0 6px;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:.05em">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.7;white-space:pre-wrap">${escapeHtml(data.message)}</p>
        </div>
      </div>
    </div>
  `
}

function resolveMailTransporter(): Transporter | null {
  const { EMAIL_USER, EMAIL_PASS } = process.env
  if (!EMAIL_USER || !EMAIL_PASS) return null

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  })
}

export async function sendContactNotification(data: ContactBody): Promise<void> {
  const to = process.env.EMAIL_TO
  if (!to) return

  const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ')
  const purposeText = PURPOSE_LABEL[data.purpose] ?? data.purpose
  const subject = `New ${purposeText}${data.appliedFor ? ` — ${data.appliedFor}` : ''} from ${fullName}`
  const html = buildContactEmailHtml(data, fullName, purposeText)

  const resendKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM ?? process.env.EMAIL_USER ?? 'onboarding@resend.dev'

  if (resendKey) {
    const { Resend } = await import('resend')
    const resend = new Resend(resendKey)
    await resend.emails.send({ from: `${DEFAULT_SITE_NAME} Contact <${from}>`, to, subject, html })
    return
  }

  const transporter = resolveMailTransporter()
  if (!transporter) return

  await transporter.sendMail({
    from: `"${DEFAULT_SITE_NAME} Contact" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  })
}
