import type { SearchResultType } from "@/lib/types/search";

export const SEARCH_TYPE_LABELS: Record<SearchResultType, string> = {
  post: "مضمون",
  course: "کورس",
  service: "سروس",
  event: "ایونٹ",
};

export function searchTypeLabel(typeOrCategory: string): string {
  return (
    SEARCH_TYPE_LABELS[typeOrCategory as SearchResultType] || typeOrCategory
  );
}
