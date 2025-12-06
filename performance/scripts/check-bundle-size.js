#!/usr/bin/env node

/**
 * Bundle Size Checker for React Calendar Library
 * Checks bundle sizes against defined limits
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Bundle size limits (in bytes) - using gzip sizes for meaningful limits
const LIMITS = {
  'dist/index.mjs': 25 * 1024, // 25 kB gzip
  'dist/index.cjs': 20 * 1024, // 20 kB gzip
  'dist/style.css': 5 * 1024 // 5 kB gzip
}

function getGzipSize(filePath) {
  try {
    // Use gzip to get compressed size
    const output = execSync(`gzip -c "${filePath}" | wc -c`, {
      encoding: 'utf8'
    })
    return parseInt(output.trim())
  } catch (error) {
    console.warn(`Could not get gzip size for ${filePath}:`, error.message)
    return null
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'kB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function checkBundleSize() {
  console.log('🔍 Checking bundle sizes...\n')

  const results = []

  Object.entries(LIMITS).forEach(([filePath, limit]) => {
    const fullPath = path.resolve(filePath)

    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${filePath}`)
      return
    }

    const stats = fs.statSync(fullPath)
    const rawSize = stats.size
    const gzipSize = getGzipSize(fullPath)

    // Use gzip size for the primary check (what matters for web delivery)
    const primarySize = gzipSize || rawSize
    const exceeded = primarySize > limit

    const status = exceeded ? '❌ FAIL' : '✅ PASS'

    results.push({
      file: filePath,
      rawSize,
      gzipSize,
      limit,
      exceeded
    })

    console.log(`${status} ${filePath}`)
    if (gzipSize !== null) {
      console.log(
        `   Gzipped: ${formatBytes(gzipSize)} (limit: ${formatBytes(limit)})`
      )
    } else {
      console.log(
        `   Raw: ${formatBytes(rawSize)} (limit: ${formatBytes(limit)})`
      )
    }
    console.log('')
  })

  // Summary
  const failed = results.filter((r) => r.exceeded).length
  const total = results.length

  console.log(`📊 Bundle Size Summary: ${total - failed}/${total} passed`)

  if (failed > 0) {
    console.log('\n❌ Bundle size limits exceeded!')
    process.exit(1)
  } else {
    console.log('\n✅ All bundle sizes within limits!')
  }

  // Store results for CI
  const bundleMetrics = {}
  results.forEach((result) => {
    const fileName = path.basename(result.file)
    bundleMetrics[`${fileName} (raw)`] = result.rawSize
    if (result.gzipSize) {
      bundleMetrics[`${fileName} (gzip)`] = result.gzipSize
    }
  })

  // Save to performance results
  const resultsDir = path.resolve('performance/results')
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true })
  }

  fs.writeFileSync(
    path.join(resultsDir, 'bundle-metrics.json'),
    JSON.stringify(bundleMetrics, null, 2)
  )

  console.log(
    '💾 Bundle metrics saved to performance/results/bundle-metrics.json'
  )
}

if (require.main === module) {
  checkBundleSize()
}
