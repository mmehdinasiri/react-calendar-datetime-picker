import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quick Start Guide | React Calendar DateTime Picker',
  description:
    'Get started with React Calendar DateTime Picker in minutes. Learn basic usage, calendar types (single, range, multi, week), locales, time selection, and date constraints with code examples.',
  keywords: [
    'react calendar quick start',
    'react date picker tutorial',
    'dtpicker',
    'dtcalendar',
    'react calendar examples',
    'date picker guide',
    'calendar types',
    'date range picker'
  ],
  openGraph: {
    title: 'Quick Start Guide | React Calendar DateTime Picker',
    description:
      'Get started with React Calendar DateTime Picker in minutes with code examples',
    type: 'article'
  }
}

export default function GettingStartedLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
