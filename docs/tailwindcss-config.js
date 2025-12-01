/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './legacy/**/*.{js,jsx,ts,tsx}',
    './Component/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors
        body: '#F7F7F7',
        overlay: '#272727',
        primary: '#009a17', // Primary green color (for backward compatibility)
        text: {
          lightest: '#eee',
          light: '#666',
          DEFAULT: '#444'
        },
        // Dark theme colors
        bg: {
          primary: '#1a1a1a',
          secondary: '#23272f',
          tertiary: '#2d333b'
        },
        border: {
          DEFAULT: '#383e47',
          color: '#383e47'
        },
        accent: {
          DEFAULT: '#009a17',
          hover: '#008a14',
          light: '#4ade80',
          'light-hover': '#22c55e'
        }
      }
    }
  },
  plugins: []
}
