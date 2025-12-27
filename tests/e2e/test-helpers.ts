import { Page, Locator } from '@playwright/test'

/**
 * Test helper utilities for calendar component tests
 */

/**
 * Wait for calendar modal to be visible
 */
export async function waitForCalendarModal(page: Page): Promise<Locator> {
  const modal = page.locator('[role="dialog"]').first()
  await modal.waitFor({ state: 'visible' })
  return modal
}

/**
 * Get a selectable day from the calendar grid
 */
export async function getSelectableDay(
  calendarGrid: Locator
): Promise<Locator> {
  return calendarGrid
    .locator(
      'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
    )
    .first()
}

/**
 * Click on a selectable day in the calendar
 */
export async function selectDay(
  calendarGrid: Locator,
  dayIndex: number = 0
): Promise<void> {
  const selectableDays = calendarGrid.locator(
    'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
  )
  await selectableDays.nth(dayIndex).click()
}

/**
 * Navigate to next month
 */
export async function navigateToNextMonth(container: Locator): Promise<void> {
  const nextButton = container
    .locator('.calendar-nav-btn.calendar-nav-next')
    .first()
  await nextButton.click()
}

/**
 * Navigate to previous month
 */
export async function navigateToPreviousMonth(
  container: Locator
): Promise<void> {
  const prevButton = container
    .locator('.calendar-nav-btn.calendar-nav-prev')
    .first()
  await prevButton.click()
}

/**
 * Switch to month view
 */
export async function switchToMonthView(container: Locator): Promise<Locator> {
  const monthButton = container.locator('.calendar-month-btn').first()
  await monthButton.click()

  const monthGrid = container.locator('.calendar-months[role="grid"]').first()
  await monthGrid.waitFor({ state: 'visible' })
  return monthGrid
}

/**
 * Switch to year view
 */
export async function switchToYearView(container: Locator): Promise<Locator> {
  // First click month button to go to month view, then click year button
  const monthButton = container.locator('.calendar-month-btn').first()
  await monthButton.click()

  // Wait a bit for month view to appear (use a small delay)
  await new Promise((resolve) => setTimeout(resolve, 200))

  // Then click year button to go to year view
  const yearButton = container.locator('.calendar-year-btn').first()
  await yearButton.click()

  const yearGrid = container.locator('.calendar-years[role="grid"]').first()
  await yearGrid.waitFor({ state: 'visible' })
  return yearGrid
}

/**
 * Get the picker input element
 * Supports both new test IDs and legacy selectors
 */
export async function getPickerInput(
  page: Page,
  testId: string = 'dtpicker-basic-container'
): Promise<Locator> {
  // Try test ID first (new test app)
  const testIdContainer = page.locator(`[data-testid="${testId}"]`)
  const testIdInput = testIdContainer.locator('input[aria-label*="Select"], input[placeholder*="Select"]').first()
  
  // Fallback to legacy selector for backward compatibility
  return testIdInput.or(
    page.locator('input[aria-label="Select date"], input[placeholder*="Select"]').first()
  )
}

/**
 * Open calendar picker modal
 */
export async function openPickerModal(page: Page): Promise<Locator> {
  const pickerInput = await getPickerInput(page)
  await pickerInput.click()
  return await waitForCalendarModal(page)
}

/**
 * Get calendar section by test ID
 * Supports both new test IDs and legacy selectors for backward compatibility
 */
export function getCalendarSection(
  page: Page,
  testId: string = 'dtpicker-basic-section'
): Locator {
  // Try test ID first (new test app)
  const testIdSelector = `[data-testid="${testId}"]`
  const testIdSection = page.locator(testIdSelector)
  
  // Fallback to legacy selector for backward compatibility
  // This allows tests to work with both old and new app structure
  return testIdSection.or(page.locator('section.test-section').first())
}

/**
 * Get DtPicker section by type
 */
export function getDtPickerSection(page: Page, type: 'basic' | 'gregorian' | 'jalali' | 'range' = 'basic'): Locator {
  return page.locator(`[data-testid="dtpicker-${type}-section"]`)
}

/**
 * Get DtCalendar section by type
 */
export function getDtCalendarSection(page: Page, type: 'basic' | 'gregorian' | 'jalali' = 'basic'): Locator {
  return page.locator(`[data-testid="dtcalendar-${type}-section"]`)
}

/**
 * Get picker input by test ID
 */
export function getPickerInputByTestId(page: Page, testId: string = 'dtpicker-basic'): Locator {
  const container = page.locator(`[data-testid="${testId}"]`)
  return container.locator('input[aria-label*="Select"], input[placeholder*="Select"]').first()
}

/**
 * Wait for result display to show selected date
 * Supports both new test IDs and legacy selectors
 */
export async function waitForResultDisplay(
  container: Locator,
  testId?: string
): Promise<Locator> {
  if (testId) {
    const resultDisplay = container.locator(`[data-testid="${testId}"]`)
    await resultDisplay.waitFor({ state: 'visible', timeout: 2000 })
    return resultDisplay
  }
  
  // Legacy selector for backward compatibility
  const resultDisplay = container
    .locator('.test-result, .result-display')
    .filter({ hasText: 'Selected Date' })
  await resultDisplay.waitFor({ state: 'visible', timeout: 2000 })
  return resultDisplay
}
