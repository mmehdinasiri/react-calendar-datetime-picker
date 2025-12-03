import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CalendarCore } from '@/components/CalendarCore'
import type { Day } from '@/types'

// Mock child components
vi.mock('@/components/CalendarGridView', () => ({
  CalendarGridView: (props: any) => (
    <div data-testid="calendar-grid-view">
      Calendar View
      <span data-testid="prop-type">{props.type}</span>
    </div>
  ),
}))

vi.mock('@/components/MonthView', () => ({
  MonthView: () => <div data-testid="month-view">Month View</div>,
}))

vi.mock('@/components/YearView', () => ({
  YearView: (props: any) => (
    <div data-testid="year-view">
      Year View - {props.yearListStyle}
    </div>
  ),
}))

describe('CalendarCore', () => {
  const defaultProps = {
    selectedValue: null,
    displayMonth: { year: 2023, month: 1, day: 1 } as Day,
    locale: 'en' as const,
    type: 'single' as const,
    onDateSelect: vi.fn(),
    onTimeChange: vi.fn(),
    onMonthSelect: vi.fn(),
    onYearSelect: vi.fn(),
    onViewChange: vi.fn(),
    onMonthNavigate: vi.fn(),
    onGoToToday: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders CalendarGridView when currentView is calendar', () => {
    render(
      <CalendarCore
        {...defaultProps}
        currentView="calendar"
      />
    )

    expect(screen.getByTestId('calendar-grid-view')).toBeInTheDocument()
    expect(screen.queryByTestId('month-view')).not.toBeInTheDocument()
    expect(screen.queryByTestId('year-view')).not.toBeInTheDocument()
  })

  it('renders MonthView when currentView is months', () => {
    render(
      <CalendarCore
        {...defaultProps}
        currentView="months"
      />
    )

    expect(screen.getByTestId('month-view')).toBeInTheDocument()
    expect(screen.queryByTestId('calendar-grid-view')).not.toBeInTheDocument()
    expect(screen.queryByTestId('year-view')).not.toBeInTheDocument()
  })

  it('renders YearView when currentView is years', () => {
    render(
      <CalendarCore
        {...defaultProps}
        currentView="years"
      />
    )

    expect(screen.getByTestId('year-view')).toBeInTheDocument()
    expect(screen.queryByTestId('calendar-grid-view')).not.toBeInTheDocument()
    expect(screen.queryByTestId('month-view')).not.toBeInTheDocument()
  })

  it('passes props correctly to CalendarGridView', () => {
    render(
      <CalendarCore
        {...defaultProps}
        currentView="calendar"
        type="range"
      />
    )

    expect(screen.getByTestId('prop-type')).toHaveTextContent('range')
  })

  it('passes yearListStyle to YearView', () => {
    render(
      <CalendarCore
        {...defaultProps}
        currentView="years"
        yearListStyle="list"
      />
    )

    expect(screen.getByTestId('year-view')).toHaveTextContent('Year View - list')
  })

  it('renders null for invalid view', () => {
    const { container } = render(
      <CalendarCore
        {...defaultProps}
        currentView={'invalid' as any}
      />
    )

    expect(container).toBeEmptyDOMElement()
  })
})

