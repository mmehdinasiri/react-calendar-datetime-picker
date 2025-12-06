import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { YearView } from '@/components/YearView'
import { getYearRange } from '@/utils/calendar-grid'
import type { Day } from '@/types'

// Mock the utils to isolate tests
vi.mock('@/utils/calendar-grid', () => ({
  getYearRange: vi.fn()
}))

// Mock CalendarHeader to avoid testing its internal logic
vi.mock('@/components/CalendarHeader', () => ({
  CalendarHeader: ({ displayMonth, onPrevious, onMonthClick }: any) => (
    <div data-testid='calendar-header'>
      <button onClick={onPrevious} data-testid='header-prev'>
        Prev
      </button>
      <span data-testid='header-month' onClick={onMonthClick}>
        {displayMonth.year}-{displayMonth.month}
      </span>
    </div>
  )
}))

// Mock scrollIntoView/scrollTo since they aren't implemented in JSDOM
Element.prototype.scrollTo = vi.fn()

describe('YearView', () => {
  const mockOnYearSelect = vi.fn()
  const mockOnViewChange = vi.fn()

  const defaultDisplayMonth: Day = { year: 2023, month: 1, day: 1 }
  const mockYears = [
    2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getYearRange).mockReturnValue(mockYears)
    Element.prototype.scrollTo = vi.fn()
  })

  it('renders correctly', () => {
    render(
      <YearView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    expect(screen.getByRole('grid')).toBeInTheDocument()
    expect(screen.getByTestId('calendar-header')).toBeInTheDocument()
  })

  it('renders correct list of years', () => {
    render(
      <YearView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const buttons = screen.getAllByRole('gridcell')
    expect(buttons).toHaveLength(mockYears.length)

    mockYears.forEach((year) => {
      expect(screen.getByText(year.toString())).toBeInTheDocument()
    })
  })

  it('highlights the current displayed year', () => {
    render(
      <YearView
        displayMonth={defaultDisplayMonth} // 2023
        calendarSystem='gregorian'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const currentYearBtn = screen.getByText('2023')
    expect(currentYearBtn).toHaveClass('calendar-year-current')
    expect(currentYearBtn).toHaveAttribute('aria-selected', 'true')
  })

  it('handles year selection', () => {
    render(
      <YearView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const yearToSelect = 2025
    const yearBtn = screen.getByText(yearToSelect.toString())
    fireEvent.click(yearBtn)

    expect(mockOnYearSelect).toHaveBeenCalledWith(yearToSelect)
    expect(mockOnViewChange).toHaveBeenCalledWith('months')
  })

  it('handles RTL and Persian numbers for "jalali" locale', () => {
    // Mock getYearRange to likely just return numbers, the component handles formatting
    vi.mocked(getYearRange).mockReturnValue([1401, 1402, 1403])

    const faDisplayMonth: Day = { year: 1402, month: 1, day: 1 }

    render(
      <YearView
        displayMonth={faDisplayMonth}
        calendarSystem='jalali'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const grid = screen.getByRole('grid')
    expect(screen.getByText('۱۴۰۲')).toBeInTheDocument() // 1402 in Persian

    // Check direction
    const wrapper = grid.closest('.calendar-core')
    expect(wrapper).toHaveAttribute('dir', 'rtl')
  })

  it('handles custom year list style (grid vs list)', () => {
    const { rerender } = render(
      <YearView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        yearListStyle='list'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const grid = screen.getByRole('grid')
    expect(grid).toHaveClass('calendar-years-list')

    rerender(
      <YearView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        yearListStyle='grid'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    expect(screen.getByRole('grid')).toHaveClass('calendar-years-grid')
  })

  it('calls onViewChange when header is clicked', () => {
    render(
      <YearView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const prevBtn = screen.getByTestId('header-prev')
    fireEvent.click(prevBtn)
    expect(mockOnViewChange).toHaveBeenCalledWith('months')

    const monthTitle = screen.getByTestId('header-month')
    fireEvent.click(monthTitle)
    expect(mockOnViewChange).toHaveBeenCalledWith('months')
  })

  it('applies custom classes if provided', () => {
    const customClasses = { years: 'custom-years-class' }

    render(
      <YearView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        customization={{ classes: customClasses }}
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const grid = screen.getByRole('grid')
    expect(grid).toHaveClass('custom-years-class')
  })

  it('scrolls to current year on mount', () => {
    render(
      <YearView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        onYearSelect={mockOnYearSelect}
        onViewChange={mockOnViewChange}
      />
    )

    // Verify scrollTo was called
    // Note: Since we use useRef for the container, and JSDOM refs might behave slightly differently depending on timing,
    // usually useLayoutEffect or useEffect fires.
    // We mocked Element.prototype.scrollTo
    expect(Element.prototype.scrollTo).toHaveBeenCalled()
  })
})
