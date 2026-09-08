'use client'

import { useState, useMemo } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { ListingContentCards, type ListingCardItem } from '@/components/layout/ListingIndexShell'

type FilteredCourseListingProps = {
  items: ListingCardItem[]
}

export default function FilteredCourseListing({ items }: FilteredCourseListingProps) {
  const [query, setQuery] = useState('')
  const [subject, setSubject] = useState('')

  const subjects = useMemo(() => {
    const subs = new Set<string>()
    items.forEach(item => {
      if (item.badge) subs.add(item.badge)
    })
    return Array.from(subs).sort()
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchQuery = !query || 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
        (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()))
        
      const matchSubject = !subject || item.badge === subject
      
      return matchQuery && matchSubject
    })
  }, [items, query, subject])

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Filter Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-0 p-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm focus-within:border-dq-400 focus-within:outline-none focus-within:ring-0 transition-all">
          <div className="relative flex-1 w-full flex items-center">
            <Search className="absolute start-4 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="نام یا موضوع کے لحاظ سے کورسز تلاش کریں..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-slate-700 dark:text-slate-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 h-11 ps-11 pe-4 text-[13.5px] font-medium border-0 focus:!outline-none focus:!ring-0"
            />
          </div>
          
          {subjects.length > 0 && (
            <>
              <div className="hidden sm:block w-px h-6 bg-gray-200 dark:bg-slate-700 mx-2 shrink-0"></div>
              
              <div className="relative shrink-0 w-full sm:w-[220px] border-t sm:border-t-0 border-gray-100 dark:border-slate-700/50">
                <BookOpen className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full appearance-none bg-transparent text-slate-700 dark:text-slate-200 h-11 ps-10 pe-10 cursor-pointer text-[13.5px] font-medium border-0 focus:!outline-none focus:!ring-0"
                >
                  <option value="">تمام مضامین</option>
                  {subjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                <div className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-slate-400 text-[15px]">
          کوئی کورس نہیں ملا۔
        </div>
      ) : (
        <ListingContentCards items={filteredItems} />
      )}
    </div>
  )
}
