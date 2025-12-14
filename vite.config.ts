import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      exclude: /\.test\.(ts|tsx)$/
    }),
    dts({
      insertTypesEntry: true,
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        'examples/**',
        'tests/**',
        'performance/**' // Added performance exclude
      ],
      rollupTypes: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactCalendarDateTimePicker',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs')
    },
    rollupOptions: {
      // 1. OPTIMIZATION: Don't bundle dependencies!
      // Users will install these via their package manager.
      external: ['react', 'react-dom', 'react/jsx-runtime', 'jalaali-js'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          'jalaali-js': 'Jalaali' // Global variable name for UMD/CDN builds
        },
        // 2. OPTIMIZATION: Keep CSS name predictable
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css'
          }
          return 'assets/[name][extname]'
        }
      }
    },
    // 3. OPTIMIZATION: Use 'terser' for smaller bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        defaults: true,
        drop_console: true // Removes console.log
      }
    },
    sourcemap: true,
    target: 'es2020'
  }
})
