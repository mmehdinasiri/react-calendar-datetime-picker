import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarHeader } from '@/components/CalendarHeader'
import { enTranslations, faTranslations } from '@/utils/translations'
import type { Day } from '@/types'

// Mock utils
vi.mock('@/utils/calendar-grid', () => ({}))

vi.mock('@/utils/formatting', () => ({
  toPersianNumeral: (val: any) => `P-${val}`,
  formatNumber: (val: any, numberSystem: 'latin' | 'persian') => {
    if (numberSystem === 'persian') {
      return `P-${val}`
    }
    return val.toString()
  }
}))

describe('CalendarHeader', () => {
  const mockOnPrevious = vi.fn()
  const mockOnNext = vi.fn()
  const mockOnMonthClick = vi.fn()
  const mockOnYearClick = vi.fn()

  const defaultDisplayMonth: Day = { year: 2023, month: 1, day: 1 }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        translations={enTranslations}
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
        calendarSystem='gregorian'
        translations={enTranslations}
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
        calendarSystem='gregorian'
        translations={enTranslations}
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
        calendarSystem='gregorian'
        translations={enTranslations}
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
        calendarSystem='gregorian'
        translations={enTranslations}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
        showYear={false}
      />
    )

    expect(screen.queryByText('2023')).not.toBeInTheDocument()
  })

  it('handles Persian locale', () => {
    render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        calendarSystem='jalali'
        translations={faTranslations}
        onPrevious={mockOnPrevious}
        onNext={mockOnNext}
      />
    )

    expect(screen.getByText('فروردین')).toBeInTheDocument()
    // Year should be converted to Persian numeral
    expect(screen.getByText('P-2023')).toBeInTheDocument()
  })

  it('supports custom classes', () => {
    const customClasses = { header: 'custom-header-class' }

    const { container } = render(
      <CalendarHeader
        displayMonth={defaultDisplayMonth}
        calendarSystem='gregorian'
        translations={enTranslations}
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
        calendarSystem='gregorian'
        translations={enTranslations}
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

  describe('Translation Integration', () => {
    it('renders month names from translations', () => {
      render(
        <CalendarHeader
          displayMonth={defaultDisplayMonth}
          calendarSystem='gregorian'
          translations={enTranslations}
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
        />
      )

      // January should be rendered using translations
      expect(screen.getByText('January')).toBeInTheDocument()
    })

    it('renders Persian month names correctly', () => {
      render(
        <CalendarHeader
          displayMonth={defaultDisplayMonth}
          calendarSystem='jalali'
          translations={faTranslations}
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
        />
      )

      // Persian month name for first month
      expect(screen.getByText('فروردین')).toBeInTheDocument()
    })

    it('uses navigation button titles from translations', () => {
      render(
        <CalendarHeader
          displayMonth={defaultDisplayMonth}
          calendarSystem='gregorian'
          translations={enTranslations}
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
        />
      )

      const prevButton = screen.getByRole('button', { name: /previous/i })
      const nextButton = screen.getByRole('button', { name: /next/i })

      expect(prevButton).toHaveAttribute('title', 'previous')
      expect(nextButton).toHaveAttribute('title', 'next')
    })

    it('uses Persian navigation button titles', () => {
      render(
        <CalendarHeader
          displayMonth={defaultDisplayMonth}
          calendarSystem='jalali'
          translations={faTranslations}
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
        />
      )

      const prevButton = screen.getByRole('button', { name: /قبلی/i })
      const nextButton = screen.getByRole('button', { name: /بعدی/i })

      expect(prevButton).toHaveAttribute('title', 'قبلی')
      expect(nextButton).toHaveAttribute('title', 'بعدی')
    })

    it('overrides navigation titles with custom labels', () => {
      render(
        <CalendarHeader
          displayMonth={defaultDisplayMonth}
          calendarSystem='gregorian'
          translations={enTranslations}
          previousTitle='Custom Previous'
          nextTitle='Custom Next'
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
        />
      )

      const prevButton = screen.getByRole('button', {
        name: /custom previous/i
      })
      const nextButton = screen.getByRole('button', { name: /custom next/i })

      expect(prevButton).toHaveAttribute('title', 'Custom Previous')
      expect(nextButton).toHaveAttribute('title', 'Custom Next')
    })

    it('does not render accessibility labels when callbacks not provided', () => {
      render(
        <CalendarHeader
          displayMonth={defaultDisplayMonth}
          calendarSystem='gregorian'
          translations={enTranslations}
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
        />
      )

      // Month and year should be divs without aria-label when no callbacks
      const monthElement = screen.getByText('January')
      const yearElement = screen.getByText('2023')

      expect(monthElement.tagName).toBe('DIV')
      expect(yearElement.tagName).toBe('DIV')
      expect(monthElement).not.toHaveAttribute('aria-label')
      expect(yearElement).not.toHaveAttribute('aria-label')
    })
  })
})
