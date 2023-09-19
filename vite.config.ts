import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

import svgr from 'vite-plugin-svgr'
import { terser } from 'rollup-plugin-terser'

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
      plugins: [
        terser({
          compress: {
            defaults: true,
            drop_console: true,
            dead_code: true,
            directives: true,
            drop_debugger: true
          }
        }),
        visualizer({
          filename: 'bundle-analysis.html',
          open: false
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
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true
    })
  ]
})
