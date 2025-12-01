import '../public/fonts/palanquin/palanquin.css'
import '../public/fonts/IRANSansFa/css/fontiran.css'
import '../styles/main.scss'
import { Metadata } from 'next'
import { LayoutWrapper } from './components/LayoutWrapper'
import { ThemeProvider } from './contexts/ThemeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'React Calendar DateTime Picker',
  description:
    'A modern, fast and small calendar for React with English and Persian (Jalali) support',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#009a17'
      }
    ]
  },
  manifest: '/favicon/site.webmanifest'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-bg-primary text-gray-900 dark:text-white antialiased'>
        <ThemeProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
