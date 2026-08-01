import React from 'react'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap'

/** 
 * Loads Urdu webfont natively via Next.js optimized link.
 * Removing 'use client' and useEffect allows Next.js to inject this in <head>
 * before hydration, fixing the 2-3 second delay (FOUT).
 */
export default function DeferredUrduFont() {
  return (
    <link href={FONT_HREF} rel="stylesheet" />
  )
}
