import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DtPicker } from '@/components/DtPicker'

// Mock dependencies
vi.mock('@/components/CalendarCore', () => ({
  CalendarCore: ({ selectedValue, locale, onDateSelect }: any) => (
    <div data-testid='calendar-core'>
      <span data-testid='core-locale'>{locale}</span>
      <span data-testid='core-value'>{JSON.stringify(selectedValue)}</span>
      <button
        data-testid='core-select-date'
        onClick={() => onDateSelect({ year: 2023, month: 1, day: 15 })}
      >
        Select Jan 15
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
})
