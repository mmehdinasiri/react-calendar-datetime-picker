import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Handle CSS import first - must come before main alias
      {
        find: /^react-calendar-datetime-picker\/style\.css$/,
        replacement: path.resolve(__dirname, '../../src/styles/index.scss')
      },
      // Main package alias for component imports
      {
        find: 'react-calendar-datetime-picker',
        replacement: path.resolve(__dirname, '../../src')
      }
    ]
  },
  server: {
    port: 5005,
    open: false
  }
})
