import Link from 'next/link'
import {
  TW_CTA_ARROW,
  TW_FOOTER_ADDRESS,
  TW_FOOTER_COL_HEADING,
  TW_FOOTER_CONTACT_GRID,
  TW_FOOTER_CONTACT_LINK,
  TW_FOOTER_DONATE_CTA,
  TW_FOOTER_EMPTY,
  TW_FOOTER_ICON,
  TW_FOOTER_NAV_CHEVRON,
  TW_FOOTER_NAV_LINK,
  TW_FOOTER_NAV_LIST,
  TW_FOOTER_RELATED,
  TW_FOOTER_SOCIAL,
  TW_FOOTER_SOCIAL_LIST,
  TW_FOOTER_TAGLINE,
} from '@/lib/tailwind'
import { CONTACT_KIND_LABELS, externalLinkAttrs, type FooterContactRow, type FooterSocialLink } from '@/lib/contact'
import type { FooterModel } from '@/lib/footer'
import BrandLogo from '@/components/ui/BrandLogo'
import Reveal from '@/components/ui/Reveal'
import {
  IconCtaArrow,
  IconExternalLink,
  IconFacebook,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
  IconYoutube,
} from '@/components/layout/FooterIcons'

const CONTACT_ICON = {
  email: IconMail,
  phone: IconPhone,
  whatsapp: IconMessageCircle,
} as const

const SOCIAL_ICON = {
  facebook: IconFacebook,
  youtube: IconYoutube,
} as const

/** Shared social glyph size (facebook / youtube). */
const SOCIAL_ICON_SIZE = 14

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
  if (links.length === 0) return null

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

/** Brand + social / related-site chips. */
export function FooterBrandColumn({
  siteName,
  logoUrl,
  tagline,
  socialLinks,
}: {
  siteName: string
  logoUrl?: string | null
  tagline: string
  socialLinks: FooterSocialLink[]
}) {
  return (
    <Reveal animation="up" delay={0} className="col-span-2 lg:col-span-1">
      <div>
        <BrandLogo
          siteName={siteName}
          logoUrl={logoUrl}
          variant="footer"
          className="mb-3"
        />

        <p className={TW_FOOTER_TAGLINE}>{tagline}</p>

        {socialLinks.length > 0 && (
          <ul className={TW_FOOTER_SOCIAL_LIST}>
            {socialLinks.map((link) => {
              if (link.kind === 'related') {
                return (
                  <li key={link.kind}>
                    <Link
                      href={link.href}
                      {...externalLinkAttrs(link.label)}
                      className={TW_FOOTER_RELATED}
                    >
                      {link.label}
                      <IconExternalLink size={9} />
                    </Link>
                  </li>
                )
              }

              const Icon = SOCIAL_ICON[link.kind]
              return (
                <li key={link.kind}>
                  <Link
                    href={link.href}
                    {...externalLinkAttrs(link.label)}
                    className={TW_FOOTER_SOCIAL}
                  >
                    <Icon size={SOCIAL_ICON_SIZE} />
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Reveal>
  )
}

/** Contact rows + donate CTA — copy/ids from footer model. */
export function FooterContactColumn({
  model,
}: {
  model: Pick<FooterModel, 'contactRows' | 'donateHref' | 'donateLabel' | 'copy' | 'ids'>
}) {
  const { contactRows, donateHref, donateLabel, copy, ids } = model

  return (
    <Reveal animation="up" delay={240} className="col-span-2 lg:col-span-1">
      <div>
        <FooterColHeading id={ids.contact}>{copy.contact}</FooterColHeading>
        <ul aria-labelledby={ids.contact} className={TW_FOOTER_CONTACT_GRID}>
          {contactRows.map((row) => (
            <FooterContactRowItem
              key={row.kind}
              row={row}
              whatsappPrefix={copy.whatsappPrefix}
            />
          ))}
          {contactRows.length === 0 && (
            <li className={TW_FOOTER_EMPTY}>{copy.contactEmpty}</li>
          )}
        </ul>

        <FooterDonateCta href={donateHref} label={donateLabel} />
      </div>
    </Reveal>
  )
}

function FooterContactRowItem({
  row,
  whatsappPrefix,
}: {
  row: FooterContactRow
  whatsappPrefix: string
}) {
  if (row.kind === 'address') {
    return (
      <li className="flex items-start gap-2 py-1">
        <IconMapPin size={12} className={`${TW_FOOTER_ICON} mt-3`} />
        <p className={TW_FOOTER_ADDRESS}>
          <span className="sr-only">{CONTACT_KIND_LABELS.address}: </span>
          {row.value}
        </p>
      </li>
    )
  }

  const Icon = CONTACT_ICON[row.kind]

  return (
    <FooterContactLink href={row.href} external={row.kind === 'whatsapp'}>
      <Icon size={12} className={TW_FOOTER_ICON} />
      {row.kind === 'whatsapp' ? (
        <span>
          {whatsappPrefix}{' '}
          <bdi dir="ltr">{row.value}</bdi>
        </span>
      ) : (
        <span className={row.kind === 'email' ? 'truncate' : undefined} dir="ltr">
          <span className="sr-only">{CONTACT_KIND_LABELS[row.kind]}: </span>
          <bdi>{row.value}</bdi>
        </span>
      )}
    </FooterContactLink>
  )
}
