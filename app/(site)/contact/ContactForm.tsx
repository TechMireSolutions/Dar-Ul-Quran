'use client'

import { useState } from 'react'

interface Option { _id: string; title: string; parentTitle?: string }

interface Props {
  subjects:    string[]
  submitLabel: string
  courses:     Option[]
  services:    Option[]
}

type Purpose = 'general' | 'course' | 'service' | 'other'
type Status  = 'idle' | 'loading' | 'success' | 'error'

const inputCls = `w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-700
  placeholder:text-gray-400 bg-white focus:outline-none focus:border-dq-400
  focus:ring-2 focus:ring-dq-400/20 transition-all`

function FieldLabel({ children, required: req, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-[12px] font-semibold text-slate-700 mb-1.5">
      {children}{req && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
    </label>
  )
}

function optionLabel(o: Option) {
  return o.parentTitle ? `${o.parentTitle} — ${o.title}` : o.title
}

export default function ContactForm({ submitLabel, courses, services }: Props) {
  const [purpose,    setPurpose]    = useState<Purpose>('general')
  const [appliedFor, setAppliedFor] = useState('')
  const [status,     setStatus]     = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')

    const form = e.currentTarget
    const getValue = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)?.value ?? ''

    const data = {
      firstName:  getValue('firstName'),
      lastName:   getValue('lastName'),
      email:      getValue('email'),
      phone:      getValue('phone'),
      country:    getValue('country'),
      city:       getValue('city'),
      purpose,
      appliedFor: appliedFor || undefined,
      message:    getValue('message'),
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
    } else {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4"
    >
      {status === 'success' && (
        <div role="alert" className="bg-green-50 border border-green-200 text-green-700 text-[13px] rounded-lg px-4 py-3">
          آپ کا پیغام کامیابی سے بھیج دیا گیا۔ ہم جلد آپ سے رابطہ کریں گے۔
        </div>
      )}
      {status === 'error' && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-lg px-4 py-3">
          کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں یا براہ راست ہم سے رابطہ کریں۔
        </div>
      )}

      {/* پہلا نام + آخری نام */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required htmlFor="cf-first-name">پہلا نام</FieldLabel>
          <input id="cf-first-name" type="text" name="firstName" required placeholder="پہلا نام" className={inputCls} />
        </div>
        <div>
          <FieldLabel htmlFor="cf-last-name">آخری نام</FieldLabel>
          <input id="cf-last-name" type="text" name="lastName" placeholder="آخری نام (اختیاری)" className={inputCls} />
        </div>
      </div>

      {/* مقصد */}
      <div>
        <FieldLabel required htmlFor="cf-purpose">مقصد</FieldLabel>
        <select
          id="cf-purpose"
          value={purpose}
          onChange={e => { setPurpose(e.target.value as Purpose); setAppliedFor('') }}
          className={inputCls}
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
            className={inputCls}
          >
            <option value="" disabled>— کورس منتخب کریں —</option>
            {courses.map(c => (
              <option key={c._id} value={optionLabel(c)}>{optionLabel(c)}</option>
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
            className={inputCls}
          >
            <option value="" disabled>— خدمت منتخب کریں —</option>
            {services.map(s => (
              <option key={s._id} value={optionLabel(s)}>{optionLabel(s)}</option>
            ))}
          </select>
        </div>
      )}

      {/* ای میل + فون */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required htmlFor="cf-email">ای میل</FieldLabel>
          <input id="cf-email" type="email" name="email" required placeholder="your@email.com" className={inputCls} />
        </div>
        <div>
          <FieldLabel required htmlFor="cf-phone">فون نمبر</FieldLabel>
          <input id="cf-phone" type="tel" name="phone" required placeholder="+92 300 0000000" className={inputCls} />
        </div>
      </div>

      {/* ملک + شہر */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FieldLabel required htmlFor="cf-country">ملک</FieldLabel>
          <input id="cf-country" type="text" name="country" required placeholder="مثلاً: پاکستان" className={inputCls} />
        </div>
        <div>
          <FieldLabel required htmlFor="cf-city">شہر</FieldLabel>
          <input id="cf-city" type="text" name="city" required placeholder="مثلاً: کراچی" className={inputCls} />
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
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading' || ((purpose === 'course' || purpose === 'service') && !appliedFor)}
        className="w-full bg-dq-600 hover:bg-dq-700 disabled:opacity-60 disabled:cursor-not-allowed
          text-white text-[13.5px] font-semibold py-3 rounded-lg
          shadow-[0_4px_14px_rgba(184,144,14,0.28)] hover:shadow-[0_6px_20px_rgba(184,144,14,0.4)]
          transition-all duration-200 hover:-translate-y-px"
      >
        {status === 'loading' ? 'بھیجا جا رہا ہے...' : submitLabel}
      </button>
    </form>
  )
}
