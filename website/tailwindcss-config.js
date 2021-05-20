module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true
	},
	purge: {
		layers: ['utilities'],
		enabled: process.env.node_env === 'production',
		content: ['./**/*.{js,jsx,ts,tsx}', './public/index.html']
	},
	theme: {
		extend: {
			colors: {
				body: '#F7F7F7',
				primary: '#009a17',
				text: {
					lightest: '#eee',
					light: '#666',
					DEFAULT: '#444'
				},
				overlay: '#272727'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}
