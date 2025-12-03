import { describe, it, expect } from 'vitest'

/**
 * Example unit test to verify Vitest setup is working correctly
 */
describe('Example Test Suite', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should handle string operations', () => {
    const str = 'Hello, World!'
    expect(str).toContain('World')
    expect(str.length).toBeGreaterThan(0)
  })
})

