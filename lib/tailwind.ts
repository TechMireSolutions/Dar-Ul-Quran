/**
 * Shared Tailwind utility strings — single source for repeated UI patterns.
 * Import and compose with template literals; do not duplicate raw class strings.
 */

/** Eyebrow / kicker label above section headings — no Latin tracking (Nastaliq) */
export const TW_EYEBROW =
  'flex items-center gap-2 text-2xs font-bold text-dq-700'

export const TW_EYEBROW_LINE = 'w-6 h-px bg-dq-400 inline-block shrink-0'

/** Section H2 on light backgrounds */
export const TW_SECTION_TITLE =
  'font-bold text-2xl sm:text-3xl text-slate-900 leading-heading tracking-normal'

/** Section H2 — compact (homepage article/testimonial blocks) */
export const TW_SECTION_TITLE_COMPACT =
  'font-bold text-2xl sm:text-[27px] text-slate-900 leading-heading tracking-normal'

/** Article detail H1 */
export const TW_ARTICLE_TITLE =
  'font-bold text-[26px] sm:text-[30px] lg:text-[38px] text-slate-900 leading-heading tracking-normal'

/** Category / tag badge */
export const TW_BADGE =
  'text-2xs font-bold bg-dq-50 text-dq-700 border border-dq-100 px-3 py-1 rounded-full tracking-normal'

/** Compact card category badge */
export const TW_BADGE_SM =
  'w-fit text-[10px] font-bold text-dq-700 bg-dq-50 border border-dq-100/80 rounded-full px-2.5 py-0.5 tracking-normal transition-colors duration-200 group-hover:bg-dq-100 group-hover:border-dq-200'

/** Page section container */
export const TW_CONTAINER = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

/** Header inner container (tighter horizontal padding on large screens) */
export const TW_CONTAINER_HEADER = 'max-w-7xl mx-auto px-6 lg:px-8'

/** Homepage hero content container */
export const TW_CONTAINER_HERO =
  'relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-14'

/** Narrow centered column (CTA banners, quotes) */
export const TW_CONTAINER_NARROW = 'max-w-3xl mx-auto px-4 sm:px-6'

/** Wide content column (contact grid, service why-us) */
export const TW_CONTAINER_WIDE = 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'

/** Dark leaf hero inner shell */
export const TW_CONTAINER_LEAF_HERO =
  'relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center'

/** Donate quote block column */
export const TW_CONTAINER_PROSE = 'max-w-2xl mx-auto px-4 sm:px-6'

/** Listing / nested-child card grid */
export const TW_CARD_GRID = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'

/** Standard vertical section padding */
export const TW_SECTION_PY = 'py-16 sm:py-20'

/** Page hero header inner padding */
export const TW_PAGE_HERO_PADDING = 'mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'

/** Subtitle under page/section titles */
export const TW_PAGE_SUBTITLE = 'text-[13.5px] text-gray-500 leading-urdu'

/** Muted body copy (error pages, empty states) */
export const TW_BODY_MUTED = 'text-[14px] text-gray-500 leading-urdu'

/** White card surface */
export const TW_CARD_SURFACE = 'bg-white border border-gray-100 rounded-2xl'

/** Padded card (outcomes, how-it-works) */
export const TW_CARD_SURFACE_PADDED = `${TW_CARD_SURFACE} p-6 shadow-sm`

/** Soft feature/cause card on light pages */
export const TW_FEATURE_CARD =
  'bg-slate-50 rounded-xl border border-gray-100 p-5 sm:p-6'

/** Feature card title + description */
export const TW_FEATURE_CARD_TITLE = 'font-semibold text-slate-900 text-[14px] mb-1.5 leading-urdu-tight'
export const TW_FEATURE_CARD_DESC = 'text-[13px] text-gray-500 leading-urdu'

/** Contact form panel */
export const TW_FORM_PANEL =
  'lg:col-span-3 bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4'

/** Dark leaf-page WhatsApp CTA */
export const TW_LEAF_WHATSAPP_CTA =
  'inline-flex items-center gap-2 min-h-11 bg-white/10 hover:bg-white/15 text-white text-[14px] font-semibold px-8 py-3.5 rounded-full border border-white/20 transition-all duration-200 hover:-translate-y-px active:translate-y-0 motion-reduce:hover:translate-y-0'

