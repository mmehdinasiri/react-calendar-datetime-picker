# GitHub Actions Workflows

This directory contains GitHub Actions workflows for CI/CD automation.

## Workflows

### `ci.yml` - Continuous Integration

**Triggers:**

- Pull requests targeting `main` branch
- Pushes to `main` branch

**What it does:**

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

**Status Checks:**

- `test / Run Tests` - Main test job (required for merge)
- `test / Test Coverage` - Coverage job (optional, PRs only)

**Artifacts:**

- Playwright HTML report (30 days retention)
- Test results (30 days retention)

### `npm-publish.yml` - NPM Publishing

**Triggers:**

- GitHub releases
- Manual workflow dispatch

**What it does:**

- Runs tests
- Builds library
- Publishes to NPM

### `deploy-docs.yml` - Documentation Deployment

**Triggers:**

- Pushes to `main` branch

**What it does:**

- Builds and deploys documentation site

## Setting Up Branch Protection

To require tests to pass before merging:

1. Go to Repository Settings → Branches
2. Add rule for `main` branch
3. Enable "Require status checks to pass before merging"
4. Select: `test / Run Tests`
5. Optionally select: `test / Test Coverage`

See `.github/BRANCH_PROTECTION.md` for detailed instructions.

## Local Testing

You can test workflows locally using:

- [act](https://github.com/nektos/act) - Run GitHub Actions locally
- [Playwright Test Runner](https://playwright.dev/docs/test-runners) - For E2E tests

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

### Coverage not uploading

- Codecov action is optional (`fail_ci_if_error: false`)
- Requires Codecov account setup (optional)
- Coverage files are still generated locally
