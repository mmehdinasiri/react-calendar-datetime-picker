# Testing Guide

This directory contains all tests for the `react-calendar-datetime-picker` library.

## Test Structure

```
tests/
├── setup.ts          # Vitest setup file (shared configuration)
├── unit/             # Unit tests (Vitest)
│   └── *.test.ts     # Unit test files
└── e2e/              # End-to-end tests (Playwright)
    └── *.spec.ts     # E2E test files
```

## Unit Tests (Vitest)

Unit tests are located in `tests/unit/` and use Vitest with React Testing Library.

### Running Unit Tests

```bash
# Run all unit tests once
pnpm run test:unit

# Run unit tests in watch mode
pnpm run test:unit:watch

# Run with coverage report
pnpm run test:coverage
```

### Writing Unit Tests

Unit tests should:

- Test individual components, hooks, and utilities in isolation
- Use React Testing Library for component testing
- Mock external dependencies when necessary
- Follow the naming convention: `*.test.ts` or `*.test.tsx`

Example:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DtCalendar } from '@/components/DtCalendar'

describe('DtCalendar', () => {
  it('should render correctly', () => {
    render(<DtCalendar />)
    expect(screen.getByRole('application')).toBeInTheDocument()
  })
})
```

## E2E Tests (Playwright)

E2E tests are located in `tests/e2e/` and use Playwright to test the library in a real browser environment.

### Running E2E Tests

```bash
# Run all E2E tests
pnpm run test:e2e

# Run E2E tests with UI mode
pnpm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
pnpm run test:e2e:headed

# Debug E2E tests
pnpm run test:e2e:debug
```

### Writing E2E Tests

E2E tests should:

- Test user interactions and workflows
- Test the library as it would be used in a real application
- Use the examples app as the test environment
- Follow the naming convention: `*.spec.ts`

Example:

```typescript
import { test, expect } from '@playwright/test'

test.describe('DtPicker', () => {
  test('should open calendar on input click', async ({ page }) => {
    await page.goto('/')
    const input = page.locator('input[type="text"]').first()
    await input.click()
    await expect(page.locator('[role="dialog"]')).toBeVisible()
  })
})
```

## Running All Tests

```bash
# Run both unit and E2E tests
pnpm run test:all
```

## Test Coverage

Coverage reports are generated using Vitest's coverage provider (v8).

```bash
pnpm run test:coverage
```

Coverage reports will be available in:

- Terminal output
- `coverage/` directory (HTML report)

## Best Practices

1. **Unit Tests**: Test individual functions, components, and hooks in isolation
2. **E2E Tests**: Test complete user workflows and interactions
3. **Test Organization**: Group related tests using `describe` blocks
4. **Test Names**: Use descriptive test names that explain what is being tested
5. **Assertions**: Use appropriate matchers for clear, readable assertions
6. **Cleanup**: Ensure tests don't leave side effects or shared state

## Configuration Files

- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration
- `tests/setup.ts` - Shared test setup (cleanup, mocks, etc.)
