/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './legacy/**/*.{js,jsx,ts,tsx}',
    './Component/**/*.{js,jsx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        body: '#F7F7F7',
        primary: '#009a17',
        text: {
          lightest: '#eee',
          light: '#666',
          DEFAULT: '#444',
        },
        overlay: '#272727',
      },
    },
  },
  plugins: [],
}
