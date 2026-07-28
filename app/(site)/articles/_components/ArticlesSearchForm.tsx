import { PATHS } from '@/lib/paths'
import { TW_BTN_PRIMARY, TW_SEARCH_INPUT } from '@/lib/tailwind'
import { DEFAULT_SEARCH_PLACEHOLDER } from '@/lib/seo'

type ArticlesSearchFormProps = {
  defaultQuery?: string
}

export default function ArticlesSearchForm({ defaultQuery = '' }: ArticlesSearchFormProps) {
  return (
    <form action={PATHS.articles} method="get" role="search" className="max-w-md mt-5">
      <label htmlFor="article-search" className="sr-only">
        مضامین تلاش کریں
      </label>
      <div className="flex gap-2">
        <input
          id="article-search"
          name="q"
          type="search"
          defaultValue={defaultQuery}
          placeholder={DEFAULT_SEARCH_PLACEHOLDER}
          enterKeyHint="search"
          autoComplete="off"
          className={TW_SEARCH_INPUT}
        />
        <button type="submit" className={`${TW_BTN_PRIMARY} min-w-11`}>
          تلاش
        </button>
      </div>
    </form>
  )
}