/** Leaf hero supporting copy on dark background */
export const TW_LEAF_HERO_SUBTITLE =
  'text-[16px] sm:text-[18px] text-slate-300 max-w-2xl mx-auto leading-urdu'

/** Leaf hero body paragraph under subtitle */
export const TW_LEAF_HERO_BODY =
  'text-[15px] text-slate-300 max-w-2xl mx-auto leading-urdu mb-6'

/** Pricing tables column (course leaf) */
export const TW_CONTAINER_PRICING = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'

/** Two-column form / feature grid */
export const TW_GRID_2 = 'grid grid-cols-1 sm:grid-cols-2 gap-4'

/** Homepage section header row (title + view-all) */
export const TW_SECTION_HEADER_ROW =
  'flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7 sm:mb-10'

/** Contact sidebar info row */
export const TW_CONTACT_INFO_ROW =
  'flex items-start gap-3 sm:gap-3.5 bg-white border border-gray-100 rounded-xl px-4 py-3.5 shadow-sm'

/** Contact social chip */
export const TW_CONTACT_SOCIAL_CHIP =
  'inline-flex min-h-11 items-center gap-1.5 text-[12px] font-medium text-gray-500 hover:text-dq-700 focus-visible:text-dq-700 bg-white border border-gray-200 rounded-lg px-3 transition-colors'

/** Desktop nav dropdown / flyout shell */
export const TW_NAV_DROPDOWN =
  'bg-white border border-gray-100 rounded-2xl shadow-nav'

/** CMS page body shell */
export const TW_PAGE_BODY = 'py-8 sm:py-12 bg-slate-50/40'

/** Icon box on about/donate feature cards */
export const TW_FEATURE_ICON =
  'w-9 h-9 bg-dq-50 border border-dq-100 rounded-xl flex items-center justify-center mb-3'

/** Dark leaf hero gradient overlay */
export const TW_LEAF_HERO_OVERLAY =
  'absolute inset-0 bg-gradient-to-b from-dq-900/60 via-transparent to-dq-900/80 pointer-events-none'

/** Gold meta chip on dark heroes */
export const TW_HERO_CHIP_GOLD =
  'text-[11px] font-bold text-dq-400 border border-dq-700/60 rounded-full px-3.5 py-1 bg-dq-950/40 tracking-normal'

/** Muted meta chip on dark heroes */
export const TW_HERO_CHIP_MUTED =
  'text-[11px] font-bold text-slate-400 border border-slate-700/60 rounded-full px-3.5 py-1 bg-slate-800/40 tracking-normal'

/** Homepage hero primary CTA (gradient + inset highlight) */
export const TW_HERO_GOLD_CTA =
  'group inline-flex items-center gap-2 text-white font-bold text-[13.5px] rounded-full px-7 py-3.5 leading-snug bg-gold-cta shadow-gold-lg shadow-inset-highlight transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:brightness-95 motion-reduce:hover:translate-y-0'

/** Homepage hero secondary outline CTA */
export const TW_HERO_OUTLINE_CTA =
  'inline-flex items-center font-semibold text-[13.5px] rounded-full px-[26px] py-3.5 text-dq-700 border-[1.5px] border-dq-400/45 bg-dq-50/90 leading-snug transition-all duration-200 hover:-translate-y-0.5 hover:bg-dq-100/80 active:translate-y-0 motion-reduce:hover:translate-y-0'

/** Hero stat icon box */
export const TW_HERO_STAT_ICON =
  'size-11 rounded-xl flex items-center justify-center shrink-0 bg-gold-icon border border-dq-400/40 shadow-gold-icon'

/** Search form shell (header + mobile) */
export const TW_SEARCH_FORM =
  'flex items-center rounded-full overflow-hidden border border-dq-400 shadow-focus-gold'

export const TW_SEARCH_FORM_MOBILE =
  'flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-dq-500 focus-within:shadow-focus-gold-subtle transition-all duration-200'

/** Articles index search input */
export const TW_SEARCH_INPUT =
  'flex-1 min-h-11 px-4 py-3 text-sm outline-none text-slate-700 placeholder:text-gray-400 bg-white border border-gray-200 rounded-xl focus:border-dq-400 focus:ring-2 focus:ring-dq-400/40 transition-all'

