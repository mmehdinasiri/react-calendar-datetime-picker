#!/usr/bin/env node

/**
 * Extract Performance Metrics from Test Output
 * This script runs the performance tests and extracts metrics from the global object
 */

const { execSync } = require('child_process')
const fs = require('fs')

function extractMetricsFromOutput(output) {
  // Look for the "Performance metrics collected:" line
  const metricsMatch = output.match(
    /Performance metrics collected:\s*(\{.*\})/s
  )
  if (metricsMatch) {
    try {
      return JSON.parse(metricsMatch[1])
    } catch (e) {
      console.error('Failed to parse metrics JSON:', e.message)
    }
  }

  // Fallback: try to find the last JSON object in the output
  const jsonMatches = output.match(/\{[^}]*\}/g)
  if (jsonMatches && jsonMatches.length > 0) {
    try {
      return JSON.parse(jsonMatches[jsonMatches.length - 1])
    } catch (e) {
      console.error('Failed to parse fallback metrics JSON:', e.message)
    }
  }

  return null
}

function main() {
  console.log('Running performance tests to extract metrics...')

  const path = require('path')
  let tempConfigPath = null

  try {
    // Get the current working directory (should be the project root)
    const cwd = process.cwd()
    console.log(`Running from directory: ${cwd}`)

    // Check if vitest.config.ts exists
    const configPath = path.join(cwd, 'vitest.config.ts')
    if (!fs.existsSync(configPath)) {
      throw new Error(`Vitest config not found at: ${configPath}`)
    }

    // Check if setup file exists
    const setupPath = path.join(cwd, 'tests', 'setup.ts')
    if (!fs.existsSync(setupPath)) {
      throw new Error(`Setup file not found at: ${setupPath}`)
    }
    console.log(`Setup file found at: ${setupPath}`)

    // Create a temporary vitest config with absolute paths
    // This ensures vitest resolves paths correctly when running from subdirectories
    tempConfigPath = path.join(cwd, 'vitest.config.temp.ts')
    const tempConfigContent = `import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: '${cwd.replace(/\\/g, '/')}',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['${setupPath.replace(/\\/g, '/')}'],
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
      '@': path.resolve('${cwd.replace(/\\/g, '/')}', './src')
    }
  }
})
`
    fs.writeFileSync(tempConfigPath, tempConfigContent)
    console.log(`Created temporary config at: ${tempConfigPath}`)

    try {
      // Run the performance tests with the temporary config
      const output = execSync(
        `npx vitest run performance/tests/calendar-performance.test.tsx --config "${tempConfigPath}"`,
        {
          encoding: 'utf8',
          stdio: 'pipe',
          cwd: cwd
        }
      )

      console.log('Test output received, extracting metrics...')

      // Extract metrics from output
      const metrics = extractMetricsFromOutput(output)

      if (metrics) {
        // Save to file
        fs.writeFileSync(
          'performance/results/performance-metrics.json',
          JSON.stringify(metrics, null, 2)
        )
        console.log(
          '✅ Performance metrics extracted and saved to performance-metrics.json'
        )

        // Log summary
        console.log('\n📊 Metrics Summary:')
        Object.entries(metrics).forEach(([key, value]) => {
          const unit = key.includes('Calls') ? 'calls' : 'ms'
          console.log(`  ${key}: ${value}${unit}`)
        })
      } else {
        console.error('❌ Failed to extract performance metrics from test output')
        console.log('Test output:', output)
        process.exit(1)
      }
    } finally {
      // Clean up temporary config file
      if (fs.existsSync(tempConfigPath)) {
        fs.unlinkSync(tempConfigPath)
        console.log(`Cleaned up temporary config: ${tempConfigPath}`)
      }
    }
  } catch (error) {
    console.error('❌ Failed to run performance tests:', error.message)
    if (error.stdout) {
      console.log('Test stdout:', error.stdout)
    }
    if (error.stderr) {
      console.log('Test stderr:', error.stderr)
    }
    // Clean up temporary config file on error
    if (tempConfigPath && fs.existsSync(tempConfigPath)) {
      try {
        fs.unlinkSync(tempConfigPath)
        console.log(`Cleaned up temporary config: ${tempConfigPath}`)
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
    }
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}
