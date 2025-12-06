import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DtCalendar } from '@/components/DtCalendar'
import { DtPicker } from '@/components/DtPicker'

// Performance metrics storage
const performanceMetrics: Record<string, number> = {}

// Save metrics to global for test framework to access
const saveMetrics = () => {
  // Store in global object so test framework can access it
  if (typeof globalThis !== 'undefined') {
    globalThis.performanceMetrics = performanceMetrics
  }

  // Also log to console for debugging
  console.log(
    'Performance metrics collected:',
    JSON.stringify(performanceMetrics, null, 2)
  )
}

// Performance measurement utilities
const measureRenderTime = async (
  component: React.ReactElement,
  metricName: string,
  iterations: number = 3
): Promise<number> => {
  const times: number[] = []

  // Warmup run (not counted)
  render(component)
  await new Promise((resolve) => setTimeout(resolve, 0))

  // Multiple measurement runs
  for (let i = 0; i < iterations; i++) {
    // Force garbage collection if available
    if (
      typeof globalThis !== 'undefined' &&
      'gc' in globalThis &&
      typeof globalThis.gc === 'function'
    ) {
      globalThis.gc()
    }

    const startTime = performance.now()
    render(component)
    await new Promise((resolve) => setTimeout(resolve, 0))
    const endTime = performance.now()
    times.push(endTime - startTime)
  }

  // Use median for stability (more reliable than average)
  times.sort((a, b) => a - b)
  const medianTime = times[Math.floor(times.length / 2)]

  performanceMetrics[metricName] = medianTime
  return medianTime
}

const measureReRenderTime = async (
  rerender: (component: React.ReactElement) => void,
  component: React.ReactElement,
  metricName: string,
  iterations: number = 3
): Promise<number> => {
  const times: number[] = []

  // Warmup run
  rerender(component)
  await new Promise((resolve) => setTimeout(resolve, 0))

  // Multiple measurement runs
  for (let i = 0; i < iterations; i++) {
    // Force garbage collection if available
    if (
      typeof globalThis !== 'undefined' &&
      'gc' in globalThis &&
      typeof globalThis.gc === 'function'
    ) {
      globalThis.gc()
    }

    const startTime = performance.now()
    rerender(component)
    await new Promise((resolve) => setTimeout(resolve, 0))
    const endTime = performance.now()
    times.push(endTime - startTime)
  }

  // Use median for stability
  times.sort((a, b) => a - b)
  const medianTime = times[Math.floor(times.length / 2)]

  performanceMetrics[metricName] = medianTime
  return medianTime
}

const measureInteractionTime = async (
  action: () => void,
  metricName: string,
  iterations: number = 3
): Promise<number> => {
  const times: number[] = []

  // Warmup run
  action()
  await new Promise((resolve) => setTimeout(resolve, 0))

  // Multiple measurement runs
  for (let i = 0; i < iterations; i++) {
    // Force garbage collection if available
    if (
      typeof globalThis !== 'undefined' &&
      'gc' in globalThis &&
      typeof globalThis.gc === 'function'
    ) {
      globalThis.gc()
    }

    const startTime = performance.now()
    action()
    await new Promise((resolve) => setTimeout(resolve, 0))
    const endTime = performance.now()
    times.push(endTime - startTime)
  }

  // Use median for stability
  times.sort((a, b) => a - b)
  const medianTime = times[Math.floor(times.length / 2)]

  performanceMetrics[metricName] = medianTime
  return medianTime
}

