import Document, {
	DocumentContext,
	DocumentInitialProps,
	Head,
	Html,
	Main,
	NextScript
} from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel='apple-touch-icon'
						sizes='76x76'
						href={`${process.env.prefix}/favicon/apple-touch-icon.png`}
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href={`${process.env.prefix}/favicon/favicon-32x32.png`}
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href={`${process.env.prefix}/favicon/favicon-16x16.png`}
					/>
					<link
						rel='manifest'
						href={`${process.env.prefix}/favicon/site.webmanifest`}
					/>
					<link
						rel='mask-icon'
						href={`${process.env.prefix}/favicon/safari-pinned-tab.svg`}
						color='#5bbad5'
					/>
					<meta name='msapplication-TileColor' content='#da532c' />
					<meta name='theme-color' content='#ffffff'></meta>
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}

	static async getInitialProps(
		ctx: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await Document.getInitialProps(ctx)

		return {
			...initialProps
		}
	}
}

export default MyDocument