/** Header desktop search field (inside TW_SEARCH_FORM) */
export const TW_HEADER_SEARCH_INPUT =
  'min-h-11 px-4 py-2 text-[13px] outline-none w-[180px] text-slate-700 placeholder:text-gray-400 bg-white focus:bg-dq-50/40 transition-colors'

/** Header desktop search submit */
export const TW_HEADER_SEARCH_SUBMIT =
  'flex min-h-11 min-w-11 shrink-0 items-center justify-center self-stretch bg-dq-500 px-3 text-white transition-colors hover:bg-dq-600'

/** Card footer link with underline reveal */
export const TW_CARD_LINK =
  'mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-dq-700 py-2 transition-all duration-200 group/cta relative after:absolute after:bottom-0 after:end-0 after:h-px after:w-0 after:bg-dq-400 after:transition-all after:duration-300 hover:after:w-full'

/** Mobile nav row base — 44px min touch target */
export const TW_MOBILE_NAV_ROW =
  'flex min-h-11 items-center gap-2 py-2.5 ps-3 pe-[calc(12px+var(--nav-indent,0px))] rounded-xl text-sm font-medium transition-colors duration-150'

export const TW_MOBILE_NAV_ROW_ACTIVE =
  'bg-dq-50 text-dq-700 font-semibold border-s-2 border-dq-500'

/** Mobile drawer backdrop */
export const TW_MOBILE_PANEL_BACKDROP =
  'fixed inset-0 z-[60] touch-none bg-dq-950/70 lg:hidden transition-opacity duration-300 motion-reduce:transition-none supports-[backdrop-filter]:backdrop-blur-sm'

/** Mobile slide-over panel — dynamic viewport height + safe areas */
export const TW_MOBILE_PANEL =
  'fixed inset-y-0 start-0 z-[70] flex h-dvh max-h-dvh w-[min(300px,85vw)] flex-col border-e border-gray-100 bg-white lg:hidden shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none'

export const TW_MOBILE_PANEL_HEADER =
  'flex shrink-0 items-center justify-between border-b border-gray-100 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))]'

export const TW_MOBILE_PANEL_SEARCH =
  'shrink-0 space-y-2 border-b border-gray-100 bg-slate-50/60 px-5 py-3'

export const TW_MOBILE_PANEL_SEARCH_LABEL =
  'text-[11px] font-bold text-gray-400 tracking-normal'

export const TW_MOBILE_PANEL_NAV =
  'min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-3 scroll-smooth'

export const TW_MOBILE_SEARCH_SUBMIT =
  'flex min-h-11 min-w-11 shrink-0 items-center justify-center self-stretch bg-dq-500 px-4 transition-colors hover:bg-dq-600'

/** PayPal donate CTA (brand colors — exception to dq-*) */
export const TW_PAYPAL_CTA =
  'group inline-flex items-center justify-center gap-2.5 bg-[#0070BA] hover:bg-[#005ea6] text-white text-sm font-bold px-8 py-3 rounded-full shadow-[0_4px_20px_rgb(0_112_186/0.45)] transition-all duration-200 hover:-translate-y-px'

/** Floating WhatsApp button */
export const TW_WHATSAPP_FLOAT =
  'fixed bottom-5 end-5 z-50 group flex items-center gap-2 bg-[#25D366] hover:bg-[#20bc5a] focus-visible:bg-[#20bc5a] text-white rounded-full shadow-[0_4px_20px_rgb(37_211_102/0.45)] hover:shadow-[0_6px_28px_rgb(37_211_102/0.6)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 size-[52px] hover:w-auto focus-visible:w-auto overflow-hidden ps-0 hover:ps-3.5 focus-visible:ps-3.5 pe-0 hover:pe-4 focus-visible:pe-4 justify-center hover:justify-start focus-visible:justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60'

/** Page hero H1 in PageHeroHeader */
export const TW_PAGE_TITLE =
  'font-bold text-[26px] sm:text-[30px] text-slate-900 leading-heading tracking-normal'

