import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Understanding Date Values | React Calendar DateTime Picker',
  description:
    'Learn how date values work in React Calendar DateTime Picker. Understand Day objects, date formats, conversion between Gregorian and Jalali, and how to work with date inputs.',
  keywords: [
    'date values',
    'day object',
    'date format',
    'date conversion',
    'gregorian jalali',
    'date input',
    'date structure',
    'calendar date format'
  ],
  openGraph: {
    title: 'Understanding Date Values | React Calendar DateTime Picker',
    description: 'Learn how date values work in React Calendar DateTime Picker',
    type: 'article'
  }
}

export default function UnderstandingDateValuesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
