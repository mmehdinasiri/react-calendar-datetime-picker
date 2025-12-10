import '../public/fonts/palanquin/palanquin.css'
import '../public/fonts/IRANSansFa/css/fontiran.css'
import '../styles/main.scss'
import 'react-calendar-datetime-picker/style.css'
import { Metadata } from 'next'
import Script from 'next/script'
import NextTopLoader from 'nextjs-toploader'
import { LayoutWrapper } from './components/LayoutWrapper'
import { ThemeProvider } from './contexts/ThemeContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { SearchModalProvider } from './contexts/SearchModalContext'
import { CLARITY_PROJECT_ID, ENABLE_CLARITY } from './config/clarity'
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
        {/* Microsoft Clarity Analytics */}
        {ENABLE_CLARITY && (
          <Script
            id='microsoft-clarity'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
              `
            }}
          />
        )}
        <NextTopLoader
          color='#009a17'
          height={3}
          showSpinner={false}
          easing='ease'
          speed={200}
          shadow='0 0 10px rgba(0, 154, 23, 0.5)'
        />
        <ThemeProvider>
          <SidebarProvider>
            <SearchModalProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </SearchModalProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
