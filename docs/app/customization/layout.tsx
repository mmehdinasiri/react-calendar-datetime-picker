import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customization Guide | React Calendar DateTime Picker',
  description:
    'Learn how to customize React Calendar DateTime Picker with custom trigger elements, themes, CSS variables, custom icons, and styling. Complete theming guide with examples.',
  keywords: [
    'react calendar customization',
    'date picker theming',
    'css variables calendar',
    'custom calendar styles',
    'calendar dark mode',
    'custom trigger elements',
    'calendar icons',
    'react calendar themes'
  ],
  openGraph: {
    title: 'Customization Guide | React Calendar DateTime Picker',
    description:
      'Learn how to customize React Calendar DateTime Picker with themes, CSS variables, and styling',
    type: 'article'
  }
}

export default function CustomizationLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
