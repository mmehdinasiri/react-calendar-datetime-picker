import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CalendarCore } from '@/components/CalendarCore'
import { enTranslations } from '@/utils/translations'
import type { Day } from '@/types'

// Mock child components
vi.mock('@/components/CalendarGridView', () => ({
  CalendarGridView: (props: any) => (
    <div data-testid='calendar-grid-view'>
      Calendar View
      <span data-testid='prop-type'>{props.type}</span>
      <span data-testid='prop-dateFormat'>{props.dateFormat || 'none'}</span>
      <span data-testid='prop-timeFormat'>{props.timeFormat || 'none'}</span>
    </div>
  )
}))

vi.mock('@/components/MonthView', () => ({
  MonthView: () => <div data-testid='month-view'>Month View</div>
}))

vi.mock('@/components/YearView', () => ({
  YearView: (props: any) => (
    <div data-testid='year-view'>Year View - {props.yearListStyle}</div>
  )
}))

describe('CalendarCore', () => {
  const defaultProps = {
    selectedValue: null,
    displayMonth: { year: 2023, month: 1, day: 1 } as Day,
    calendarSystem: 'gregorian' as const,
    locale: 'en' as const,
    translations: enTranslations,
    type: 'single' as const,
    onDateSelect: vi.fn(),
    onTimeChange: vi.fn(),
    onMonthSelect: vi.fn(),
    onYearSelect: vi.fn(),
    onViewChange: vi.fn(),
    onMonthNavigate: vi.fn(),
    onGoToToday: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders CalendarGridView when currentView is calendar', () => {
    render(<CalendarCore {...defaultProps} currentView='calendar' />)

    expect(screen.getByTestId('calendar-grid-view')).toBeInTheDocument()
    expect(screen.queryByTestId('month-view')).not.toBeInTheDocument()
    expect(screen.queryByTestId('year-view')).not.toBeInTheDocument()
  })

  it('renders MonthView when currentView is months', () => {
    render(<CalendarCore {...defaultProps} currentView='months' />)

    expect(screen.getByTestId('month-view')).toBeInTheDocument()
    expect(screen.queryByTestId('calendar-grid-view')).not.toBeInTheDocument()
    expect(screen.queryByTestId('year-view')).not.toBeInTheDocument()
  })

  it('renders YearView when currentView is years', () => {
    render(<CalendarCore {...defaultProps} currentView='years' />)

    expect(screen.getByTestId('year-view')).toBeInTheDocument()
    expect(screen.queryByTestId('calendar-grid-view')).not.toBeInTheDocument()
    expect(screen.queryByTestId('month-view')).not.toBeInTheDocument()
  })

  it('passes props correctly to CalendarGridView', () => {
    render(
      <CalendarCore {...defaultProps} currentView='calendar' type='range' />
    )

    expect(screen.getByTestId('prop-type')).toHaveTextContent('range')
  })

  it('passes yearListStyle to YearView', () => {
    render(
      <CalendarCore
        {...defaultProps}
        currentView='years'
        yearListStyle='list'
      />
    )

    expect(screen.getByTestId('year-view')).toHaveTextContent(
      'Year View - list'
    )
  })

  it('renders null for invalid view', () => {
    const { container } = render(
      <CalendarCore {...defaultProps} currentView={'invalid' as any} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  describe('dateFormat integration', () => {
    it('passes dateFormat to CalendarGridView and detects time format', () => {
      render(
        <CalendarCore
          {...defaultProps}
          currentView='calendar'
          dateFormat='YYYY-MM-DD HH:mm'
        />
      )

      expect(screen.getByTestId('calendar-grid-view')).toBeInTheDocument()
      expect(screen.getByTestId('prop-dateFormat')).toHaveTextContent(
        'YYYY-MM-DD HH:mm'
      )
      // Should detect 24-hour format from HH token
      expect(screen.getByTestId('prop-timeFormat')).toHaveTextContent('24')
    })

    it('detects 12-hour format from dateFormat with hh token', () => {
      render(
        <CalendarCore
          {...defaultProps}
          currentView='calendar'
          dateFormat='YYYY-MM-DD hh:mm A'
        />
      )

      expect(screen.getByTestId('prop-dateFormat')).toHaveTextContent(
        'YYYY-MM-DD hh:mm A'
      )
      // Should detect 12-hour format from hh token
      expect(screen.getByTestId('prop-timeFormat')).toHaveTextContent('12')
    })

    it('defaults to 24-hour format when dateFormat has no time tokens', () => {
      render(
        <CalendarCore
          {...defaultProps}
          currentView='calendar'
          dateFormat='YYYY-MM-DD'
        />
      )

      expect(screen.getByTestId('prop-dateFormat')).toHaveTextContent(
        'YYYY-MM-DD'
      )
      // Should default to 24-hour format
      expect(screen.getByTestId('prop-timeFormat')).toHaveTextContent('24')
    })

    it('defaults to 24-hour format when dateFormat is undefined', () => {
      render(<CalendarCore {...defaultProps} currentView='calendar' />)

      expect(screen.getByTestId('prop-dateFormat')).toHaveTextContent('none')
      // Should default to 24-hour format
      expect(screen.getByTestId('prop-timeFormat')).toHaveTextContent('24')
    })

    it('uses provided timeFormat when both dateFormat and timeFormat are provided', () => {
      render(
        <CalendarCore
          {...defaultProps}
          currentView='calendar'
          dateFormat='YYYY-MM-DD hh:mm A'
          timeFormat='24'
        />
      )

      // When timeFormat is explicitly provided, it should be used
      expect(screen.getByTestId('prop-timeFormat')).toHaveTextContent('24')
    })
  })
})
