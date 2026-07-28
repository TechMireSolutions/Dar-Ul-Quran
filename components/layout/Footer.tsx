import {
  TW_CONTAINER,
  TW_FOOTER_BODY,
  TW_FOOTER_BODY_FAB,
  TW_FOOTER_BOTTOM,
  TW_FOOTER_BOTTOM_INNER,
  TW_FOOTER_COPY,
  TW_FOOTER_FAB_PAD,
  TW_FOOTER_GRID,
  TW_FOOTER_PAD_Y,
  TW_FOOTER_SHELL,
} from '@/lib/tailwind'
import { buildFooterModel } from '@/lib/footer'
import type { NavNode, SiteSettingsDoc, FooterServiceDoc } from '@/lib/types'
import {
  FooterBrandColumn,
  FooterContactColumn,
  FooterNavColumn,
} from '@/components/layout/FooterParts'

type FooterProps = {
  settings?: SiteSettingsDoc | null
  logoUrl?: string | null
  navItems?: NavNode[]
  footerServices?: FooterServiceDoc[] | null
}

export default function Footer({ settings, logoUrl, navItems, footerServices }: FooterProps) {
  const model = buildFooterModel({ settings, navItems, footerServices })

  return (
    <footer aria-label={model.copy.landmark} className={TW_FOOTER_SHELL}>
      <div className={`${TW_CONTAINER} ${model.showFabPad ? TW_FOOTER_BODY_FAB : TW_FOOTER_BODY}`}>
        <div className={TW_FOOTER_GRID}>
          <FooterBrandColumn
            siteName={model.siteName}
            logoUrl={logoUrl}
            tagline={model.tagline}
            socialLinks={model.socialLinks}
          />

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

          <FooterContactColumn model={model} />
        </div>
      </div>

      <div className={TW_FOOTER_BOTTOM}>
        <div
          className={`${TW_CONTAINER} ${model.showFabPad ? TW_FOOTER_FAB_PAD : TW_FOOTER_PAD_Y} ${TW_FOOTER_BOTTOM_INNER}`}
        >
          <p className={TW_FOOTER_COPY}>
            <span dir="ltr" className="inline-block">
              © {model.year}
            </span>
            {` ${model.siteName}۔ ${model.copy.rights}`}
          </p>
        </div>
      </div>
    </footer>
  )
}
