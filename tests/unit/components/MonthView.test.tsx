import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MonthView } from '@/components/MonthView'
import { getMonthNames } from '@/utils/calendar-grid'
import type { Day } from '@/types'

// Mock the utils
vi.mock('@/utils/calendar-grid', () => ({
  getMonthNames: vi.fn()
}))

// Mock CalendarHeader
vi.mock('@/components/CalendarHeader', () => ({
  CalendarHeader: ({
    displayMonth,
    onPrevious,
    onNext,
    onMonthClick,
    onYearClick
  }: any) => (
    <div data-testid='calendar-header'>
      <button onClick={onPrevious} data-testid='header-prev'>
        Prev
      </button>
      <button onClick={onNext} data-testid='header-next'>
        Next
      </button>
      <span onClick={onMonthClick} data-testid='header-month'>
        Month
      </span>
      <span onClick={onYearClick} data-testid='header-year'>
        Year
      </span>
      <span>{displayMonth.year}</span>
    </div>
  )
}))

describe('MonthView', () => {
  const mockOnMonthSelect = vi.fn()
  const mockOnViewChange = vi.fn()

  const defaultDisplayMonth: Day = { year: 2023, month: 1, day: 1 }
  const mockEnglishMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const mockPersianMonths = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند'
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getMonthNames).mockReturnValue(mockEnglishMonths)
  })

  it('renders correctly', () => {
    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByTestId('calendar-header')).toBeInTheDocument()
    expect(screen.getAllByRole('gridcell')).toHaveLength(12)
  })

  it('displays correct month names for English locale', () => {
    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    mockEnglishMonths.forEach((month) => {
      expect(screen.getByText(month)).toBeInTheDocument()
    })
  })

  it('displays correct month names for Persian locale', () => {
    vi.mocked(getMonthNames).mockReturnValue(mockPersianMonths)

    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='jalali'
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    mockPersianMonths.forEach((month) => {
      expect(screen.getByText(month)).toBeInTheDocument()
    })

    // Check RTL
    const grid = screen.getByRole('grid')
    const wrapper = grid.closest('.calendar-core')
    expect(wrapper).toHaveAttribute('dir', 'rtl')
  })

  it('highlights the current month', () => {
    const displayMonth: Day = { year: 2023, month: 3, day: 1 } // March

    render(
      <MonthView
        displayMonth={displayMonth}
        calendarSystem='gregorian'
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const marchBtn = screen.getByText('March')
    expect(marchBtn).toHaveClass('calendar-month-current')
    expect(marchBtn).toHaveAttribute('aria-selected', 'true')

    const janBtn = screen.getByText('January')
    expect(janBtn).not.toHaveClass('calendar-month-current')
    expect(janBtn).toHaveAttribute('aria-selected', 'false')
  })

  it('handles month selection', () => {
    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const juneBtn = screen.getByText('June')
    fireEvent.click(juneBtn)

    expect(mockOnMonthSelect).toHaveBeenCalledWith(6) // June is month 6
    expect(mockOnViewChange).toHaveBeenCalledWith('calendar')
  })

  it('handles view changes via header', () => {
    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    // Previous button -> calendar view
    fireEvent.click(screen.getByTestId('header-prev'))
    expect(mockOnViewChange).toHaveBeenCalledWith('calendar')

    // Next button -> years view
    fireEvent.click(screen.getByTestId('header-next'))
    expect(mockOnViewChange).toHaveBeenCalledWith('years')

    // Month click -> calendar view
    fireEvent.click(screen.getByTestId('header-month'))
    expect(mockOnViewChange).toHaveBeenCalledWith('calendar')

    // Year click -> years view
    fireEvent.click(screen.getByTestId('header-year'))
    expect(mockOnViewChange).toHaveBeenCalledWith('years')
  })

  it('supports custom month names', () => {
    const customMonths = [
      'M1',
      'M2',
      'M3',
      'M4',
      'M5',
      'M6',
      'M7',
      'M8',
      'M9',
      'M10',
      'M11',
      'M12'
    ]
    vi.mocked(getMonthNames).mockReturnValue(customMonths)

    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        customization={{ monthNames: customMonths }}
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    expect(getMonthNames).toHaveBeenCalledWith('gregorian', customMonths)
    expect(screen.getByText('M1')).toBeInTheDocument()
  })

  it('applies custom classes', () => {
    const customClasses = { months: 'custom-months-class' }

    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        customization={{ classes: customClasses }}
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const grid = screen.getByRole('grid')
    expect(grid).toHaveClass('custom-months-class')
  })
})
