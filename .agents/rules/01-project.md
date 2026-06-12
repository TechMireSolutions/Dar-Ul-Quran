# Project Overview

Islamic educational organization website (Dar Ul Quran, Pakistan). Full-stack CMS-driven site with courses, services, articles, and static pages — all editable from Sanity Studio.

## Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | 15.x |
| UI | React | 19.x |
| CMS | Sanity | v6 |
| Styles | Tailwind CSS | v4 (PostCSS plugin) |
| Language | TypeScript | v6, strict |
| Rich Text | @portabletext/react | — |
| Images | @sanity/image-url + next/image | — |
| Email | nodemailer (Gmail SMTP) | — |
| Icons | lucide-react | — |
| Font | Noto Nastaliq Urdu | Google Fonts |

## Key Facts

- Fully RTL: root HTML is `lang="ur" dir="rtl"`
- Brand colors: `dq-*` gold palette (`dq-600`/`dq-700` = primary)
- All content from Sanity — never hardcode copy, contacts, or nav
- Hierarchical routes: courses and services use `[...slug]` catch-all with parent/child references
- Studio at `/studio` route (embedded in Next.js)
- Deployed via GitHub Actions

## Commands

```bash
npm run dev     # Dev server → localhost:3000
npm run build   # Production build
npm run lint    # ESLint
```

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
EMAIL_USER / EMAIL_PASS / EMAIL_TO
```

Never commit, log, or expose these values.
