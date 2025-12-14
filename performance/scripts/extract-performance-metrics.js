#!/usr/bin/env node

/**
 * Extract Performance Metrics from Test Output
 * Optimized for CI/CD stability
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function extractMetricsFromOutput(output) {
  // 1. Primary Strategy: Look for the specific marker
  // We use the 's' flag for dotAll to capture multi-line JSON
  const metricsMatch = output.match(
    /Performance metrics collected:\s*(\{[\s\S]*?\})(\n|$)/
  )

  if (metricsMatch && metricsMatch[1]) {
    try {
      const data = JSON.parse(metricsMatch[1])
      console.log('✅ Successfully parsed metrics via marker.')
      return data
    } catch (e) {
      console.error('⚠️ Found marker but failed to parse JSON:', e.message)
    }
  }

  // 2. Risk Warning: We purposefully REMOVED the "Last JSON" fallback.
  // Why? It often picks up Vitest's own internal JSON summary or coverage reports
  // which causes confusing errors downstream. It is better to fail
  // than to return wrong data.

  return null
}

function main() {
  console.log('🚀 Starting Performance Metric Extraction...')

  let tempConfigPath = null

  try {
    const cwd = process.cwd()
    console.log(`📂 Working Directory: ${cwd}`)

    const configPath = path.join(cwd, 'vitest.config.ts')
    const setupPath = path.join(cwd, 'tests', 'setup.ts')

    // Quick validation
    if (!fs.existsSync(configPath)) throw new Error(`Missing vitest.config.ts`)
    if (!fs.existsSync(setupPath)) throw new Error(`Missing tests/setup.ts`)

    // Create a temporary vitest config
    tempConfigPath = path.join(cwd, 'vitest.config.temp.ts')

    // We target the entire directory 'performance/tests/' instead of a single file
    const targetTestPattern = 'performance/tests/**/*.test.{ts,tsx}'

    const tempConfigContent = `
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: '${cwd.replace(/\\/g, '/')}',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['${setupPath.replace(/\\/g, '/')}'],
    include: ['${targetTestPattern}'], 
    exclude: ['node_modules', 'dist'],
    reporters: ['default'], // Keep it simple to avoid noise
    silent: false, // Ensure console.log makes it to stdout
  },
  resolve: {
    alias: {
      '@': path.resolve('${cwd.replace(/\\/g, '/')}', './src')
    }
  }
})`

    fs.writeFileSync(tempConfigPath, tempConfigContent)
    console.log(`📝 Generated temp config: ${tempConfigPath}`)

    try {
      // COMMAND UPDATE:
      // 1. Run strict vitest command
      // 2. Target the FOLDER, not the file
      // 3. Increase maxBuffer to 10MB to prevent crashes on large logs
      const output = execSync(
        `npx vitest run performance/tests/ --config "${tempConfigPath}"`,
        {
          encoding: 'utf8',
          stdio: 'pipe', // Capture output programmatically
          cwd: cwd,
          maxBuffer: 10 * 1024 * 1024 // 10MB buffer (Standard is 1MB)
        }
      )

      const metrics = extractMetricsFromOutput(output)

      if (metrics) {
        // Ensure directory exists
        const resultsDir = path.join(cwd, 'performance/results')
        if (!fs.existsSync(resultsDir)) {
          fs.mkdirSync(resultsDir, { recursive: true })
        }

        fs.writeFileSync(
          path.join(resultsDir, 'performance-metrics.json'),
          JSON.stringify(metrics, null, 2)
        )

        console.log('\n📊 Metrics Summary:')
        Object.entries(metrics).forEach(([key, value]) => {
          const unit = key.toLowerCase().includes('call') ? '' : 'ms'
          console.log(`  ${key}: ${value}${unit}`)
        })

        console.log('\n✅ Success: Metrics saved.')
      } else {
        console.error(
          '\n❌ Error: Could not find "Performance metrics collected:" block in output.'
        )
        console.error(
          '   Ensure your test file contains: console.log("Performance metrics collected:", JSON.stringify(metrics))'
        )
        process.exit(1)
      }
    } catch (execError) {
      console.error('\n❌ Vitest Execution Failed:')
      console.error(execError.message)
      if (execError.stdout) console.log('\n--- STDOUT ---\n', execError.stdout)
      if (execError.stderr) console.log('\n--- STDERR ---\n', execError.stderr)
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Script Error:', error.message)
    process.exit(1)
  } finally {
    // Always clean up
    if (tempConfigPath && fs.existsSync(tempConfigPath)) {
      fs.unlinkSync(tempConfigPath)
      console.log(`🧹 Cleaned up temp config`)
    }
  }
}

if (require.main === module) {
  main()
}
