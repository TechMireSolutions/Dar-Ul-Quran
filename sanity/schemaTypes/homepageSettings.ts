import { defineField, defineType } from 'sanity'

export const homepageSettings = defineType({
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroArabicText', type: 'string', title: 'Arabic Bismillah / Header Text', initialValue: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ' }),
    defineField({ name: 'heroTitle', type: 'string', title: 'Hero Headline', initialValue: 'دار القرآن' }),
    defineField({ name: 'heroSubtitle', type: 'text', title: 'Hero Subtitle', rows: 3 }),
    defineField({ name: 'heroImage', type: 'image', title: 'Hero Background Image', options: { hotspot: true } }),
    defineField({ name: 'heroCta1Label', type: 'string', title: 'Primary CTA Label', initialValue: 'کورسز دیکھیں' }),
    defineField({ name: 'heroCta1Link', type: 'string', title: 'Primary CTA Link', initialValue: '/online-courses' }),
    defineField({ name: 'heroCta2Label', type: 'string', title: 'Secondary CTA Label', initialValue: 'ہماری خدمات' }),
    defineField({ name: 'heroCta2Link', type: 'string', title: 'Secondary CTA Link', initialValue: '/services' }),
    defineField({ name: 'servicesHeading', type: 'string', title: 'Services Section Heading', initialValue: 'ہماری خدمات' }),
    defineField({ name: 'servicesSubheading', type: 'string', title: 'Services Section Subheading' }),
    defineField({ name: 'coursesHeading', type: 'string', title: 'Courses Section Heading', initialValue: 'آنلائن کورسز' }),
    defineField({ name: 'coursesSubheading', type: 'string', title: 'Courses Section Subheading' }),
    defineField({ name: 'articlesHeading', type: 'string', title: 'Articles Section Heading', initialValue: 'تازہ ترین مضامین' }),
    defineField({ name: 'articlesSubheading', type: 'string', title: 'Articles Section Subheading' }),
    defineField({ name: 'donateHeading', type: 'string', title: 'Donate CTA Heading', initialValue: 'ہمارے مشن میں ساتھ دیں' }),
    defineField({ name: 'donateText', type: 'text', title: 'Donate CTA Text', rows: 2 }),
    defineField({ name: 'donateCtaLabel', type: 'string', title: 'Donate CTA Button Label', initialValue: 'ابھی عطیہ دیں' }),
    defineField({ name: 'donateQuote', type: 'text', title: 'Donate Quote', rows: 2, initialValue: 'صدقہ رب کے غضب کو بجھاتا اور بری موت کو دور کرتا ہے۔' }),
    defineField({ name: 'donateQuoteAttribution', type: 'string', title: 'Donate Quote Attribution', initialValue: 'امام صادق (ع)' }),

    // ── About Us section ──────────────────────────────────────────────────────
    defineField({ name: 'aboutEyebrow', type: 'string', title: 'About — Eyebrow', initialValue: 'ہم کون ہیں' }),
    defineField({ name: 'aboutHeading', type: 'string', title: 'About — Heading', initialValue: 'دنیا کے ہر کونے میں شیعہ اسلامی علم پہنچانا' }),
    defineField({ name: 'aboutBody1', type: 'text', title: 'About — Body Paragraph 1', rows: 3, initialValue: 'دار القرآن ایک واحد مقصد کے ساتھ قائم کیا گیا — ہر مسلمان تک مستند شیعہ اسلامی تعلیم اور مذہبی خدمات کی رسائی، چاہے وہ کہیں بھی ہو۔' }),
    defineField({ name: 'aboutBody2', type: 'text', title: 'About — Body Paragraph 2', rows: 3, initialValue: 'اہل علماء کے آنلائن کورسز اور نیابت زیارت و اجارہ جیسی خدمات کے ذریعے ہم دنیا بھر میں ہزاروں خاندانوں کی خدمت کرتے ہیں۔' }),
    defineField({
      name: 'aboutPillars', type: 'array', title: 'About — Pillars / Tags',
      of: [{ type: 'string' }],
      initialValue: ['ایمان', 'علم', 'رسائی', 'اخلاص'],
    }),
    defineField({ name: 'aboutCtaLabel', type: 'string', title: 'About — CTA Button Label', initialValue: 'ہمارے بارے میں جانیں' }),
    defineField({ name: 'aboutHadithArabic', type: 'string', title: 'About — Hadith (Arabic)', initialValue: 'اطلبوا العلم من المهد إلى اللحد' }),
    defineField({ name: 'aboutHadithTranslation', type: 'string', title: 'About — Hadith (Urdu)', initialValue: 'علم حاصل کرو گہوارے سے لحد تک۔' }),
    defineField({ name: 'aboutHadithAttribution', type: 'string', title: 'About — Hadith Attribution', initialValue: 'حضرت محمد (ص)' }),
    defineField({ name: 'aboutStat1Value', type: 'string', title: 'About — Stat 1 Value', initialValue: '500+' }),
    defineField({ name: 'aboutStat1Label', type: 'string', title: 'About — Stat 1 Label', initialValue: 'طلباء' }),
    defineField({ name: 'aboutStat2Value', type: 'string', title: 'About — Stat 2 Value', initialValue: '10+' }),
    defineField({ name: 'aboutStat2Label', type: 'string', title: 'About — Stat 2 Label', initialValue: 'علماء' }),
    defineField({ name: 'aboutStat3Value', type: 'string', title: 'About — Stat 3 Value', initialValue: '5+' }),
    defineField({ name: 'aboutStat3Label', type: 'string', title: 'About — Stat 3 Label', initialValue: 'ممالک' }),
    defineField({ name: 'aboutBadgeText', type: 'string', title: 'About — Badge Text', initialValue: 'اہل علماء' }),
    defineField({ name: 'aboutBadgeSubtext', type: 'string', title: 'About — Badge Subtext', initialValue: 'تصدیق شدہ و قابل اعتماد' }),

    // ── Testimonials section ──────────────────────────────────────────────────
    defineField({ name: 'testimonialsEyebrow', type: 'string', title: 'Testimonials — Eyebrow', initialValue: 'برادری' }),
    defineField({ name: 'testimonialsHeading', type: 'string', title: 'Testimonials — Heading', initialValue: 'ہماری برادری کیا کہتی ہے' }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage Settings' }
    },
  },
})
