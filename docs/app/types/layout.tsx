import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TypeScript Types | React Calendar DateTime Picker',
  description:
    'Complete TypeScript type definitions for React Calendar DateTime Picker. Learn about Day, Range, Multi, CalendarSystem, CalendarType, and all type definitions with examples.',
  keywords: [
    'react calendar typescript',
    'date picker types',
    'typescript types',
    'day type',
    'range type',
    'calendar types',
    'type definitions',
    'react calendar types'
  ],
  openGraph: {
    title: 'TypeScript Types | React Calendar DateTime Picker',
    description:
      'Complete TypeScript type definitions for React Calendar DateTime Picker',
    type: 'article'
  }
}

export default function TypesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
