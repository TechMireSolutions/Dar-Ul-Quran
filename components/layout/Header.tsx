'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Search, Menu, X, ChevronDown, ChevronLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

interface NavNode {
  label:    string
  href:     string
  external?: boolean
  children?: NavNode[]
}

interface HeaderProps {
  darulQuranUrl?:     string
  siteName?:          string
  logoUrl?:           string | null
  navItems?:          NavNode[]
  searchPlaceholder?: string
}

const FALLBACK_NAV: NavNode[] = [
  { label: 'آنلائن کلاسز', href: '/online-courses' },
  { label: 'خدمات',        href: '/services' },
  { label: 'مضامین',       href: '/articles' },
  { label: 'عطیہ',         href: '/donate' },
  { label: 'ہمارے بارے',   href: '/about' },
]

/* ── helpers ──────────────────────────────────────────────────────────────── */
function nodeIsActive(node: NavNode, pathname: string): boolean {
  if (node.href && node.href !== '#' &&
      (pathname === node.href || (node.href !== '/' && pathname.startsWith(node.href + '/')))) return true
  return node.children?.some(c => nodeIsActive(c, pathname)) ?? false
}

/* ══════════════════════════════════════════════════════════════════════════
   DESKTOP — recursive fly-out panel
   depth 0 = first dropdown (opens below nav item)
   depth 1+ = fly-out panels (open to the side on hover)
   ══════════════════════════════════════════════════════════════════════════ */

function DesktopPanel({
  nodes, onClose, depth = 0,
}: { nodes: NavNode[]; onClose: () => void; depth?: number }) {
  return (
    <div className="py-1">
      {nodes.map(node => (
        <DesktopPanelRow key={node.label} node={node} onClose={onClose} depth={depth} />
      ))}
    </div>
  )
}

