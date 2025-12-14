import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix: Define __dirname for ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'tests', 'setup.ts')],
    include: [
      'tests/unit/**/*.{test,spec}.{ts,tsx}',
      'performance/tests/**/*.{test,spec}.{ts,tsx}',
      'src/**/*.{test,spec}.{ts,tsx}'
    ],
    exclude: ['node_modules', 'dist', 'examples', 'docs', 'tests/e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      exclude: [
        'node_modules/',
        'tests/',
        'examples/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/dist/**',
        'src/**/index.ts' // Recommended: Exclude barrel files
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
