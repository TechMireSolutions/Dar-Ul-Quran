# Component Patterns & Usage

## Core UI Components

### Reveal (scroll-triggered animation)

```tsx
import Reveal from "@/components/ui/Reveal";

<Reveal animation="up" delay={100}>
  <YourContent />
</Reveal>
```

- `animation`: `'up' | 'fade' | 'scale' | 'left' | 'right'`
- `delay`: milliseconds (default 0)
- `threshold`: IntersectionObserver threshold (default 0.1)
- `once`: play once only (default true)

### ContentCard

```tsx
<ContentCard
  title="Course Title"
  description="Short excerpt"
  imageUrl={urlFor(image).url()}
  href="/online-courses/slug"
  ctaLabel="مزید جانیں"
/>
```

Features: image, hover lift, gold accent stripe, corner arrow on hover.

### CarouselSection

```tsx
<CarouselSection
  title="Our Courses"
  items={courses}   // { id, title, imageUrl, href, description? }[]
  viewAllHref="/online-courses"
/>
```

Features: scroll snap, prev/next buttons (disabled at edges), edge fade gradients.

### WhatsAppButton

No props — reads `siteSettings.whatsapp` from context (passed through layout).
Fixed position, bottom-right. Cleans phone number (removes non-digits).

## Layout Components

### Header

- Fetched nav: recursive fly-out dropdowns up to 4 levels (desktop)
- Mobile: accordion with breadcrumb indentation
- Search: routes to `/articles?q=...`
- Falls back to hardcoded nav if Sanity data unavailable
- Sticky with shadow on scroll

### Footer

- 4-column grid (2-col mobile → 4-col desktop)
- Column 3 (Services) populated from Sanity `footerServicesQuery`
- Column 4: contact info + Donate button — all from `siteSettings`

## Image Pattern

```tsx
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

<Image
  src={urlFor(sanityImage).width(800).url()}
  alt={sanityImage.alt ?? ""}
  width={800}
  height={450}
  className="object-cover"
/>
```

`cdn.sanity.io` is whitelisted in `next.config.ts` remotePatterns.

## Animation CSS Classes (globals.css)

For non-React contexts (plain HTML sections):

| Class | Effect |
|-------|--------|
| `.rv-up` | Slide up + fade in |
| `.rv-fade` | Fade in |
| `.rv-scale` | Scale in + fade |
| `.rv-left` | Slide from left + fade |
| `.rv-right` | Slide from right + fade |

Triggered by IntersectionObserver in `Reveal.tsx`.
