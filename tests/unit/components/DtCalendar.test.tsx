import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { DtCalendar } from '@/components/DtCalendar'

// Mock dependencies
vi.mock('@/components/CalendarCore', () => ({
  CalendarCore: ({
    selectedValue,
    locale,
    type,
    onDateSelect,
    onViewChange,
    onMonthNavigate,
    onMonthSelect,
    onYearSelect,
    onGoToToday
  }: any) => (
    <div data-testid='calendar-core'>
      <span data-testid='core-locale'>{locale}</span>
      <span data-testid='core-type'>{type}</span>
      <span data-testid='core-value'>{JSON.stringify(selectedValue)}</span>
      <button
        data-testid='core-select-date'
        onClick={() => onDateSelect?.({ year: 2023, month: 1, day: 15 })}
      >
        Select Jan 15
      </button>
      <button
        data-testid='core-view-change'
        onClick={() => onViewChange?.('months')}
      >
        Change View
      </button>
      <button
        data-testid='core-month-nav'
        onClick={() => onMonthNavigate?.('next')}
      >
        Next Month
      </button>
      <button
        data-testid='core-month-select'
        onClick={() => onMonthSelect?.(5)}
      >
        Select Month 5
      </button>
      <button
        data-testid='core-year-select'
        onClick={() => onYearSelect?.(2025)}
      >
        Select Year 2025
      </button>
      <button data-testid='core-go-today' onClick={() => onGoToToday?.()}>
        Go To Today
      </button>
    </div>
  )
}))

vi.mock('@/hooks/useCalendarState', () => ({
  useCalendarState: ({ initValue }: any) => ({
    state: {
      selectedValue: initValue,
      displayMonth: { year: 2023, month: 1, day: 1 },
      currentView: 'calendar'
    },
    actions: {
      selectDate: vi.fn(),
      updateTime: vi.fn(),
      selectMonth: vi.fn(),
      selectYear: vi.fn(),
      setView: vi.fn(),
      navigateMonth: vi.fn(),
      goToToday: vi.fn(),
      selectPresetRange: vi.fn()
    }
  })
}))

describe('DtCalendar', () => {
  const mockOnChange = vi.fn()
  const defaultProps = {
    onChange: mockOnChange,
    type: 'single' as const
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(<DtCalendar {...defaultProps} />)
    expect(screen.getByTestId('calendar-core')).toBeInTheDocument()
  })

  it('passes locale prop to CalendarCore', () => {
    render(<DtCalendar {...defaultProps} local='fa' />)
    expect(screen.getByTestId('core-locale')).toHaveTextContent('fa')
  })

  it('passes type prop to CalendarCore', () => {
    render(<DtCalendar {...defaultProps} type='range' />)
    expect(screen.getByTestId('core-type')).toHaveTextContent('range')
  })

  it('applies dark theme class when dark prop is true', () => {
    const { container } = render(<DtCalendar {...defaultProps} dark={true} />)
    const wrapper = container.querySelector('.react-calendar-datetime-picker')
    expect(wrapper).toHaveAttribute('data-theme', 'dark')
  })

  it('applies custom class name', () => {
    const { container } = render(
      <DtCalendar {...defaultProps} calenderModalClass='custom-class' />
    )
    const wrapper = container.querySelector('.react-calendar-datetime-picker')
    expect(wrapper).toHaveClass('custom-class')
  })

  it('handles initial value correctly', () => {
    const initDate = { year: 2023, month: 5, day: 15 }
    render(<DtCalendar {...defaultProps} initValue={initDate} />)
    expect(screen.getByTestId('core-value')).toHaveTextContent(
      JSON.stringify(initDate)
    )
  })

  it('calls onError when normalization errors occur', async () => {
    const mockOnError = vi.fn()
    // Providing an invalid date format that normalizeInitValueWithErrors might catch if mocked or implemented
    // Note: Since we mock useCalendarState, the normalization happens inside DtCalendar before the hook
    // However, normalizeInitValueWithErrors logic is imported. We might need to rely on the real implementation or mock it to return error.

    // Let's assume real normalizeInitValueWithErrors handles invalid types.
    // 'invalid-date' string might be valid if parser handles it, but let's try a totally wrong object
    const invalidValue = { invalid: true } as any

    render(
      <DtCalendar
        {...defaultProps}
        initValue={invalidValue}
        onError={mockOnError}
      />
    )

    // We expect some error about initValue.
    // If the real utility is used, it might check structure.
    // Let's check if the real utility is used or mocked. In this file I didn't mock normalizeInitValueWithErrors.
    // So it runs real code.

    // Wait for effect
    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalled()
    })
  })

  it('auto-converts string initValue to normalized object via onChange', async () => {
    const stringDate = '2023-05-15'
    render(<DtCalendar {...defaultProps} initValue={stringDate} />)

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          year: 2023,
          month: 5,
          day: 15
        })
      )
    })
  })

  it('does not call onChange when initValue is undefined', async () => {
    render(<DtCalendar {...defaultProps} />)
    // Wait a bit to ensure effect didn't fire
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('does not call onChange when initValue is already normalized', async () => {
    const initDate = { year: 2023, month: 5, day: 15 }
    render(<DtCalendar {...defaultProps} initValue={initDate} />)
    // Wait a bit to ensure effect didn't fire
    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('passes all callback props to CalendarCore', () => {
    const onDateSelect = vi.fn()
    const onViewChange = vi.fn()
    const onMonthNavigate = vi.fn()
    const onMonthSelect = vi.fn()
    const onYearSelect = vi.fn()
    const onGoToToday = vi.fn()

    render(
      <DtCalendar
        {...defaultProps}
        onDateSelect={onDateSelect}
        onViewChange={onViewChange}
        onMonthNavigate={onMonthNavigate}
        onMonthSelect={onMonthSelect}
        onYearSelect={onYearSelect}
        onGoToToday={onGoToToday}
      />
    )

    fireEvent.click(screen.getByTestId('core-select-date'))
    expect(onDateSelect).toHaveBeenCalledWith({
      year: 2023,
      month: 1,
      day: 15
    })

    fireEvent.click(screen.getByTestId('core-view-change'))
    expect(onViewChange).toHaveBeenCalledWith('months')

    fireEvent.click(screen.getByTestId('core-month-nav'))
    expect(onMonthNavigate).toHaveBeenCalledWith('next')

    fireEvent.click(screen.getByTestId('core-month-select'))
    expect(onMonthSelect).toHaveBeenCalledWith(5)

    fireEvent.click(screen.getByTestId('core-year-select'))
    expect(onYearSelect).toHaveBeenCalledWith(2025)

    fireEvent.click(screen.getByTestId('core-go-today'))
    expect(onGoToToday).toHaveBeenCalled()
  })
})
