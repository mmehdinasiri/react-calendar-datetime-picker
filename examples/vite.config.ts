import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-calendar-datetime-picker': path.resolve(__dirname, '../src'),
      // Handle style.css import - point to the source SCSS file
      'react-calendar-datetime-picker/style.css': path.resolve(
        __dirname,
        '../src/styles/index.scss'
      ),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})

