import { defineField, defineType } from 'sanity'
import {
  DEFAULT_CONTACT_FORM_SUBJECTS,
  DEFAULT_CONTACT_FORM_SUBMIT_LABEL,
  DEFAULT_COURSE_ALL_CTA,
  DEFAULT_SERVICE_ALL_CTA,
  DEFAULT_DONATE_ARABIC_VERSE,
  DEFAULT_DONATE_CAUSES,
  DEFAULT_DONATE_CLOSING_MESSAGE,
  DEFAULT_DONATE_CONTACT_LABEL,
  DEFAULT_DONATE_HOW_TO_HEADING,
  DEFAULT_DONATE_HOW_TO_TEXT,
  DEFAULT_DONATE_PAY_ONLINE_LABEL,
  DEFAULT_FAQ_HEADING,
  DEFAULT_SEARCH_PLACEHOLDER,
  DEFAULT_SITE_NAME_URDU,
} from '@/lib/seo'
import { LtrStringInput } from '../components/LtrStringInput'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string', initialValue: DEFAULT_SITE_NAME_URDU }),
    defineField({ name: 'logo',    type: 'image', options: { hotspot: true } }),
    defineField({
      name:        'favicon',
      type:        'image',
      title:       'Favicon',
      description: 'Square image recommended — 256×256 or 512×512 PNG/ICO',
    }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'text', rows: 3, title: 'Site Meta Description' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({
      name: 'phone',
      type: 'string',
      components: { input: LtrStringInput },
    }),
    defineField({ name: 'address', type: 'text', rows: 3 }),
    defineField({ name: 'facebook', type: 'url' }),
    defineField({ name: 'youtube', type: 'url' }),
    defineField({
      name: 'whatsapp',
      type: 'string',
      title: 'WhatsApp Number',
      components: { input: LtrStringInput },
    }),
    defineField({ name: 'darulQuranUrl', type: 'url', title: 'Dar Ul Quran Website URL' }),
    defineField({ name: 'donateUrl', type: 'url', title: 'Donate / Payment Link' }),

    // ── Shared UI labels ──────────────────────────────────────────────────────
    defineField({ name: 'searchPlaceholder',     type: 'string', title: 'Search Placeholder Text',      initialValue: DEFAULT_SEARCH_PLACEHOLDER }),
    defineField({ name: 'faqHeading',            type: 'string', title: 'FAQ Section Heading',          initialValue: DEFAULT_FAQ_HEADING }),
    defineField({ name: 'serviceBookCtaLabel',   type: 'string', title: 'Service — Book CTA Label',     initialValue: 'یہ خدمت بک کریں' }),
    defineField({ name: 'serviceAllCtaLabel',    type: 'string', title: 'Service — Back Link Label',    initialValue: DEFAULT_SERVICE_ALL_CTA }),
    defineField({ name: 'courseEnrollCtaLabel',  type: 'string', title: 'Course — Enroll CTA Label',    initialValue: 'ابھی داخلہ لیں' }),
    defineField({ name: 'courseAllCtaLabel',     type: 'string', title: 'Course — Back Link Label',     initialValue: DEFAULT_COURSE_ALL_CTA }),
    defineField({ name: 'courseInstructorLabel', type: 'string', title: 'Course — "Instructor" Label',  initialValue: 'استاد' }),

    // ── Contact page content ──────────────────────────────────────────────────
    defineField({
      name: 'contactFormSubjects', type: 'array', title: 'Contact — Form Subject Options',
      of: [{ type: 'string' }],
      initialValue: [...DEFAULT_CONTACT_FORM_SUBJECTS],
    }),
    defineField({
      name: 'contactFormSubmitLabel',
      type: 'string',
      title: 'Contact — Submit Button Label',
      initialValue: DEFAULT_CONTACT_FORM_SUBMIT_LABEL,
    }),

    // ── Donate page content ───────────────────────────────────────────────────
    defineField({
      name: 'donateArabicVerse',
      type: 'string',
      title: 'Donate — Arabic Verse',
      initialValue: DEFAULT_DONATE_ARABIC_VERSE,
    }),
    defineField({
      name: 'donateHowToHeading',
      type: 'string',
      title: 'Donate — "How to Donate" Heading',
      initialValue: DEFAULT_DONATE_HOW_TO_HEADING,
    }),
    defineField({
      name: 'donateHowToText',
      type: 'text',
      title: 'Donate — "How to Donate" Body',
      rows: 2,
      initialValue: DEFAULT_DONATE_HOW_TO_TEXT,
    }),
    defineField({
      name: 'donateClosingMessage',
      type: 'string',
      title: 'Donate — Closing Message',
      initialValue: DEFAULT_DONATE_CLOSING_MESSAGE,
    }),
    defineField({
      name: 'donatePayOnlineLabel',
      type: 'string',
      title: 'Donate — "Pay Online" Button Label',
      initialValue: DEFAULT_DONATE_PAY_ONLINE_LABEL,
    }),
    defineField({
      name: 'donateContactLabel',
      type: 'string',
      title: 'Donate — "Contact Us" Button Label',
      initialValue: DEFAULT_DONATE_CONTACT_LABEL,
    }),
    defineField({
      name: 'donateCauses', type: 'array', title: 'Donate — Cause Cards',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', type: 'string', title: 'Cause Title' }),
        defineField({ name: 'desc',  type: 'string', title: 'Cause Description' }),
      ]}],
      initialValue: DEFAULT_DONATE_CAUSES,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
