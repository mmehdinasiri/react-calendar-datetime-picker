import { test, expect } from '@playwright/test'

/**
 * Example E2E test to verify Playwright setup is working correctly
 */
test.describe('Example E2E Test Suite', () => {
  test('should load the examples page', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Check if the header is visible
    const header = page.locator('h1').first()
    await expect(header).toBeVisible()
    
    // Check if header contains expected text
    await expect(header).toContainText('React Calendar DateTime Picker')
  })

  test('should have a working page title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/React Calendar/i)
  })
})

