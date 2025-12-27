import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility | React Calendar DateTime Picker',
  description:
    'Complete accessibility guide for React Calendar DateTime Picker. Learn about keyboard navigation, ARIA support, screen reader compatibility, focus management, and WCAG 2.1 Level AA compliance.',
  keywords: [
    'react calendar accessibility',
    'date picker a11y',
    'keyboard navigation',
    'aria labels',
    'screen reader',
    'wcag compliance',
    'accessible calendar',
    'keyboard shortcuts'
  ],
  openGraph: {
    title: 'Accessibility | React Calendar DateTime Picker',
    description:
      'Complete accessibility guide with keyboard navigation, ARIA support, and WCAG compliance',
    type: 'article'
  }
}

export default function AccessibilityLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
