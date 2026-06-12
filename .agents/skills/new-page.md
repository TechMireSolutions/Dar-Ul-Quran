# Skill: new-page

Scaffolds a new CMS-driven public page in the Next.js App Router.

## Trigger

User asks to add a new page, section, or route (e.g. "add a gallery page", "create a scholarships section").

## Steps

1. **Create** `app/(site)/<slug>/page.tsx` as a Server Component:
   ```tsx
   export const revalidate = 300;

   export async function generateMetadata({ params }) {
     const page = await safeFetch(pageBySlugQuery, { slug: "<slug>" });
     return { title: page?.seo?.title, description: page?.seo?.description };
   }

   export default async function Page() {
     const data = await safeFetch(relevantQuery);
     if (!data) notFound();
     // render
   }
   ```

2. **Use** `safeFetch` + appropriate query from `sanity/lib/queries.ts`

3. **Wrap** content sections in `<Reveal>` for scroll animations

4. **Apply** RTL-safe spacing (`ms-*`/`me-*`) and `dq-*` brand colors

5. **Add** corresponding Sanity `page` document in Studio with slug matching the route

## Conventions

- No `"use client"` unless interactive sub-component is needed
- RTL logical properties throughout
- `notFound()` guard after `safeFetch`
- Match route slug to Sanity `page` document slug
