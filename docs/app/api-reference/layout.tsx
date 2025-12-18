import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Reference | React Calendar DateTime Picker',
  description:
    'Complete API documentation for DtPicker and DtCalendar components. Detailed prop descriptions, type definitions, and component-specific props with examples.',
  keywords: [
    'react calendar api',
    'dtpicker api',
    'dtcalendar api',
    'react date picker props',
    'calendar component api',
    'date picker documentation',
    'react calendar reference'
  ],
  openGraph: {
    title: 'API Reference | React Calendar DateTime Picker',
    description:
      'Complete API documentation for DtPicker and DtCalendar components',
    type: 'article'
  }
}

export default function APIReferenceLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
