import { TW_CONTAINER } from '@/lib/tailwind'

export default function SiteLoading() {
  return (
    <div className="min-h-[50vh] py-10 sm:py-14" aria-busy="true" aria-live="polite">
      <div className={TW_CONTAINER}>
        <div className="max-w-2xl space-y-4">
          <div className="h-3 w-24 rounded-full bg-dq-100 animate-pulse" />
          <div className="h-8 w-3/4 max-w-md rounded-lg bg-slate-100 animate-pulse" />
          <div className="h-4 w-full max-w-lg rounded bg-slate-100 animate-pulse" />
          <div className="h-4 w-5/6 max-w-md rounded bg-slate-100 animate-pulse" />
        </div>
        <p className="sr-only">صفحہ لوڈ ہو رہا ہے…</p>
      </div>
    </div>
  )
}