function DesktopPanelRow({
  node, onClose, depth,
}: { node: NavNode; onClose: () => void; depth: number }) {
  const [flyOpen, setFlyOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const isActive = nodeIsActive(node, pathname)

  function enter() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setFlyOpen(true)
  }
  function leave() {
    closeTimer.current = setTimeout(() => setFlyOpen(false), 120)
  }

  if (!node.children?.length) {
    return (
      <Link
        href={node.href || '#'}
        target={node.external ? '_blank' : undefined}
        rel={node.external ? 'noopener noreferrer' : undefined}
        onClick={onClose}
        className={`flex items-center gap-2 px-4 py-2.5 text-[13px] transition-colors duration-150
          hover:bg-dq-50 hover:text-dq-700
          ${isActive ? 'text-dq-700 bg-dq-50/60' : 'text-gray-600'}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-dq-200 flex-shrink-0" />
        {node.label}
      </Link>
    )
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      {/* Row */}
      <div className={`flex items-center justify-between gap-2 px-4 py-2.5 cursor-default
        transition-colors duration-150 hover:bg-dq-50
        ${isActive || flyOpen ? 'text-dq-700 bg-dq-50' : 'text-gray-600 hover:text-dq-700'}`}>
        {node.href && node.href !== '#' ? (
          <Link href={node.href} onClick={onClose} className="flex items-center gap-2 flex-1 text-[13px]">
            <span className="w-1.5 h-1.5 rounded-full bg-dq-300 flex-shrink-0" />
            {node.label}
          </Link>
        ) : (
          <span className="flex items-center gap-2 flex-1 text-[13px]">
            <span className="w-1.5 h-1.5 rounded-full bg-dq-300 flex-shrink-0" />
            {node.label}
          </span>
        )}
        <ChevronLeft size={11} strokeWidth={2.5} className="text-dq-400 flex-shrink-0 rtl:rotate-180" />
      </div>

      {/* Fly-out — sits flush (no gap) so mouse can slide across without triggering leave */}
      <div
        className="absolute top-0 z-20"
        style={{ right: '100%' }}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        <div
          className={`min-w-[200px] bg-white border border-gray-100 rounded-2xl
            shadow-[0_8px_32px_rgba(0,0,0,0.13)]
            transition-all duration-200 origin-top-right
            ${flyOpen
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          <DesktopPanel nodes={node.children} onClose={onClose} depth={depth + 1} />
        </div>
      </div>
    </div>
  )
}

/* ── Top-level desktop nav item (hover to open) ─────────────────────────── */
function DesktopNavItem({ node }: { node: NavNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const isActive = nodeIsActive(node, pathname)

  function enter() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  function leave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  // Plain link — no children
  if (!node.children?.length) {
    return (
      <Link
        href={node.href || '#'}
        target={node.external ? '_blank' : undefined}
        rel={node.external ? 'noopener noreferrer' : undefined}
        className={`link-underline text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150
          ${isActive ? 'text-dq-400 active' : 'text-white/70 hover:text-white'}`}
      >
        {node.label}
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      {/* Label — link if it has an href, otherwise just text */}
      {node.href && node.href !== '#' ? (
        <Link
          href={node.href}
          className={`flex items-center gap-1 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150
            ${isActive || open ? 'text-dq-400' : 'text-white/70 hover:text-white'}`}
        >
          {node.label}
          <ChevronDown size={12} strokeWidth={2.5}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </Link>
      ) : (
        <span
          className={`flex items-center gap-1 text-[13.5px] font-medium whitespace-nowrap cursor-default transition-colors duration-150
            ${isActive || open ? 'text-dq-400' : 'text-white/70'}`}
        >
          {node.label}
          <ChevronDown size={12} strokeWidth={2.5}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </span>
      )}

      {/* Dropdown panel */}
      <div
        className={`absolute top-full pt-2 z-50`}
        style={{ right: 0 }}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        <div
          className={`min-w-[210px] bg-white border border-gray-100
            rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.13)]
            transition-all duration-200 origin-top
            ${open
              ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none'}`}
        >
          {node.href && node.href !== '#' && (
            <Link
              href={node.href}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-t-2xl
                border-b border-gray-100 text-[13px] font-semibold text-slate-800
                hover:bg-dq-50 hover:text-dq-700 transition-colors duration-150"
            >
              {node.label}
              <span className="text-[10px] font-medium text-dq-500 bg-dq-50 border border-dq-100 rounded-full px-2 py-0.5 whitespace-nowrap">
                سب دیکھیں
              </span>
            </Link>
          )}
          <DesktopPanel nodes={node.children} onClose={() => setOpen(false)} depth={0} />
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   MOBILE — recursive accordion
   ══════════════════════════════════════════════════════════════════════════ */

function MobileNavNode({
  node, onClose, depth = 0,
}: { node: NavNode; onClose: () => void; depth?: number }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = nodeIsActive(node, pathname)

  const indent = depth * 12 // px indent per level

  // Leaf — plain link
  if (!node.children?.length) {
    return (
      <Link
        href={node.href || '#'}
        target={node.external ? '_blank' : undefined}
        rel={node.external ? 'noopener noreferrer' : undefined}
        onClick={onClose}
        style={{ paddingRight: `${12 + indent}px` }}
        className={`flex items-center gap-2 py-2.5 pl-3 rounded-xl text-[14px] font-medium transition-colors duration-150 mb-0.5
          ${isActive ? 'bg-dq-50 text-dq-700' : 'text-gray-700 hover:bg-gray-50 hover:text-slate-900'}`}
      >
        {depth > 0 && (
          <span className="w-1.5 h-1.5 rounded-full bg-dq-300 flex-shrink-0" style={{ marginRight: 2 }} />
        )}
        {node.label}
      </Link>
    )
  }

  return (
    <div className="mb-0.5">
      {/* Accordion toggle */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{ paddingRight: `${12 + indent}px` }}
        className={`w-full flex items-center justify-between gap-2 py-2.5 pl-3 rounded-xl text-[14px] font-medium transition-colors duration-150
          ${isActive || open ? 'bg-dq-50 text-dq-700' : 'text-gray-700 hover:bg-gray-50 hover:text-slate-900'}`}
      >
        <span className="flex items-center gap-2">
          {depth > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-dq-300 flex-shrink-0" />
          )}
          {node.label}
        </span>
        <ChevronDown
          size={14} strokeWidth={2}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Children — slide down */}
      <div className={`overflow-hidden transition-all duration-250 ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
        {/* "View all" link if parent has its own href */}
        <div
          className="mt-0.5 border-s-2 border-dq-100"
          style={{ marginRight: `${20 + indent}px` }}
        >
          {node.href && node.href !== '#' && (
            <Link
              href={node.href || '#'}
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold text-dq-700 hover:bg-dq-50 rounded-lg transition-colors"
            >
              {node.label} — سب دیکھیں
            </Link>
          )}
          {node.children.map(child => (
            <MobileNavNode key={child.label} node={child} onClose={onClose} depth={depth + 1} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN HEADER
   ══════════════════════════════════════════════════════════════════════════ */

export default function Header({
  darulQuranUrl, siteName = 'دار القرآن', logoUrl, navItems, searchPlaceholder = 'مضامین تلاش کریں…',
}: HeaderProps) {
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [query,      setQuery]      = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks: NavNode[] = navItems?.length
    ? navItems
    : [...FALLBACK_NAV, { label: 'دار القرآن', href: darulQuranUrl || '#', external: true }]

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/articles?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setMenuOpen(false)
      setSearchOpen(false)
    }
  }

  return (
    <>
      {/* ── Desktop header ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-dq-900 ${
          scrolled
            ? 'shadow-[0_2px_20px_rgba(0,0,0,0.4)] border-b border-dq-950'
            : 'border-b border-dq-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[68px] flex items-center gap-8">

          {/* Logo */}
          <Link href="/" aria-label={siteName} className="flex-shrink-0 flex items-center gap-3 group">
            <div className="w-[42px] h-[42px] rounded-full overflow-hidden border-2 border-dq-400 flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              {logoUrl
                ? <Image src={logoUrl} alt={siteName} width={42} height={42} className="object-cover w-full h-full" />
                : <div className="w-full h-full bg-gradient-to-br from-dq-100 to-dq-200 flex items-center justify-center text-lg select-none">⛵</div>}
            </div>
            <span className="font-bold text-[17px] text-white tracking-[-0.02em] hidden md:block">{siteName}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-7">
            {navLinks.map(node => (
              <DesktopNavItem key={node.label} node={node} />
            ))}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex items-center ms-auto">
            {searchOpen ? (
              <form onSubmit={handleSearch}
                className="flex items-center rounded-full overflow-hidden border border-dq-400 shadow-[0_0_0_3px_rgba(184,144,14,0.15)]">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onBlur={() => { if (!query) setSearchOpen(false) }}
                  placeholder={searchPlaceholder}
                  className="px-4 py-2 text-[13px] outline-none w-[180px] text-slate-700 placeholder:text-gray-400 bg-white"
                />
                <button type="submit" aria-label="تلاش"
                  className="bg-dq-500 hover:bg-dq-600 transition-colors px-3 py-2 flex items-center self-stretch">
                  <Search size={13} className="text-white" strokeWidth={2.5} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="تلاش کھولیں"
                className="w-9 h-9 rounded-full border border-dq-700 flex items-center justify-center text-white/60 hover:border-dq-400 hover:text-dq-400 transition-all duration-200"
              >
                <Search size={15} strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden ms-auto w-9 h-9 flex items-center justify-center rounded-full text-white/70 hover:bg-dq-800 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="مینو کھولیں"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[60] bg-dq-950/70 backdrop-blur-sm lg:hidden transition-opacity duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* ── Mobile panel ── */}
      <div className={`fixed top-0 right-0 bottom-0 w-[300px] z-[70] bg-white lg:hidden flex flex-col
        shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-dq-400">
              {logoUrl
                ? <Image src={logoUrl} alt={siteName} width={40} height={40} className="object-cover w-full h-full" />
                : <div className="w-full h-full bg-gradient-to-br from-dq-100 to-dq-200 flex items-center justify-center select-none">⛵</div>}
            </div>
            <span className="font-bold text-[16px] text-slate-900 tracking-[-0.02em]">{siteName}</span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {navLinks.map(node => (
            <MobileNavNode key={node.label} node={node} onClose={() => setMenuOpen(false)} depth={0} />
          ))}
        </nav>

        {/* Search */}
        <div className="px-5 pb-8 pt-3 border-t border-gray-100 flex-shrink-0">
          <form onSubmit={handleSearch}
            className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-dq-500 focus-within:shadow-[0_0_0_3px_rgba(184,144,14,0.12)] transition-all duration-200">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 px-4 py-3 text-[14px] outline-none text-slate-700 placeholder:text-gray-400 bg-white"
            />
            <button type="submit"
              className="bg-dq-500 hover:bg-dq-600 transition-colors px-4 py-3 flex items-center self-stretch">
              <Search size={14} className="text-white" strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
