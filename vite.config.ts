import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// import removeConsole from 'vite-plugin-remove-console'
import { terser } from 'rollup-plugin-terser'

// https://vitejs.dev/config/
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
      formats: ['es'],
      fileName: (format) => `index.js`
    },
    rollupOptions: {
      plugins: [
        terser({
          compress: {
            defaults: true,
            drop_console: true,
            dead_code: true,
            directives: true,
            drop_debugger: true
          }
        })
      ],
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  },
  plugins: [
    react(),
    svgr(),
    // removeConsole(),
    dts({
      insertTypesEntry: true
    })
  ]
})
