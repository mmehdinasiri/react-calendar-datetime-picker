'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { SearchModal } from './SearchModal'
import { useSidebar } from '../contexts/SidebarContext'

function MobileMenuButton() {
  const { isOpen, toggle } = useSidebar()

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle()
      }}
      className='fixed bottom-6 right-6 z-[60] p-4 bg-accent text-white rounded-full shadow-lg hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 pointer-events-auto'
      aria-label='Toggle sidebar'
    >
      <svg
        className='w-7 h-7'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        {isOpen ? (
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        ) : (
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        )}
      </svg>
    </button>
  )
}

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLegacyRoute = pathname?.startsWith('/legacy')
  const { isOpen: isSidebarOpen, close: closeSidebar } = useSidebar()

  // Close sidebar when route changes on mobile only (if it's open)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      closeSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Close sidebar on escape key (mobile only)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (
        e.key === 'Escape' &&
        isSidebarOpen &&
        typeof window !== 'undefined' &&
        window.innerWidth < 1024
      ) {
        closeSidebar()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isSidebarOpen, closeSidebar])

  return (
    <div className='flex flex-col min-h-screen'>
      {!isLegacyRoute && <Header />}
      <div className='flex flex-1 relative'>
        {!isLegacyRoute && (
          <>
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            {/* Mobile Menu Button - Always visible */}
            <MobileMenuButton />
          </>
        )}
        <main
          className={`flex-1 overflow-auto w-full transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'lg:ml-80' : ''
          }`}
        >
          {children}
        </main>
        {/* Search Modal - Rendered outside header to overlay sidebar */}
        {!isLegacyRoute && <SearchModal />}
      </div>
    </div>
  )
}
