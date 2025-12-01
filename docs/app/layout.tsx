import '../public/fonts/palanquin/palanquin.css'
import '../public/fonts/IRANSansFa/css/fontiran.css'
import '../styles/main.scss'
import { Metadata } from 'next'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import './globals.css'

export const metadata: Metadata = {
  title: 'React Calendar DateTime Picker',
  description: 'A modern, fast and small calendar for React with English and Persian (Jalali) support',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-white antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}