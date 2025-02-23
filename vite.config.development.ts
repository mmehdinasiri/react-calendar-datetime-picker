import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  build: {
    minify: 'terser',
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'react-calendar-datetime-picker',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') {
          return `index.mjs`
        } else {
          return `index.cjs`
        }
      }
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
 assetFileNames: 'style.[ext]'
      }
    }
  },
  plugins: [
    react(),
    svgr(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true
    })
  ]
})
