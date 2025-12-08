import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalendarGridView } from '@/components/CalendarGridView'
import { enTranslations, faTranslations } from '@/utils/translations'
import type { Day, CalendarLocale, CalendarUILocale } from '@/types'

// Mock child components to isolate CalendarGridView logic
vi.mock('@/components/CalendarHeader', () => ({
  CalendarHeader: ({
    onPrevious,
    onNext,
    onMonthClick,
    onYearClick,
    displayMonth
  }: any) => (
    <div data-testid='calendar-header'>
      <button onClick={onPrevious} data-testid='prev-btn'>
        Prev
      </button>
      <span onClick={onMonthClick} data-testid='month-title'>
        Month: {displayMonth.month}
      </span>
      <span onClick={onYearClick} data-testid='year-title'>
        Year: {displayMonth.year}
      </span>
      <button onClick={onNext} data-testid='next-btn'>
        Next
      </button>
    </div>
  )
}))

vi.mock('@/components/TimeSelector', () => ({
  TimeSelector: ({ onTimeChange, label }: any) => (
    <div data-testid='time-selector'>
      {label && <span>{label}</span>}
      <button
        onClick={() => onTimeChange(10, 30)}
        data-testid='time-change-btn'
      >
        Set Time
      </button>
    </div>
  )
}))

