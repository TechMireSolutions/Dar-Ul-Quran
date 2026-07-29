import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Globe, Play } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import {
  buildFooterSocialLinks,
  CONTACT_EMPTY_MESSAGE,
  CONTACT_KIND_LABELS,
  externalLinkAttrs,
} from '@/lib/contact'
import { TW_CONTACT_INFO_ROW, TW_CONTACT_SOCIAL_CHIP, TW_FEATURE_ICON } from '@/lib/tailwind'

export type ContactInfoItem = {
  Icon: LucideIcon
  label: string
  value: string
  href: string | null
}

type ContactInfoProps = {
  items: ContactInfoItem[]
  facebook?: string | null
  youtube?: string | null
}

const LTR_LABELS = new Set<string>([
  CONTACT_KIND_LABELS.email,
  CONTACT_KIND_LABELS.phone,
  CONTACT_KIND_LABELS.whatsapp,
])

const SOCIAL_ICONS = {
  facebook: Globe,
  youtube: Play,
} as const

export default function ContactInfo({ items, facebook, youtube }: ContactInfoProps) {
  const socialLinks = buildFooterSocialLinks({
    facebook: facebook ?? undefined,
    youtube: youtube ?? undefined,
  }).filter((link) => link.kind === 'facebook' || link.kind === 'youtube')

  return (
    <div className="lg:col-span-2 space-y-3">
      {items.map(({ Icon, label, value, href }, i) => (
        <Reveal key={label} animation="left" delay={i * 70}>
          <div className={TW_CONTACT_INFO_ROW}>
            <div className={`${TW_FEATURE_ICON} mb-0 shrink-0`}>
              <Icon size={14} className="text-dq-700" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold tracking-normal text-gray-400 mb-0.5">{label}</p>
              {href ? (
                <Link
                  href={href}
                  {...(href.startsWith('http') ? externalLinkAttrs() : {})}
                  className="inline-flex min-h-11 items-center rounded-md text-[13px] text-slate-700 hover:text-dq-700 focus-visible:text-dq-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dq-400/50 transition-colors break-all"
                  {...(LTR_LABELS.has(label) ? { dir: 'ltr' as const } : {})}
                >
                  <bdi>{value}</bdi>
                </Link>
              ) : (
                <p className="text-[13px] text-slate-700 whitespace-pre-line">{value}</p>
              )}
            </div>
          </div>
        </Reveal>
      ))}

      {socialLinks.length > 0 && (
        <Reveal animation="up" delay={items.length * 70}>
          <div className="flex gap-2 pt-1">
            {socialLinks.map((link) => {
              const Icon = SOCIAL_ICONS[link.kind as 'facebook' | 'youtube']
              return (
                <Link
                  key={link.kind}
                  href={link.href}
                  {...externalLinkAttrs(link.label)}
                  className={TW_CONTACT_SOCIAL_CHIP}
                >
                  <Icon size={13} /> {link.label}
                </Link>
              )
            })}
          </div>
        </Reveal>
      )}

      {items.length === 0 && (
        <p className="text-[13px] text-gray-400 leading-urdu">{CONTACT_EMPTY_MESSAGE}</p>
      )}
    </div>
  )
}
