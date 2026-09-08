import type { KeywordMatch } from "@/lib/types/search";

export function matchKeyword(term: string): KeywordMatch | null {
  const t = term.trim().toLowerCase();
  
  if (t === "about" || t === "ہمارے بارے میں" || t === "تعارف") {
    return { label: "ہمارے بارے میں", href: "/about", category: "page" };
  }
  if (t === "contact" || t === "رابطہ" || t === "رابطہ کریں") {
    return { label: "ہم سے رابطہ کریں", href: "/contact", category: "page" };
  }
  if (t === "donate" || t === "عطیہ" || t === "عطیات" || t === "صدقہ" || t === "zakat" || t === "زکوۃ") {
    return { label: "عطیات و صدقات", href: "/donate", category: "page" };
  }
  if (t === "courses" || t === "کورسز" || t === "کورس") {
    return { label: "تمام کورسز", href: "/courses", category: "course" };
  }
  if (t === "services" || t === "خدمات" || t === "سروسز") {
    return { label: "مذہبی خدمات", href: "/services", category: "service" };
  }
  
  return null;
}

export function getSuggestions(term: string): KeywordMatch[] {
  const t = term.trim().toLowerCase();
  if (!t) return [];
  
  const results: KeywordMatch[] = [];
  
  // Quran & Learning related
  if (
    t.includes("quran") || t.includes("قرآن") || 
    t.includes("tajweed") || t.includes("تجوید") || 
    t.includes("hifz") || t.includes("حفظ") || 
    t.includes("qaida") || t.includes("قاعدہ") || 
    t.includes("learn") || t.includes("سیکھیں") ||
    t.includes("course") || t.includes("کورس")
  ) {
    results.push({ label: "قرآن و اسلامی کورسز", href: "/courses", category: "course" });
  }

  // Religious Services related
  if (
    t.includes("istikhara") || t.includes("استخارہ") || 
    t.includes("nikah") || t.includes("نکاح") || 
    t.includes("majlis") || t.includes("مجلس") || 
    t.includes("service") || t.includes("خدمت") || t.includes("سروس")
  ) {
    results.push({ label: "مذہبی خدمات اور استخارہ", href: "/services", category: "service" });
  }

  // Donations
  if (
    t.includes("donate") || t.includes("عطیہ") || 
    t.includes("sadaqah") || t.includes("صدقہ") || 
    t.includes("fidiya") || t.includes("فدیہ")
  ) {
    results.push({ label: "عطیات", href: "/donate", category: "page" });
  }
  
  return results;
}