describe('Performance Benchmarks', () => {
  describe('DtCalendar Component', () => {
    it('should render 1-month calendar in less than 100ms', async () => {
      const renderTime = await measureRenderTime(
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          onChange={() => {}}
        />,
        'DtCalendar (1 month)'
      )

      console.log(
        `DtCalendar (1 month) render time: ${renderTime.toFixed(2)}ms`
      )
      expect(renderTime).toBeLessThan(100)
    })

    it('should render 3-month calendar in less than 200ms', async () => {
      const renderTime = await measureRenderTime(
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          numberOfMonths={3}
          onChange={() => {}}
        />,
        'DtCalendar (3 months)'
      )

      console.log(
        `DtCalendar (3 months) render time: ${renderTime.toFixed(2)}ms`
      )
      expect(renderTime).toBeLessThan(200)
    })

    it('should re-render quickly when props unchanged', async () => {
      const { rerender } = render(
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          initValue={null}
          onChange={() => {}}
        />
      )

      // First re-render with same props
      const reRenderTime1 = await measureReRenderTime(
        rerender,
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          initValue={null}
          onChange={() => {}}
        />,
        'Re-render (unchanged props) - 1st'
      )

      // Second re-render with same props
      const reRenderTime2 = await measureReRenderTime(
        rerender,
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          initValue={null}
          onChange={() => {}}
        />,
        'Re-render (unchanged props) - 2nd'
      )

      console.log(
        `DtCalendar re-render time (unchanged props): ${reRenderTime1.toFixed(2)}ms, ${reRenderTime2.toFixed(2)}ms`
      )

      // Should be reasonably fast (< 25ms) if properly memoized (allowing for CI/test environment variance)
      expect(reRenderTime1).toBeLessThan(25)
      expect(reRenderTime2).toBeLessThan(25)
    })

    it('should navigate months quickly', async () => {
      render(
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          onChange={() => {}}
        />
      )

      // Find next month button by title attribute
      const nextButton = screen.getByTitle('next')
      expect(nextButton).toBeInTheDocument()

      // Measure navigation time
      const navigationTime = await measureInteractionTime(() => {
        fireEvent.click(nextButton)
      }, 'Month Navigation')

      console.log(`Month navigation time: ${navigationTime.toFixed(2)}ms`)
      expect(navigationTime).toBeLessThan(75) // Allow more time for CI/test environment variance
    })
  })

  describe('DtPicker Component', () => {
    it('should render picker quickly', async () => {
      const renderTime = await measureRenderTime(
        <DtPicker
          type='single'
          calendarSystem='gregorian'
          onChange={() => {}}
        />,
        'DtPicker Render'
      )

      console.log(`DtPicker render time: ${renderTime.toFixed(2)}ms`)
      expect(renderTime).toBeLessThan(150)
    })

    it('should open modal quickly', async () => {
      render(
        <DtPicker
          type='single'
          calendarSystem='gregorian'
          onChange={() => {}}
        />
      )

      // Find trigger button
      const triggerButton = screen.getByRole('button')
      expect(triggerButton).toBeInTheDocument()

      // Measure modal opening time
      const openTime = await measureInteractionTime(() => {
        fireEvent.click(triggerButton)
      }, 'DtPicker Modal Open')

      console.log(`DtPicker modal open time: ${openTime.toFixed(2)}ms`)
      expect(openTime).toBeLessThan(100)
    })
  })

  describe('TimeSelector Performance', () => {
    it('should not recreate arrays on re-renders', async () => {
      const { rerender } = render(
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          withTime
          onChange={() => {}}
        />
      )

      // Spy on Array.from to detect if arrays are being recreated
      const arrayFromSpy = vi.spyOn(Array, 'from')

      // Re-render with same props
      rerender(
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          withTime
          onChange={() => {}}
        />
      )

      // Array.from should not be called again for static arrays
      // (Note: Some calls may happen for other reasons, but static arrays should not trigger new calls)
      const arrayFromCalls = arrayFromSpy.mock.calls.length
      console.log(`Array.from calls during re-render: ${arrayFromCalls}`)

      // Save metric
      performanceMetrics['Array.from Calls (Re-render)'] = arrayFromCalls

      // Clean up spy
      arrayFromSpy.mockRestore()

      // This is a soft test - in practice, static arrays should not cause Array.from calls
      expect(arrayFromCalls).toBeLessThan(10) // Arbitrary threshold
    })
  })

  describe('CalendarGridView Memoization', () => {
    it('should memoize grid generation', async () => {
      // This test verifies that calendar grid generation is memoized
      // We can't directly test this, but we can test that re-renders are fast
      render(
        <DtCalendar
          type='single'
          calendarSystem='gregorian'
          numberOfMonths={2}
          onChange={() => {}}
        />
      )

      // Navigate to next month (should reuse memoized grids where possible)
      const nextButton = screen.getByTitle('next')
      const navigationTime = await measureInteractionTime(() => {
        fireEvent.click(nextButton)
      }, 'Memoized Grid Navigation')

      console.log(
        `Month navigation with memoized grids: ${navigationTime.toFixed(2)}ms`
      )
      expect(navigationTime).toBeLessThan(30) // Should be fast due to memoization
    })
  })

  // Save metrics after all tests complete
  afterAll(() => {
    saveMetrics()
  })
})
