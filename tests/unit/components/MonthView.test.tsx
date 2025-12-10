import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MonthView } from '@/components/MonthView'
import { enTranslations, faTranslations } from '@/utils/translations'
import type { Day } from '@/types'

// Mock the utils
vi.mock('@/utils/calendar-grid', () => ({}))

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

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        locale='en'
        translations={enTranslations}
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
        locale='en'
        translations={enTranslations}
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    enTranslations.months.forEach((month) => {
      expect(screen.getByText(month)).toBeInTheDocument()
    })
  })

  it('displays correct month names for Persian locale', () => {
    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='jalali'
        locale='fa'
        translations={faTranslations}
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    faTranslations.months.forEach((month) => {
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
        locale='en'
        translations={enTranslations}
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
        locale='en'
        translations={enTranslations}
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
        locale='en'
        translations={enTranslations}
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

  it('applies custom classes', () => {
    const customClasses = { months: 'custom-months-class' }

    render(
      <MonthView
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        locale='en'
        translations={enTranslations}
        customization={{ classes: customClasses }}
        onMonthSelect={mockOnMonthSelect}
        onViewChange={mockOnViewChange}
      />
    )

    const grid = screen.getByRole('grid')
    expect(grid).toHaveClass('custom-months-class')
  })

  describe('Translation Integration', () => {
    it('renders month names from English translations', () => {
      render(
        <MonthView
          displayMonth={defaultDisplayMonth}
          calendarSystem='gregorian'
          locale='en'
          translations={enTranslations}
          onMonthSelect={mockOnMonthSelect}
          onViewChange={mockOnViewChange}
        />
      )

      // Should render all 12 English month names
      enTranslations.months.forEach((month) => {
        expect(screen.getByText(month)).toBeInTheDocument()
      })
    })

    it('renders month names from Persian translations', () => {
      render(
        <MonthView
          displayMonth={defaultDisplayMonth}
          calendarSystem='jalali'
          locale='fa'
          translations={faTranslations}
          onMonthSelect={mockOnMonthSelect}
          onViewChange={mockOnViewChange}
        />
      )

      // Should render all 12 Persian month names
      faTranslations.months.forEach((month) => {
        expect(screen.getByText(month)).toBeInTheDocument()
      })
    })

    it('highlights current month correctly', () => {
      render(
        <MonthView
          displayMonth={{ year: 2023, month: 6, day: 1 }} // June
          calendarSystem='gregorian'
          locale='en'
          translations={enTranslations}
          onMonthSelect={mockOnMonthSelect}
          onViewChange={mockOnViewChange}
        />
      )

      // June should be highlighted as current month
      const juneButton = screen.getByText('June')
      expect(juneButton).toHaveClass('calendar-month-current')
    })

    it('uses selectMonth accessibility label from translations', () => {
      render(
        <MonthView
          displayMonth={defaultDisplayMonth}
          calendarSystem='gregorian'
          locale='en'
          translations={enTranslations}
          onMonthSelect={mockOnMonthSelect}
          onViewChange={mockOnViewChange}
        />
      )

      const grid = screen.getByRole('grid')
      expect(grid).toHaveAttribute('aria-label', 'Select month')
    })

    it('renders custom month names from translations', () => {
      const customTranslations = {
        ...enTranslations,
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ]
      }

      render(
        <MonthView
          displayMonth={defaultDisplayMonth}
          calendarSystem='gregorian'
          locale='en'
          translations={customTranslations}
          onMonthSelect={mockOnMonthSelect}
          onViewChange={mockOnViewChange}
        />
      )

      // Should render custom abbreviated month names
      expect(screen.getByText('Jan')).toBeInTheDocument()
      expect(screen.getByText('Feb')).toBeInTheDocument()
      expect(screen.getByText('Mar')).toBeInTheDocument()
    })

    it('handles month selection with correct month index', () => {
      render(
        <MonthView
          displayMonth={defaultDisplayMonth}
          calendarSystem='gregorian'
          locale='en'
          translations={enTranslations}
          onMonthSelect={mockOnMonthSelect}
          onViewChange={mockOnViewChange}
        />
      )

      const marchButton = screen.getByText('March')
      fireEvent.click(marchButton)

      // March is month 3 (0-indexed as 2)
      expect(mockOnMonthSelect).toHaveBeenCalledWith(3)
    })
  })
})