/** Dark hero H1 (course/service leaf) */
export const TW_HERO_TITLE =
  'font-bold text-[34px] sm:text-[46px] lg:text-[54px] text-white leading-urdu-display tracking-normal'

/** Primary gold pill CTA */
export const TW_GOLD_CTA =
  'group inline-flex items-center gap-2 min-h-11 bg-dq-500 hover:bg-dq-400 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-gold-md transition-all duration-200 hover:-translate-y-px active:translate-y-0 active:brightness-95 motion-reduce:hover:translate-y-0'

/** Secondary gold CTA (darker, homepage about) */
export const TW_GOLD_CTA_DARK =
  'group inline-flex items-center gap-2 min-h-11 bg-dq-600 hover:bg-dq-700 text-white text-sm font-semibold px-6 py-3 rounded-full shadow-gold-sm hover:shadow-gold-hover transition-all duration-200 hover:-translate-y-px active:translate-y-0 motion-reduce:hover:translate-y-0'

/** Light outline pill CTA */
export const TW_OUTLINE_PILL =
  'inline-flex items-center justify-center min-h-11 gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-gray-50 hover:border-gray-400'

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
  'w-full min-h-11 border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-700 placeholder:text-gray-400 bg-white focus:outline-none focus:border-dq-400 focus:ring-2 focus:ring-dq-400/20 transition-all'

/** Full-width gold form submit button */
export const TW_FORM_SUBMIT =
  'w-full min-h-11 bg-dq-600 hover:bg-dq-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13.5px] font-semibold py-3 rounded-lg shadow-gold-sm hover:shadow-gold-hover transition-all duration-200 hover:-translate-y-px active:translate-y-0 motion-reduce:hover:translate-y-0'

/** Compact footer donate pill — keep ≥44px touch target + visible focus */
export const TW_FOOTER_DONATE_CTA =
  'group inline-flex items-center gap-1.5 mt-4 min-h-11 px-5 py-2.5 sm:mt-5 bg-dq-500 hover:bg-dq-600 text-white text-[13px] font-semibold rounded-full shadow-gold-sm hover:shadow-gold-hover transition-all duration-200 hover:-translate-y-px active:translate-y-0 motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-dq-900'

/** Footer contact row (email / phone / WhatsApp) */
export const TW_FOOTER_CONTACT_LINK =
  'flex min-h-11 items-center gap-2 rounded-md text-[12px] sm:text-[12.5px] text-gray-300 hover:text-dq-400 focus-visible:text-dq-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dq-900 transition-colors duration-150'

/** Footer social icon button — ≥44px on mobile */
export const TW_FOOTER_SOCIAL =
  'inline-flex size-11 sm:size-10 rounded-lg bg-dq-800 border border-dq-700 items-center justify-center text-gray-300 hover:border-dq-400 hover:text-dq-300 focus-visible:border-dq-400 focus-visible:text-dq-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50 active:brightness-95 transition-all duration-200'

/** Footer main column grid */
export const TW_FOOTER_GRID =
  'grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8 lg:gap-10'

/** Footer column heading */
export const TW_FOOTER_COL_HEADING =
  'text-[13px] font-bold text-dq-400 mb-2.5 sm:mb-4 tracking-normal'

/** Footer quick-link / service row */
export const TW_FOOTER_NAV_LINK =
  'group flex min-h-11 items-center gap-1.5 rounded-md text-[12px] sm:text-[13px] text-gray-300 hover:text-dq-400 focus-visible:text-dq-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-dq-900 transition-colors duration-150'

/** Reserved-width hover chevron (no layout shift) */
export const TW_FOOTER_NAV_CHEVRON =
  'w-3 shrink-0 text-center text-[11px] leading-none text-transparent group-hover:text-dq-400 group-focus-visible:text-dq-400 transition-colors rtl:rotate-180'

/** Related-site chip next to social icons */
export const TW_FOOTER_RELATED =
  'inline-flex items-center gap-1 min-h-11 text-[11px] font-medium text-gray-300 hover:text-dq-400 focus-visible:text-dq-400 bg-dq-800 border border-dq-700 hover:border-dq-400 focus-visible:border-dq-400 rounded-lg px-2.5 py-1.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50'

