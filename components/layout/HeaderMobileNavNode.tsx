'use client'

import Link from 'next/link'
import { useState, useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { externalLinkAttrs } from '@/lib/contact'
import type { NavNode } from '@/lib/types'
import { nodeIsActive } from '@/lib/navigation'
import { TW_MOBILE_NAV_ROW, TW_MOBILE_NAV_ROW_ACTIVE } from '@/lib/tailwind'

export function navNodeKey(node: NavNode): string {
  return `${node.label}::${node.href ?? ''}`
}

type HeaderMobileNavNodeProps = {
  node: NavNode
  onClose: () => void
  depth?: number
  topLevelOpenKey?: string | null
  setTopLevelOpenKey?: (key: string | null) => void
}

export default function HeaderMobileNavNode({
  node,
  onClose,
  depth = 0,
  topLevelOpenKey = null,
  setTopLevelOpenKey,
}: HeaderMobileNavNodeProps) {
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
        {...(node.external ? externalLinkAttrs(node.label) : {})}
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
            <HeaderMobileNavNode
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
