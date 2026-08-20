import { type NextRequest, NextResponse } from "next/server";
import { searchSite } from "@/lib/cms/search";
import { rateLimitSearch } from "@/lib/rate-limit";

function clientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";

  const ip = clientIp(request);
  const { success, remaining } = await rateLimitSearch(ip);
  if (!success) {
    return NextResponse.json(
      { message: "بہت زیادہ درخواستیں۔ براہ کرم بعد میں دوبارہ کوشش کریں۔" },
      { status: 429, headers: { 'Retry-After': '60', 'X-RateLimit-Remaining': String(remaining) } },
    );
  }

  try {
    const results = await searchSite(q);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { message: "Internal server error during search" },
      { status: 500 },
    );
  }
}
