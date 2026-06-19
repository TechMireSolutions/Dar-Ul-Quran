import type { NavNode, RawNavItem } from '@/lib/types/navigation'

export function toNavNode(item: RawNavItem): NavNode {
  return {
    label: item.label ?? '',
    href: item.href || '#',
    external: !!item.external,
    children: item.children?.length ? item.children.map(toNavNode) : undefined,
  }
}

export function buildNavTree(items?: RawNavItem[] | null): NavNode[] | undefined {
  return items?.length ? items.map(toNavNode) : undefined
}

export function nodeIsActive(node: NavNode, pathname: string): boolean {
  if (
    node.href &&
    node.href !== '#' &&
    (pathname === node.href || (node.href !== '/' && pathname.startsWith(`${node.href}/`)))
  ) {
    return true
  }
  return node.children?.some((child) => nodeIsActive(child, pathname)) ?? false
}
