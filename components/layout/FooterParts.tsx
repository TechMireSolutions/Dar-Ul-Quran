import Link from 'next/link'
import {
  TW_CTA_ARROW,
  TW_FOOTER_COL_HEADING,
  TW_FOOTER_CONTACT_LINK,
  TW_FOOTER_DONATE_CTA,
  TW_FOOTER_NAV_CHEVRON,
  TW_FOOTER_NAV_LINK,
  TW_FOOTER_NAV_LIST,
} from '@/lib/tailwind'
import { externalLinkAttrs } from '@/lib/contact'
import Reveal from '@/components/ui/Reveal'
import { IconCtaArrow } from '@/components/layout/FooterIcons'

export function FooterColHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className={TW_FOOTER_COL_HEADING}>
      {children}
    </h3>
  )
}

export function FooterNavLink({
  href,
  label,
  external,
}: {
  href: string
  label: string
  external?: boolean
}) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? externalLinkAttrs(label) : {})}
        className={TW_FOOTER_NAV_LINK}
      >
        <span className={TW_FOOTER_NAV_CHEVRON} aria-hidden="true">›</span>
        {label}
      </Link>
    </li>
  )
}

export function FooterNavColumn({
  id,
  title,
  links,
  delay,
}: {
  id: string
  title: string
  links: Array<{ label: string; href: string; external?: boolean }>
  delay: number
}) {
  return (
    <Reveal animation="up" delay={delay}>
      <nav aria-labelledby={id}>
        <FooterColHeading id={id}>{title}</FooterColHeading>
        <ul className={TW_FOOTER_NAV_LIST}>
          {links.map(({ label, href, external }) => (
            <FooterNavLink key={`${href}-${label}`} href={href} label={label} external={external} />
          ))}
        </ul>
      </nav>
    </Reveal>
  )
}

export function FooterContactLink({
  href,
  children,
  external,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
}) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? externalLinkAttrs() : {})}
        className={TW_FOOTER_CONTACT_LINK}
      >
        {children}
      </Link>
    </li>
  )
}

export function FooterDonateCta({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={TW_FOOTER_DONATE_CTA}>
      {label}
      <IconCtaArrow className={TW_CTA_ARROW} />
    </Link>
  )
}
