import type { Metadata } from "next";
import PageHeroHeader from "@/components/ui/PageHeroHeader";
import { searchSite } from "@/lib/cms/search";
import { pageMetadata } from "@/lib/seo";
import SearchResults from "./_components/SearchResults";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  // We need to fetch settings directly or through a helper. 
  // Let's assume getSiteSettings is available or we use safeFetch directly if not.
  const { q } = await searchParams;
  const term = q?.trim() ?? "";
  
  // We can fetch settings or just rely on defaults for metadata
  return pageMetadata({
    title: term ? `تلاش: ${term}` : "تلاش کریں",
    description: term
      ? `"${term}" کے لیے تلاش کے نتائج`
      : "مضامین، کورسز، خدمات اور ایونٹس تلاش کریں۔",
    path: term ? `/search?q=${encodeURIComponent(term)}` : "/search",
    noIndex: true,
  });
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const term = q?.trim() ?? "";
  const response = term ? await searchSite(term) : null;
  const { keywordMatch, suggestions, results } = response ?? {
    keywordMatch: null,
    suggestions: [],
    results: [],
  };
  const totalCount =
    (keywordMatch ? 1 : 0) + suggestions.length + results.length;

  return (
    <div dir="rtl">
      <PageHeroHeader
        eyebrow="تلاش کریں"
        title={term ? `"${term}" کے لیے نتائج` : "سائٹ میں تلاش کریں"}
        subtitle={
          term
            ? keywordMatch
              ? "براہ راست نتیجہ مل گیا"
              : `${totalCount} نتائج ملے`
            : "مضامین، کورسز، خدمات اور ایونٹس تلاش کریں"
        }
      />

      <section className="py-12 bg-slate-50 dark:bg-slate-900/50 min-h-[60vh]">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <SearchResults
            term={term}
            keywordMatch={keywordMatch}
            suggestions={suggestions}
            results={results}
            totalCount={totalCount}
          />
        </div>
      </section>
    </div>
  );
}
