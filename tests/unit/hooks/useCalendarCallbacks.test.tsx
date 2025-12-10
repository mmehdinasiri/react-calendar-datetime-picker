import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useCalendarCallbacks } from '@/hooks/useCalendarCallbacks'
import type { Day, Range } from '@/types'

describe('useCalendarCallbacks', () => {
  const mockActions = {
    selectDate: vi.fn(),
    selectMonth: vi.fn(),
    selectYear: vi.fn(),
    setView: vi.fn(),
    navigateMonth: vi.fn(),
    goToToday: vi.fn(),
    selectPresetRange: vi.fn()
  }

  const mockCallbacks = {
    onDateSelect: vi.fn(),
    onMonthSelect: vi.fn(),
    onYearSelect: vi.fn(),
    onViewChange: vi.fn(),
    onMonthNavigate: vi.fn(),
    onGoToToday: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('handleDateSelect', () => {
    it('calls actions.selectDate and onDateSelect when provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onDateSelect: mockCallbacks.onDateSelect
        })
      )

      const testDay: Day = { year: 2023, month: 1, day: 15 }

      result.current.handleDateSelect(testDay)

      expect(mockActions.selectDate).toHaveBeenCalledWith(testDay)
      expect(mockCallbacks.onDateSelect).toHaveBeenCalledWith(testDay)
    })

    it('calls actions.selectDate but not onDateSelect when callback is not provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions
        })
      )

      const testDay: Day = { year: 2023, month: 1, day: 15 }

      result.current.handleDateSelect(testDay)

      expect(mockActions.selectDate).toHaveBeenCalledWith(testDay)
      expect(mockCallbacks.onDateSelect).not.toHaveBeenCalled()
    })

    it('is memoized and stable across renders', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onDateSelect: mockCallbacks.onDateSelect
        })
      )

      const firstHandler = result.current.handleDateSelect

      rerender()

      expect(result.current.handleDateSelect).toBe(firstHandler)
    })
  })

  describe('handleMonthSelect', () => {
    it('calls actions.selectMonth and onMonthSelect when provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onMonthSelect: mockCallbacks.onMonthSelect
        })
      )

      result.current.handleMonthSelect(6)

      expect(mockActions.selectMonth).toHaveBeenCalledWith(6)
      expect(mockCallbacks.onMonthSelect).toHaveBeenCalledWith(6)
    })

    it('calls actions.selectMonth but not onMonthSelect when callback is not provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions
        })
      )

      result.current.handleMonthSelect(6)

      expect(mockActions.selectMonth).toHaveBeenCalledWith(6)
      expect(mockCallbacks.onMonthSelect).not.toHaveBeenCalled()
    })

    it('is memoized and stable across renders', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onMonthSelect: mockCallbacks.onMonthSelect
        })
      )

      const firstHandler = result.current.handleMonthSelect

      rerender()

      expect(result.current.handleMonthSelect).toBe(firstHandler)
    })
  })

  describe('handleYearSelect', () => {
    it('calls actions.selectYear and onYearSelect when provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onYearSelect: mockCallbacks.onYearSelect
        })
      )

      result.current.handleYearSelect(2024)

      expect(mockActions.selectYear).toHaveBeenCalledWith(2024)
      expect(mockCallbacks.onYearSelect).toHaveBeenCalledWith(2024)
    })

    it('calls actions.selectYear but not onYearSelect when callback is not provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions
        })
      )

      result.current.handleYearSelect(2024)

      expect(mockActions.selectYear).toHaveBeenCalledWith(2024)
      expect(mockCallbacks.onYearSelect).not.toHaveBeenCalled()
    })

    it('is memoized and stable across renders', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onYearSelect: mockCallbacks.onYearSelect
        })
      )

      const firstHandler = result.current.handleYearSelect

      rerender()

      expect(result.current.handleYearSelect).toBe(firstHandler)
    })
  })

  describe('handleViewChange', () => {
    it('calls actions.setView and onViewChange when provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onViewChange: mockCallbacks.onViewChange
        })
      )

      result.current.handleViewChange('months')

      expect(mockActions.setView).toHaveBeenCalledWith('months')
      expect(mockCallbacks.onViewChange).toHaveBeenCalledWith('months')
    })

    it('calls actions.setView but not onViewChange when callback is not provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions
        })
      )

      result.current.handleViewChange('years')

      expect(mockActions.setView).toHaveBeenCalledWith('years')
      expect(mockCallbacks.onViewChange).not.toHaveBeenCalled()
    })

    it('is memoized and stable across renders', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onViewChange: mockCallbacks.onViewChange
        })
      )

      const firstHandler = result.current.handleViewChange

      rerender()

      expect(result.current.handleViewChange).toBe(firstHandler)
    })
  })

  describe('handleMonthNavigate', () => {
    it('calls actions.navigateMonth and onMonthNavigate when provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onMonthNavigate: mockCallbacks.onMonthNavigate
        })
      )

      result.current.handleMonthNavigate('next')

      expect(mockActions.navigateMonth).toHaveBeenCalledWith('next')
      expect(mockCallbacks.onMonthNavigate).toHaveBeenCalledWith('next')
    })

    it('calls actions.navigateMonth but not onMonthNavigate when callback is not provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions
        })
      )

      result.current.handleMonthNavigate('prev')

      expect(mockActions.navigateMonth).toHaveBeenCalledWith('prev')
      expect(mockCallbacks.onMonthNavigate).not.toHaveBeenCalled()
    })

    it('is memoized and stable across renders', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onMonthNavigate: mockCallbacks.onMonthNavigate
        })
      )

      const firstHandler = result.current.handleMonthNavigate

      rerender()

      expect(result.current.handleMonthNavigate).toBe(firstHandler)
    })
  })

  describe('handleGoToToday', () => {
    it('calls actions.goToToday and onGoToToday when provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onGoToToday: mockCallbacks.onGoToToday
        })
      )

      result.current.handleGoToToday()

      expect(mockActions.goToToday).toHaveBeenCalled()
      expect(mockCallbacks.onGoToToday).toHaveBeenCalled()
    })

    it('calls actions.goToToday but not onGoToToday when callback is not provided', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions
        })
      )

      result.current.handleGoToToday()

      expect(mockActions.goToToday).toHaveBeenCalled()
      expect(mockCallbacks.onGoToToday).not.toHaveBeenCalled()
    })

    it('is memoized and stable across renders', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          onGoToToday: mockCallbacks.onGoToToday
        })
      )

      const firstHandler = result.current.handleGoToToday

      rerender()

      expect(result.current.handleGoToToday).toBe(firstHandler)
    })
  })

  describe('handlePresetRangeSelect', () => {
    const testRange: Range = {
      from: { year: 2023, month: 1, day: 1 },
      to: { year: 2023, month: 1, day: 7 }
    }

    it('calls actions.selectPresetRange for range type', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          type: 'range'
        })
      )

      result.current.handlePresetRangeSelect(testRange)

      expect(mockActions.selectPresetRange).toHaveBeenCalledWith(testRange)
    })

    it('calls actions.selectDate with range.from for week type', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          type: 'week'
        })
      )

      result.current.handlePresetRangeSelect(testRange)

      expect(mockActions.selectDate).toHaveBeenCalledWith(testRange.from)
      expect(mockActions.selectPresetRange).not.toHaveBeenCalled()
    })

    it('does not call any actions for other types', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          type: 'single'
        })
      )

      result.current.handlePresetRangeSelect(testRange)

      expect(mockActions.selectPresetRange).not.toHaveBeenCalled()
      expect(mockActions.selectDate).not.toHaveBeenCalled()
    })

    it('defaults to single type when type is not specified', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions
        })
      )

      result.current.handlePresetRangeSelect(testRange)

      expect(mockActions.selectPresetRange).not.toHaveBeenCalled()
      expect(mockActions.selectDate).not.toHaveBeenCalled()
    })

    it('is memoized and stable across renders', () => {
      const { result, rerender } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions,
          type: 'range'
        })
      )

      const firstHandler = result.current.handlePresetRangeSelect

      rerender()

      expect(result.current.handlePresetRangeSelect).toBe(firstHandler)
    })
  })

  describe('all handlers are returned', () => {
    it('returns all expected callback handlers', () => {
      const { result } = renderHook(() =>
        useCalendarCallbacks({
          actions: mockActions
        })
      )

      expect(result.current).toHaveProperty('handleDateSelect')
      expect(result.current).toHaveProperty('handleMonthSelect')
      expect(result.current).toHaveProperty('handleYearSelect')
      expect(result.current).toHaveProperty('handleViewChange')
      expect(result.current).toHaveProperty('handleMonthNavigate')
      expect(result.current).toHaveProperty('handleGoToToday')
      expect(result.current).toHaveProperty('handlePresetRangeSelect')

      expect(typeof result.current.handleDateSelect).toBe('function')
      expect(typeof result.current.handleMonthSelect).toBe('function')
      expect(typeof result.current.handleYearSelect).toBe('function')
      expect(typeof result.current.handleViewChange).toBe('function')
      expect(typeof result.current.handleMonthNavigate).toBe('function')
      expect(typeof result.current.handleGoToToday).toBe('function')
      expect(typeof result.current.handlePresetRangeSelect).toBe('function')
    })
  })
})
