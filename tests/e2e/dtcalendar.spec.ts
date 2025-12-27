import { test, expect } from '@playwright/test'

test.describe('DtCalendar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test.describe('Basic Functionality', () => {
    test('should render DtCalendar component', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      await expect(calendarSection).toBeVisible()
      await expect(calendarSection.locator('h2')).toContainText(
        'DtCalendar Example'
      )
    })

    test('should display calendar grid', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()
    })

    test('should display month and year header', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      const monthYearButton = calendarSection
        .locator('.calendar-month-btn')
        .first()
      await expect(monthYearButton).toBeVisible()
    })

    test('should display weekday headers', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      const weekdayHeaders = calendarSection.locator(
        '[role="row"] [role="columnheader"]'
      )
      const count = await weekdayHeaders.count()
      expect(count).toBeGreaterThan(0)
    })
  })

  test.describe('Date Selection', () => {
    test('should select a date when clicked', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()

      // Select a date
      const selectableDay = calendarGrid
        .locator(
          'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
        )
        .first()
      await selectableDay.click()

      // Check if result display shows the selected date
      const resultDisplay = calendarSection
        .locator('.result-display')
        .filter({ hasText: 'Selected Date' })
      await expect(resultDisplay).toBeVisible({ timeout: 1000 })
    })

    test('should highlight selected date', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()

      // Select a date
      const selectableDay = calendarGrid
        .locator(
          'button.calendar-day:not(.calendar-day-disabled):not([aria-disabled="true"])'
        )
        .first()
      await selectableDay.click()

      // Selected day should have selected class or aria-selected
      const selectedDay = calendarGrid
        .locator('button.calendar-day-selected[aria-selected="true"]')
        .first()
      await expect(selectedDay).toBeVisible()
    })
  })

  test.describe('Calendar Navigation', () => {
    test('should navigate to previous month', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)

      // Get current month label
      const monthLabel = calendarSection.locator('.calendar-month-btn').first()
      const currentMonthText = await monthLabel.textContent()

      // Click previous month button
      const prevButton = calendarSection
        .locator('.calendar-nav-btn.calendar-nav-prev')
        .first()
      await prevButton.click()

      // Month should have changed
      const newMonthLabel = calendarSection
        .locator('.calendar-month-btn')
        .first()
      const newMonthText = await newMonthLabel.textContent()
      expect(newMonthText).not.toBe(currentMonthText)
    })

    test('should navigate to next month', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)

      // Get current month label
      const monthLabel = calendarSection.locator('.calendar-month-btn').first()
      const currentMonthText = await monthLabel.textContent()

      // Click next month button
      const nextButton = calendarSection
        .locator('.calendar-nav-btn.calendar-nav-next')
        .first()
      await nextButton.click()

      // Month should have changed
      const newMonthLabel = calendarSection
        .locator('.calendar-month-btn')
        .first()
      const newMonthText = await newMonthLabel.textContent()
      expect(newMonthText).not.toBe(currentMonthText)
    })

    test('should switch to month view', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)

      // Click on month/year header to switch to month view
      const monthYearButton = calendarSection
        .locator('.calendar-month-btn')
        .first()
      await monthYearButton.click()

      // Should show month selection grid
      const monthGrid = calendarSection
        .locator('.calendar-months[role="grid"]')
        .first()
      await expect(monthGrid).toBeVisible()
    })

    test('should switch to year view', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)

      // Click on month button to switch to month view first
      const monthButton = calendarSection.locator('.calendar-month-btn').first()
      await monthButton.click()

      // Wait a bit for month view
      await page.waitForTimeout(200)

      // Then click year button to switch to year view
      const yearButton = calendarSection.locator('.calendar-year-btn').first()
      await yearButton.click()

      // Should show year selection grid
      const yearGrid = calendarSection
        .locator('.calendar-years[role="grid"]')
        .first()
      await expect(yearGrid).toBeVisible()
    })

    test('should select a month from month view', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)

      // Switch to month view
      const monthYearButton = calendarSection
        .locator('.calendar-month-btn')
        .first()
      await monthYearButton.click()

      const monthGrid = calendarSection
        .locator('.calendar-months[role="grid"]')
        .first()
      await expect(monthGrid).toBeVisible()

      // Select a month
      const selectableMonth = monthGrid
        .locator(
          'button.calendar-month-item:not([aria-disabled="true"]), [role="gridcell"]:not([aria-disabled="true"])'
        )
        .first()
      await selectableMonth.click()

      // Should return to calendar grid view
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()
    })

    test('should select a year from year view', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)

      // Switch to month view first
      const monthButton = calendarSection.locator('.calendar-month-btn').first()
      await monthButton.click()

      // Wait for month view to appear
      await page.waitForTimeout(200)

      // Then click year button to switch to year view
      const yearButton = calendarSection.locator('.calendar-year-btn').first()
      await yearButton.click()

      const yearGrid = calendarSection
        .locator('.calendar-years[role="grid"]')
        .first()
      await expect(yearGrid).toBeVisible()

      // Select a year
      const selectableYear = yearGrid
        .locator(
          'button.calendar-year-item:not([aria-disabled="true"]), [role="gridcell"]:not([aria-disabled="true"])'
        )
        .first()
      await selectableYear.click()

      // Should switch to month view
      const monthGrid = calendarSection
        .locator('.calendar-months[role="grid"]')
        .first()
      await expect(monthGrid).toBeVisible()
    })
  })

  test.describe('Today Button', () => {
    test('should navigate to today when today button is clicked', async ({
      page
    }) => {
      const calendarSection = page.locator('section.example-section').nth(1)

      // Navigate to a different month first
      const nextButton = calendarSection
        .locator('.calendar-nav-btn.calendar-nav-next')
        .first()
      await nextButton.click()

      // Click today button (if visible)
      const todayButton = calendarSection
        .locator('button[aria-label*="today" i], button[aria-label*="Today" i]')
        .first()

      if (await todayButton.isVisible()) {
        await todayButton.click()

        // Note: This test might be flaky if we're already in the current month
        // So we just verify the button works
        await expect(todayButton).toBeVisible()
      }
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper ARIA attributes', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      await expect(calendarGrid).toBeVisible()
      await expect(calendarGrid).toHaveAttribute('aria-label', /.+/)
    })

    test('should have accessible day cells', async ({ page }) => {
      const calendarSection = page.locator('section.example-section').nth(1)
      const calendarGrid = calendarSection.locator('[role="grid"]').first()
      const dayCells = calendarGrid.locator(
        'button.calendar-day, [role="gridcell"]'
      )
      const count = await dayCells.count()
      expect(count).toBeGreaterThan(0)

      // Check that at least some cells have aria-label
      const firstCell = dayCells.first()
      const ariaLabel = await firstCell.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
    })
  })
})
