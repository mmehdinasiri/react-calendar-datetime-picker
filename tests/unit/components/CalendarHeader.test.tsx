import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarHeader } from '@/components/CalendarHeader'
import { getMonthNames } from '@/utils/calendar-grid'
import type { Day } from '@/types'

// Mock utils
vi.mock('@/utils/calendar-grid', () => ({
  getMonthNames: vi.fn()
}))

vi.mock('@/utils/formatting', () => ({
  toPersianNumeral: (val: any) => `P-${val}`
}))

describe('CalendarHeader', () => {
  const mockOnPrevious = vi.fn()
  const mockOnNext = vi.fn()
  const mockOnMonthClick = vi.fn()
  const mockOnYearClick = vi.fn()

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

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getMonthNames).mockReturnValue(mockEnglishMonths)
  })

  it('renders correctly', () => {
    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='en'
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    )

    expect(screen.getByText('January')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
    // 2 navigation buttons (prev/next)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('handles navigation', () => {
    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='en'
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    )

    const [prevBtn, nextBtn] = screen.getAllByRole('button')

    fireEvent.click(prevBtn)
    expect(mockOnPrevious).toHaveBeenCalled()

    fireEvent.click(nextBtn)
    expect(mockOnNext).toHaveBeenCalled()
  })

  it('renders clickable month and year if callbacks provided', () => {
    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='en'
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        onMonthClick={mockOnMonthClick}
        onYearClick={mockOnYearClick}
      />
    )

    const monthBtn = screen.getByText('January')
    const yearBtn = screen.getByText('2023')

    fireEvent.click(monthBtn)
    expect(mockOnMonthClick).toHaveBeenCalled()

    fireEvent.click(yearBtn)
    expect(mockOnYearClick).toHaveBeenCalled()
  })

  it('renders non-clickable month/year if callbacks not provided', () => {
    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='en'
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        // No onMonthClick or onYearClick
      />
    )

    const monthEl = screen.getByText('January')
    const yearEl = screen.getByText('2023')

    // They should be divs, not buttons, or at least not behave like buttons in this context
    // The implementation wraps them in button if clickable, div if not
    expect(monthEl.tagName).toBe('DIV')
    expect(yearEl.tagName).toBe('DIV')
  })

  it('hides year if showYear is false', () => {
    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='en'
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        showYear={false}
      />
    )

    expect(screen.queryByText('2023')).not.toBeInTheDocument()
  })

  it('handles Persian locale', () => {
    const mockPersianMonths = ['Farvardin', 'Ordibehesht'] // Simplified for mock
    vi.mocked(getMonthNames).mockReturnValue(mockPersianMonths)

    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='fa'
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    )

    expect(screen.getByText('Farvardin')).toBeInTheDocument()
    // Year should be converted to Persian numeral
    expect(screen.getByText('P-2023')).toBeInTheDocument()
  })

  it('supports custom classes', () => {
    const customClasses = { header: 'custom-header-class' }

    const { container } = render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='en'
        customization={{ classes: customClasses }}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    )

    // The root element should have the class
    expect(container.firstChild).toHaveClass('custom-header-class')
  })

  it('supports custom icons', () => {
    const CustomNextIcon = () => <span data-testid='custom-next'>Next</span>
    const CustomPrevIcon = () => <span data-testid='custom-prev'>Prev</span>

    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='en'
        customization={{
          icons: { next: CustomNextIcon, previous: CustomPrevIcon }
        }}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    )

    expect(screen.getByTestId('custom-next')).toBeInTheDocument()
    expect(screen.getByTestId('custom-prev')).toBeInTheDocument()
  })

  it('supports custom month names via customization', () => {
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
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        locale='en'
        customization={{ monthNames: customMonths }}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    )

    expect(getMonthNames).toHaveBeenCalledWith('en', customMonths)
    expect(screen.getByText('M1')).toBeInTheDocument()
  })
})
