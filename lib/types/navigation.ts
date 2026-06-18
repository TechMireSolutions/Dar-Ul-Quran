export type NavNode = {
  label: string
  href: string
  external?: boolean
  children?: NavNode[]
}

export type RawNavItem = {
  label?: string
  href?: string
  external?: boolean
  children?: RawNavItem[]
}

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
