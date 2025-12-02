'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const prevPathnameRef = useRef(pathname)
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Only show loader if pathname actually changed (not on initial mount)
    if (prevPathnameRef.current !== pathname) {
      // Clear any existing timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current)
      }

      setLoading(true)
      setProgress(0)

      // Simulate progress with smooth animation
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5 // Random increment between 5-20
        if (currentProgress >= 90) {
          currentProgress = 90
          clearInterval(interval)
        }
        setProgress(currentProgress)
      }, 50)

      // Complete loading after navigation
      loadingTimeoutRef.current = setTimeout(() => {
        setProgress(100)
        setTimeout(() => {
          setLoading(false)
          setProgress(0)
        }, 200)
      }, 300)

      prevPathnameRef.current = pathname

      return () => {
        clearInterval(interval)
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current)
        }
      }
    } else {
      // Update ref on initial mount
      prevPathnameRef.current = pathname
    }
  }, [pathname])

  if (!loading) return null

  return (
    <div className='fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none'>
      <div
        className='h-full bg-accent transition-all duration-200 ease-out relative overflow-hidden'
        style={{
          width: `${progress}%`,
          boxShadow: '0 0 10px rgba(0, 154, 23, 0.5)'
        }}
      >
        <div className='page-loader-shimmer' />
      </div>
    </div>
  )
}

