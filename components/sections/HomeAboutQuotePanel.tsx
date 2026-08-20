"use client";

import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import type { HomepageSettingsDoc } from "@/lib/types";
import type { QuoteItem } from "@/lib/fallbacks/quotes";

interface HomeAboutQuotePanelProps {
  homepage: HomepageSettingsDoc | null;
  /** Resolved quote list (caller applies FALLBACK_QUOTES when CMS is empty). */
  quotes: QuoteItem[];
  scholarCount?: number;
  countryCount?: number;
}

export default function HomeAboutQuotePanel({
  homepage: hp,
  quotes,
  scholarCount,
  countryCount,
}: HomeAboutQuotePanelProps) {
  const hadithList = quotes;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [, startTransition] = useTransition();

  const [prevListLength, setPrevListLength] = useState(hadithList.length);
  if (hadithList.length !== prevListLength) {
    setPrevListLength(hadithList.length);
    setCurrentIndex(0);
  }

  if (hadithList.length === 0) return null;

  function handleNextHadith() {
    setFade(false);
    setTimeout(() => {
      startTransition(() => {
        setCurrentIndex((prev) => (prev + 1) % hadithList.length);
        setFade(true);
      });
    }, 250);
  }

  const activeHadith = hadithList[currentIndex] ?? hadithList[0];

  return (
    <div className="relative pb-10" dir="rtl">
      <div className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-3xl bg-dq-900 p-8 text-white shadow-card sm:p-10">
        <div className="bg-hero-glow pointer-events-none absolute top-0 left-0 size-72 hero-glow-offset rounded-full opacity-60" />

        <div className="relative z-10 flex justify-end mb-2" dir="ltr">
          {hadithList.length > 1 && (
            <button
              type="button"
              onClick={handleNextHadith}
              aria-label="اگلی حدیث دیکھیں"
              className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-gold-500/20 hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 cursor-pointer"
            >
              <RefreshCw size={14} className="animate-hover-spin" />
            </button>
          )}
        </div>

        <div
          className={`relative z-10 flex-1 flex flex-col justify-center transition-all duration-300 ${
            fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <p
            className="mb-4 text-center text-[24px] leading-loose font-arabic text-amber-400 select-all"
            dir="rtl"
            lang="ar"
          >
            {activeHadith.arabic}
          </p>
          <div className="mx-auto mb-4 w-10 h-px bg-amber-400" aria-hidden="true" />
          <p className="text-center text-[15px] leading-urdu-relaxed text-slate-300 select-all px-4">
            &quot;{activeHadith.translation}&quot;
          </p>
          <p className="mt-3.5 text-center font-semibold tracking-normal text-amber-500 flex flex-col items-center gap-1 text-[13px]">
            <span>— {activeHadith.attribution}</span>
            {activeHadith.reference && (
              <span className="text-xs font-normal text-slate-400">
                [{activeHadith.reference}]
              </span>
            )}
          </p>
        </div>

        <div
          className={`mt-8 grid gap-4 border-t border-white/10 pt-6 relative z-10 ${
            scholarCount && scholarCount > 0 ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          {(
            [
              {
                value: hp?.aboutStat1Value || "500+",
                label: hp?.aboutStat1Label || "طلباء",
              },
              scholarCount && scholarCount > 0
                ? {
                    value: `${scholarCount}+`,
                    label: hp?.aboutStat2Label || "علماء",
                  }
                : null,
              {
                value:
                  countryCount && countryCount > 0
                    ? `${countryCount}+`
                    : hp?.aboutStat3Value || "5+",
                label: hp?.aboutStat3Label || "ممالک",
              },
            ] as Array<{ value: string; label: string } | null>
          )
            .filter(
              (stat): stat is { value: string; label: string } => stat != null,
            )
            .map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-[26px] font-bold text-white group-hover:text-amber-400 transition-colors" dir="ltr">
                  {stat.value}
                </div>
                <div className="text-[13px] text-slate-400 mt-1 tracking-normal font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-6 flex items-center gap-3 px-5 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm">
        <div className="flex size-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold text-sm">✓</div>
        <div className="text-right">
          <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">
            {hp?.aboutBadgeText || "مستند علماء"}
          </p>
          <p className="text-[11px] text-gray-500 dark:text-slate-400">
            {hp?.aboutBadgeSubtext || "قابلِ اعتماد اور سند یافتہ"}
          </p>
        </div>
      </div>
    </div>
  );
}
