import '../public/fonts/palanquin/palanquin.css'
import '../public/fonts/IRANSansFa/css/fontiran.css'
import '../styles/main.scss'
// import 'react-calendar-datetime-picker/dist/style.css'

export const metadata = {
  title: 'React Calendar DateTime Picker',
  description:
    'A modern, fast and small calendar for React with English and Persian (Jalali) support'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
