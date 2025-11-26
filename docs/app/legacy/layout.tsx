import '../../public/fonts/palanquin/palanquin.css'
import '../../public/fonts/IRANSansFa/css/fontiran.css'
import '../../styles/main.scss'
import 'react-calendar-datetime-picker-legacy/dist/style.css'

export default function LegacyLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
