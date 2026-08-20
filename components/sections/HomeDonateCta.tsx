import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomepageSettingsDoc } from "@/lib/types";

interface HomeDonateCtaProps {
  homepage: HomepageSettingsDoc | null;
}

export default function HomeDonateCta({ homepage: hp }: HomeDonateCtaProps) {
  return (
    <section className="section-deferred relative overflow-hidden border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 py-10 sm:py-12">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="container-content relative max-w-copy text-center">
        <div className="text-eyebrow-gold mb-4 inline-flex items-center gap-2.5">
          <span className="eyebrow-line-gold w-6" />
          <span lang="ar" dir="rtl" className="font-arabic">
            فِي سَبِيلِ اللَّهِ
          </span>
          <span className="eyebrow-line-gold w-6" />
        </div>
        <h2 className="heading-section-lg mb-3" dir="rtl">
          {hp?.donateHeading || "ہمارے مشن کی حمایت کریں"}
        </h2>
        <p className="text-body-muted mx-auto mb-6 max-w-sm" dir="rtl">
          {hp?.donateText ||
            "آپ کا صدقہ اور عطیات دارالقرآن کی خدمات کو جاری رکھنے میں مددگار ثابت ہوتے ہیں۔"}
        </p>
        <div className="card-quote">
          <div className="absolute -top-3.5 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-base-plus leading-none font-bold text-gold-500">
              &ldquo;
            </span>
          </div>
          <p className="text-body-muted italic text-slate-600 dark:text-slate-300" dir="rtl">
            {hp?.donateQuote ||
              "صدقہ اللہ کے غضب کو ٹھنڈا کرتا ہے اور بری موت سے بچاتا ہے۔"}
          </p>
          <div className="mt-3 flex flex-col items-center justify-center gap-1">
            <div className="flex items-center gap-2">
              <span className="eyebrow-line-gold w-5" />
              <cite className="text-caption font-semibold tracking-wide text-gold-600 not-italic" dir="rtl">
                {hp?.donateQuoteAttribution || "فرمانِ معصوم (ع)"}
              </cite>
              <span className="eyebrow-line-gold w-5" />
            </div>
            {hp?.donateQuoteReference && (
              <span className="text-xs text-slate-500 dark:text-slate-400 opacity-80" dir="rtl">
                {hp.donateQuoteReference}
              </span>
            )}
          </div>
        </div>
        <Link href="/donate" className="btn-primary group" dir="rtl">
          {hp?.donateCtaLabel || "ابھی عطیہ کریں"}
          <ArrowRight
            size={14}
            strokeWidth={2.5}
            className="transition-transform duration-150 group-hover:-translate-x-0.5 ml-2"
          />
        </Link>
      </div>
    </section>
  );
}