/** Brand tagline under footer logo */
export const TW_FOOTER_TAGLINE =
  'text-[12px] sm:text-[13px] text-gray-300 leading-urdu mb-3 sm:mb-5 max-w-[280px] line-clamp-2 sm:line-clamp-none'

/** Copyright line */
export const TW_FOOTER_COPY =
  'text-[11.5px] text-gray-300 text-center sm:text-start'

/** Main footer padding inside container */
export const TW_FOOTER_BODY = 'py-6 sm:py-10 lg:py-12'

/** Social chip row */
export const TW_FOOTER_SOCIAL_LIST =
  'flex items-center gap-2 flex-wrap list-none p-0 m-0'

/** Contact column grid */
export const TW_FOOTER_CONTACT_GRID =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-2 sm:gap-y-3'

/** Shared gold icon tint in footer contact/social rows */
export const TW_FOOTER_ICON = 'text-dq-400 shrink-0'

/** Address text under map pin */
export const TW_FOOTER_ADDRESS =
  'text-[12px] sm:text-[12.5px] text-gray-300 leading-urdu whitespace-pre-line py-2'

/** Empty contact fallback */
export const TW_FOOTER_EMPTY = 'text-[12px] text-gray-400 leading-urdu'

/** Nav column list spacing */
export const TW_FOOTER_NAV_LIST = 'space-y-1.5 sm:space-y-2.5'

/** Bottom bar row (with optional FAB clearance applied separately) */
export const TW_FOOTER_BOTTOM_INNER =
  'flex items-center justify-center sm:justify-start'

/** Extra bottom padding when WhatsApp FAB is present (safe-area aware). */
export const TW_FOOTER_FAB_PAD =
  'pt-4 pb-[max(4rem,calc(env(safe-area-inset-bottom)+1rem))] sm:pt-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))]'

/** Footer shell */
export const TW_FOOTER_SHELL = `bg-dq-900 border-t border-dq-800 ${TW_CV_AUTO}`

/** Bottom legal bar shell */
export const TW_FOOTER_BOTTOM = 'border-t border-dq-950 bg-dq-950'

/** Bottom bar padding when FAB is absent (safe-area aware). */
export const TW_FOOTER_PAD_Y =
  'pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]'

/** Brand logo ring shared by header / footer / drawer */
export const TW_BRAND_LOGO_RING =
  'rounded-full overflow-hidden border-2 border-dq-400 shrink-0 transition-transform duration-200 group-hover:scale-105 motion-reduce:group-hover:scale-100'

/** Gradient letter fallback when logo asset is missing */
export const TW_BRAND_LOGO_FALLBACK =
  'w-full h-full bg-gradient-to-br from-dq-100 to-dq-200 flex items-center justify-center text-dq-800 font-bold select-none'

/** Desktop nav dropdown row */
export const TW_NAV_MENU_ITEM =
  'flex min-h-11 items-center gap-2 px-4 py-2.5 text-[13px] transition-colors duration-150'

/** Mobile drawer search field */
export const TW_MOBILE_SEARCH_INPUT =
  'min-h-11 flex-1 bg-white px-4 py-3 text-[14px] text-slate-700 outline-none placeholder:text-gray-400'

/** Centered section title block spacing */
export const TW_SECTION_HEADER_CENTER = 'text-center mb-12'
export const TW_SECTION_HEADER_CENTER_SM = 'text-center mb-10'

/** Carousel prev/next control */
export const TW_CAROUSEL_NAV_BTN =
  'w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200'
export const TW_CAROUSEL_NAV_BTN_ON =
  'border-gray-200 text-gray-500 hover:border-dq-500 hover:text-dq-700 hover:bg-dq-50'
export const TW_CAROUSEL_NAV_BTN_OFF =
  'border-gray-100 text-gray-300 cursor-not-allowed'

/** Gold gradient text (hero headline accent) */
export const TW_TEXT_GRADIENT_GOLD =
  'bg-gradient-to-br from-dq-400 via-dq-500 to-dq-600 bg-clip-text text-transparent'

/** Rich text from Portable Text — see globals.css @layer components */
export const TW_RICH_TEXT_LG = 'rich-text rich-text-lg max-w-none'
export const TW_RICH_TEXT_SM = 'rich-text rich-text-sm max-w-none'
