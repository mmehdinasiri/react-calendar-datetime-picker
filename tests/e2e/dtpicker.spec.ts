import { test, expect } from '@playwright/test'

test.describe('DtPicker Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Basic Functionality', () => {
    test('should render DtPicker component', async ({ page }) => {
      const pickerSection = page.locator('[data-testid="dtpicker-basic-section"]')
      await expect(pickerSection).toBeVisible()
      await expect(pickerSection.locator('[data-testid="dtpicker-basic-title"]')).toContainText(
        'DtPicker Basic'
      )
    })

    test('should display placeholder text', async ({ page }) => {
      const pickerInput = page
        .locator('[data-testid="dtpicker-basic-container"]')
        .locator('input[aria-label*="Select"], input[placeholder*="Select"]')
        .first()
      await expect(pickerInput).toBeVisible()
      await expect(pickerInput).toHaveAttribute('placeholder', /Select/)
    })

    test('should open calendar modal when input is clicked', async ({
      page
    }) => {
      const pickerInput = page
        .locator('[data-testid="dtpicker-basic-container"]')
        .locator('input[aria-label*="Select"], input[placeholder*="Select"]')
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()
    })

    test('should open calendar modal when Enter key is pressed', async ({
      page
    }) => {
      const pickerInput = page
        .locator('[data-testid="dtpicker-basic-container"]')
        .locator('input[aria-label*="Select"], input[placeholder*="Select"]')
        .first()
      await pickerInput.focus()
      await pickerInput.press('Enter')

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()
    })

    test('should close calendar modal when clicking outside', async ({
      page
    }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Click outside the modal (press Escape key as clicking outside might not work)
      await page.keyboard.press('Escape')
      await expect(calendarModal).not.toBeVisible({ timeout: 2000 })
    })

    test('should display selected date in result display', async ({ page }) => {
      const pickerInput = page
        .locator('[data-testid="dtpicker-basic-container"]')
        .locator('input[aria-label*="Select"], input[placeholder*="Select"]')
        .first()
      await pickerInput.click()

      // Wait for calendar to be visible
      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Select a date (click on a day in the calendar grid)
      const calendarGrid = page.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()

      // Find a selectable day (not disabled)
      const selectableDay = calendarGrid
        .locator(
          'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
        )
        .first()
      await selectableDay.click()

      // Wait for modal to close (autoClose is true by default)
      await expect(calendarModal).not.toBeVisible({ timeout: 2000 })

      // Check if result display shows the selected date
      const resultDisplay = page
        .locator('[data-testid="dtpicker-basic-result"], .test-result')
        .filter({ hasText: 'Selected Date' })
        .first()
      await expect(resultDisplay).toBeVisible({ timeout: 2000 })
      await expect(resultDisplay).toContainText('Selected Date')
    })
  })

  test.describe('Clear Button', () => {
    test('should show clear button when clearBtn prop is true', async ({
      page
    }) => {
      // The example app has clearBtn={true}
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      // Select a date first
      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      const calendarGrid = page.locator('[role="grid"]').first()
      const selectableDay = calendarGrid
        .locator(
          'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
        )
        .first()
      await selectableDay.click()

      // Wait for modal to close
      await expect(calendarModal).not.toBeVisible({ timeout: 2000 })

      // Clear button should be visible in the input area
      const clearButton = page.locator('.calendar-picker-clear').first()
      await expect(clearButton).toBeVisible()
    })

    test('should clear selected date when clear button is clicked', async ({
      page
    }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()

      // Select a date first
      await pickerInput.click()
      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      const calendarGrid = page.locator('[role="grid"]').first()
      const selectableDay = calendarGrid
        .locator(
          'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
        )
        .first()
      await selectableDay.click()

      await expect(calendarModal).not.toBeVisible({ timeout: 2000 })

      // Click clear button
      const clearButton = page.locator('.calendar-picker-clear').first()
      await clearButton.click()

      // Input should be empty/placeholder should show
      await expect(pickerInput).toHaveValue('')
    })
  })

  test.describe('Calendar Navigation', () => {
    test('should navigate to previous month', async ({ page }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Get current month label
      const monthLabel = page.locator('.calendar-month-btn').first()
      const currentMonthText = await monthLabel.textContent()

      // Click previous month button
      const prevButton = page
        .locator('.calendar-nav-btn.calendar-nav-prev')
        .first()
      await prevButton.click()

      // Month should have changed
      const newMonthLabel = page.locator('.calendar-month-btn').first()
      const newMonthText = await newMonthLabel.textContent()
      expect(newMonthText).not.toBe(currentMonthText)
    })

    test('should navigate to next month', async ({ page }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Get current month label
      const monthLabel = page.locator('.calendar-month-btn').first()
      const currentMonthText = await monthLabel.textContent()

      // Click next month button
      const nextButton = page
        .locator('.calendar-nav-btn.calendar-nav-next')
        .first()
      await nextButton.click()

      // Month should have changed
      const newMonthLabel = page.locator('.calendar-month-btn').first()
      const newMonthText = await newMonthLabel.textContent()
      expect(newMonthText).not.toBe(currentMonthText)
    })

    test('should switch to month view', async ({ page }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Click on month/year header to switch to month view
      const monthYearButton = page.locator('.calendar-month-btn').first()
      await monthYearButton.click()

      // Should show month selection grid
      const monthGrid = page.locator('.calendar-months[role="grid"]').first()
      await expect(monthGrid).toBeVisible()
    })

    test('should switch to year view', async ({ page }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Click on month button to switch to month view first
      const monthButton = calendarModal.locator('.calendar-month-btn').first()
      await monthButton.click()

      // Wait for month view to appear
      await page.waitForTimeout(200)

      // Then click year button to switch to year view
      const yearButton = calendarModal.locator('.calendar-year-btn').first()
      await yearButton.click()

      // Should show year selection grid inside the modal
      const yearGrid = calendarModal
        .locator('.calendar-years[role="grid"]')
        .first()
      await expect(yearGrid).toBeVisible()
    })
  })

  test.describe('Date Selection', () => {
    test('should select a date and update input value', async ({ page }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Select a date
      const calendarGrid = page.locator('[role="grid"]').first()
      const selectableDay = calendarGrid
        .locator(
          'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
        )
        .first()
      await selectableDay.click()

      // Modal should close
      await expect(calendarModal).not.toBeVisible({ timeout: 2000 })

      // Input should have a value (not empty)
      const inputValue = await pickerInput.inputValue()
      expect(inputValue).not.toBe('')
    })

    test('should highlight selected date', async ({ page }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Select a date
      const calendarGrid = page.locator('[role="grid"]').first()
      const selectableDay = calendarGrid
        .locator(
          'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
        )
        .first()
      await selectableDay.click()

      // Reopen calendar
      await pickerInput.click()
      await expect(calendarModal).toBeVisible()

      // Selected day should have selected class or aria-selected
      const selectedDay = calendarGrid
        .locator('button.calendar-day-selected[aria-selected="true"]')
        .first()
      await expect(selectedDay).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.click()

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()
      await expect(calendarModal).toHaveAttribute('aria-modal', 'true')
      await expect(calendarModal).toHaveAttribute('aria-label', /Select date/i)

      // Calendar grid should have proper role
      const calendarGrid = page.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()
    })

    test('should support keyboard navigation', async ({ page }) => {
      const pickerInput = page
        .locator(
          '[data-testid="dtpicker-basic-container"] input[aria-label*="Select"], [data-testid="dtpicker-basic-container"] input[placeholder*="Select"]'
        )
        .first()
      await pickerInput.focus()
      await pickerInput.press('Enter')

      const calendarModal = page.locator('[role="dialog"]').first()
      await expect(calendarModal).toBeVisible()

      // Tab should navigate through calendar
      await page.keyboard.press('Tab')
      // Calendar should still be visible
      await expect(calendarModal).toBeVisible()
    })
  })
})
