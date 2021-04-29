import '../public/fonts/palanquin/palanquin.css'
import '../styles/main.scss'
import 'react-calendar-datetime-picker/dist/index.css'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
