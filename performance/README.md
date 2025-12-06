# Performance Monitoring System

This directory contains the complete performance monitoring and testing infrastructure for the calendar component.

## Directory Structure

```
performance/
├── docs/           # Performance documentation and analysis
├── scripts/        # Performance testing and reporting scripts
├── tests/          # Performance test suites
├── results/        # Generated performance metrics and reports
└── workflows/      # GitHub Actions workflow configurations
```

## Key Components

### 📊 Performance Tests (`tests/`)
- **`calendar-performance.test.tsx`** - Comprehensive performance benchmarks
- Measures render times, re-render efficiency, and interaction performance
- Uses statistical analysis (median of multiple runs) for stability

### 🔧 Scripts (`scripts/`)
- **`generate-performance-report.js`** - Creates human-readable performance reports
- **`extract-performance-metrics.js`** - Extracts metrics from test runs for CI/CD

### 📈 Results (`results/`)
- **`performance-metrics.json`** - Raw performance data
- **`performance-report.md`** - Formatted performance report
- **`baseline-metrics.json`** - Baseline performance for comparison

### 📚 Documentation (`docs/`)
- **`PERFORMANCE_FIXES.md`** - Implementation details of performance optimizations
- **`PERFORMANCE_REVIEW.md`** - Analysis of performance improvements

## Usage

### Local Development

```bash
# Run performance tests
npm run test:performance

# Generate performance report
npm run performance:report

# Compare with baseline
npm run performance:compare
```

### CI/CD Integration

The performance system integrates with GitHub Actions:

- **Automatic PR testing** - Every PR gets performance benchmarks
- **Baseline comparison** - Compares against main branch performance
- **Regression detection** - Flags significant performance degradation
- **PR comments** - Posts performance results with visual indicators

## Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Calendar Render (1 month) | < 100ms | Initial load time |
| Calendar Render (3 months) | < 200ms | Multi-month view |
| Re-render (unchanged props) | < 25ms | Memoization effectiveness |
| Month Navigation | < 75ms | User interaction |
| Array.from Calls (Re-render) | 0 calls | Static array optimization |

## Key Features

### 🧪 Test Stability
- Multiple test runs with statistical analysis
- Garbage collection between runs
- Median calculation for reliable metrics

### 📊 Visual Reporting
- Color-coded performance indicators (🟢🟡🔴)
- Percentage improvement/degradation calculations
- Regression detection with configurable thresholds

### 🔄 CI/CD Integration
- Automatic performance regression detection
- PR comments with detailed comparisons
- Artifact preservation for historical analysis

## Maintenance

### Adding New Performance Tests
1. Add test cases to `tests/calendar-performance.test.tsx`
2. Update performance targets in scripts if needed
3. Test locally before committing

### Updating Performance Targets
1. Modify targets in `scripts/generate-performance-report.js`
2. Update documentation in this README
3. Update CI/CD workflow if needed

### Troubleshooting
- Performance metrics inconsistent? Check test stability settings
- CI failures? Verify script paths and dependencies
- New metrics not appearing? Check test output format

## Related Files

- **`.github/workflows/performance.yml`** - GitHub Actions workflow
- **`.github/workflows/README.md`** - Workflow documentation
- **`package.json`** - NPM scripts for performance testing