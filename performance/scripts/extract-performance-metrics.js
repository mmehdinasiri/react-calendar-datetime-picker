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

  try {
    // Run the performance tests
    const output = execSync(
      'npx vitest run tests/unit/calendar-performance.test.tsx',
      {
        encoding: 'utf8',
        stdio: 'pipe'
      }
    )

    console.log('Test output received, extracting metrics...')

    // Extract metrics from output
    const metrics = extractMetricsFromOutput(output)

    if (metrics) {
      // Save to file
      fs.writeFileSync(
        'performance-metrics.json',
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
  } catch (error) {
    console.error('❌ Failed to run performance tests:', error.message)
    if (error.stdout) {
      console.log('Test stdout:', error.stdout)
    }
    if (error.stderr) {
      console.log('Test stderr:', error.stderr)
    }
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}
