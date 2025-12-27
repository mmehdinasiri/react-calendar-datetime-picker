# Playwright E2E Tests

This directory contains end-to-end tests for the React Calendar DateTime Picker library using Playwright.

## Test Structure

The tests are organized into the following files:

- **`example.spec.ts`** - Basic smoke tests to verify the setup is working
- **`dtpicker.spec.ts`** - Tests for the DtPicker component (date picker with input field)
- **`dtcalendar.spec.ts`** - Tests for the DtCalendar component (standalone calendar)
- **`calendar-systems.spec.ts`** - Tests for different calendar systems (Gregorian, Jalali)
- **`calendar-features.spec.ts`** - Tests for various calendar features (navigation, today button, etc.)
- **`integration.spec.ts`** - Integration tests covering full user flows and edge cases
- **`test-helpers.ts`** - Utility functions for common test operations

## Running Tests

### Run all E2E tests

```bash
pnpm run test:e2e
```

### Run tests in UI mode (interactive)

```bash
pnpm run test:e2e:ui
```

### Run tests in headed mode (see browser)

```bash
pnpm run test:e2e:headed
```

### Run tests in debug mode

```bash
pnpm run test:e2e:debug
```

### Run a specific test file

```bash
npx playwright test tests/e2e/dtpicker.spec.ts
```

### Run tests matching a pattern

```bash
npx playwright test --grep "should open calendar modal"
```

## Test Coverage

### DtPicker Component Tests

- ✅ Basic rendering and visibility
- ✅ Placeholder text display
- ✅ Opening/closing calendar modal
- ✅ Keyboard interactions (Enter key)
- ✅ Date selection and input value updates
- ✅ Clear button functionality
- ✅ Calendar navigation (prev/next month)
- ✅ View switching (calendar → month → year)
- ✅ Date highlighting
- ✅ Accessibility (ARIA attributes, keyboard navigation)

### DtCalendar Component Tests

- ✅ Basic rendering and calendar grid display
- ✅ Month/year header display
- ✅ Weekday headers
- ✅ Date selection
- ✅ Date highlighting
- ✅ Calendar navigation
- ✅ View switching
- ✅ Month/year selection
- ✅ Today button
- ✅ Accessibility

### Calendar Systems Tests

- ✅ Jalali calendar rendering (RTL)
- ✅ Gregorian calendar rendering (LTR)
- ✅ Month navigation in different systems
- ✅ Multiple calendar systems on same page

### Calendar Features Tests

- ✅ Today button functionality
- ✅ Weekend display
- ✅ Date constraints (disabled dates)
- ✅ Month navigation through multiple months
- ✅ View switching (calendar ↔ month ↔ year)
- ✅ Keyboard navigation
- ✅ Result display updates

### Integration Tests

- ✅ Full user flow (open → navigate → select)
- ✅ Multiple components on same page
- ✅ Independent state management
- ✅ Error handling (rapid clicking, navigation during selection)
- ✅ Responsive behavior (mobile, tablet)

## Test Helpers

The `test-helpers.ts` file provides utility functions to simplify test writing:

- `waitForCalendarModal(page)` - Wait for calendar modal to be visible
- `getSelectableDay(calendarGrid)` - Get a selectable day from calendar
- `selectDay(calendarGrid, dayIndex)` - Select a day in the calendar
- `navigateToNextMonth(container)` - Navigate to next month
- `navigateToPreviousMonth(container)` - Navigate to previous month
- `switchToMonthView(container)` - Switch to month selection view
- `switchToYearView(container)` - Switch to year selection view
- `getPickerInput(page)` - Get the picker input element
- `openPickerModal(page)` - Open the picker modal
- `getCalendarSection(page, index)` - Get calendar section by index
- `waitForResultDisplay(container)` - Wait for result display to appear

## Writing New Tests

When writing new tests:

1. **Use test helpers** - Leverage the helper functions in `test-helpers.ts` for common operations
2. **Use semantic selectors** - Prefer ARIA attributes (`role`, `aria-label`) over CSS classes
3. **Wait for elements** - Always wait for elements to be visible before interacting
4. **Test user flows** - Focus on testing actual user interactions rather than implementation details
5. **Keep tests independent** - Each test should be able to run independently
6. **Use descriptive test names** - Test names should clearly describe what is being tested

### Example Test

```typescript
import { test, expect } from '@playwright/test'
import { openPickerModal, selectDay } from './test-helpers'

test('should select a date and close modal', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const modal = await openPickerModal(page)
  const calendarGrid = modal.locator('[role="grid"]').first()

  await selectDay(calendarGrid)

  await expect(modal).not.toBeVisible({ timeout: 2000 })
})
```

## Debugging Tests

### View Test Execution

```bash
pnpm run test:e2e:ui
```

### Debug a Specific Test

```bash
pnpm run test:e2e:debug -- tests/e2e/dtpicker.spec.ts
```

### Take Screenshots on Failure

Screenshots are automatically taken on test failure. They are saved in `test-results/` directory.

### View Test Traces

Traces are collected on first retry. View them with:

```bash
npx playwright show-trace test-results/trace.zip
```

## CI/CD

Tests run automatically in CI environments. The Playwright config includes:

- Automatic retries (2 retries on CI)
- HTML report generation
- GitHub Actions integration
- Automatic dev server startup

## Troubleshooting

### Tests Fail to Start

- Ensure the examples app dependencies are installed: `cd examples && pnpm install`
- Check that port 3000 is available
- Verify the library is built: `pnpm run build`

### Flaky Tests

- Increase timeouts for slow operations
- Use `waitFor` instead of fixed `waitForTimeout`
- Ensure elements are fully loaded before interacting

### Modal Not Opening

- Check that the picker input is visible and clickable
- Verify the calendar modal selector matches the component structure
- Check browser console for errors

## Best Practices

1. **Isolation** - Each test should be independent and not rely on other tests
2. **Cleanup** - Tests should clean up after themselves (though Playwright handles this)
3. **Selectors** - Use stable selectors (ARIA attributes, test IDs) over CSS classes
4. **Timeouts** - Use appropriate timeouts for async operations
5. **Assertions** - Make assertions specific and meaningful
6. **Documentation** - Comment complex test logic
