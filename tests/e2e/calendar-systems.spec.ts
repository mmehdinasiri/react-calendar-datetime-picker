import { test, expect } from '@playwright/test'

test.describe('Calendar Systems', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Jalali Calendar System', () => {
    test('should render Jalali calendar correctly', async ({ page }) => {
      // The example app uses calendarSystem='jalali' for DtPicker
      const pickerInput = page
        .locator(
          'input[aria-label="Select date"], input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Jalali calendar should have RTL direction
      // Check the calendar-core inside the modal (which has the dir attribute)
      const calendarCore = calendarModal.locator('.calendar-core').first()
      await expect(calendarCore).toBeVisible()
      const dir = await calendarCore.getAttribute('dir')
      expect(dir).toBe('rtl')
    })

    test('should display Jalali month names', async ({ page }) => {
      const pickerInput = page
        .locator(
          'input[aria-label="Select date"], input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Check month/year header exists
      const monthYearButton = page.locator('.calendar-month-btn').first()
      await expect(monthYearButton).toBeVisible()
    })

    test('should navigate Jalali months correctly', async ({ page }) => {
      const pickerInput = page
        .locator(
          'input[aria-label="Select date"], input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Get current month
      const monthLabel = page.locator('.calendar-month-btn').first()
      const currentMonthText = await monthLabel.textContent()

      // Navigate to next month
      const nextButton = page
        .locator('[role="dialog"] .calendar-nav-btn.calendar-nav-next')
        .first()
      await nextButton.click()

      // Month should have changed
      const newMonthLabel = page.locator('.calendar-month-btn').first()
      const newMonthText = await newMonthLabel.textContent()
      expect(newMonthText).not.toBe(currentMonthText)
    })
  })

  test.describe('Gregorian Calendar System', () => {
    test('should render Gregorian calendar correctly', async ({ page }) => {
      // DtCalendar uses default gregorian
      const calendarSection = page.locator('section.example-section').nth(1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()

      // Gregorian calendar should have LTR direction (or no dir attribute)
      const calendarContainer = calendarSection
        .locator('.react-calendar-datetime-picker')
        .first()
      const dir = await calendarContainer.getAttribute('dir')
      // Gregorian might not have dir attribute or should be 'ltr'
      expect(dir === null || dir === 'ltr').toBeTruthy()
    })

    test('should display Gregorian month names', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      const monthYearButton = calendarSection
        .locator('.calendar-month-btn')
        .first()
      await expect(monthYearButton).toBeVisible()
    })
  })

  test.describe('Calendar System Switching', () => {
    test('should handle different calendar systems in same page', async ({
      page
    }) => {
      // Page should have both Jalali (DtPicker) and Gregorian (DtCalendar)
      const pickerSection = page.locator('section.example-section').first()
      const calendarSection = page.locator('section.example-section').nth(1)

      await expect(pickerSection).toBeVisible()
      await expect(calendarSection).toBeVisible()

      // Both should render correctly
      const pickerInput = pickerSection
        .locator(
          'input[aria-label="Select date"], input[placeholder*="Select"]'
        )
        .first()
      await expect(pickerInput).toBeVisible()

      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()
    })
  })
})
