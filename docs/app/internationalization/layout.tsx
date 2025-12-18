import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Internationalization (i18n) | React Calendar DateTime Picker',
  description:
    'Complete internationalization guide for React Calendar DateTime Picker. Learn about locale support (English, Persian, German, Spanish, French, Korean), RTL support, custom translations, and localization.',
  keywords: [
    'react calendar i18n',
    'internationalization',
    'locale support',
    'rtl support',
    'persian calendar',
    'jalali calendar',
    'custom translations',
    'localization',
    'multilingual calendar'
  ],
  openGraph: {
    title: 'Internationalization (i18n) | React Calendar DateTime Picker',
    description:
      'Complete internationalization guide with locale support, RTL, and custom translations',
    type: 'article'
  }
}

export default function InternationalizationLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
