import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Globe, Play } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { CONTACT_EMPTY_MESSAGE } from '@/lib/contact'
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

export default function ContactInfo({ items, facebook, youtube }: ContactInfoProps) {
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
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-[13px] text-slate-700 hover:text-dq-700 focus-visible:text-dq-700 transition-colors break-all"
                  {...(label === 'ای میل' || label === 'فون' || label === 'واٹس ایپ' ? { dir: 'ltr' as const } : {})}
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

      {(facebook || youtube) && (
        <Reveal animation="up" delay={items.length * 70}>
          <div className="flex gap-2 pt-1">
            {facebook && (
              <Link href={facebook} target="_blank" rel="noopener noreferrer" className={TW_CONTACT_SOCIAL_CHIP}>
                <Globe size={13} /> فیس بک
              </Link>
            )}
            {youtube && (
              <Link href={youtube} target="_blank" rel="noopener noreferrer" className={TW_CONTACT_SOCIAL_CHIP}>
                <Play size={13} /> یوٹیوب
              </Link>
            )}
          </div>
        </Reveal>
      )}

      {items.length === 0 && (
        <p className="text-[13px] text-gray-400 leading-urdu">{CONTACT_EMPTY_MESSAGE}</p>
      )}
    </div>
  )
}
