'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'

interface SidebarContextType {
  isOpen: boolean
  toggle: () => void
  close: () => void
  open: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Initialize: closed by default, will be set correctly after mount
  const [isOpen, setIsOpen] = useState(false)

  // Set correct initial state and handle screen size changes
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateSidebarState = () => {
      // Open on large screens (>=1024px), closed on small screens (<1024px)
      const shouldBeOpen = window.innerWidth >= 1024
      setIsOpen(shouldBeOpen)
    }

    // Set initial state immediately on mount
    updateSidebarState()

    // Listen for resize events to update state
    window.addEventListener('resize', updateSidebarState)

    return () => {
      window.removeEventListener('resize', updateSidebarState)
    }
  }, [])

  const toggle = () => setIsOpen((prev) => !prev)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  return (
    <SidebarContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
