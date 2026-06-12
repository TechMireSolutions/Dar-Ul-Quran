# Sanity CMS Schema & Query Rules

## Schema Conventions

Every new schema type must follow these rules:

| Rule | Detail |
|------|--------|
| `slug` field | Required on all public types; always use `isUnique: true` validator |
| `order` field | Number type on all list types for manual sort control |
| `seo` field | Inline object `{ title: string, description: string }` — NOT a separate document |
| `body` field | Always Portable Text array (`array of block`) |
| `parent` reference | `weak: false` on course and service parent fields |
| Image fields | Always include `alt` text subfield — never omit |

## Schema Types Reference

| Type | Purpose |
|------|---------|
| `post` | Blog articles — title, slug, author→, mainImage, categories[]→, featured, body, seo |
| `course` | Online courses (hierarchical) — title, slug, parent→, order, excerpt, featuredImage, body, faq, pricingTables[], seo |
| `service` | Services (hierarchical) — title, slug, parent→, order, excerpt, icon, isBookable, price, body, faq, seo |
| `page` | Static pages — title, slug, eyebrow, subtitle, body, seo |
| `siteSettings` | Global: email, phone, address, socials, logos, CTAs |
| `homepageSettings` | Homepage section config |
| `navigation` | Header/footer nav — recursive up to 4 levels |
| `testimonial` | Quotes — quote, name, role, order |
| `contactSubmission` | Form submissions — read-only in studio |

## GROQ Query Rules

- **All queries in `sanity/lib/queries.ts`** — never inline
- Exported as named `const` (e.g. `export const coursesQuery = groq\`...\``)
- Filter drafts: always include `!(_id in path("drafts.**"))`
- Slug: always project as `slug { current }`
- Default order: `order(order asc)` unless otherwise specified
- Explicit fields only — never `*` or `...` top-level spread
- Every query includes `seo { title, description }`

## safeFetch Pattern

```ts
// In a Server Component page:
import { safeFetch } from "@/sanity/lib/client";
import { myQuery } from "@/sanity/lib/queries";

const data = await safeFetch<MyType>(myQuery, { slug: params.slug });
if (!data) notFound();
```

`safeFetch` returns `null` if env vars are missing — always guard with `notFound()` or fallback.

## Contact Form Flow

`POST /api/contact/route.ts`:
1. Validate required fields (firstName, email, phone, country, city, message)
2. Create `contactSubmission` doc in Sanity (requires `SANITY_API_TOKEN` write token)
3. Send notification email via nodemailer (Gmail SMTP)
4. Return `{ success: true }` or `{ error: "..." }`
