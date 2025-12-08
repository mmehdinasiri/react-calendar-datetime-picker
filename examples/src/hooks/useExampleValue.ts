/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import { normalizeInitValue } from 'react-calendar-datetime-picker'
import type { Day, Range, Multi } from 'react-calendar-datetime-picker'

export const useExampleValue = (
  initValue: unknown,
  locale: 'en' | 'fa',
  type: 'single' | 'range' | 'multi' | 'week'
) => {
  // Map locale to calendar system
  const calendarSystem = locale === 'fa' ? 'jalali' : 'gregorian'

  const [selectedValue, setSelectedValue] = useState<
    Day | Range | Multi | null
  >(() => {
    if (initValue) {
      return normalizeInitValue(initValue, calendarSystem, type) as
        | Day
        | Range
        | Multi
        | null
    }
    return null
  })

  // Update selectedValue when initValue prop changes
  useEffect(() => {
    if (initValue) {
      const normalized = normalizeInitValue(initValue, calendarSystem, type) as
        | Day
        | Range
        | Multi
        | null
      setSelectedValue(normalized)
    } else {
      setSelectedValue(null)
    }
  }, [initValue, calendarSystem, type])

  const handleChange = (date: unknown) => {
    setSelectedValue(date as Day | Range | Multi | null)
  }

  return {
    selectedValue,
    setSelectedValue,
    handleChange
  }
}
