'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLegacyRoute = pathname?.startsWith('/legacy')

  return (
    <div className='flex flex-col min-h-screen'>
      {!isLegacyRoute && <Header />}
      <div className='flex flex-1'>
        {!isLegacyRoute && <Sidebar />}
        <main className='flex-1 overflow-auto'>{children}</main>
      </div>
    </div>
  )
}

