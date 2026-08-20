import Link from "next/link";
import { Info } from "lucide-react";
import { SEARCH_QUICK_LINKS } from "@/lib/fallbacks/nav";

interface SearchEmptyStateProps {
  term: string;
  variant?: "link" | "button";
  onSelect?: (href: string) => void;
  className?: string;
}

export default function SearchEmptyState({
  term,
  variant = "link",
  onSelect,
  className = "",
}: SearchEmptyStateProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-900/30 px-3 py-2 text-sm font-medium text-amber-800 dark:text-amber-400 mx-auto w-fit mb-5">
        <Info size={16} className="shrink-0" aria-hidden="true" />
        <span>
          &ldquo;{term}&rdquo; ابھی دستیاب نہیں ہے
        </span>
      </div>
      <p className="mx-auto mb-6 max-w-[400px] text-[15px] text-gray-500 dark:text-slate-400">
        اس وقت ہمارے پاس اس لفظ سے متعلق کوئی مواد نہیں ہے۔ کچھ اور تلاش کریں یا ان صفحات کو دیکھیں:
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {SEARCH_QUICK_LINKS.map((item) =>
          variant === "button" && onSelect ? (
            <button
              key={item.href}
              type="button"
              onClick={() => onSelect(item.href)}
              className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[14px] font-medium text-slate-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700/80"
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-[15px] font-semibold text-slate-800 shadow-sm transition-all hover:border-dq-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:border-dq-600"
            >
              {item.label}
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

interface QuickNavChipsProps {
  onSelect: (href: string) => void;
}

export function QuickNavChips({ onSelect }: QuickNavChipsProps) {
  return (
    <div className="px-4 py-8 text-center text-[15px] text-gray-500 dark:text-slate-400">
      <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
        فوری رسائی
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {SEARCH_QUICK_LINKS.map((item) => (
          <button
            key={item.href}
            type="button"
            onClick={() => onSelect(item.href)}
            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[14px] font-medium text-slate-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-slate-700/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700/80"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
