import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Installation | React Calendar DateTime Picker',
  description:
    'Learn how to install React Calendar DateTime Picker using npm, yarn, or pnpm. Quick setup guide with package manager commands and CSS import instructions.',
  keywords: [
    'react-calendar-datetime-picker',
    'installation',
    'npm',
    'yarn',
    'pnpm',
    'setup',
    'install',
    'react calendar install'
  ],
  openGraph: {
    title: 'Installation | React Calendar DateTime Picker',
    description:
      'Learn how to install React Calendar DateTime Picker using npm, yarn, or pnpm',
    type: 'article'
  }
}

export default function InstallationLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
