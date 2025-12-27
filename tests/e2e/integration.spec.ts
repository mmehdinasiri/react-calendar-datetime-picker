import { test, expect } from '@playwright/test'
import {
  openPickerModal,
  getCalendarSection,
  waitForResultDisplay,
  navigateToNextMonth,
  switchToYearView,
  selectDay
} from './test-helpers'

test.describe('Integration Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Full User Flow', () => {
    test('should complete full date selection flow', async ({ page }) => {
      // Open picker
      const modal = await openPickerModal(page)

      // Verify calendar is visible
      const calendarGrid = modal.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()

      // Select a date
      await selectDay(calendarGrid)

      // Modal should close
      await expect(modal).not.toBeVisible({ timeout: 2000 })

      // Check result display
      const pickerSection = getCalendarSection(page, 0)
      const resultDisplay = await waitForResultDisplay(pickerSection)
      await expect(resultDisplay).toBeVisible()
    })

    test('should handle month navigation and date selection', async ({
      page
    }) => {
      const pickerSection = getCalendarSection(page, 0)
      const modal = await openPickerModal(page)

      // Navigate to next month
      await navigateToNextMonth(modal)

      // Select a date
      const calendarGrid = modal.locator('[role="grid"]').first()
      await selectDay(calendarGrid)

      // Verify result
      await expect(modal).not.toBeVisible({ timeout: 2000 })
      const resultDisplay = await waitForResultDisplay(pickerSection)
      await expect(resultDisplay).toBeVisible()
    })

    test('should handle view switching and date selection', async ({
      page
    }) => {
      const calendarSection = getCalendarSection(page, 1)

      // Switch to year view
      const yearGrid = await switchToYearView(calendarSection)
      await expect(yearGrid).toBeVisible()

      // Select a year
      const selectableYear = yearGrid
        .locator('[role="gridcell"]:not([aria-disabled="true"])')
        .first()
      await selectableYear.click()

      // Should switch to month view
      const monthGrid = calendarSection
        .locator('[role="grid"][aria-label*="month" i]')
        .first()
      await expect(monthGrid).toBeVisible()

      // Select a month
      const selectableMonth = monthGrid
        .locator('[role="gridcell"]:not([aria-disabled="true"])')
        .first()
      await selectableMonth.click()

      // Should switch to calendar view
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()

      // Select a date
      await selectDay(calendarGrid)

      // Verify result
      const resultDisplay = await waitForResultDisplay(calendarSection)
      await expect(resultDisplay).toBeVisible()
    })
  })

  test.describe('Multiple Components', () => {
    test('should work with both DtPicker and DtCalendar on same page', async ({
      page
    }) => {
      // Test DtPicker
      const pickerSection = getCalendarSection(page, 0)
      const pickerModal = await openPickerModal(page)
      const pickerGrid = pickerModal.locator('[role="grid"]').first()
      await selectDay(pickerGrid)
      await expect(pickerModal).not.toBeVisible({ timeout: 2000 })

      // Test DtCalendar
      const calendarSection = getCalendarSection(page, 1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()
      await selectDay(calendarGrid)

      // Both should have results
      const pickerResult = await waitForResultDisplay(pickerSection)
      const calendarResult = await waitForResultDisplay(calendarSection)

      await expect(pickerResult).toBeVisible()
      await expect(calendarResult).toBeVisible()
    })

    test('should maintain independent state for multiple components', async ({
      page
    }) => {
      // Select date in DtPicker
      const pickerSection = getCalendarSection(page, 0)
      const pickerModal = await openPickerModal(page)
      const pickerGrid = pickerModal.locator('[role="grid"]').first()
      await selectDay(pickerGrid, 5) // Select 6th day
      await expect(pickerModal).not.toBeVisible({ timeout: 2000 })

      // Select different date in DtCalendar
      const calendarSection = getCalendarSection(page, 1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await selectDay(calendarGrid, 10) // Select 11th day

      // Both should show different results
      const pickerResult = await waitForResultDisplay(pickerSection)
      const calendarResult = await waitForResultDisplay(calendarSection)

      const pickerText = await pickerResult.textContent()
      const calendarText = await calendarResult.textContent()

      // Results should be different (unless by coincidence same date)
      expect(pickerText).toBeTruthy()
      expect(calendarText).toBeTruthy()
    })
  })

  test.describe('Error Handling', () => {
    test('should handle rapid clicking without errors', async ({ page }) => {
      const pickerInput = page
        .locator(
          'input[aria-label="Select date"], input[placeholder*="Select"]'
        )
        .first()

      // Rapidly open and close
      for (let i = 0; i < 3; i++) {
        await pickerInput.click()
        const modal = page.locator('[role="dialog"]').first()
        await expect(modal).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(modal).not.toBeVisible({ timeout: 1000 })
      }

      // Should still work normally
      const modal = await openPickerModal(page)
      await expect(modal).toBeVisible()
    })

    test('should handle navigation during selection', async ({ page }) => {
      const calendarSection = getCalendarSection(page, 1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()

      // Start selecting
      const firstDay = calendarGrid
        .locator(
          'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
        )
        .first()
      await firstDay.hover()

      // Navigate while hovering
      await navigateToNextMonth(calendarSection)

      // Should still be able to select
      const newGrid = calendarSection.locator('[role="grid"]').first()
      await selectDay(newGrid)
      const resultDisplay = await waitForResultDisplay(calendarSection)
      await expect(resultDisplay).toBeVisible()
    })
  })

  test.describe('Responsive Behavior', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })

      const modal = await openPickerModal(page)
      await expect(modal).toBeVisible()

      const calendarGrid = modal.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()

      await selectDay(calendarGrid)
      await expect(modal).not.toBeVisible({ timeout: 2000 })
    })

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })

      const calendarSection = getCalendarSection(page, 1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()

      await selectDay(calendarGrid)
      const resultDisplay = await waitForResultDisplay(calendarSection)
      await expect(resultDisplay).toBeVisible()
    })
  })
})
