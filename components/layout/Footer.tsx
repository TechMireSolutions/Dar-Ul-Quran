import Link from 'next/link'
import {
  TW_CONTAINER,
  TW_FOOTER_ADDRESS,
  TW_FOOTER_BODY,
  TW_FOOTER_BOTTOM,
  TW_FOOTER_BOTTOM_INNER,
  TW_FOOTER_CONTACT_GRID,
  TW_FOOTER_COPY,
  TW_FOOTER_EMPTY,
  TW_FOOTER_FAB_PAD,
  TW_FOOTER_GRID,
  TW_FOOTER_ICON,
  TW_FOOTER_PAD_Y,
  TW_FOOTER_RELATED,
  TW_FOOTER_SHELL,
  TW_FOOTER_SOCIAL,
  TW_FOOTER_SOCIAL_LIST,
  TW_FOOTER_TAGLINE,
} from '@/lib/tailwind'
import { externalLinkAttrs } from '@/lib/contact'
import { buildFooterModel } from '@/lib/footer'
import type { NavNode, SiteSettingsDoc, FooterServiceDoc } from '@/lib/types'
import BrandLogo from '@/components/ui/BrandLogo'
import Reveal from '@/components/ui/Reveal'
import {
  FooterColHeading,
  FooterContactLink,
  FooterDonateCta,
  FooterNavColumn,
} from '@/components/layout/FooterParts'
import {
  IconExternalLink,
  IconFacebook,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
  IconYoutube,
} from '@/components/layout/FooterIcons'

type FooterProps = {
  settings?:       SiteSettingsDoc | null
  logoUrl?:        string | null
  navItems?:       NavNode[]
  footerServices?: FooterServiceDoc[] | null
}

const CONTACT_ICON = {
  email: IconMail,
  phone: IconPhone,
  whatsapp: IconMessageCircle,
} as const

const SOCIAL_ICON = {
  facebook: IconFacebook,
  youtube: IconYoutube,
} as const

export default function Footer({ settings, logoUrl, navItems, footerServices }: FooterProps) {
  const model = buildFooterModel({ settings, navItems, footerServices })

  return (
    <footer aria-label={model.copy.landmark} className={TW_FOOTER_SHELL}>
      <div className={`${TW_CONTAINER} ${TW_FOOTER_BODY}`}>
        <div className={TW_FOOTER_GRID}>

          <Reveal animation="up" delay={0} className="col-span-2 lg:col-span-1">
            <div>
              <BrandLogo
                siteName={model.siteName}
                logoUrl={logoUrl}
                variant="footer"
                className="mb-3"
              />

              <p className={TW_FOOTER_TAGLINE}>{model.tagline}</p>

              {model.socialLinks.length > 0 && (
                <ul className={TW_FOOTER_SOCIAL_LIST}>
                  {model.socialLinks.map((link) => {
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
                          <Icon size={link.kind === 'facebook' ? 14 : 12} />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </Reveal>

          <FooterNavColumn
            id={model.ids.quickLinks}
            title={model.copy.quickLinks}
            links={model.quickLinks}
            delay={80}
          />

          <FooterNavColumn
            id={model.ids.services}
            title={model.copy.services}
            links={model.services}
            delay={160}
          />

          <Reveal animation="up" delay={240} className="col-span-2 lg:col-span-1">
            <div>
              <FooterColHeading id={model.ids.contact}>{model.copy.contact}</FooterColHeading>
              <ul
                aria-labelledby={model.ids.contact}
                className={TW_FOOTER_CONTACT_GRID}
              >
                {model.contactRows.map((row) => {
                  if (row.kind === 'address') {
                    return (
                      <li key="address" className="flex items-start gap-2 min-h-11">
                        <IconMapPin size={12} className={`${TW_FOOTER_ICON} mt-3`} />
                        <p className={TW_FOOTER_ADDRESS}>{row.value}</p>
                      </li>
                    )
                  }

                  const Icon = CONTACT_ICON[row.kind]
                  return (
                    <FooterContactLink
                      key={row.kind}
                      href={row.href}
                      external={row.kind === 'whatsapp'}
                    >
                      <Icon size={12} className={TW_FOOTER_ICON} />
                      {row.kind === 'whatsapp' ? (
                        <span>{model.copy.whatsappPrefix} <bdi dir="ltr">{row.value}</bdi></span>
                      ) : (
                        <span className={row.kind === 'email' ? 'truncate' : undefined} dir="ltr">
                          <bdi>{row.value}</bdi>
                        </span>
                      )}
                    </FooterContactLink>
                  )
                })}
                {model.contactRows.length === 0 && (
                  <li className={TW_FOOTER_EMPTY}>{model.copy.contactEmpty}</li>
                )}
              </ul>

              <FooterDonateCta href={model.donateHref} label={model.donateLabel} />
            </div>
          </Reveal>

        </div>
      </div>

      <div className={TW_FOOTER_BOTTOM}>
        <div
          className={`${TW_CONTAINER} ${model.showFabPad ? TW_FOOTER_FAB_PAD : TW_FOOTER_PAD_Y} ${TW_FOOTER_BOTTOM_INNER}`}
        >
          <p className={TW_FOOTER_COPY}>{model.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
