'use client'

import { useEffect } from 'react'
import '../../public/fonts/palanquin/palanquin.css'
import '../../public/fonts/IRANSansFa/css/fontiran.css'
import '../../styles/main.scss'
import 'react-calendar-datetime-picker-legacy/dist/style.css'

export default function LegacyLayout({
  children
}: {
  children: React.ReactNode
}) {
  // Force light mode for legacy pages - prevent dark theme
  useEffect(() => {
    // Remove dark class immediately for legacy pages
    document.documentElement.classList.remove('dark')
    
    // Watch for any attempts to add dark class and remove it
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          document.documentElement.classList.contains('dark')
        ) {
          document.documentElement.classList.remove('dark')
        }
      })
    })
    
    // Observe the html element for class changes
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => {
      observer.disconnect()
      // When leaving legacy pages, restore theme based on system preference or stored preference
      // Use requestAnimationFrame to ensure DOM is ready and avoid conflicts with React rendering
      requestAnimationFrame(() => {
        // Get system preference
        const systemPrefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
        // Get stored preference or use system preference
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
        const shouldBeDark = storedTheme 
          ? storedTheme === 'dark' 
          : systemPrefersDark
        
        // Restore theme
        if (shouldBeDark) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        
        // Force a reflow to ensure styles are applied
        void document.documentElement.offsetHeight
      })
    }
  }, [])

  return <>{children}</>
}
