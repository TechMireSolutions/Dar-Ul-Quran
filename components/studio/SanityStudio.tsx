'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function SanityStudio() {
  useEffect(() => {
    // Suppress Sanity Studio auto-update fetch errors in development
    const originalError = console.error
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Failed to fetch version for package')
      ) {
        return
      }
      originalError.apply(console, args)
    }
    return () => {
      console.error = originalError
    }
  }, [])

  return <NextStudio config={config} />
}
