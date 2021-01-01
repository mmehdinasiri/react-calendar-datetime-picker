module.exports = {
  purge: {
    enabled: process.env.node_env.trim() === 'production' ? true : false,
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html']
  },
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
