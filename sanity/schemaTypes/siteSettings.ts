import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string', initialValue: 'دار القرآن' }),
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
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'address', type: 'text', rows: 3 }),
    defineField({ name: 'facebook', type: 'url' }),
    defineField({ name: 'youtube', type: 'url' }),
    defineField({ name: 'whatsapp', type: 'string', title: 'WhatsApp Number' }),
    defineField({ name: 'darulQuranUrl', type: 'url', title: 'Dar Ul Quran Website URL' }),
    defineField({ name: 'donateUrl', type: 'url', title: 'Donate / Payment Link' }),

    // ── Shared UI labels ──────────────────────────────────────────────────────
    defineField({ name: 'searchPlaceholder',     type: 'string', title: 'Search Placeholder Text',      initialValue: 'مضامین تلاش کریں…' }),
    defineField({ name: 'faqHeading',            type: 'string', title: 'FAQ Section Heading',          initialValue: 'اکثر پوچھے گئے سوالات' }),
    defineField({ name: 'serviceBookCtaLabel',   type: 'string', title: 'Service — Book CTA Label',     initialValue: 'یہ خدمت بک کریں' }),
    defineField({ name: 'serviceAllCtaLabel',    type: 'string', title: 'Service — Back Link Label',    initialValue: 'تمام خدمات' }),
    defineField({ name: 'courseEnrollCtaLabel',  type: 'string', title: 'Course — Enroll CTA Label',    initialValue: 'ابھی داخلہ لیں' }),
    defineField({ name: 'courseAllCtaLabel',     type: 'string', title: 'Course — Back Link Label',     initialValue: 'تمام کورسز' }),
    defineField({ name: 'courseInstructorLabel', type: 'string', title: 'Course — "Instructor" Label',  initialValue: 'استاد' }),

    // ── Contact page content ──────────────────────────────────────────────────
    defineField({
      name: 'contactFormSubjects', type: 'array', title: 'Contact — Form Subject Options',
      of: [{ type: 'string' }],
      initialValue: ['عام پوچھ گچھ', 'کورس داخلہ', 'خدمت کی درخواست', 'عطیہ'],
    }),
    defineField({ name: 'contactFormSubmitLabel', type: 'string', title: 'Contact — Submit Button Label', initialValue: 'پیغام بھیجیں' }),

    // ── Donate page content ───────────────────────────────────────────────────
    defineField({ name: 'donateArabicVerse', type: 'string', title: 'Donate — Arabic Verse', initialValue: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ' }),
    defineField({ name: 'donateHowToHeading', type: 'string', title: 'Donate — "How to Donate" Heading', initialValue: 'عطیہ کیسے دیں' }),
    defineField({ name: 'donateHowToText', type: 'text', title: 'Donate — "How to Donate" Body', rows: 2, initialValue: 'بینک ٹرانسفر کی تفصیل کے لیے ہم سے رابطہ کریں یا نیچے آنلائن ادائیگی کا لنک استعمال کریں۔' }),
    defineField({ name: 'donateClosingMessage', type: 'string', title: 'Donate — Closing Message',          initialValue: 'جزاک اللہ خیر — اللہ (سبحانہ و تعالیٰ) آپ کے عطیات قبول فرمائے۔' }),
    defineField({ name: 'donatePayOnlineLabel',  type: 'string', title: 'Donate — "Pay Online" Button Label', initialValue: 'آنلائن ادائیگی' }),
    defineField({ name: 'donateContactLabel',    type: 'string', title: 'Donate — "Contact Us" Button Label', initialValue: 'ہم سے رابطہ کریں' }),
    defineField({
      name: 'donateCauses', type: 'array', title: 'Donate — Cause Cards',
      of: [{ type: 'object', fields: [
        defineField({ name: 'title', type: 'string', title: 'Cause Title' }),
        defineField({ name: 'desc',  type: 'string', title: 'Cause Description' }),
      ]}],
      initialValue: [
        { title: 'عمومی عطیہ',        desc: 'دار القرآن کے مجموعی مشن میں معاونت' },
        { title: 'قرآنی تعلیم',       desc: 'بچوں کی مفت قرآنی کلاسوں کی مالی معاونت' },
        { title: 'محرم پروگرامز',     desc: 'مجالس اور عزاداری کی تقاریب منظم کرنے میں مدد' },
        { title: 'دار القرآن معاونت', desc: 'ہمارے قرآنی ادارے میں حصہ ڈالیں' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
