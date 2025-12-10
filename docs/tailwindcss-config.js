/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        // Theme-aware colors using CSS variables
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)'
        },
        border: {
          DEFAULT: 'var(--border-color)',
          color: 'var(--border-color)'
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
