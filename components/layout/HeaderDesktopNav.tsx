'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { externalLinkAttrs } from '@/lib/contact'
import type { NavNode } from '@/lib/types'
import { nodeIsActive } from '@/lib/navigation'
import { TW_NAV_DROPDOWN, TW_NAV_MENU_ITEM } from '@/lib/tailwind'

type DesktopPanelProps = {
  nodes: NavNode[]
  onClose: () => void
  depth?: number
}

type DesktopPanelRowProps = {
  node: NavNode
  onClose: () => void
  depth: number
}

function DesktopPanel({ nodes, onClose, depth = 0 }: DesktopPanelProps) {
  return (
    <div className="py-1">
      {nodes.map(node => (
        <DesktopPanelRow key={node.label} node={node} onClose={onClose} depth={depth} />
      ))}
    </div>
  )
}

function DesktopPanelRow({ node, onClose, depth }: DesktopPanelRowProps) {
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
        {...(node.external ? externalLinkAttrs(node.label) : {})}
        onClick={onClose}
        className={`${TW_NAV_MENU_ITEM}
          hover:bg-dq-50 hover:text-dq-700
          ${isActive ? 'text-dq-700 bg-dq-50/60' : 'text-gray-600'}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-dq-200 shrink-0" />
        {node.label}
      </Link>
    )
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <div className={`${TW_NAV_MENU_ITEM} justify-between cursor-default
        hover:bg-dq-50
        ${isActive || flyOpen ? 'text-dq-700 bg-dq-50' : 'text-gray-600 hover:text-dq-700'}`}>
        {node.href && node.href !== '#' ? (
          <Link href={node.href} onClick={onClose} className="flex items-center gap-2 flex-1 text-[13px]">
            <span className="w-1.5 h-1.5 rounded-full bg-dq-300 shrink-0" />
            {node.label}
          </Link>
        ) : (
          <span className="flex items-center gap-2 flex-1 text-[13px]">
            <span className="w-1.5 h-1.5 rounded-full bg-dq-300 shrink-0" />
            {node.label}
          </span>
        )}
        <ChevronLeft size={11} strokeWidth={2.5} className="text-dq-400 shrink-0 rtl:rotate-180" />
      </div>

      <div
        className="absolute top-0 z-20 end-full"
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        <div
          role="menu"
          className={`min-w-[200px] ${TW_NAV_DROPDOWN}
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

export default function HeaderDesktopNav({ node }: { node: NavNode }) {
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

  if (!node.children?.length) {
    return (
      <Link
        href={node.href || '#'}
        {...(node.external ? externalLinkAttrs(node.label) : {})}
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

      <div
        className="absolute top-full pt-2 z-50 end-0"
        onMouseEnter={enter}
        onMouseLeave={leave}
      >
        <div
          id={menuId}
          role="menu"
          aria-label={node.label}
          aria-hidden={!open}
          className={`min-w-[210px] ${TW_NAV_DROPDOWN}
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
