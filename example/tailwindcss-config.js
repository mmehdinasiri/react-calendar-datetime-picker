module.exports = {
  purge: {
    enabled: process.env.node_env.trim() === 'production' ? true : false,
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html']
  },
  theme: {
    extend: {
      colors: {
        body: '#F7F7F7',
        primary: '#009a17',
        text: {
          lightest: '#888',
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
