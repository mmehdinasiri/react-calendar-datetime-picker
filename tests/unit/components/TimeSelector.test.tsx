import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TimeSelector } from '@/components/TimeSelector'
import type { Day } from '@/types'

// Mock utils
vi.mock('@/utils/formatting', () => ({
  toPersianNumeral: (val: any) => `P-${val}`
}))

describe('TimeSelector', () => {
  const mockOnTimeChange = vi.fn()
  const defaultDay: Day = { year: 2023, month: 1, day: 1, hour: 14, minute: 30 } // 2:30 PM

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(
      <TimeSelector
        day={defaultDay}
        timeFormat='24'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    expect(screen.getByLabelText('Hour')).toBeInTheDocument()
    expect(screen.getByLabelText('Minute')).toBeInTheDocument()
    // Should not show AM/PM for 24h
    expect(screen.queryByLabelText('AM/PM')).not.toBeInTheDocument()
  })

  it('renders with 24-hour format', () => {
    render(
      <TimeSelector
        day={defaultDay} // 14:30
        timeFormat='24'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const hourSelect = screen.getByLabelText('Hour') as HTMLSelectElement
    const minuteSelect = screen.getByLabelText('Minute') as HTMLSelectElement

    expect(hourSelect.value).toBe('14')
    expect(minuteSelect.value).toBe('30')

    // Check hour options range 0-23
    expect(hourSelect.options.length).toBe(24)
    expect(hourSelect.options[0].value).toBe('0')
    expect(hourSelect.options[23].value).toBe('23')
  })

  it('renders with 12-hour format', () => {
    render(
      <TimeSelector
        day={defaultDay} // 14:30 -> 2:30 PM
        timeFormat='12'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const hourSelect = screen.getByLabelText('Hour') as HTMLSelectElement
    const ampmSelect = screen.getByLabelText('AM/PM') as HTMLSelectElement

    expect(hourSelect.value).toBe('2')
    expect(ampmSelect.value).toBe('PM')

    // Check hour options range 1-12
    expect(hourSelect.options.length).toBe(12)
    expect(hourSelect.options[0].value).toBe('1')
    expect(hourSelect.options[11].value).toBe('12')
  })

  it('handles midnight correctly in 12-hour format', () => {
    const midnightDay: Day = {
      year: 2023,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0
    }

    render(
      <TimeSelector
        day={midnightDay}
        timeFormat='12'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const hourSelect = screen.getByLabelText('Hour') as HTMLSelectElement
    const ampmSelect = screen.getByLabelText('AM/PM') as HTMLSelectElement

    expect(hourSelect.value).toBe('12')
    expect(ampmSelect.value).toBe('AM')
  })

  it('handles hour change', () => {
    render(
      <TimeSelector
        day={defaultDay} // 14:30
        timeFormat='24'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const hourSelect = screen.getByLabelText('Hour')
    fireEvent.change(hourSelect, { target: { value: '10' } })

    expect(mockOnTimeChange).toHaveBeenCalledWith(10, 30)
  })

  it('handles minute change', () => {
    render(
      <TimeSelector
        day={defaultDay} // 14:30
        timeFormat='24'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const minuteSelect = screen.getByLabelText('Minute')
    fireEvent.change(minuteSelect, { target: { value: '45' } })

    expect(mockOnTimeChange).toHaveBeenCalledWith(14, 45)
  })

  it('handles AM/PM change', () => {
    render(
      <TimeSelector
        day={defaultDay} // 14:30 (2:30 PM)
        timeFormat='12'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const ampmSelect = screen.getByLabelText('AM/PM')
    fireEvent.change(ampmSelect, { target: { value: 'AM' } })

    // Should change to 2:30 AM (hour 2)
    expect(mockOnTimeChange).toHaveBeenCalledWith(2, 30)
  })

  it('handles hour change in 12-hour format (PM)', () => {
    render(
      <TimeSelector
        day={defaultDay} // 14:30 (2:30 PM)
        timeFormat='12'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const hourSelect = screen.getByLabelText('Hour')
    // Change to 5 (which means 5 PM since current is PM)
    fireEvent.change(hourSelect, { target: { value: '5' } })

    // 5 PM -> 17:00
    expect(mockOnTimeChange).toHaveBeenCalledWith(17, 30)
  })

  it('handles hour change in 12-hour format (AM)', () => {
    const amDay: Day = { year: 2023, month: 1, day: 1, hour: 2, minute: 30 } // 2:30 AM

    render(
      <TimeSelector
        day={amDay}
        timeFormat='12'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const hourSelect = screen.getByLabelText('Hour')
    // Change to 5 (which means 5 AM)
    fireEvent.change(hourSelect, { target: { value: '5' } })

    expect(mockOnTimeChange).toHaveBeenCalledWith(5, 30)
  })

  it('renders correctly for "jalali" locale', () => {
    render(
      <TimeSelector
        day={defaultDay}
        timeFormat='24'
        calendarSystem='jalali'
        onTimeChange={mockOnTimeChange}
      />
    )

    // Check if Persian numerals are used (we mocked them as P-XX)
    const hourSelect = screen.getByLabelText('Hour') as HTMLSelectElement
    // 14 should be formatted
    expect(hourSelect.options[14].text).toBe('P-14')
  })

  it('renders Persian labels for AM/PM in 12-hour format', () => {
    render(
      <TimeSelector
        day={defaultDay}
        timeFormat='12'
        calendarSystem='jalali'
        onTimeChange={mockOnTimeChange}
      />
    )

    const ampmSelect = screen.getByLabelText('AM/PM') as HTMLSelectElement
    expect(ampmSelect.options[0].text).toBe('ق.ظ') // AM
    expect(ampmSelect.options[1].text).toBe('ب.ظ') // PM
  })

  it('respects disabled prop', () => {
    render(
      <TimeSelector
        day={defaultDay}
        timeFormat='24'
        calendarSystem='gregorian'
        disabled={true}
        onTimeChange={mockOnTimeChange}
      />
    )

    expect(screen.getByLabelText('Hour')).toBeDisabled()
    expect(screen.getByLabelText('Minute')).toBeDisabled()
  })

  it('handles null day prop gracefully', () => {
    render(
      <TimeSelector
        day={null}
        timeFormat='24'
        calendarSystem='gregorian'
        onTimeChange={mockOnTimeChange}
      />
    )

    const hourSelect = screen.getByLabelText('Hour') as HTMLSelectElement
    const minuteSelect = screen.getByLabelText('Minute') as HTMLSelectElement

    // Should default to 00:00
    expect(hourSelect.value).toBe('0')
    expect(minuteSelect.value).toBe('0')
  })
})
