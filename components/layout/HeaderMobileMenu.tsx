'use client'

import { useState, useEffect, useRef, useId, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { NavNode } from '@/lib/types'
import BrandLogo from '@/components/ui/BrandLogo'
import { DEFAULT_SEARCH_LABEL, DEFAULT_SEARCH_LANDMARK, DEFAULT_SEARCH_SUBMIT_LABEL } from '@/lib/seo'
import HeaderMobileNavNode, { navNodeKey } from './HeaderMobileNavNode'
import {
  TW_MOBILE_PANEL,
  TW_MOBILE_PANEL_BACKDROP,
  TW_MOBILE_PANEL_HEADER,
  TW_MOBILE_PANEL_NAV,
  TW_MOBILE_PANEL_SEARCH,
  TW_MOBILE_SEARCH_INPUT,
} from '@/lib/tailwind'

export type HeaderMobileMenuProps = {
  open: boolean
  onClose: () => void
  navLinks: NavNode[]
  logoUrl: string | null
  siteName: string
  searchPlaceholder: string
  onOpenSearch: () => void
}

export default function HeaderMobileMenu({
  open,
  onClose,
  navLinks,
  logoUrl,
  siteName,
  searchPlaceholder,
  onOpenSearch,
}: HeaderMobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const titleId = useId()
  const [topLevelOpenKey, setTopLevelOpenKey] = useState<string | null>(null)
  const skipPathnameCloseRef = useRef(true)

  const handleClose = useCallback(() => {
    setTopLevelOpenKey(null)
    onClose()
  }, [onClose])

  const lockScroll = useCallback(() => {
    const scrollY = window.scrollY
    document.body.classList.add('mobile-menu-open')
    document.body.style.top = `-${scrollY}px`
    return scrollY
  }, [])

  const unlockScroll = useCallback((scrollY: number) => {
    document.body.classList.remove('mobile-menu-open')
    document.body.style.top = ''
    window.scrollTo(0, scrollY)
  }, [])

  useEffect(() => {
    if (skipPathnameCloseRef.current) {
      skipPathnameCloseRef.current = false
      return
    }
    handleClose()
  }, [pathname, handleClose])

  useEffect(() => {
    if (!open) return

    const scrollY = lockScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)

    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll(scrollY)
    }
  }, [open, handleClose, lockScroll, unlockScroll])

  useEffect(() => {
    if (!open || !panelRef.current) return
    const panel = panelRef.current
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled])',
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusable.length === 0) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else if (document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    panel.addEventListener('keydown', onKeyDown)
    return () => panel.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <>
      <div
        onClick={handleClose}
        aria-hidden={!open}
        className={`${TW_MOBILE_PANEL_BACKDROP}
          ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`${TW_MOBILE_PANEL}
          ${open ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'}`}
      >
        <div className={TW_MOBILE_PANEL_HEADER}>
          <BrandLogo
            siteName={siteName}
            logoUrl={logoUrl}
            variant="drawer"
            onNavigate={handleClose}
            titleId={titleId}
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="مینو بند کریں"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={TW_MOBILE_PANEL_SEARCH}>
          <button
            onClick={onOpenSearch}
            className={`${TW_MOBILE_SEARCH_INPUT} flex items-center justify-between text-right w-full text-gray-500`}
            aria-label={DEFAULT_SEARCH_LANDMARK}
          >
            <span>{searchPlaceholder}</span>
            <Search size={16} className="text-gray-400" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="موبائل نیویگیشن"
          className={`${TW_MOBILE_PANEL_NAV} pb-[max(1rem,env(safe-area-inset-bottom))]`}
        >
          {navLinks.map(node => (
            <HeaderMobileNavNode
              key={navNodeKey(node)}
              node={node}
              onClose={handleClose}
              depth={0}
              topLevelOpenKey={topLevelOpenKey}
              setTopLevelOpenKey={setTopLevelOpenKey}
            />
          ))}
        </nav>
      </div>
    </>
  )
}
