import { TW_CONTAINER_NARROW, TW_SECTION_PY, TW_SECTION_TITLE } from '@/lib/tailwind'

type LeafProseSectionProps = {
  heading?: string
  body?: string
}

/** Centered heading + body used on course overview / promise blocks. */
export default function LeafProseSection({ heading, body }: LeafProseSectionProps) {
  if (!heading && !body) return null

  return (
    <section className={`bg-white dark:bg-slate-800/40 transition-colors ${TW_SECTION_PY}`}>
      <div className={`${TW_CONTAINER_NARROW} text-center`}>
        {heading && (
          <h2 className={`${TW_SECTION_TITLE} mb-5`}>
            {heading}
          </h2>
        )}
        {body && (
          <p className="text-[15px] text-gray-600 dark:text-slate-300 transition-colors leading-urdu tracking-normal">{body}</p>
        )}
      </div>
    </section>
  )
}
