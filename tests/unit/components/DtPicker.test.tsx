import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DtPicker } from '@/components/DtPicker'

// Mock dependencies
vi.mock('@/components/CalendarCore', () => ({
  CalendarCore: ({
    selectedValue,
    locale,
    onDateSelect,
    onViewChange,
    onMonthNavigate,
    onMonthSelect,
    onYearSelect,
    onGoToToday
  }: any) => (
    <div data-testid='calendar-core'>
      <span data-testid='core-locale'>{locale}</span>
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

// Mock hooks with dynamic return values based on props
vi.mock('@/hooks', () => {
  return {
    useCalendarPicker: (initValue: any) => ({
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
        selectPresetRange: vi.fn(),
        clearSelection: vi.fn()
      },
      constraints: {},
      // Simple mock logic for display value
      displayValue: initValue ? '2023/01/15' : ''
    }),
    useModalPosition: () => ({
      modalPosition: { top: 100, left: 100 }
    }),
    useClickOutside: vi.fn(),
    useEscapeKey: vi.fn(),
    useFocusTrap: vi.fn()
  }
})

describe('DtPicker', () => {
  const mockOnChange = vi.fn()
  const defaultProps = {
    onChange: mockOnChange,
    type: 'single' as const
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders input field correctly', () => {
    render(<DtPicker {...defaultProps} placeholder='Select a date' />)

    const input = screen.getByPlaceholderText('Select a date')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('calendar-picker-input')
  })

  it('opens calendar modal on input click', () => {
    render(<DtPicker {...defaultProps} />)

    const input = screen.getByRole('textbox')
    fireEvent.click(input)

    expect(screen.getByTestId('calendar-core')).toBeInTheDocument()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('opens calendar modal on toggle button click', () => {
    render(<DtPicker {...defaultProps} />)

    const toggleBtn = screen.getByLabelText('Open calendar')
    fireEvent.click(toggleBtn)

    expect(screen.getByTestId('calendar-core')).toBeInTheDocument()
  })

  it('displays initial value in input', () => {
    const initDate = { year: 2023, month: 1, day: 15 }
    render(<DtPicker {...defaultProps} initValue={initDate} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('2023/01/15')
  })

  it('renders clear button when clearBtn is true and value exists', () => {
    const initDate = { year: 2023, month: 1, day: 15 }
    render(<DtPicker {...defaultProps} initValue={initDate} clearBtn={true} />)

    const clearBtn = screen.getByLabelText('Clear selection')
    expect(clearBtn).toBeInTheDocument()
  })

  it('does not render clear button when clearBtn is false', () => {
    const initDate = { year: 2023, month: 1, day: 15 }
    render(<DtPicker {...defaultProps} initValue={initDate} clearBtn={false} />)

    expect(screen.queryByLabelText('Clear selection')).not.toBeInTheDocument()
  })

  it('does not open when disabled', () => {
    render(<DtPicker {...defaultProps} isDisabled={true} />)

    const input = screen.getByRole('textbox')
    fireEvent.click(input)

    expect(screen.queryByTestId('calendar-core')).not.toBeInTheDocument()
  })

  it('passes dark theme prop to modal', () => {
    render(<DtPicker {...defaultProps} dark={true} />)

    const input = screen.getByRole('textbox')
    fireEvent.click(input)

    const modal = screen.getByRole('dialog')
    expect(modal).toHaveAttribute('data-theme', 'dark')
  })

  it('passes all callback props to CalendarCore', () => {
    const onDateSelect = vi.fn()
    const onViewChange = vi.fn()
    const onMonthNavigate = vi.fn()
    const onMonthSelect = vi.fn()
    const onYearSelect = vi.fn()
    const onGoToToday = vi.fn()

    render(
      <DtPicker
        {...defaultProps}
        onDateSelect={onDateSelect}
        onViewChange={onViewChange}
        onMonthNavigate={onMonthNavigate}
        onMonthSelect={onMonthSelect}
        onYearSelect={onYearSelect}
        onGoToToday={onGoToToday}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.click(input)

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
