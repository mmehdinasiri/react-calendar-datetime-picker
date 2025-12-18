import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Examples | React Calendar DateTime Picker',
  description:
    'Interactive examples and code snippets for React Calendar DateTime Picker. Explore calendar types, time selection, constraints, formatting, display options, and more with live demos.',
  keywords: [
    'react calendar examples',
    'date picker examples',
    'calendar code snippets',
    'dtpicker examples',
    'date range examples',
    'multi-date selection',
    'time picker examples',
    'calendar constraints'
  ],
  openGraph: {
    title: 'Examples | React Calendar DateTime Picker',
    description:
      'Interactive examples and code snippets for React Calendar DateTime Picker',
    type: 'article'
  }
}

export default function ExamplesLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
