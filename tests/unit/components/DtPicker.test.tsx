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

  describe('triggerElement prop', () => {
    it('renders custom trigger element instead of default input', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(<DtPicker {...defaultProps} triggerElement={customButton} />)

      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument()
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    })

    it('opens calendar modal when custom trigger is clicked', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(<DtPicker {...defaultProps} triggerElement={customButton} />)

      const trigger = screen.getByTestId('custom-trigger')
      fireEvent.click(trigger)

      expect(screen.getByTestId('calendar-core')).toBeInTheDocument()
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })

    it('does not open calendar when custom trigger is clicked and disabled', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(
        <DtPicker
          {...defaultProps}
          triggerElement={customButton}
          isDisabled={true}
        />
      )

      const trigger = screen.getByTestId('custom-trigger')
      fireEvent.click(trigger)

      expect(screen.queryByTestId('calendar-core')).not.toBeInTheDocument()
    })

    it('applies custom triggerClass to wrapper div', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(
        <DtPicker
          {...defaultProps}
          triggerElement={customButton}
          triggerClass='my-custom-trigger-class'
        />
      )

      const wrapper = screen.getByTestId('custom-trigger').parentElement
      expect(wrapper).toHaveClass('my-custom-trigger-class')
    })

    it('wraps custom trigger in accessible container with proper ARIA attributes', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(<DtPicker {...defaultProps} triggerElement={customButton} />)

      const wrapper = screen.getByTestId('custom-trigger').parentElement
      expect(wrapper).toHaveAttribute('aria-haspopup', 'dialog')
      expect(wrapper).toHaveAttribute('aria-expanded', 'false')
      expect(wrapper).toHaveAttribute('tabIndex', '0')
    })

    it('updates aria-expanded when modal opens', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(<DtPicker {...defaultProps} triggerElement={customButton} />)

      const wrapper = screen.getByTestId('custom-trigger').parentElement
      expect(wrapper).toHaveAttribute('aria-expanded', 'false')

      fireEvent.click(screen.getByTestId('custom-trigger'))
      expect(wrapper).toHaveAttribute('aria-expanded', 'true')
    })

    it('works with custom div element as trigger', () => {
      const customDiv = (
        <div data-testid='custom-div-trigger'>
          <span>Select Date</span>
        </div>
      )
      render(<DtPicker {...defaultProps} triggerElement={customDiv} />)

      expect(screen.getByTestId('custom-div-trigger')).toBeInTheDocument()
      expect(screen.getByText('Select Date')).toBeInTheDocument()

      fireEvent.click(screen.getByTestId('custom-div-trigger'))
      expect(screen.getByTestId('calendar-core')).toBeInTheDocument()
    })

    it('works with custom input element as trigger', () => {
      const customInput = (
        <input
          data-testid='custom-input-trigger'
          type='text'
          placeholder='Custom input'
        />
      )
      render(<DtPicker {...defaultProps} triggerElement={customInput} />)

      expect(screen.getByTestId('custom-input-trigger')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Custom input')).toBeInTheDocument()

      fireEvent.click(screen.getByTestId('custom-input-trigger'))
      expect(screen.getByTestId('calendar-core')).toBeInTheDocument()
    })

    it('does not render default input wrapper when triggerElement is provided', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(<DtPicker {...defaultProps} triggerElement={customButton} />)

      expect(screen.queryByLabelText('Open calendar')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Clear selection')).not.toBeInTheDocument()
    })

    it('handles click events on custom trigger correctly', () => {
      const handleCustomClick = vi.fn()
      const customButton = (
        <button data-testid='custom-trigger' onClick={handleCustomClick}>
          Pick Date
        </button>
      )
      render(<DtPicker {...defaultProps} triggerElement={customButton} />)

      const trigger = screen.getByTestId('custom-trigger')
      fireEvent.click(trigger)

      // Custom click handler should be called
      expect(handleCustomClick).toHaveBeenCalled()
      // Calendar should also open
      expect(screen.getByTestId('calendar-core')).toBeInTheDocument()
    })

    it('applies disabled cursor style when isDisabled is true', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(
        <DtPicker
          {...defaultProps}
          triggerElement={customButton}
          isDisabled={true}
        />
      )

      const wrapper = screen.getByTestId('custom-trigger').parentElement
      expect(wrapper).toHaveStyle({ cursor: 'not-allowed' })
    })

    it('applies pointer cursor style when not disabled', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(<DtPicker {...defaultProps} triggerElement={customButton} />)

      const wrapper = screen.getByTestId('custom-trigger').parentElement
      expect(wrapper).toHaveStyle({ cursor: 'pointer' })
    })

    it('renders default input when triggerElement is not provided', () => {
      render(<DtPicker {...defaultProps} />)

      expect(screen.getByRole('textbox')).toBeInTheDocument()
      expect(screen.getByLabelText('Open calendar')).toBeInTheDocument()
    })

    it('maintains modal positioning with custom trigger element', () => {
      const customButton = (
        <button data-testid='custom-trigger'>Pick Date</button>
      )
      render(<DtPicker {...defaultProps} triggerElement={customButton} />)

      fireEvent.click(screen.getByTestId('custom-trigger'))

      const modal = screen.getByRole('dialog')
      expect(modal).toBeInTheDocument()
      // Modal should have positioning styles
      expect(modal).toHaveStyle({
        position: 'fixed',
        zIndex: '1000'
      })
    })
  })
})
