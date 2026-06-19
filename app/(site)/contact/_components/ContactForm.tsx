'use client'

import { useCallback, useState } from 'react'
import TurnstileField from '@/components/ui/TurnstileField'
import { TW_FORM_INPUT, TW_FORM_SUBMIT } from '@/lib/tailwind'

type ContactFormOption = { _id: string; title: string; parentTitle?: string }

type ContactFormProps = {
  submitLabel: string
  courses: ContactFormOption[]
  services: ContactFormOption[]
  turnstileSiteKey?: string
}

type Purpose = 'general' | 'course' | 'service' | 'other'
type Status  = 'idle' | 'loading' | 'success' | 'error'

function FieldLabel({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-[12px] font-semibold text-slate-700 mb-1.5">
      {children}
      {required && (
        <>
          <span className="text-red-500 ms-0.5" aria-hidden="true">*</span>
          <span className="sr-only"> (لازمی)</span>
        </>
      )}
    </label>
  )
}

function optionLabel(option: ContactFormOption) {
  return option.parentTitle ? `${option.parentTitle} — ${option.title}` : option.title
}

export default function ContactForm({ submitLabel, courses, services, turnstileSiteKey }: ContactFormProps) {
  const [purpose,    setPurpose]    = useState<Purpose>('general')
  const [appliedFor, setAppliedFor] = useState('')
  const [status,     setStatus]     = useState<Status>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleTurnstileToken = useCallback((token: string | null) => {
    setTurnstileToken(token)
  }, [])

  const turnstileRequired = Boolean(turnstileSiteKey)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const readFieldValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value ?? ''

    const data = {
      firstName:  readFieldValue('firstName'),
      lastName:   readFieldValue('lastName'),
      email:      readFieldValue('email'),
      phone:      readFieldValue('phone'),
      country:    readFieldValue('country'),
      city:       readFieldValue('city'),
      purpose,
      appliedFor: appliedFor || undefined,
      message:    readFieldValue('message'),
      website:    readFieldValue('website'),
      turnstileToken: turnstileToken ?? undefined,
    }

    if (turnstileRequired && !turnstileToken) {
      setStatus('error')
      return
    }

    const res = await fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(data),
    })

    if (res.ok) {
      setStatus('success')
      form.reset()
      setPurpose('general')
      setAppliedFor('')
      setTurnstileToken(null)
    } else if (res.status === 429) {
      setStatus('error')
    } else {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === 'loading'}
      className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4"
    >
      <div aria-live="polite" aria-atomic="true">
      {status === 'success' && (
        <div role="status" className="bg-green-50 border border-green-200 text-green-700 text-[13px] rounded-lg px-4 py-3 mb-4">
          آپ کا پیغام کامیابی سے بھیج دیا گیا۔ ہم جلد آپ سے رابطہ کریں گے۔
        </div>
      )}
      {status === 'error' && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-lg px-4 py-3 mb-4">
          کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں یا براہ راست ہم سے رابطہ کریں۔
        </div>
      )}
      </div>

      {/* پہلا نام + آخری نام */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required htmlFor="cf-first-name">پہلا نام</FieldLabel>
          <input id="cf-first-name" type="text" name="firstName" required autoComplete="given-name" placeholder="پہلا نام" className={TW_FORM_INPUT} />
        </div>
        <div>
          <FieldLabel htmlFor="cf-last-name">آخری نام</FieldLabel>
          <input id="cf-last-name" type="text" name="lastName" autoComplete="family-name" placeholder="آخری نام (اختیاری)" className={TW_FORM_INPUT} />
        </div>
      </div>

      {/* مقصد */}
      <div>
        <FieldLabel required htmlFor="cf-purpose">مقصد</FieldLabel>
        <select
          id="cf-purpose"
          value={purpose}
          onChange={e => { setPurpose(e.target.value as Purpose); setAppliedFor('') }}
          className={TW_FORM_INPUT}
        >
          <option value="general">عام پوچھ گچھ</option>
          {courses.length  > 0 && <option value="course">کورس میں داخلہ</option>}
          {services.length > 0 && <option value="service">خدمت کی درخواست</option>}
          <option value="other">دیگر</option>
        </select>
      </div>

      {/* کورس dropdown */}
      {purpose === 'course' && courses.length > 0 && (
        <div>
          <FieldLabel required htmlFor="cf-course">کورس منتخب کریں</FieldLabel>
          <select
            id="cf-course"
            required
            value={appliedFor}
            onChange={e => setAppliedFor(e.target.value)}
            className={TW_FORM_INPUT}
          >
            <option value="" disabled>— کورس منتخب کریں —</option>
            {courses.map(course => (
              <option key={course._id} value={optionLabel(course)}>{optionLabel(course)}</option>
            ))}
          </select>
        </div>
      )}

      {/* خدمت dropdown */}
      {purpose === 'service' && services.length > 0 && (
        <div>
          <FieldLabel required htmlFor="cf-service">خدمت منتخب کریں</FieldLabel>
          <select
            id="cf-service"
            required
            value={appliedFor}
            onChange={e => setAppliedFor(e.target.value)}
            className={TW_FORM_INPUT}
          >
            <option value="" disabled>— خدمت منتخب کریں —</option>
            {services.map(service => (
              <option key={service._id} value={optionLabel(service)}>{optionLabel(service)}</option>
            ))}
          </select>
        </div>
      )}

      {/* ای میل + فون */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required htmlFor="cf-email">ای میل</FieldLabel>
          <input id="cf-email" type="email" name="email" required autoComplete="email" placeholder="آپ کی ای میل" className={TW_FORM_INPUT} />
        </div>
        <div>
          <FieldLabel required htmlFor="cf-phone">فون نمبر</FieldLabel>
          <input id="cf-phone" type="tel" name="phone" required autoComplete="tel" placeholder="+92 300 0000000" className={TW_FORM_INPUT} />
        </div>
      </div>

      {/* ملک + شہر */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required htmlFor="cf-country">ملک</FieldLabel>
          <input id="cf-country" type="text" name="country" required autoComplete="country-name" placeholder="مثلاً: پاکستان" className={TW_FORM_INPUT} />
        </div>
        <div>
          <FieldLabel required htmlFor="cf-city">شہر</FieldLabel>
          <input id="cf-city" type="text" name="city" required autoComplete="address-level2" placeholder="مثلاً: کراچی" className={TW_FORM_INPUT} />
        </div>
      </div>

      {/* پیغام */}
      <div>
        <FieldLabel required htmlFor="cf-message">پیغام</FieldLabel>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          required
          placeholder={
            purpose === 'course'  ? 'اپنے بارے میں، تعلیمی سطح اور مناسب وقت بتائیں...' :
            purpose === 'service' ? 'اپنی ضرورت اور متعلقہ تفصیل بیان کریں...' :
            'یہاں اپنا پیغام لکھیں...'
          }
          className={`${TW_FORM_INPUT} resize-none`}
        />
      </div>

      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        aria-hidden="true"
      />

      {turnstileSiteKey && (
        <TurnstileField siteKey={turnstileSiteKey} onToken={handleTurnstileToken} />
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={
          status === 'loading' ||
          ((purpose === 'course' || purpose === 'service') && !appliedFor) ||
          (turnstileRequired && !turnstileToken)
        }
        aria-disabled={
          status === 'loading' ||
          ((purpose === 'course' || purpose === 'service') && !appliedFor) ||
          (turnstileRequired && !turnstileToken)
        }
        className={TW_FORM_SUBMIT}
      >
        {status === 'loading' ? 'بھیجا جا رہا ہے...' : submitLabel}
      </button>
    </form>
  )
}
