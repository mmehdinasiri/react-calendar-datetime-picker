import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TimeSelector } from '@/components/TimeSelector'
import { enTranslations, faTranslations } from '@/utils/translations'
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
        translations={enTranslations}
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
        translations={enTranslations}
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
        translations={enTranslations}
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
        translations={enTranslations}
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
        translations={enTranslations}
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
        translations={enTranslations}
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
        translations={enTranslations}
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
        translations={enTranslations}
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
        translations={enTranslations}
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
        translations={faTranslations}
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
        translations={faTranslations}
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
        translations={enTranslations}
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
        translations={enTranslations}
        onTimeChange={mockOnTimeChange}
      />
    )

    const hourSelect = screen.getByLabelText('Hour') as HTMLSelectElement
    const minuteSelect = screen.getByLabelText('Minute') as HTMLSelectElement

    // Should default to 00:00
    expect(hourSelect.value).toBe('0')
    expect(minuteSelect.value).toBe('0')
  })

  describe('Translation Integration', () => {
    it('renders AM/PM options from English translations', () => {
      render(
        <TimeSelector
          day={defaultDay}
          timeFormat='12'
          translations={enTranslations}
          onTimeChange={mockOnTimeChange}
        />
      )

      const amPmSelect = screen.getByLabelText('AM/PM') as HTMLSelectElement
      expect(amPmSelect).toBeInTheDocument()

      // Should have AM and PM options
      expect(screen.getByRole('option', { name: 'AM' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'PM' })).toBeInTheDocument()
    })

    it('renders Persian AM/PM options', () => {
      render(
        <TimeSelector
          day={defaultDay}
          timeFormat='12'
          translations={faTranslations}
          onTimeChange={mockOnTimeChange}
        />
      )

      const amPmSelect = screen.getByLabelText('AM/PM') as HTMLSelectElement
      expect(amPmSelect).toBeInTheDocument()

      // Should have Persian AM/PM options
      expect(screen.getByRole('option', { name: 'ق.ظ' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'ب.ظ' })).toBeInTheDocument()
    })

    it('uses Persian numerals for Persian translations', () => {
      render(
        <TimeSelector
          day={defaultDay} // 14:30
          timeFormat='24'
          translations={faTranslations}
          onTimeChange={mockOnTimeChange}
        />
      )

      // Check that Persian numerals are used (mocked to add P- prefix)
      expect(screen.getByDisplayValue('P-14')).toBeInTheDocument()
      expect(screen.getByDisplayValue('P-30')).toBeInTheDocument()
    })

    it('uses From/To labels for range time selectors', () => {
      render(
        <TimeSelector
          day={defaultDay}
          timeFormat='24'
          translations={enTranslations}
          label='From'
          onTimeChange={mockOnTimeChange}
        />
      )

      expect(screen.getByText('From')).toBeInTheDocument()
    })

    it('renders Persian From label', () => {
      render(
        <TimeSelector
          day={defaultDay}
          timeFormat='24'
          translations={faTranslations}
          label={faTranslations.labels.timeFrom}
          onTimeChange={mockOnTimeChange}
        />
      )

      // Persian "From" label
      expect(screen.getByText('از')).toBeInTheDocument()
    })

    it('renders Persian To label', () => {
      render(
        <TimeSelector
          day={defaultDay}
          timeFormat='24'
          translations={faTranslations}
          label={faTranslations.labels.timeTo}
          onTimeChange={mockOnTimeChange}
        />
      )

      // Persian "To" label
      expect(screen.getByText('تا')).toBeInTheDocument()
    })

    it('handles time change correctly with translations', () => {
      render(
        <TimeSelector
          day={defaultDay}
          timeFormat='12'
          translations={enTranslations}
          onTimeChange={mockOnTimeChange}
        />
      )

      const hourSelect = screen.getByLabelText('Hour')
      const amPmSelect = screen.getByLabelText('AM/PM')

      fireEvent.change(hourSelect, { target: { value: '3' } })
      fireEvent.change(amPmSelect, { target: { value: 'PM' } })

      // Should be called with the final value (3 PM = 15 in 24h, minute stays 30)
      expect(mockOnTimeChange).toHaveBeenCalledWith(15, 30)
    })

    it('shows correct 12-hour time values', () => {
      const afternoonDay: Day = {
        year: 2023,
        month: 1,
        day: 1,
        hour: 15,
        minute: 20
      } // 3:20 PM

      render(
        <TimeSelector
          day={afternoonDay}
          timeFormat='12'
          translations={enTranslations}
          onTimeChange={mockOnTimeChange}
        />
      )

      const hourSelect = screen.getByLabelText('Hour') as HTMLSelectElement
      const minuteSelect = screen.getByLabelText('Minute') as HTMLSelectElement
      const amPmSelect = screen.getByLabelText('AM/PM') as HTMLSelectElement

      expect(hourSelect.value).toBe('3')
      expect(minuteSelect.value).toBe('20')
      expect(amPmSelect.value).toBe('PM')
    })

    it('converts 12-hour PM to 24-hour correctly', () => {
      render(
        <TimeSelector
          day={defaultDay}
          timeFormat='12'
          translations={enTranslations}
          onTimeChange={mockOnTimeChange}
        />
      )

      const hourSelect = screen.getByLabelText('Hour')
      const amPmSelect = screen.getByLabelText('AM/PM')

      fireEvent.change(hourSelect, { target: { value: '2' } })
      fireEvent.change(amPmSelect, { target: { value: 'PM' } })

      expect(mockOnTimeChange).toHaveBeenCalledWith(14, 30) // 2 PM = 14 in 24h
    })
  })
})
