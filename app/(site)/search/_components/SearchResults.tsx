import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import SearchEmptyState from "@/components/layout/SearchEmptyState";
import {
  SearchQuickMatchBadge,
  SearchResultBody,
  SearchSectionHeading,
  SearchTypeBadge,
} from "@/components/ui/SearchResultMeta";
import type { SearchResponse } from "@/lib/types/search";
import { searchTypeLabel } from "@/lib/cms/search-labels";

interface SearchResultsProps {
  term: string;
  keywordMatch: SearchResponse["keywordMatch"];
  suggestions: SearchResponse["suggestions"];
  results: SearchResponse["results"];
  totalCount: number;
}

export default function SearchResults({
  term,
  keywordMatch,
  suggestions,
  results,
  totalCount,
}: SearchResultsProps) {
  return (
    <div className="text-right" dir="rtl">
      {!term && (
        <p className="text-gray-500 dark:text-slate-400">
          ہیڈر میں موجود تلاش کا باکس استعمال کریں، یا URL میں{" "}
          <code className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-sm" dir="ltr">
            ?q=your+query
          </code>{" "}
          شامل کریں۔
        </p>
      )}

      {term && totalCount === 0 && (
        <SearchEmptyState term={term} className="py-12" />
      )}

      {results.length > 0 && (
        <div className={(keywordMatch || suggestions.length > 0) ? "mb-8" : ""}>
          {(keywordMatch || suggestions.length > 0) && (
            <SearchSectionHeading>تلاش کے نتائج</SearchSectionHeading>
          )}
          <ul className="space-y-3">
            {results.map((item) => (
              <li key={item._id}>
                <Link
                  href={item.href}
                  className="block rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 sm:p-5 transition-colors hover:border-dq-200 dark:hover:border-dq-800 hover:shadow-sm"
                >
                  <SearchTypeBadge type={searchTypeLabel(item._type)} className="w-fit mb-2" />
                  <SearchResultBody
                    title={item.title}
                    summary={item.summary}
                    titleClassName="text-[16px] font-semibold text-slate-900 dark:text-white"
                    summaryClassName="text-[14px] text-slate-600 dark:text-slate-400 line-clamp-2"
                  />
                  <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-dq-600 dark:text-dq-400">
                    دیکھیں
                    <ArrowLeft size={12} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {keywordMatch && (
        <div className={suggestions.length > 0 ? "mb-8" : ""}>
          <SearchSectionHeading>براہ راست نتیجہ</SearchSectionHeading>
          <Link
            href={keywordMatch.href}
            className="flex items-center gap-4 rounded-2xl border border-dq-200 dark:border-dq-800 bg-dq-50 dark:bg-dq-950/30 p-5 transition-colors hover:bg-dq-100 dark:hover:bg-dq-950/50"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-dq-100 dark:bg-dq-900/40 border border-dq-200 dark:border-dq-800">
              <Sparkles size={20} className="text-dq-600 dark:text-dq-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <SearchQuickMatchBadge />
                <SearchTypeBadge type={searchTypeLabel(keywordMatch.category)} />
              </div>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                {keywordMatch.label}
              </span>
            </div>
            <ArrowLeft size={18} className="text-dq-600 dark:text-dq-400 shrink-0" />
          </Link>
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <SearchSectionHeading>متعلقہ تجاویز</SearchSectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {suggestions.map((sug) => (
              <Link
                key={sug.href}
                href={sug.href}
                className="flex items-center gap-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-4 transition-colors hover:border-dq-200 dark:hover:border-dq-800 hover:shadow-sm"
              >
                <SearchTypeBadge type={searchTypeLabel(sug.category)} />
                <span className="text-[15px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {sug.label}
                </span>
                <ArrowLeft
                  size={14}
                  className="mr-auto text-gray-400 dark:text-slate-500 shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
