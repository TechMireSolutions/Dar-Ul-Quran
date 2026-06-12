# Architecture

## Directory Structure

```
app/
  layout.tsx                       Root: RTL HTML (lang="ur" dir="rtl"), font, metadata
  (site)/layout.tsx                Site shell: Header + Footer (fetches siteSettings, headerNav)
  (site)/page.tsx                  Homepage
  (site)/about/page.tsx
  (site)/contact/page.tsx + ContactForm.tsx
  (site)/donate/page.tsx
  (site)/articles/page.tsx + [slug]/page.tsx
  (site)/online-courses/page.tsx + [...slug]/page.tsx   ← hierarchical catch-all
  (site)/services/page.tsx + [...slug]/page.tsx          ← hierarchical catch-all
  api/contact/route.ts             POST: validate → Sanity write → Gmail email
  studio/[[...tool]]/page.tsx      Embedded Sanity Studio

components/
  layout/Header.tsx                Sticky, 4-level recursive nav (desktop + mobile)
  layout/Footer.tsx                4-column footer
  sections/HeroSection.tsx         Landing hero with CTAs + stats
  sections/CarouselSection.tsx     Horizontal scroll carousel (snap, prev/next)
  ui/Reveal.tsx                    Scroll-triggered IntersectionObserver animations
  ui/ContentCard.tsx               Card with hover lift + gold accent
  ui/WhatsAppButton.tsx            Fixed floating WhatsApp button

sanity/
  lib/client.ts                    Sanity client + safeFetch (null-safe)
  lib/image.ts                     urlFor() image URL builder
  lib/queries.ts                   ALL GROQ queries — never write inline GROQ elsewhere
  schemaTypes/                     All Sanity document and object types
```

## Data Flow

1. Server Component → `safeFetch(query)` → Sanity CDN → typed data → render
2. Contact form → `POST /api/contact` → creates `contactSubmission` doc → sends email
3. Navigation → fetched in `(site)/layout.tsx` with ISR 300s
4. Images → `urlFor(sanityImage).url()` → passed to `<Image>` with `cdn.sanity.io` remote pattern

## Route Patterns

- `[...slug]` catch-all receives `params.slug: string[]` — join with `/` to reconstruct paths
- `generateStaticParams` on hierarchical routes for ISR pre-rendering
- `generateMetadata` on all public pages pulling from `seo { title, description }`
