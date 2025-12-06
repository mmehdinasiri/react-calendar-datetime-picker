import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarGridView } from '@/components/CalendarGridView'
import type { Day } from '@/types'

// Mock child components to isolate CalendarGridView logic
vi.mock('@/components/CalendarHeader', () => ({
  CalendarHeader: ({
    onPrevious,
    onNext,
    onMonthClick,
    onYearClick,
    displayMonth
  }: any) => (
    <div data-testid='calendar-header'>
      <button onClick={onPrevious} data-testid='prev-btn'>
        Prev
      </button>
      <span onClick={onMonthClick} data-testid='month-title'>
        Month: {displayMonth.month}
      </span>
      <span onClick={onYearClick} data-testid='year-title'>
        Year: {displayMonth.year}
      </span>
      <button onClick={onNext} data-testid='next-btn'>
        Next
      </button>
    </div>
  )
}))

vi.mock('@/components/TimeSelector', () => ({
  TimeSelector: ({ onTimeChange, label }: any) => (
    <div data-testid='time-selector'>
      {label && <span>{label}</span>}
      <button
        onClick={() => onTimeChange(10, 30)}
        data-testid='time-change-btn'
      >
        Set Time
      </button>
    </div>
  )
}))

describe('CalendarGridView', () => {
  const defaultProps = {
    selectedValue: null,
    displayMonth: { year: 2023, month: 1, day: 1 } as Day,
    calendarSystem: 'gregorian' as const,
    type: 'single' as const,
    onDateSelect: vi.fn(),
    onTimeChange: vi.fn(),
    onMonthNavigate: vi.fn(),
    onViewChange: vi.fn(),
    onGoToToday: vi.fn(),
    onPresetRangeSelect: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the calendar grid with correct month and year', () => {
    render(<CalendarGridView {...defaultProps} />)

    // Check header (mocked)
    expect(screen.getByTestId('calendar-header')).toBeInTheDocument()
    expect(screen.getByText('Month: 1')).toBeInTheDocument()
    expect(screen.getByText('Year: 2023')).toBeInTheDocument()

    // Check days rendering (January 2023 has 31 days)
    // We expect buttons for days with role gridcell.
    const dayButtons = screen.getAllByRole('gridcell', { name: /2023/ })
    // January 2023 starts on Sunday (1st), so there might be previous month days too if grid fills weeks.
    expect(dayButtons.length).toBeGreaterThanOrEqual(28)
  })

  it('renders day names', () => {
    render(<CalendarGridView {...defaultProps} />)
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  it('calls onDateSelect when a day is clicked', () => {
    render(<CalendarGridView {...defaultProps} />)

    // Find Jan 15th 2023
    const dayButton = screen.getByRole('gridcell', { name: /15 January 2023/i })
    fireEvent.click(dayButton)

    expect(defaultProps.onDateSelect).toHaveBeenCalledWith({
      year: 2023,
      month: 1,
      day: 15
    })
  })

  it('highlights selected date', () => {
    const selectedDate = { year: 2023, month: 1, day: 15 }
    render(<CalendarGridView {...defaultProps} selectedValue={selectedDate} />)

    const dayButton = screen.getByRole('gridcell', { name: /15 January 2023/i })
    expect(dayButton).toHaveClass('calendar-day-selected')
    expect(dayButton).toHaveAttribute('aria-selected', 'true')
  })

  it('renders multiple months if numberOfMonths is > 1', () => {
    render(<CalendarGridView {...defaultProps} numberOfMonths={2} />)

    // Should see days from February 2023
    const febDay = screen.getByRole('gridcell', { name: /^1 February 2023$/i })
    expect(febDay).toBeInTheDocument()
  })

  it('handles navigation via header', () => {
    render(<CalendarGridView {...defaultProps} />)

    fireEvent.click(screen.getByTestId('next-btn'))
    expect(defaultProps.onMonthNavigate).toHaveBeenCalledWith('next')

    fireEvent.click(screen.getByTestId('prev-btn'))
    expect(defaultProps.onMonthNavigate).toHaveBeenCalledWith('prev')
  })

  it('handles view change via header', () => {
    render(<CalendarGridView {...defaultProps} />)

    fireEvent.click(screen.getByTestId('month-title'))
    expect(defaultProps.onViewChange).toHaveBeenCalledWith('months')

    fireEvent.click(screen.getByTestId('year-title'))
    expect(defaultProps.onViewChange).toHaveBeenCalledWith('years')
  })

  it('shows today button and handles click', () => {
    render(<CalendarGridView {...defaultProps} todayBtn={true} />)

    // Today button is not a gridcell, it's a regular button in footer
    const todayBtn = screen.getByRole('button', { name: /Today/i })
    fireEvent.click(todayBtn)

    expect(defaultProps.onGoToToday).toHaveBeenCalled()
  })

  it('renders TimeSelector when withTime is true and type is single', () => {
    const selectedDate = { year: 2023, month: 1, day: 15 }
    render(
      <CalendarGridView
        {...defaultProps}
        withTime={true}
        selectedValue={selectedDate}
        type='single'
      />
    )

    expect(screen.getByTestId('time-selector')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('time-change-btn'))
    expect(defaultProps.onTimeChange).toHaveBeenCalledWith(selectedDate, 10, 30)
  })

  it('renders preset ranges when type is range and presetRanges provided', () => {
    const presetRanges = {
      yesterday: true,
      last7days: true,
      last30days: 'Last 30',
      thisMonth: true,
      lastMonth: true,
      custom: [
        {
          label: 'Custom Range',
          range: {
            from: { year: 2023, month: 1, day: 1 },
            to: { year: 2023, month: 1, day: 5 }
          }
        }
      ]
    }
    render(
      <CalendarGridView
        {...defaultProps}
        type='range'
        presetRanges={presetRanges}
      />
    )

    // Check all preset buttons exist
    expect(
      screen.getByRole('button', { name: 'Yesterday' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Last 7 days' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Last 30' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'This month' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Last month' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Custom Range' })
    ).toBeInTheDocument()

    // Test clicking one triggers callback
    const yesterdayBtn = screen.getByRole('button', { name: 'Yesterday' })
    fireEvent.click(yesterdayBtn)
    expect(defaultProps.onPresetRangeSelect).toHaveBeenCalled()
  })

  it('disables dates based on constraints', () => {
    const constraints = {
      disabledDates: [{ year: 2023, month: 1, day: 20 }]
    }
    render(<CalendarGridView {...defaultProps} constraints={constraints} />)

    const disabledDay = screen.getByRole('gridcell', {
      name: /^20 January 2023$/i
    })
    expect(disabledDay).toBeDisabled()
    expect(disabledDay).toHaveClass('calendar-day-disabled')

    fireEvent.click(disabledDay)
    expect(defaultProps.onDateSelect).not.toHaveBeenCalled()
  })

  it('renders correctly for Persian locale (fa)', () => {
    render(
      <CalendarGridView
        {...defaultProps}
        calendarSystem='jalali'
        displayMonth={{ year: 1402, month: 1, day: 1 }}
        todayBtn={true}
      />
    )

    // Check for "امروز" (Today in Persian)
    expect(screen.getByRole('button', { name: 'امروز' })).toBeInTheDocument()
  })

  it('highlights weekends when showWeekend is true', () => {
    render(<CalendarGridView {...defaultProps} showWeekend={true} />)

    // In English locale (ltr), Sunday (1st) and Saturday (7th) are weekends.
    // 1 Jan 2023 is Sunday.
    const sunday = screen.getByRole('gridcell', { name: /^1 January 2023$/i })
    expect(sunday).toHaveClass('calendar-day-weekend')

    const monday = screen.getByRole('gridcell', { name: /^2 January 2023$/i })
    expect(monday).not.toHaveClass('calendar-day-weekend')
  })

  it('highlights weekends correctly for Persian locale (fa)', () => {
    // 1 Farvardin 1402 starts on Tuesday.
    // If week starts on Saturday:
    // Sat(0), Sun(1), Mon(2), Tue(3)=1st, Wed(4)=2nd, Thu(5)=3rd, Fri(6)=4th
    // Thu and Fri are weekends in FA.

    render(
      <CalendarGridView
        {...defaultProps}
        calendarSystem='jalali'
        displayMonth={{ year: 1402, month: 1, day: 1 }}
        showWeekend={true}
      />
    )

    // Day 1 (Tuesday) - Not weekend
    const day1 = document.getElementById('day-1402-1-1')
    expect(day1).toBeInTheDocument()
    expect(day1).not.toHaveClass('calendar-day-weekend')

    // Day 3 (Thursday) - Weekend
    const day3 = document.getElementById('day-1402-1-3')
    expect(day3).toBeInTheDocument()
    expect(day3).toHaveClass('calendar-day-weekend')

    // Day 4 (Friday) - Weekend
    const day4 = document.getElementById('day-1402-1-4')
    expect(day4).toBeInTheDocument()
    expect(day4).toHaveClass('calendar-day-weekend')
  })

  it('renders range selection styles correctly', () => {
    const selectedRange = {
      from: { year: 2023, month: 1, day: 10 },
      to: { year: 2023, month: 1, day: 12 }
    }
    render(
      <CalendarGridView
        {...defaultProps}
        type='range'
        selectedValue={selectedRange}
      />
    )

    const startDay = screen.getByRole('gridcell', {
      name: /^10 January 2023$/i
    })
    const middleDay = screen.getByRole('gridcell', {
      name: /^11 January 2023$/i
    })
    const endDay = screen.getByRole('gridcell', { name: /^12 January 2023$/i })
    const outsideDay = screen.getByRole('gridcell', {
      name: /^13 January 2023$/i
    })

    expect(startDay).toHaveClass('calendar-day-selected')
    expect(startDay).toHaveClass('calendar-day-range-start')

    expect(middleDay).toHaveClass('calendar-day-in-range')
    expect(middleDay).not.toHaveClass('calendar-day-range-start')
    expect(middleDay).not.toHaveClass('calendar-day-range-end')

    expect(endDay).toHaveClass('calendar-day-selected')
    expect(endDay).toHaveClass('calendar-day-range-end')

    expect(outsideDay).not.toHaveClass('calendar-day-selected')
    expect(outsideDay).not.toHaveClass('calendar-day-in-range')
  })

  it('selects the start of the week when type is week', () => {
    render(<CalendarGridView {...defaultProps} type='week' />)

    // Click on Wednesday, Jan 11th 2023
    // Week starts on Sunday in EN locale.
    // Week for Jan 11th is Jan 8th (Sun) to Jan 14th (Sat).
    const wednesday = screen.getByRole('gridcell', {
      name: /^11 January 2023$/i
    })
    fireEvent.click(wednesday)

    expect(defaultProps.onDateSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        year: 2023,
        month: 1,
        day: 8
      })
    )
  })

  it('disables dates outside minDate and maxDate', () => {
    const constraints = {
      minDate: { year: 2023, month: 1, day: 10 },
      maxDate: { year: 2023, month: 1, day: 20 }
    }
    render(<CalendarGridView {...defaultProps} constraints={constraints} />)

    const beforeMin = screen.getByRole('gridcell', {
      name: /^9 January 2023$/i
    })
    const atMin = screen.getByRole('gridcell', { name: /^10 January 2023$/i })
    const atMax = screen.getByRole('gridcell', { name: /^20 January 2023$/i })
    const afterMax = screen.getByRole('gridcell', {
      name: /^21 January 2023$/i
    })

    expect(beforeMin).toBeDisabled()
    expect(atMin).not.toBeDisabled()
    expect(atMax).not.toBeDisabled()
    expect(afterMax).toBeDisabled()
  })

  it('disables dates using isDateDisabled function', () => {
    const isDateDisabled = (date: Day) => date.day % 2 === 0 // Disable even days
    render(
      <CalendarGridView {...defaultProps} constraints={{ isDateDisabled }} />
    )

    const evenDay = screen.getByRole('gridcell', { name: /^2 January 2023$/i })
    const oddDay = screen.getByRole('gridcell', { name: /^3 January 2023$/i })

    expect(evenDay).toBeDisabled()
    expect(evenDay).toHaveClass('calendar-day-disabled')

    expect(oddDay).not.toBeDisabled()
    expect(oddDay).not.toHaveClass('calendar-day-disabled')

    fireEvent.click(evenDay)
    expect(defaultProps.onDateSelect).not.toHaveBeenCalled()

    fireEvent.click(oddDay)
    expect(defaultProps.onDateSelect).toHaveBeenCalledWith(
      expect.objectContaining({ day: 3 })
    )
  })
})
