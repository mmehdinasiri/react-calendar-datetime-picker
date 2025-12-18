import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Utility Functions | React Calendar DateTime Picker',
  description:
    'Comprehensive utility functions for date manipulation, comparison, formatting, and calendar conversion. Learn about date utilities like isBefore, addDays, formatDate, and more with interactive examples.',
  keywords: [
    'react calendar utilities',
    'date utilities',
    'date manipulation',
    'date comparison',
    'date formatting',
    'calendar conversion',
    'date functions',
    'jalali gregorian conversion'
  ],
  openGraph: {
    title: 'Utility Functions | React Calendar DateTime Picker',
    description:
      'Comprehensive utility functions for date manipulation, comparison, and formatting',
    type: 'article'
  }
}

export default function UtilitiesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
