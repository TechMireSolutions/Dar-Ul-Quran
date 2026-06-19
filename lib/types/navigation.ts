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
