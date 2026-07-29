'use client'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { Search, Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'
import type { NavNode } from '@/lib/types'
import { ensurePrimaryNav } from '@/lib/navigation'
import { DEFAULT_RELATED_SITE_LABEL, DEFAULT_SEARCH_LABEL, DEFAULT_SEARCH_LANDMARK, DEFAULT_SEARCH_PLACEHOLDER, DEFAULT_SEARCH_SUBMIT_LABEL, DEFAULT_SITE_NAME_URDU } from '@/lib/seo'
import { PATHS } from '@/lib/paths'
import BrandLogo from '@/components/ui/BrandLogo'
import HeaderDesktopNav from './HeaderDesktopNav'
import { TW_CONTAINER_HEADER, TW_HEADER_ICON_BTN, TW_HEADER_SEARCH_INPUT, TW_HEADER_SEARCH_SUBMIT, TW_HEADER_SEARCH_TOGGLE, TW_SEARCH_FORM } from '@/lib/tailwind'

const HeaderMobileMenu = dynamic(() => import('./HeaderMobileMenu'), { ssr: false })

type HeaderProps = {
  darulQuranUrl?:     string
  siteName?:          string
  logoUrl?:           string | null
  navItems?:          NavNode[]
  searchPlaceholder?: string
}

export default function Header({
  darulQuranUrl, siteName = DEFAULT_SITE_NAME_URDU, logoUrl, navItems, searchPlaceholder = DEFAULT_SEARCH_PLACEHOLDER,
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
    let scrolledFlag = false

    const update = () => {
      const next = window.scrollY > 12
      if (next === scrolledFlag) return
      scrolledFlag = next
      setScrolled(next)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    // Attach only on scroll — avoids mount-time scrollY read + re-render (PSI forced reflow).
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (wasMenuOpen.current && !menuOpen) {
      requestAnimationFrame(() => menuButtonRef.current?.focus())
    }
    wasMenuOpen.current = menuOpen
  }, [menuOpen])

  const navLinks: NavNode[] = ensurePrimaryNav(navItems)
  if (
    darulQuranUrl &&
    !navLinks.some((node) => node.href === darulQuranUrl || node.external)
  ) {
    navLinks.push({ label: DEFAULT_RELATED_SITE_LABEL, href: darulQuranUrl, external: true })
  }

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
      router.push(`${PATHS.articles}?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setMenuOpen(false)
      setSearchOpen(false)
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-dq-900 ${
          scrolled
            ? 'shadow-nav-scrolled border-b border-dq-950'
            : 'border-b border-dq-800'
        }`}
      >
        <div className={`${TW_CONTAINER_HEADER} h-[68px] flex items-center gap-4 lg:gap-8`}>

          <button
            ref={menuButtonRef}
            className={`lg:hidden ${TW_HEADER_ICON_BTN} text-white/70 hover:text-white`}
            onClick={openMobileMenu}
            aria-label="مینو کھولیں"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
          >
            <Menu size={20} />
          </button>

          <BrandLogo siteName={siteName} logoUrl={logoUrl} variant="header" />

          <nav aria-label="مرکزی نیویگیشن" className="hidden lg:flex flex-1 items-center justify-center gap-7">
            {navLinks.map(node => (
              <HeaderDesktopNav key={node.label} node={node} />
            ))}
          </nav>

          <div className="flex-1 lg:hidden" aria-hidden="true" />

          <div className="hidden lg:flex items-center ms-auto">
            {searchOpen ? (
              <form onSubmit={handleSearch} role="search" aria-label={DEFAULT_SEARCH_LANDMARK}
                className={TW_SEARCH_FORM}>
                <label htmlFor="desktop-search" className="sr-only">{DEFAULT_SEARCH_LABEL}</label>
                <input
                  id="desktop-search"
                  autoFocus
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onBlur={(e) => {
                    const next = e.relatedTarget as HTMLElement | null
                    if (!query && next?.getAttribute('type') !== 'submit') setSearchOpen(false)
                  }}
                  placeholder={searchPlaceholder}
                  className={TW_HEADER_SEARCH_INPUT}
                />
                <button type="submit" aria-label={DEFAULT_SEARCH_SUBMIT_LABEL}
                  className={TW_HEADER_SEARCH_SUBMIT}>
                  <Search size={13} className="text-white" strokeWidth={2.5} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="تلاش کھولیں"
                className={TW_HEADER_SEARCH_TOGGLE}
              >
                <Search size={15} strokeWidth={2} />
              </button>
            )}
          </div>
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
