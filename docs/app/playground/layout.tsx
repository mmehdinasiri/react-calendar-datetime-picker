import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Playground | React Calendar DateTime Picker',
  description:
    'Interactive playground for React Calendar DateTime Picker. Experiment with DtPicker and DtCalendar components in a live code editor. Test different props, see results in real-time, and copy code snippets.',
  keywords: [
    'react calendar playground',
    'date picker sandbox',
    'interactive demo',
    'code playground',
    'live editor',
    'experiment calendar',
    'test date picker'
  ],
  openGraph: {
    title: 'Playground | React Calendar DateTime Picker',
    description:
      'Interactive playground to experiment with DtPicker and DtCalendar components',
    type: 'website'
  }
}

export default function PlaygroundLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
