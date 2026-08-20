"use client";

import {
  BookOpen,
  Calendar,
  FileText,
  Settings,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import type { SiteSearchResult, KeywordMatch } from "@/lib/types/search";
import {
  SearchQuickMatchBadge,
  SearchResultBody,
  SearchTypeBadge,
} from "@/components/ui/SearchResultMeta";
import { searchTypeLabel } from "@/lib/cms/search-labels";

const TYPE_ICONS = {
  course: BookOpen,
  event: Calendar,
  post: FileText,
  service: Settings,
};

const SUGGESTION_ICONS: Record<string, typeof BookOpen> = {
  course: BookOpen,
  event: Calendar,
  article: FileText,
  service: Settings,
};

function rowClass(active: boolean) {
  return `flex w-full items-start gap-3.5 rounded-xl px-4 py-3 text-right transition-all duration-150 ${
    active
      ? "bg-dq-50 dark:bg-dq-950/30 border border-dq-100 dark:border-dq-900/50"
      : "border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40"
  }`;
}

function iconWrapClass(active: boolean, emphasized = false) {
  if (active) {
    return "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors bg-dq-100 border-dq-200 dark:bg-dq-900/40 dark:border-dq-800";
  }
  if (emphasized) {
    return "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors bg-dq-50 border-dq-200 dark:bg-dq-900/30 dark:border-dq-800";
  }
  return "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors bg-slate-50 border-gray-200 dark:bg-slate-800/60 dark:border-slate-800";
}

function activeBadgeClass(active: boolean) {
  return active
    ? "bg-dq-100/80 border-dq-200 dark:bg-dq-900/50 dark:border-dq-800"
    : "";
}

function GoHint() {
  return (
    <div className="flex items-center gap-1.5 self-center text-dq-600 dark:text-dq-400 shrink-0 mr-auto">
      <span className="text-[11px] font-semibold uppercase tracking-widest hidden sm:inline">
        جائیں
      </span>
      <ArrowLeft size={14} />
    </div>
  );
}

interface SearchPaletteResultsProps {
  keywordMatch: KeywordMatch | null;
  suggestions: KeywordMatch[];
  results: SiteSearchResult[];
  selectedIndex: number;
  onSelect: (href: string) => void;
}

export default function SearchPaletteResults({
  keywordMatch,
  suggestions,
  results,
  selectedIndex,
  onSelect,
}: SearchPaletteResultsProps) {
  let flatIndex = 0;

  return (
    <ul className="space-y-1">
      {keywordMatch &&
        (() => {
          const idx = flatIndex++;
          const active = idx === selectedIndex;
          return (
            <li key={`kw-${keywordMatch.href}`}>
              <button
                onClick={() => onSelect(keywordMatch.href)}
                data-active={active}
                className={rowClass(active)}
              >
                <div className={iconWrapClass(active, true)}>
                  <Sparkles
                    size={15}
                    className="text-dq-600 dark:text-dq-400"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <SearchQuickMatchBadge />
                    <SearchTypeBadge type={searchTypeLabel(keywordMatch.category)} />
                  </div>
                  <p className="mt-1.5 text-[15px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                    {keywordMatch.label}
                  </p>
                  <p className="mt-0.5 text-[12px] text-dq-600 dark:text-dq-400 line-clamp-1">
                    براہ راست اس صفحے پر جائیں
                  </p>
                </div>
                {active && <GoHint />}
              </button>
            </li>
          );
        })()}

      {suggestions.length > 0 && (
        <li key="suggestions-header" className="px-4 pt-2 pb-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
            متعلقہ تجاویز
          </span>
        </li>
      )}

      {suggestions.map((sug) => {
        const idx = flatIndex++;
        const active = idx === selectedIndex;
        const SugIcon = SUGGESTION_ICONS[sug.category] || FileText;
        return (
          <li key={`sug-${sug.href}`}>
            <button
              onClick={() => onSelect(sug.href)}
              data-active={active}
              className={rowClass(active)}
            >
              <div className={iconWrapClass(active)}>
                <SugIcon
                  size={15}
                  className={
                    active
                      ? "text-dq-700 dark:text-dq-400"
                      : "text-gray-500 dark:text-slate-400"
                  }
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <SearchTypeBadge
                    type={searchTypeLabel(sug.category)}
                    className={activeBadgeClass(active)}
                  />
                </div>
                <p className="mt-1.5 text-[15px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {sug.label}
                </p>
              </div>
              {active && <GoHint />}
            </button>
          </li>
        );
      })}

      {results.length > 0 && suggestions.length > 0 && (
        <li key="results-header" className="px-4 pt-2 pb-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-slate-500">
            تلاش کے نتائج
          </span>
        </li>
      )}

      {results.map((item) => {
        const idx = flatIndex++;
        const active = idx === selectedIndex;
        const Icon = TYPE_ICONS[item._type as keyof typeof TYPE_ICONS] || FileText;
        return (
          <li key={item._id}>
            <button
              onClick={() => onSelect(item.href)}
              data-active={active}
              className={rowClass(active)}
            >
              <div className={iconWrapClass(active)}>
                <Icon
                  size={15}
                  className={
                    active
                      ? "text-dq-700 dark:text-dq-400"
                      : "text-gray-500 dark:text-slate-400"
                  }
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <SearchTypeBadge
                    type={searchTypeLabel(item._type)}
                    className={activeBadgeClass(active)}
                  />
                </div>
                <SearchResultBody
                  title={item.title}
                  summary={item.summary}
                  titleClassName="mt-1.5 text-[15px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-1"
                />
              </div>
              {active && <GoHint />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
