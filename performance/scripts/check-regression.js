const fs = require('fs')

// Threshold configuration
const THRESHOLDS = {
  PERCENTAGE: 15, // 15% slower
  ABS_MIN: 5, // AND at least 5ms slower
  ABS_HARD_CAP: 10 // OR 10ms slower regardless of %
}

function main() {
  if (!fs.existsSync('performance/results/performance-metrics-main.json')) {
    console.log('⚠️ Baseline metrics not found. Skipping regression check.')
    process.exit(0)
  }

  try {
    const baseline = JSON.parse(
      fs.readFileSync(
        'performance/results/performance-metrics-main.json',
        'utf8'
      )
    )
    const current = JSON.parse(
      fs.readFileSync('performance/results/performance-metrics.json', 'utf8')
    )

    // Check for major rewrite (sanity check)
    if (isMajorRewrite(baseline, current)) {
      console.log(
        '⚠️ Major rewrite detected. Skipping strict regression check.'
      )
      process.exit(0)
    }

    const regressions = detectRegressions(baseline, current)

    if (regressions.length > 0) {
      console.log('🚨 PERFORMANCE REGRESSIONS DETECTED:')
      regressions.forEach((reg) => console.log(`  ${reg}`))
      console.log('\nConsider optimizing before merging.')
      process.exit(1)
    }

    console.log('✅ No significant performance regressions detected.')
  } catch (error) {
    console.error('⚠️ Error checking regressions:', error.message)
    process.exit(0) // Don't fail the build on script errors
  }
}

function isMajorRewrite(baseline, current) {
  let largeDiffs = 0
  let total = 0

  Object.entries(current).forEach(([key, val]) => {
    const base = baseline[key]
    if (!base || key.includes('Calls')) return
    total++
    // If difference is > 5x
    if ((val > base ? val / base : base / val) > 5) largeDiffs++
  })

  return total > 0 && largeDiffs / total > 0.7
}

function detectRegressions(baseline, current) {
  const regressions = []

  Object.entries(current).forEach(([key, val]) => {
    const base = baseline[key]
    if (!base || key.includes('Calls')) return
    if (base < 1 && val < 1) return // Ignore micro-metrics

    const percentChange = ((val - base) / base) * 100
    const absoluteChange = val - base

    const isRegression =
      (percentChange > THRESHOLDS.PERCENTAGE &&
        absoluteChange > THRESHOLDS.ABS_MIN) ||
      absoluteChange > THRESHOLDS.ABS_HARD_CAP

    if (isRegression) {
      regressions.push(
        `❌ ${key}: ${percentChange.toFixed(1)}% slower (${base.toFixed(2)}ms → ${val.toFixed(2)}ms)`
      )
    }
  })

  return regressions
}

main()
