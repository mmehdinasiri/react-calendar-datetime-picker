import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Exclude test files from JSX transform
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
        'tests/**'
      ],
      // Generate declaration maps for better IDE support
      rollupTypes: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    // Enable source maps for CSS
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        // Add global SCSS variables/mixins if needed
        // additionalData: `@import "@/styles/variables.scss";`,
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactCalendarDateTimePicker',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.mjs'
        }
        return 'index.cjs'
      }
    },
    rollupOptions: {
      // Externalize dependencies
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        // Preserve module structure for tree-shaking
        preserveModules: false,
        // Asset file naming - ensure CSS is named style.css
        assetFileNames: (assetInfo) => {
          // Extract CSS to style.css at root
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css'
          }
          return 'assets/[name][extname]'
        }
      }
    },
    // Generate source maps for debugging
    sourcemap: true,
    // Minify with esbuild (faster than terser)
    minify: 'esbuild',
    // Target modern browsers
    target: 'es2020',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  }
})
