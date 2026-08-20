export type QuoteItem = {
  arabic: string;
  translation: string;
  attribution: string;
  reference?: string;
};

/** Homepage hadith carousel when CMS quotes are empty. */
export const FALLBACK_QUOTES: QuoteItem[] = [
  {
    arabic:
      "إِنَّ الْقَلْبَ الْحَدَثَ كَالأَرْضِ الْخَالِيَةِ مَا أُلْقِيَ فِيهَا مِنْ شَيْءٍ قَبِلَتْهُ",
    translation:
      "بےشک نوجوان کا دل ایک خالی زمین کی طرح ہے، اس میں جو کچھ بھی بویا جائے وہ اسے قبول کر لیتا ہے۔",
    attribution: "امام علی (ع)",
    reference: "نہج البلاغہ، مکتوب 31",
  },
  {
    arabic:
      "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ، أَلَا إِنَّ اللَّهَ يُحِبُّ بُغَاةَ الْعِلْمِ",
    translation:
      "علم کا حاصل کرنا ہر مسلمان پر فرض ہے؛ بےشک اللہ علم کے متلاشیوں سے محبت کرتا ہے۔",
    attribution: "امام جعفر صادق (ع)",
    reference: "الکافی، جلد 1، صفحہ 30",
  },
  {
    arabic: "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ",
    translation:
      "ماہِ رمضان وہ مہینہ ہے جس میں قرآن نازل کیا گیا، جو لوگوں کے لیے ہدایت ہے۔",
    attribution: "القرآن",
    reference: "سورۃ البقرہ (2:185)",
  },
];
