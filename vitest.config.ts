import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Use __dirname as root - this is the directory containing this config file
  // When running from main-branch, this will be main-branch directory
  root: __dirname,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Use absolute path resolved from config file location
    // This ensures it resolves correctly regardless of where vitest is invoked from
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
        '**/dist/**'
      ]
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
