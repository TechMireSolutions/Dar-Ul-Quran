import { Sparkles } from "lucide-react";

export function SearchQuickMatchBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-normal text-amber-800 dark:bg-amber-900/40 dark:text-amber-400">
      <Sparkles size={10} />
      براہ راست
    </span>
  );
}

export function SearchTypeBadge({ type, className = "" }: { type: string; className?: string }) {
  return (
    <span className={`inline-block rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 ${className}`}>
      {type}
    </span>
  );
}

export function SearchSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-[11px] font-semibold tracking-widest text-gray-400 uppercase dark:text-slate-500">
      {children}
    </h3>
  );
}

interface SearchResultBodyProps {
  title: string;
  summary?: string;
  titleClassName?: string;
  summaryClassName?: string;
}

export function SearchResultBody({
  title,
  summary,
  titleClassName = "mt-1.5 text-sm-plus font-semibold text-slate-800 dark:text-slate-200 line-clamp-1",
  summaryClassName = "mt-0.5 text-xs text-gray-500 dark:text-slate-400 line-clamp-1",
}: SearchResultBodyProps) {
  return (
    <div>
      <h4 className={titleClassName}>{title}</h4>
      {summary && <p className={summaryClassName}>{summary}</p>}
    </div>
  );
}
