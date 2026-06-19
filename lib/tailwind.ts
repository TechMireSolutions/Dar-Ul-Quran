/**
 * Shared Tailwind utility strings — single source for repeated UI patterns.
 * Import and compose with template literals; do not duplicate raw class strings.
 */

/** Eyebrow / kicker label above section headings */
export const TW_EYEBROW =
  'flex items-center gap-2 text-2xs font-bold uppercase tracking-[0.18em] text-dq-700'

export const TW_EYEBROW_LINE = 'w-5 h-px bg-dq-400 inline-block shrink-0'

/** Section H2 on light backgrounds */
export const TW_SECTION_TITLE =
  'font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight'

/** Section H2 — compact (homepage article/testimonial blocks) */
export const TW_SECTION_TITLE_COMPACT =
  'font-bold text-2xl sm:text-[27px] text-slate-900 leading-tight tracking-tight'

/** Article detail H1 */
export const TW_ARTICLE_TITLE =
  'font-bold text-[26px] sm:text-[30px] lg:text-[38px] text-slate-900 leading-tight tracking-tight'

/** Category / tag badge */
export const TW_BADGE =
  'text-2xs font-bold uppercase tracking-widest bg-dq-50 text-dq-700 border border-dq-100 px-3 py-1 rounded-full'

/** PayPal donate CTA (brand colors — exception to dq-*) */
export const TW_PAYPAL_CTA =
  'group inline-flex items-center justify-center gap-2.5 bg-[#0070BA] hover:bg-[#005ea6] text-white text-sm font-bold px-8 py-3 rounded-full shadow-[0_4px_20px_rgb(0_112_186/0.45)] transition-all duration-200 hover:-translate-y-px'

/** Floating WhatsApp button */
export const TW_WHATSAPP_FLOAT =
  'fixed bottom-5 end-5 z-50 group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] text-white rounded-full shadow-[0_4px_20px_rgb(37_211_102/0.45)] hover:shadow-[0_6px_28px_rgb(37_211_102/0.6)] transition-all duration-300 hover:-translate-y-0.5 size-[52px] hover:w-auto overflow-hidden ps-0 hover:ps-3.5 pe-0 hover:pe-4 justify-center hover:justify-start'

/** Page hero H1 in PageHeroHeader */
export const TW_PAGE_TITLE =
  'font-bold text-[26px] sm:text-[30px] text-slate-900 tracking-tight'

/** Dark hero H1 (course/service leaf) */
export const TW_HERO_TITLE =
  'font-bold text-[34px] sm:text-[46px] lg:text-[54px] text-white leading-tight tracking-tight'

/** Primary gold pill CTA */
export const TW_GOLD_CTA =
  'group inline-flex items-center gap-2 bg-dq-500 hover:bg-dq-400 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-gold-md transition-all duration-200 hover:-translate-y-px'

/** Secondary gold CTA (darker, homepage about) */
export const TW_GOLD_CTA_DARK =
  'group inline-flex items-center gap-2 bg-dq-600 hover:bg-dq-700 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-gold-sm hover:shadow-gold-hover transition-all duration-200 hover:-translate-y-px'

/** CTA arrow icon */
export const TW_CTA_ARROW =
  'rtl:rotate-180 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform duration-150 shrink-0'

/** WCAG touch target minimum */
export const TW_TOUCH = 'min-h-11'

/** Primary filled button (error/404 actions) */
export const TW_BTN_PRIMARY =
  'inline-flex items-center justify-center min-h-11 px-6 py-3 rounded-xl bg-dq-600 text-white text-sm font-semibold hover:bg-dq-700 transition-colors'

/** Secondary outline button */
export const TW_BTN_SECONDARY =
  'inline-flex items-center justify-center min-h-11 px-6 py-3 rounded-xl border border-gray-200 text-slate-700 text-sm font-semibold hover:bg-gray-50 transition-colors'

/** Below-fold content-visibility optimization */
export const TW_CV_AUTO = 'cv-auto'

/** Hide scrollbar (carousel tracks) */
export const TW_SCROLLBAR_HIDE = 'scrollbar-hide'

/** Section header "view all" text link */
export const TW_VIEW_ALL_LINK =
  'group inline-flex items-center gap-1.5 text-[13px] font-semibold text-dq-700 hover:text-dq-800 transition-colors whitespace-nowrap py-2'

/** Contact form text input / select */
export const TW_FORM_INPUT =
  'w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-700 placeholder:text-gray-400 bg-white focus:outline-none focus:border-dq-400 focus:ring-2 focus:ring-dq-400/20 transition-all'

/** Full-width gold form submit button */
export const TW_FORM_SUBMIT =
  'w-full bg-dq-600 hover:bg-dq-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13.5px] font-semibold py-3 rounded-lg shadow-gold-sm hover:shadow-gold-hover transition-all duration-200 hover:-translate-y-px'

/** Compact footer donate pill */
export const TW_FOOTER_DONATE_CTA =
  'group inline-flex items-center gap-1.5 mt-4 px-4 py-2 sm:mt-5 sm:px-5 sm:py-2.5 bg-dq-500 hover:bg-dq-600 text-white text-[12px] font-semibold rounded-full shadow-gold-sm hover:shadow-gold-hover transition-all duration-200 hover:-translate-y-px'

/** Gold gradient text (hero headline accent) */
export const TW_TEXT_GRADIENT_GOLD =
  'bg-gradient-to-br from-dq-400 via-dq-500 to-dq-600 bg-clip-text text-transparent'

/** Rich text from Portable Text — see globals.css @layer components */
export const TW_RICH_TEXT = 'rich-text max-w-none'
export const TW_RICH_TEXT_LG = 'rich-text rich-text-lg max-w-none'
export const TW_RICH_TEXT_SM = 'rich-text rich-text-sm max-w-none'
