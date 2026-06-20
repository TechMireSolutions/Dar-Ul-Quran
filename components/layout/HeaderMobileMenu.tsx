'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef, useId, useCallback } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

import type { NavNode } from '@/lib/types'
import { nodeIsActive } from '@/lib/navigation'
import {
  TW_MOBILE_NAV_ROW,
  TW_MOBILE_NAV_ROW_ACTIVE,
  TW_MOBILE_PANEL,
  TW_MOBILE_PANEL_BACKDROP,
  TW_MOBILE_PANEL_HEADER,
  TW_MOBILE_PANEL_NAV,
  TW_MOBILE_PANEL_SEARCH,
  TW_MOBILE_PANEL_SEARCH_LABEL,
  TW_MOBILE_SEARCH_SUBMIT,
  TW_SEARCH_FORM_MOBILE,
} from '@/lib/tailwind'

function navNodeKey(node: NavNode): string {
  return `${node.label}::${node.href ?? ''}`
}

type MobileNavNodeProps = {
  node: NavNode
  onClose: () => void
  depth?: number
  topLevelOpenKey?: string | null
  setTopLevelOpenKey?: (key: string | null) => void
}

function MobileNavNode({
  node,
  onClose,
  depth = 0,
  topLevelOpenKey = null,
  setTopLevelOpenKey,
}: MobileNavNodeProps) {
  const [localOpen, setLocalOpen] = useState(false)
  const pathname = usePathname()
  const isActive = nodeIsActive(node, pathname)
  const indent = depth * 12
  const indentStyle = { '--nav-indent': `${indent}px` } as React.CSSProperties
  const submenuId = useId()
  const nodeKey = navNodeKey(node)

  const isTopLevel = depth === 0
  const hasAccordion = isTopLevel && !!setTopLevelOpenKey
  const open = hasAccordion ? topLevelOpenKey === nodeKey : localOpen

  const toggleOpen = () => {
    if (hasAccordion) {
      setTopLevelOpenKey(open ? null : nodeKey)
    } else {
      setLocalOpen(v => !v)
    }
  }

  const rowActive = isActive ? TW_MOBILE_NAV_ROW_ACTIVE : 'text-gray-700 hover:bg-gray-50 hover:text-slate-900'
  const rowOpen = open && !isActive ? 'bg-dq-50/80 text-dq-700' : ''

  if (!node.children?.length) {
    return (
      <Link
        href={node.href || '#'}
        target={node.external ? '_blank' : undefined}
        rel={node.external ? 'noopener noreferrer' : undefined}
        onClick={onClose}
        style={indentStyle}
        className={`${TW_MOBILE_NAV_ROW} mb-0.5 ${rowActive}`}
        {...(isActive ? { 'aria-current': 'page' as const } : {})}
      >
        {depth > 0 && (
          <span className="size-1.5 shrink-0 rounded-full bg-dq-300 me-0.5" aria-hidden="true" />
        )}
        {node.label}
      </Link>
    )
  }

  return (
    <div className="mb-0.5">
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={open}
        aria-controls={submenuId}
        style={indentStyle}
        className={`${TW_MOBILE_NAV_ROW} w-full justify-between ${rowActive} ${rowOpen}`}
      >
        <span className="flex items-center gap-2">
          {depth > 0 && (
            <span className="size-1.5 shrink-0 rounded-full bg-dq-300" aria-hidden="true" />
          )}
          {node.label}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          aria-hidden="true"
          className={`shrink-0 text-gray-400 transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        id={submenuId}
        role="group"
        aria-label={node.label}
        hidden={!open}
        className={`overflow-hidden transition-all duration-250 motion-reduce:transition-none ${open ? 'max-h-[min(600px,50dvh)]' : 'max-h-0'}`}
      >
        <div
          className="mt-0.5 border-s-2 border-dq-100 me-[calc(20px+var(--nav-indent,0px))]"
          style={indentStyle}
        >
          {node.href && node.href !== '#' && (
            <Link
              href={node.href}
              onClick={onClose}
              className="flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-dq-700 transition-colors hover:bg-dq-50"
            >
              {node.label} — سب دیکھیں
            </Link>
          )}
          {node.children.map(child => (
            <MobileNavNode
              key={navNodeKey(child)}
              node={child}
              onClose={onClose}
              depth={depth + 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export type HeaderMobileMenuProps = {
  open: boolean
  onClose: () => void
  navLinks: NavNode[]
  logoUrl: string | null
  siteName: string
  searchPlaceholder: string
  query: string
  setQuery: (value: string) => void
  onSearch: (e: React.FormEvent) => void
}

export default function HeaderMobileMenu({
  open,
  onClose,
  navLinks,
  logoUrl,
  siteName,
  searchPlaceholder,
  query,
  setQuery,
  onSearch,
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

  // Close drawer when route changes (skip initial mount).
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

    const focusRaf = requestAnimationFrame(() => {
      searchInputRef.current?.focus({ preventScroll: true })
    })

    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(focusRaf)
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
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className={TW_MOBILE_PANEL_HEADER}>
          <Link href="/" onClick={handleClose} className="flex min-h-11 min-w-0 items-center gap-2.5">
            <div className="size-10 shrink-0 overflow-hidden rounded-full border-2 border-dq-400">
              {logoUrl
                ? <Image src={logoUrl} alt="" width={40} height={40} className="size-full object-cover" />
                : <div className="flex size-full items-center justify-center bg-gradient-to-br from-dq-100 to-dq-200 select-none" aria-hidden="true">⛵</div>}
            </div>
            <span id={titleId} className="truncate font-bold text-[16px] text-slate-900 tracking-[-0.02em]">
              {siteName}
            </span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="مینو بند کریں"
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className={TW_MOBILE_PANEL_SEARCH}>
          <p className={TW_MOBILE_PANEL_SEARCH_LABEL} id="mobile-search-label">
            مضامین تلاش
          </p>
          <form
            onSubmit={onSearch}
            role="search"
            aria-labelledby="mobile-search-label"
            className={TW_SEARCH_FORM_MOBILE}
          >
            <label htmlFor="mobile-search" className="sr-only">
              {searchPlaceholder}
            </label>
            <input
              ref={searchInputRef}
              id="mobile-search"
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="min-h-11 flex-1 bg-white px-4 py-3 text-[14px] text-slate-700 outline-none placeholder:text-gray-400"
            />
            <button type="submit" aria-label="تلاش" className={TW_MOBILE_SEARCH_SUBMIT}>
              <Search size={14} className="text-white" strokeWidth={2.5} aria-hidden="true" />
            </button>
          </form>
        </div>

        <nav
          aria-label="موبائل نیویگیشن"
          className={`${TW_MOBILE_PANEL_NAV} pb-[max(1rem,env(safe-area-inset-bottom))]`}
        >
          {navLinks.map(node => (
            <MobileNavNode
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
