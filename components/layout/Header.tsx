'use client'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { Search, Menu, ChevronDown, ChevronLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import type { NavNode } from './HeaderMobileMenu'

const HeaderMobileMenu = dynamic(() => import('./HeaderMobileMenu'), { ssr: false })

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
        role="menuitem"
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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const menuId = `desktop-menu-${node.label.replace(/\s+/g, '-')}`

  function toggleMenu() {
    setOpen((v) => !v)
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleMenu()
    }
    if (e.key === 'Escape') setOpen(false)
  }

  // Plain link — no children
  if (!node.children?.length) {
    return (
      <Link
        href={node.href || '#'}
        target={node.external ? '_blank' : undefined}
        rel={node.external ? 'noopener noreferrer' : undefined}
        {...(node.external ? { 'aria-label': `${node.label} (نئی ونڈو میں کھلتا ہے)` } : {})}
        className={`link-underline text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150
          ${isActive ? 'text-dq-400 active' : 'text-white/70 hover:text-white'}`}
      >
        {node.label}
      </Link>
    )
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      {node.href && node.href !== '#' ? (
        <div className="flex items-center gap-0.5">
          <Link
            href={node.href}
            className={`flex items-center gap-1 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150
              ${isActive || open ? 'text-dq-400' : 'text-white/70 hover:text-white'}`}
          >
            {node.label}
          </Link>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={`${node.label} — ذیلی مینو`}
            onClick={toggleMenu}
            onKeyDown={onTriggerKeyDown}
            className={`p-1 rounded-md transition-colors duration-150
              ${isActive || open ? 'text-dq-400' : 'text-white/70 hover:text-white hover:bg-dq-800'}`}
          >
            <ChevronDown size={12} strokeWidth={2.5}
              className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={toggleMenu}
          onKeyDown={onTriggerKeyDown}
          className={`flex items-center gap-1 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-150
            ${isActive || open ? 'text-dq-400' : 'text-white/70 hover:text-white'}`}
        >
          {node.label}
          <ChevronDown size={12} strokeWidth={2.5}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      )}

      {/* Dropdown panel */}
      <div
        className={`absolute top-full pt-2 z-50`}
        style={{ right: 0 }}
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        <div
          id={menuId}
          role="menu"
          aria-label={node.label}
          aria-hidden={!open}
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
              role="menuitem"
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
   MAIN HEADER
   ══════════════════════════════════════════════════════════════════════════ */

export default function Header({
  darulQuranUrl, siteName = 'دار القرآن', logoUrl, navItems, searchPlaceholder = 'مضامین تلاش کریں…',
}: HeaderProps) {
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false)
  const [query,      setQuery]      = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const wasMenuOpen = useRef(false)
  const router = useRouter()

  useEffect(() => {
    let raf = 0
    const fn = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 12))
    }
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => {
      window.removeEventListener('scroll', fn)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (wasMenuOpen.current && !menuOpen) {
      requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
    wasMenuOpen.current = menuOpen
  }, [menuOpen])

  const navLinks: NavNode[] = navItems?.length
    ? navItems
    : [...FALLBACK_NAV, { label: 'دار القرآن', href: darulQuranUrl || '#', external: true }]

  function closeMobileMenu() {
    setMenuOpen(false)
  }

  function openMobileMenu() {
    setMobileMenuMounted(true)
    setMenuOpen(true)
  }

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
                ? <Image src={logoUrl} alt="" width={42} height={42} sizes="42px" className="object-cover w-full h-full" />
                : <div className="w-full h-full bg-gradient-to-br from-dq-100 to-dq-200 flex items-center justify-center text-lg select-none" aria-hidden="true">⛵</div>}
            </div>
            <span className="font-bold text-[17px] text-white tracking-[-0.02em] hidden md:block">{siteName}</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="مرکزی نیویگیشن" className="hidden lg:flex flex-1 items-center justify-center gap-7">
            {navLinks.map(node => (
              <DesktopNavItem key={node.label} node={node} />
            ))}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex items-center ms-auto">
            {searchOpen ? (
              <form onSubmit={handleSearch} role="search" aria-label="مضامین تلاش"
                className="flex items-center rounded-full overflow-hidden border border-dq-400 shadow-[0_0_0_3px_rgba(184,144,14,0.15)]">
                <label htmlFor="desktop-search" className="sr-only">مضامین تلاش کریں</label>
                <input
                  id="desktop-search"
                  autoFocus
                  type="search"
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
                className="w-11 h-11 rounded-full border border-dq-700 flex items-center justify-center text-white/60 hover:border-dq-400 hover:text-dq-400 transition-all duration-200"
              >
                <Search size={15} strokeWidth={2} />
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            ref={menuButtonRef}
            className="lg:hidden ms-auto w-11 h-11 flex items-center justify-center rounded-full text-white/70 hover:bg-dq-800 transition-colors"
            onClick={openMobileMenu}
            aria-label="مینو کھولیں"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {mobileMenuMounted && (
        <HeaderMobileMenu
          open={menuOpen}
          onClose={closeMobileMenu}
          navLinks={navLinks}
          logoUrl={logoUrl ?? null}
          siteName={siteName}
          searchPlaceholder={searchPlaceholder}
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
      )}
    </>
  )
}
