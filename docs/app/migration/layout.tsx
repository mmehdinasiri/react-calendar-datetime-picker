import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Migration Guide | React Calendar DateTime Picker',
  description:
    'Migration guide for upgrading from React Calendar DateTime Picker v1.x to v2.x. Learn about breaking changes, new features, and step-by-step migration instructions.',
  keywords: [
    'migration guide',
    'upgrade',
    'breaking changes',
    'v1 to v2',
    'version upgrade',
    'migration instructions'
  ],
  openGraph: {
    title: 'Migration Guide | React Calendar DateTime Picker',
    description: 'Migration guide for upgrading from v1.x to v2.x',
    type: 'article'
  }
}

export default function MigrationLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
