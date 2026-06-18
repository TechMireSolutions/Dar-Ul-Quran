'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

export type NavNode = {
  label:    string
  href:     string
  external?: boolean
  children?: NavNode[]
}

function nodeIsActive(node: NavNode, pathname: string): boolean {
  if (node.href && node.href !== '#' &&
      (pathname === node.href || (node.href !== '/' && pathname.startsWith(node.href + '/')))) return true
  return node.children?.some(c => nodeIsActive(c, pathname)) ?? false
}

function MobileNavNode({
  node, onClose, depth = 0,
}: { node: NavNode; onClose: () => void; depth?: number }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = nodeIsActive(node, pathname)
  const indent = depth * 12

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
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={`${node.label} — ذیلی مینو`}
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

      <div className={`overflow-hidden transition-all duration-250 ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div
          className="mt-0.5 border-s-2 border-dq-100"
          style={{ marginRight: `${20 + indent}px` }}
        >
          {node.href && node.href !== '#' && (
            <Link
              href={node.href}
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

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const focusRaf = requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => {
      window.removeEventListener('keydown', onKey)
      cancelAnimationFrame(focusRaf)
    }
  }, [open, onClose])

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

  useEffect(() => {
    if (!open) return
    document.body.classList.add('mobile-menu-open')
    return () => document.body.classList.remove('mobile-menu-open')
  }, [open])

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] bg-dq-950/70 backdrop-blur-sm lg:hidden transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="مینو"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`fixed top-0 right-0 bottom-0 w-[300px] z-[70] bg-white lg:hidden flex flex-col
          shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-dq-400">
              {logoUrl
                ? <Image src={logoUrl} alt="" width={40} height={40} className="object-cover w-full h-full" />
                : <div className="w-full h-full bg-gradient-to-br from-dq-100 to-dq-200 flex items-center justify-center select-none" aria-hidden="true">⛵</div>}
            </div>
            <span className="font-bold text-[16px] text-slate-900 tracking-[-0.02em]">{siteName}</span>
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="مینو بند کریں"
            className="w-11 h-11 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="موبائل نیویگیشن" className="flex-1 overflow-y-auto px-3 py-3">
          {navLinks.map(node => (
            <MobileNavNode key={node.label} node={node} onClose={onClose} depth={0} />
          ))}
        </nav>

        <div className="px-5 pb-8 pt-3 border-t border-gray-100 flex-shrink-0">
          <form onSubmit={onSearch} role="search" aria-label="مضامین تلاش"
            className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-dq-500 focus-within:shadow-[0_0_0_3px_rgba(184,144,14,0.12)] transition-all duration-200">
            <label htmlFor="mobile-search" className="sr-only">مضامین تلاش کریں</label>
            <input
              id="mobile-search"
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 px-4 py-3 text-[14px] outline-none text-slate-700 placeholder:text-gray-400 bg-white"
            />
            <button type="submit"
              aria-label="تلاش"
              className="bg-dq-500 hover:bg-dq-600 transition-colors px-4 py-3 flex items-center self-stretch">
              <Search size={14} className="text-white" strokeWidth={2.5} />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
