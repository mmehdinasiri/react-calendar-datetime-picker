/**
 * Time Selector Component
 * Allows users to select hour and minute values
 */

import React from 'react'
import type { Day } from '../types'
import { toPersianNumeral } from '../utils/formatting'

export interface TimeSelectorProps {
  /** Current day value */
  day: Day | null
  /** Time format: '12' for 12-hour format, '24' for 24-hour format */
  timeFormat: '12' | '24'
  /** Calendar locale */
  locale: 'en' | 'fa'
  /** Label for the time selector */
  label?: string
  /** Whether the time selector is disabled */
  disabled?: boolean
  /** Callback when time changes */
  onTimeChange: (hour: number, minute: number) => void
}

export const TimeSelector: React.FC<TimeSelectorProps> = (props) => {
  const { day, timeFormat, locale, label, disabled = false, onTimeChange } = props

  // Get current hour and minute, default to 0 if not set
  const currentHour = day?.hour ?? 0
  const currentMinute = day?.minute ?? 0

  // For 12-hour format, convert to 12-hour display (1-12) and track AM/PM
  const is24Hour = timeFormat === '24'
  const displayHour = is24Hour
    ? currentHour
    : currentHour === 0
      ? 12
      : currentHour > 12
        ? currentHour - 12
        : currentHour
  const isPM = !is24Hour && currentHour >= 12

  // Generate hour options
  const maxHour = is24Hour ? 23 : 12
  const minHour = is24Hour ? 0 : 1
  const hourOptions: number[] = []
  for (let i = minHour; i <= maxHour; i++) {
    hourOptions.push(i)
  }

  // Generate minute options (0-59)
  const minuteOptions: number[] = []
  for (let i = 0; i <= 59; i++) {
    minuteOptions.push(i)
  }

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDisplayHour = parseInt(e.target.value, 10)
    let newHour: number

    if (is24Hour) {
      newHour = selectedDisplayHour
    } else {
      // Convert 12-hour format back to 24-hour format
      if (selectedDisplayHour === 12) {
        newHour = isPM ? 12 : 0
      } else {
        newHour = isPM ? selectedDisplayHour + 12 : selectedDisplayHour
      }
    }

    onTimeChange(newHour, currentMinute)
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMinute = parseInt(e.target.value, 10)
    onTimeChange(currentHour, newMinute)
  }

  const handleAMPMChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newIsPM = e.target.value === 'PM'
    let newHour: number

    if (displayHour === 12) {
      newHour = newIsPM ? 12 : 0
    } else {
      newHour = newIsPM ? displayHour + 12 : displayHour
    }

    onTimeChange(newHour, currentMinute)
  }

  const formatNumber = (num: number): string => {
    const str = num.toString().padStart(2, '0')
    return locale === 'fa' ? toPersianNumeral(str) : str
  }

  return (
    <div className={`time-selector ${disabled ? 'time-selector-disabled' : ''}`}>
      {label && <label className='time-selector-label'>{label}</label>}
      <div className='time-selector-inputs'>
        {/* Hour selector */}
        <select
          className='time-selector-hour'
          value={displayHour}
          onChange={handleHourChange}
          disabled={disabled}
          aria-label='Hour'
        >
          {hourOptions.map((hour) => (
            <option key={hour} value={hour}>
              {formatNumber(hour)}
            </option>
          ))}
        </select>

        <span className='time-selector-separator'>:</span>

        {/* Minute selector */}
        <select
          className='time-selector-minute'
          value={currentMinute}
          onChange={handleMinuteChange}
          disabled={disabled}
          aria-label='Minute'
        >
          {minuteOptions.map((minute) => (
            <option key={minute} value={minute}>
              {formatNumber(minute)}
            </option>
          ))}
        </select>

        {/* AM/PM selector (only for 12-hour format) */}
        {!is24Hour && (
          <select
            className='time-selector-ampm'
            value={isPM ? 'PM' : 'AM'}
            onChange={handleAMPMChange}
            disabled={disabled}
            aria-label='AM/PM'
          >
            <option value='AM'>{locale === 'fa' ? 'ق.ظ' : 'AM'}</option>
            <option value='PM'>{locale === 'fa' ? 'ب.ظ' : 'PM'}</option>
          </select>
        )}
      </div>
    </div>
  )
}

TimeSelector.displayName = 'TimeSelector'

