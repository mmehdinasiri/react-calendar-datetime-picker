import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { DtCalendar } from '@/components/DtCalendar'

// Mock dependencies
vi.mock('@/components/CalendarCore', () => ({
  CalendarCore: ({ selectedValue, locale, type }: any) => (
    <div data-testid='calendar-core'>
      <span data-testid='core-locale'>{locale}</span>
      <span data-testid='core-type'>{type}</span>
      <span data-testid='core-value'>{JSON.stringify(selectedValue)}</span>
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
})
