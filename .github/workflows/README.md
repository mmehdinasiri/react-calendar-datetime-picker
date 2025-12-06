# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated testing, building, and performance monitoring.

## Unit Tests Workflow (`unit.yml`)

### Overview
The unit tests workflow runs comprehensive quality checks on every pull request and push to main branch.

### Triggers
- **Pull Requests**: When PRs are opened, synchronized, or marked ready for review
- **Push to Main**: When commits are pushed to the main branch

### What It Does

1. **Quality Checks:**
   - TypeScript type checking
   - ESLint linting
   - Prettier format checking

2. **Build:**
   - Builds the library (`pnpm run build`)

3. **Unit Tests:**
   - Runs Vitest unit tests
   - Generates coverage reports

4. **E2E Tests:**
   - Installs Playwright browsers
   - Starts examples dev server
   - Runs Playwright E2E tests
   - Uploads test reports and artifacts

5. **Coverage (PRs only):**
   - Generates coverage report
   - Uploads to Codecov (if configured)

### Output
- **Test Results**: Detailed test output in workflow logs
- **Coverage Reports**: Code coverage statistics and reports
- **Test Artifacts**: Screenshots, videos, and traces from failed E2E tests

---

## Performance Workflow (`performance.yml`)

### Overview
The performance workflow automatically measures and compares performance between the main branch and PR branches, providing insights into performance regressions and improvements.

### Triggers
- **Pull Requests**: When PRs are opened, synchronized, or marked ready for review
- **Push to Main**: When commits are pushed to the main branch
- **Manual**: Can be triggered manually via GitHub UI

### What It Does

#### For Pull Requests:
1. **Baseline Measurement**: Checks out and measures performance on the main branch
2. **PR Measurement**: Measures performance on the PR branch
3. **Comparison**: Generates a detailed comparison report
4. **PR Comment**: Posts performance results as a comment on the PR

#### For Main Branch:
1. **Performance Measurement**: Runs performance tests on the latest main branch
2. **Report Generation**: Creates performance reports for tracking over time

### Performance Tests
The workflow runs comprehensive performance tests that measure:
- Initial render times for different calendar configurations
- Re-render performance with memoization
- User interaction responsiveness (month navigation, modal opening)
- Memory efficiency (array recreation monitoring)

### Output
- **PR Comments**: Automatic performance comparison comments on pull requests
- **Artifacts**: Performance metrics and reports saved as workflow artifacts
- **Console Logs**: Detailed performance measurements in workflow logs

### Files Generated
- `performance-metrics.json`: Raw performance metrics
- `performance-report.md`: Human-readable performance report
- `performance-comparison.md`: Comparison between branches (PRs only)

### Local Development
You can run performance tests locally:
```bash
# Run performance tests
npm run test:performance

# Generate performance report
npm run performance:report

# Compare with baseline (if available)
npm run performance:compare

# All performance files are located in the performance/ directory
```

### Performance Targets
The workflow validates performance against these targets:
- Calendar render (1 month): < 100ms
- Calendar render (3 months): < 200ms
- Re-render (unchanged props): < 25ms (allowing for CI environment variance)
- Month navigation: < 75ms
- Array.from calls on re-render: 0 calls
- DtPicker render: < 150ms
- DtPicker modal open: < 100ms

### Troubleshooting
- **Tests Failing**: Check that performance targets are realistic for the test environment
- **Workflow Not Triggering**: Ensure PR has the correct labels or is not in draft mode
- **Metrics Inconsistent**: Performance can vary between runs due to test environment factors

### Configuration
The workflow uses:
- Ubuntu latest runners
- Node.js 20
- pnpm for package management
- Vitest for test execution
- Custom performance measurement scripts

### Status Checks

**Required for merge:**
- `performance / Performance Benchmark` - Performance regression check

**Artifacts:**
- Performance metrics JSON (30 days retention)
- Performance reports (30 days retention)

---

## Setting Up Branch Protection

To require tests to pass before merging:

1. Go to Repository Settings → Branches
2. Add rule for `main` branch
3. Enable "Require status checks to pass before merging"
4. Select:
   - `test / Run Tests`
   - `performance / Performance Benchmark` (recommended)
5. Optionally select: `test / Test Coverage`

See `.github/BRANCH_PROTECTION.md` for detailed instructions.

## Local Testing

You can test workflows locally using:

- [act](https://github.com/nektos/act) - Run GitHub Actions locally
- [Playwright Test Runner](https://playwright.dev/docs/test-runners) - For E2E tests

### Performance Testing Locally

```bash
# Run performance tests
npm run test:performance

# Generate performance report
npm run performance:report

# Compare with baseline
npm run performance:compare
```

## Troubleshooting

### Workflow fails in CI but works locally

1. Check Node.js version (CI uses Node 20)
2. Check pnpm version (CI uses pnpm 10)
3. Ensure `--frozen-lockfile` is used (CI uses this)
4. Check if environment variables are needed

### E2E tests fail in CI

1. Check Playwright browser installation
2. Verify examples dev server starts correctly
3. Check timeout settings (CI has 15min timeout)
4. Review Playwright report artifacts

### Performance tests inconsistent

1. Performance can vary between runs due to CI environment
2. Tests use median of 3 runs for stability
3. Check if regression threshold (15%) is appropriate
4. Review performance artifacts for detailed metrics

### Coverage not uploading

- Codecov action is optional (`fail_ci_if_error: false`)
- Requires Codecov account setup (optional)
- Coverage files are still generated locally

### Performance workflow not triggering

- Ensure PR is not in draft mode
- Check that PR targets `main` branch
- Performance workflow requires PR to be "ready for review"
- Manual trigger available via GitHub Actions tab