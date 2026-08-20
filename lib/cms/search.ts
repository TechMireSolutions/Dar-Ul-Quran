import { cache } from "react";
import { safeFetch } from "@/sanity/lib/client";
import { siteSearchQuery } from "@/sanity/lib/queries/search";
import type { SiteSearchResult, SearchResponse } from "@/lib/types/search";
import { matchKeyword, getSuggestions } from "@/lib/cms/keywords";
import { CMS_TAG } from "@/lib/cache-tags";

export const searchSite = cache(async (term: string): Promise<SearchResponse> => {
  const trimmed = term.trim();
  if (!trimmed) {
    return { keywordMatch: null, suggestions: [], results: [] };
  }

  const keywordMatch = matchKeyword(trimmed);
  const suggestions = getSuggestions(trimmed);

  const lowerTerm = trimmed.toLowerCase();

  const matchTypes: string[] = [];
  if (lowerTerm.includes("course") || lowerTerm.includes("کورس")) matchTypes.push("course");
  if (lowerTerm.includes("service") || lowerTerm.includes("سروس") || lowerTerm.includes("خدمت")) matchTypes.push("service");
  if (lowerTerm.includes("event") || lowerTerm.includes("ایونٹ") || lowerTerm.includes("تقریب")) matchTypes.push("event");
  if (lowerTerm.includes("post") || lowerTerm.includes("مضمون") || lowerTerm.includes("article")) {
    matchTypes.push("post");
  }

  const genericWords = ["online", "course", "courses", "service", "services", "event", "events", "post", "posts", "blog", "article", "کورس", "سروس", "مضمون", "ایونٹ"];
  const searchWords = lowerTerm.split(/\s+/).filter(word => !genericWords.includes(word));
  const refinedTerm = searchWords.join(" ");

  type RawResult = SiteSearchResult & { parentSlug?: string; grandparentSlug?: string };
  const rawResults = await safeFetch<RawResult[]>(
    siteSearchQuery,
    {
      term: refinedTerm,
      hasTerm: refinedTerm.length > 0,
      rawTerm: trimmed,
      matchTypes,
    },
    {
      tags: [CMS_TAG],
      next: { revalidate: 3600 },
    }
  );

  const results = (rawResults ?? []).map((res) => {
    let href = "/";
    if (res._type === "post") href = `/posts/${res.slug}`;
    else if (res._type === "event") href = `/events/${res.slug}`;
    else if (res._type === "course") {
      const base = "/online-courses";
      if (res.grandparentSlug && res.parentSlug) href = `${base}/${res.grandparentSlug}/${res.parentSlug}/${res.slug}`;
      else if (res.parentSlug) href = `${base}/${res.parentSlug}/${res.slug}`;
      else href = `${base}/${res.slug}`;
    } else if (res._type === "service") {
      href = res.parentSlug ? `/services/${res.parentSlug}/${res.slug}` : `/services/${res.slug}`;
    }

    return {
      _id: res._id,
      _type: res._type,
      title: res.title,
      excerpt: res.excerpt,
      description: res.description,
      slug: res.slug,
      summary: res.summary,
      href,
    } as SiteSearchResult;
  });

  return { keywordMatch, suggestions, results };
});