describe('CalendarGridView', () => {
  const defaultProps = {
    selectedValue: null,
    displayMonth: { year: 2023, month: 1, day: 1 } as Day,
    calendarSystem: 'gregorian' as const,
    locale: 'en' as const,
    translations: enTranslations,
    type: 'single' as const,
    onDateSelect: vi.fn(),
    onTimeChange: vi.fn(),
    onMonthNavigate: vi.fn(),
    onViewChange: vi.fn(),
    onGoToToday: vi.fn(),
    onPresetRangeSelect: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the calendar grid with correct month and year', () => {
    render(<CalendarGridView {...defaultProps} />)

    // Check header (mocked)
    expect(screen.getByTestId('calendar-header')).toBeInTheDocument()
    expect(screen.getByText('Month: 1')).toBeInTheDocument()
    expect(screen.getByText('Year: 2023')).toBeInTheDocument()

    // Check days rendering (January 2023 has 31 days)
    // We expect buttons for days with role gridcell.
    const dayButtons = screen.getAllByRole('gridcell', { name: /2023/ })
    // January 2023 starts on Sunday (1st), so there might be previous month days too if grid fills weeks.
    expect(dayButtons.length).toBeGreaterThanOrEqual(28)
  })

  it('renders day names', () => {
    render(<CalendarGridView {...defaultProps} />)
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument()
    })
  })

  it('calls onDateSelect when a day is clicked', () => {
    render(<CalendarGridView {...defaultProps} />)

    // Find Jan 15th 2023
    const dayButton = screen.getByRole('gridcell', { name: /15 January 2023/i })
    fireEvent.click(dayButton)

    expect(defaultProps.onDateSelect).toHaveBeenCalledWith({
      year: 2023,
      month: 1,
      day: 15
    })
  })

  it('highlights selected date', () => {
    const selectedDate = { year: 2023, month: 1, day: 15 }
    render(<CalendarGridView {...defaultProps} selectedValue={selectedDate} />)

    const dayButton = screen.getByRole('gridcell', { name: /15 January 2023/i })
    expect(dayButton).toHaveClass('calendar-day-selected')
    expect(dayButton).toHaveAttribute('aria-selected', 'true')
  })

  it('renders multiple months if numberOfMonths is > 1', () => {
    render(<CalendarGridView {...defaultProps} numberOfMonths={2} />)

    // Should see days from February 2023
    const febDay = screen.getByRole('gridcell', { name: /^1 February 2023$/i })
    expect(febDay).toBeInTheDocument()
  })

  it('handles navigation via header', () => {
    render(<CalendarGridView {...defaultProps} />)

    fireEvent.click(screen.getByTestId('next-btn'))
    expect(defaultProps.onMonthNavigate).toHaveBeenCalledWith('next')

    fireEvent.click(screen.getByTestId('prev-btn'))
    expect(defaultProps.onMonthNavigate).toHaveBeenCalledWith('prev')
  })

  it('handles view change via header', () => {
    render(<CalendarGridView {...defaultProps} />)

    fireEvent.click(screen.getByTestId('month-title'))
    expect(defaultProps.onViewChange).toHaveBeenCalledWith('months')

    fireEvent.click(screen.getByTestId('year-title'))
    expect(defaultProps.onViewChange).toHaveBeenCalledWith('years')
  })

  it('shows today button and handles click', () => {
    render(<CalendarGridView {...defaultProps} todayBtn={true} />)

    // Today button is not a gridcell, it's a regular button in footer
    const todayBtn = screen.getByRole('button', { name: /Today/i })
    fireEvent.click(todayBtn)

    expect(defaultProps.onGoToToday).toHaveBeenCalled()
  })

  it('renders TimeSelector when withTime is true and type is single', () => {
    const selectedDate = { year: 2023, month: 1, day: 15 }
    render(
      <CalendarGridView
        {...defaultProps}
        withTime={true}
        selectedValue={selectedDate}
        type='single'
      />
    )

    expect(screen.getByTestId('time-selector')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('time-change-btn'))
    expect(defaultProps.onTimeChange).toHaveBeenCalledWith(selectedDate, 10, 30)
  })

  it('renders preset ranges when type is range and presetRanges provided', () => {
    const customTranslations = {
      ...enTranslations,
      presetRanges: {
        ...enTranslations.presetRanges,
        last30days: 'Last 30'
      }
    }

    const presetRanges = {
      yesterday: true,
      last7days: true,
      last30days: true,
      thisMonth: true,
      lastMonth: true,
      custom: [
        {
          label: 'Custom Range',
          range: {
            from: { year: 2023, month: 1, day: 1 },
            to: { year: 2023, month: 1, day: 5 }
          }
        }
      ]
    }
    render(
      <CalendarGridView
        {...defaultProps}
        type='range'
        translations={customTranslations}
        presetRanges={presetRanges}
      />
    )

    // Check all preset buttons exist
    expect(
      screen.getByRole('button', { name: 'Yesterday' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Last 7 days' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Last 30' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'This month' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Last month' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Custom Range' })
    ).toBeInTheDocument()

    // Test clicking one triggers callback
    const yesterdayBtn = screen.getByRole('button', { name: 'Yesterday' })
    fireEvent.click(yesterdayBtn)
    expect(defaultProps.onPresetRangeSelect).toHaveBeenCalled()
  })

  it('disables dates based on constraints', () => {
    const constraints = {
      disabledDates: [{ year: 2023, month: 1, day: 20 }]
    }
    render(<CalendarGridView {...defaultProps} constraints={constraints} />)

    const disabledDay = screen.getByRole('gridcell', {
      name: /^20 January 2023$/i
    })
    expect(disabledDay).toBeDisabled()
    expect(disabledDay).toHaveClass('calendar-day-disabled')

    fireEvent.click(disabledDay)
    expect(defaultProps.onDateSelect).not.toHaveBeenCalled()
  })

  it('renders correctly for Persian locale (fa)', () => {
    render(
      <CalendarGridView
        {...defaultProps}
        calendarSystem='jalali'
        locale='fa'
        translations={faTranslations}
        displayMonth={{ year: 1402, month: 1, day: 1 }}
        todayBtn={true}
      />
    )

    // Check for "امروز" (Today in Persian)
    expect(screen.getByRole('button', { name: 'امروز' })).toBeInTheDocument()
  })

  it('highlights weekends when showWeekend is true', () => {
    render(<CalendarGridView {...defaultProps} showWeekend={true} />)

    // In English locale (ltr), Sunday (1st) and Saturday (7th) are weekends.
    // 1 Jan 2023 is Sunday.
    const sunday = screen.getByRole('gridcell', { name: /^1 January 2023$/i })
    expect(sunday).toHaveClass('calendar-day-weekend')

    const monday = screen.getByRole('gridcell', { name: /^2 January 2023$/i })
    expect(monday).not.toHaveClass('calendar-day-weekend')
  })

  it('highlights weekends correctly for Persian locale (fa)', () => {
    // 1 Farvardin 1402 starts on Tuesday.
    // If week starts on Saturday:
    // Sat(0), Sun(1), Mon(2), Tue(3)=1st, Wed(4)=2nd, Thu(5)=3rd, Fri(6)=4th
    // Thu and Fri are weekends in FA.

    render(
      <CalendarGridView
        {...defaultProps}
        calendarSystem='jalali'
        displayMonth={{ year: 1402, month: 1, day: 1 }}
        showWeekend={true}
      />
    )

    // Day 1 (Tuesday) - Not weekend
    const day1 = document.getElementById('day-1402-1-1')
    expect(day1).toBeInTheDocument()
    expect(day1).not.toHaveClass('calendar-day-weekend')

    // Day 3 (Thursday) - Weekend
    const day3 = document.getElementById('day-1402-1-3')
    expect(day3).toBeInTheDocument()
    expect(day3).toHaveClass('calendar-day-weekend')

    // Day 4 (Friday) - Weekend
    const day4 = document.getElementById('day-1402-1-4')
    expect(day4).toBeInTheDocument()
    expect(day4).toHaveClass('calendar-day-weekend')
  })

  it('highlights weekends correctly when weekStart is Monday', () => {
    // When weekStart is 1 (Monday), the grid shifts:
    // Mon(0), Tue(1), Wed(2), Thu(3), Fri(4), Sat(5), Sun(6)
    // So weekends should be Sat(5) and Sun(6) columns
    render(
      <CalendarGridView {...defaultProps} showWeekend={true} weekStart={1} />
    )

    // 1 Jan 2023 is Sunday, so it should be in the last column (Sun = 6)
    // and should be highlighted as weekend
    const sunday = screen.getByRole('gridcell', { name: /^1 January 2023$/i })
    expect(sunday).toHaveClass('calendar-day-weekend')

    // 7 Jan 2023 is Saturday, so it should be in column 5 and highlighted as weekend
    const saturday = screen.getByRole('gridcell', { name: /^7 January 2023$/i })
    expect(saturday).toHaveClass('calendar-day-weekend')

    // 3 Jan 2023 is Monday, should NOT be highlighted as weekend
    const monday = screen.getByRole('gridcell', { name: /^2 January 2023$/i })
    expect(monday).not.toHaveClass('calendar-day-weekend')
  })

  it('highlights weekends correctly for Jalali calendar when weekStart is Monday', () => {
    render(
      <CalendarGridView
        {...defaultProps}
        calendarSystem='jalali'
        displayMonth={{ year: 1402, month: 1, day: 1 }}
        showWeekend={true}
        weekStart={1}
      />
    )

    // In Jalali calendar, weekends are Thursday and Friday (Gregorian days 4 and 5)
    // With weekStart = 1 (Monday), the grid is: Mon, Tue, Wed, Thu, Fri, Sat, Sun
    // So Thursday should be at column 3, Friday at column 4

    // Check day names have correct weekend highlighting
    const dayNames = document.querySelectorAll('.calendar-day-name')
    expect(dayNames.length).toBe(7)

    // Thursday (index 3) should be weekend
    expect(dayNames[3]).toHaveClass('calendar-weekend')
    // Friday (index 4) should be weekend
    expect(dayNames[4]).toHaveClass('calendar-weekend')
    // Monday (index 0) should NOT be weekend
    expect(dayNames[0]).not.toHaveClass('calendar-weekend')
  })

  it('highlights weekends correctly for Jalali calendar with English locale', () => {
    render(
      <CalendarGridView
        {...defaultProps}
        calendarSystem='jalali'
        locale='en'
        displayMonth={{ year: 1402, month: 1, day: 1 }}
        showWeekend={true}
      />
    )

    // In Jalali calendar, weekends are Thursday and Friday
    // With default weekStart = 6 (Saturday), and English locale,
    // the day names should be rotated to start with Saturday

    // Check day names are in correct order: Sat, Sun, Mon, Tue, Wed, Thu, Fri
    const dayNames = document.querySelectorAll('.calendar-day-name')
    expect(dayNames.length).toBe(7)
    expect(dayNames[0]).toHaveTextContent('Sa') // Saturday
    expect(dayNames[1]).toHaveTextContent('Su') // Sunday
    expect(dayNames[2]).toHaveTextContent('Mo') // Monday
    expect(dayNames[5]).toHaveTextContent('Th') // Thursday
    expect(dayNames[6]).toHaveTextContent('Fr') // Friday

    // Thursday (index 5) should be weekend
    expect(dayNames[5]).toHaveClass('calendar-weekend')
    // Friday (index 6) should be weekend
    expect(dayNames[6]).toHaveClass('calendar-weekend')
    // Saturday (index 0) should NOT be weekend in Jalali calendar
    expect(dayNames[0]).not.toHaveClass('calendar-weekend')
  })

  describe('comprehensive calendar system, locale, weekStart, and showWeekend combinations', () => {
    const testCases = [
      // Gregorian calendar tests
      {
        name: 'Gregorian + English + default weekStart + showWeekend=true',
        props: {
          calendarSystem: 'gregorian' as const,
          locale: 'en' as const,
          showWeekend: true
        },
        expectedWeekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        weekendIndices: [0, 6], // Sunday and Saturday
        firstDayIndex: 0
      },
      {
        name: 'Gregorian + English + weekStart=1 + showWeekend=true',
        props: {
          calendarSystem: 'gregorian',
          locale: 'en',
          weekStart: 1,
          showWeekend: true
        },
        expectedWeekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        weekendIndices: [5, 6], // Saturday and Sunday (shifted by 1)
        firstDayIndex: 0
      },
      {
        name: 'Gregorian + Persian + default weekStart + showWeekend=true',
        props: {
          calendarSystem: 'gregorian' as const,
          locale: 'fa' as const,
          showWeekend: true
        },
        expectedWeekdays: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
        weekendIndices: [0, 6], // Sunday (یکشنبه) and Saturday (شنبه)
        firstDayIndex: 0
      },
      {
        name: 'Gregorian + Persian + weekStart=1 + showWeekend=true',
        props: {
          calendarSystem: 'gregorian',
          locale: 'fa',
          weekStart: 1,
          showWeekend: true
        },
        expectedWeekdays: ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'],
        weekendIndices: [5, 6], // Saturday and Sunday (shifted by 1)
        firstDayIndex: 0
      },

      // Jalali calendar tests
      {
        name: 'Jalali + Persian + default weekStart + showWeekend=true',
        props: {
          calendarSystem: 'jalali' as const,
          locale: 'fa' as const,
          showWeekend: true
        },
        expectedWeekdays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'], // Rotated by 6 from Sunday-first Persian
        weekendIndices: [5, 6], // Thursday (پنج‌شنبه) and Friday (جمعه)
        firstDayIndex: 0
      },
      {
        name: 'Jalali + Persian + weekStart=1 + showWeekend=true',
        props: {
          calendarSystem: 'jalali',
          locale: 'fa',
          weekStart: 1,
          showWeekend: true
        },
        expectedWeekdays: ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'], // Rotated by 1 from Sunday-first Persian
        weekendIndices: [3, 4], // Thursday and Friday (shifted positions)
        firstDayIndex: 0
      },
      {
        name: 'Jalali + English + default weekStart + showWeekend=true',
        props: {
          calendarSystem: 'jalali' as const,
          locale: 'en' as const,
          showWeekend: true
        },
        expectedWeekdays: ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'],
        weekendIndices: [5, 6], // Thursday and Friday
        firstDayIndex: 0
      },
      {
        name: 'Jalali + English + weekStart=1 + showWeekend=true',
        props: {
          calendarSystem: 'jalali',
          locale: 'en',
          weekStart: 1,
          showWeekend: true
        },
        expectedWeekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        weekendIndices: [3, 4], // Thursday and Friday (shifted positions)
        firstDayIndex: 0
      },

      // Tests with showWeekend=false
      {
        name: 'Gregorian + English + default weekStart + showWeekend=false',
        props: {
          calendarSystem: 'gregorian' as const,
          locale: 'en' as const,
          showWeekend: false
        },
        expectedWeekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        weekendIndices: [], // No weekends highlighted
        firstDayIndex: 0
      },
      {
        name: 'Jalali + Persian + default weekStart + showWeekend=false',
        props: {
          calendarSystem: 'jalali' as const,
          locale: 'fa' as const,
          showWeekend: false
        },
        expectedWeekdays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
        weekendIndices: [], // No weekends highlighted
        firstDayIndex: 0
      }
    ]

    testCases.forEach((testCase: (typeof testCases)[0]) => {
      const { name, props, expectedWeekdays, weekendIndices, firstDayIndex } =
        testCase
      it(name, () => {
        // Create mock translations that simulate what mergeTranslations would produce
        let mockTranslations =
          props.locale === 'fa' ? { ...faTranslations } : { ...enTranslations }

        // For any calendar + Persian locale, mergeTranslations rotates the weekdays to start with Sunday
        if (props.locale === 'fa') {
          mockTranslations = {
            ...faTranslations,
            weekdays: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'] // Persian weekdays rotated to Sunday first
          }
        }

        render(
          <CalendarGridView
            {...defaultProps}
            displayMonth={{
              year: props.calendarSystem === 'jalali' ? 1402 : 2023,
              month: 1,
              day: 1
            }}
            translations={mockTranslations}
            calendarSystem={props.calendarSystem as CalendarLocale}
            locale={props.locale as CalendarUILocale}
            showWeekend={props.showWeekend}
            weekStart={props.weekStart}
          />
        )

        const dayNames = document.querySelectorAll('.calendar-day-name')
        expect(dayNames.length).toBe(7)

        // Check weekday names are in correct order
        expectedWeekdays.forEach((expected, index) => {
          expect(dayNames[index]).toHaveTextContent(expected)
        })

        // Check weekend highlighting
        dayNames.forEach((dayName, index) => {
          if (weekendIndices.includes(index)) {
            expect(dayName).toHaveClass('calendar-weekend')
          } else {
            expect(dayName).not.toHaveClass('calendar-weekend')
          }
        })

        // Verify first day positioning
        expect(dayNames[firstDayIndex]).toHaveTextContent(expectedWeekdays[0])
      })
    })
  })

  it('renders range selection styles correctly', () => {
    const selectedRange = {
      from: { year: 2023, month: 1, day: 10 },
      to: { year: 2023, month: 1, day: 12 }
    }
    render(
      <CalendarGridView
        {...defaultProps}
        type='range'
        selectedValue={selectedRange}
      />
    )

    const startDay = screen.getByRole('gridcell', {
      name: /^10 January 2023$/i
    })
    const middleDay = screen.getByRole('gridcell', {
      name: /^11 January 2023$/i
    })
    const endDay = screen.getByRole('gridcell', { name: /^12 January 2023$/i })
    const outsideDay = screen.getByRole('gridcell', {
      name: /^13 January 2023$/i
    })

    expect(startDay).toHaveClass('calendar-day-selected')
    expect(startDay).toHaveClass('calendar-day-range-start')

    expect(middleDay).toHaveClass('calendar-day-in-range')
    expect(middleDay).not.toHaveClass('calendar-day-range-start')
    expect(middleDay).not.toHaveClass('calendar-day-range-end')

    expect(endDay).toHaveClass('calendar-day-selected')
    expect(endDay).toHaveClass('calendar-day-range-end')

    expect(outsideDay).not.toHaveClass('calendar-day-selected')
    expect(outsideDay).not.toHaveClass('calendar-day-in-range')
  })

  it('selects the start of the week when type is week', () => {
    render(<CalendarGridView {...defaultProps} type='week' />)

    // Click on Wednesday, Jan 11th 2023
    // Week starts on Sunday in EN locale.
    // Week for Jan 11th is Jan 8th (Sun) to Jan 14th (Sat).
    const wednesday = screen.getByRole('gridcell', {
      name: /^11 January 2023$/i
    })
    fireEvent.click(wednesday)

    expect(defaultProps.onDateSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        year: 2023,
        month: 1,
        day: 8
      })
    )
  })

  it('disables dates outside minDate and maxDate', () => {
    const constraints = {
      minDate: { year: 2023, month: 1, day: 10 },
      maxDate: { year: 2023, month: 1, day: 20 }
    }
    render(<CalendarGridView {...defaultProps} constraints={constraints} />)

    const beforeMin = screen.getByRole('gridcell', {
      name: /^9 January 2023$/i
    })
    const atMin = screen.getByRole('gridcell', { name: /^10 January 2023$/i })
    const atMax = screen.getByRole('gridcell', { name: /^20 January 2023$/i })
    const afterMax = screen.getByRole('gridcell', {
      name: /^21 January 2023$/i
    })

    expect(beforeMin).toBeDisabled()
    expect(atMin).not.toBeDisabled()
    expect(atMax).not.toBeDisabled()
    expect(afterMax).toBeDisabled()
  })

  it('disables dates using isDateDisabled function', () => {
    const isDateDisabled = (date: Day) => date.day % 2 === 0 // Disable even days
    render(
      <CalendarGridView {...defaultProps} constraints={{ isDateDisabled }} />
    )

    const evenDay = screen.getByRole('gridcell', { name: /^2 January 2023$/i })
    const oddDay = screen.getByRole('gridcell', { name: /^3 January 2023$/i })

    expect(evenDay).toBeDisabled()
    expect(evenDay).toHaveClass('calendar-day-disabled')

    expect(oddDay).not.toBeDisabled()
    expect(oddDay).not.toHaveClass('calendar-day-disabled')

    fireEvent.click(evenDay)
    expect(defaultProps.onDateSelect).not.toHaveBeenCalled()

    fireEvent.click(oddDay)
    expect(defaultProps.onDateSelect).toHaveBeenCalledWith(
      expect.objectContaining({ day: 3 })
    )
  })

  describe('Translation Integration', () => {
    it('renders weekday names from translations', () => {
      render(<CalendarGridView {...defaultProps} />)

      // English weekday abbreviations
      expect(screen.getByText('Su')).toBeInTheDocument()
      expect(screen.getByText('Mo')).toBeInTheDocument()
      expect(screen.getByText('Tu')).toBeInTheDocument()
      expect(screen.getByText('We')).toBeInTheDocument()
      expect(screen.getByText('Th')).toBeInTheDocument()
      expect(screen.getByText('Fr')).toBeInTheDocument()
      expect(screen.getByText('Sa')).toBeInTheDocument()
    })

    it('renders Today button text from translations', () => {
      render(<CalendarGridView {...defaultProps} todayBtn={true} />)

      expect(screen.getByText('Today')).toBeInTheDocument()
    })

    it('renders From/To labels for range time selectors from translations', () => {
      render(
        <CalendarGridView
          {...defaultProps}
          type='range'
          withTime={true}
          selectedValue={{
            from: { year: 2023, month: 1, day: 1 },
            to: { year: 2023, month: 1, day: 2 }
          }}
        />
      )

      expect(screen.getByText('From')).toBeInTheDocument()
      expect(screen.getByText('To')).toBeInTheDocument()
    })

    it('applies LTR direction for English translations', () => {
      const { container } = render(<CalendarGridView {...defaultProps} />)

      const calendarCore = container.querySelector('.calendar-core')
      expect(calendarCore).toHaveAttribute('dir', 'ltr')
    })

    it('applies RTL direction for Persian translations', () => {
      const { container } = render(
        <CalendarGridView {...defaultProps} translations={faTranslations} />
      )

      const calendarCore = container.querySelector('.calendar-core')
      expect(calendarCore).toHaveAttribute('dir', 'rtl')
    })

    it('renders Persian Today button text', () => {
      render(
        <CalendarGridView
          {...defaultProps}
          translations={faTranslations}
          todayBtn={true}
        />
      )

      expect(screen.getByText('امروز')).toBeInTheDocument()
    })

    it('renders custom translations correctly', () => {
      const customTranslations = {
        ...enTranslations,
        labels: {
          ...enTranslations.labels,
          today: 'Pick Today!'
        }
      }

      render(
        <CalendarGridView
          {...defaultProps}
          translations={customTranslations}
          todayBtn={true}
        />
      )

      expect(screen.getByText('Pick Today!')).toBeInTheDocument()
    })

    it('renders preset range buttons with translated labels', () => {
      render(
        <CalendarGridView
          {...defaultProps}
          type='range'
          presetRanges={{
            yesterday: true,
            last7days: true,
            thisMonth: true
          }}
        />
      )

      expect(screen.getByText('Yesterday')).toBeInTheDocument()
      expect(screen.getByText('Last 7 days')).toBeInTheDocument()
      expect(screen.getByText('This month')).toBeInTheDocument()
    })

    it('renders custom preset range labels', () => {
      const customTranslations = {
        ...enTranslations,
        presetRanges: {
          ...enTranslations.presetRanges,
          yesterday: 'Ayer',
          last7days: 'Últimos 7 días'
        }
      }

      render(
        <CalendarGridView
          {...defaultProps}
          type='range'
          translations={customTranslations}
          presetRanges={{
            yesterday: true,
            last7days: true
          }}
        />
      )

      expect(screen.getByText('Ayer')).toBeInTheDocument()
      expect(screen.getByText('Últimos 7 días')).toBeInTheDocument()
    })
  })
})
