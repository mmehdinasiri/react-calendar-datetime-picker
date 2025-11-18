/**
 * Preset date range utilities
 * Calculate common date ranges for quick selection
 */

import type { Range, CalendarLocale } from '../types'
import { getToday, dateToDay, dayToDate } from './date-conversion'
import { getDaysInMonth } from './validation'

export type PresetRangeType =
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'thisMonth'
  | 'lastMonth'

export interface PresetRange {
  label: string
  value: PresetRangeType | 'custom'
  range: Range
}

/**
 * Calculate preset date ranges
 */
export function getPresetRange(
  preset: PresetRangeType,
  locale: CalendarLocale
): Range {
  const today = getToday(locale)
  const todayDate = dayToDate(today, locale)
  // Use dateToDay to preserve time from current date
  const todayWithTime = dateToDay(todayDate, locale)

  switch (preset) {
    case 'yesterday': {
      const yesterdayDate = new Date(todayDate)
      yesterdayDate.setDate(yesterdayDate.getDate() - 1)
      const yesterday = dateToDay(yesterdayDate, locale)
      return {
        from: yesterday,
        to: yesterday
      }
    }

    case 'last7days': {
      const sevenDaysAgoDate = new Date(todayDate)
      sevenDaysAgoDate.setDate(sevenDaysAgoDate.getDate() - 6) // 6 days ago + today = 7 days
      const sevenDaysAgo = dateToDay(sevenDaysAgoDate, locale)
      // Use todayWithTime to preserve time
      return {
        from: sevenDaysAgo,
        to: todayWithTime
      }
    }

    case 'last30days': {
      const thirtyDaysAgoDate = new Date(todayDate)
      thirtyDaysAgoDate.setDate(thirtyDaysAgoDate.getDate() - 29) // 29 days ago + today = 30 days
      const thirtyDaysAgo = dateToDay(thirtyDaysAgoDate, locale)
      // Use todayWithTime to preserve time
      return {
        from: thirtyDaysAgo,
        to: todayWithTime
      }
    }

    case 'thisMonth': {
      // Create first day of month with time from today
      const firstDayOfMonthDate = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        1
      )
      const firstDayOfMonth = dateToDay(firstDayOfMonthDate, locale)

      // Get the last day of the current month with time from today
      const daysInMonth = getDaysInMonth(today.year, today.month, locale)
      const lastDayOfMonthDate = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        daysInMonth
      )
      const lastDayOfMonth = dateToDay(lastDayOfMonthDate, locale)

      return {
        from: firstDayOfMonth,
        to: lastDayOfMonth
      }
    }

    case 'lastMonth': {
      // Get first day of last month with time
      const lastMonthFirstDate = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth() - 1,
        1
      )
      if (
        lastMonthFirstDate.getMonth() !== todayDate.getMonth() - 1 &&
        todayDate.getMonth() === 0
      ) {
        // Handle year boundary
        lastMonthFirstDate.setFullYear(todayDate.getFullYear() - 1)
        lastMonthFirstDate.setMonth(11)
      }
      const lastMonthFirstDay = dateToDay(lastMonthFirstDate, locale)

      // Calculate last day of last month with time
      const lastDayOfLastMonthDate = new Date(
        lastMonthFirstDate.getFullYear(),
        lastMonthFirstDate.getMonth() + 1,
        0
      )
      const lastDayOfLastMonth = dateToDay(lastDayOfLastMonthDate, locale)

      return {
        from: lastMonthFirstDay,
        to: lastDayOfLastMonth
      }
    }

    default:
      return {
        from: todayWithTime,
        to: todayWithTime
      }
  }
}

/**
 * Get default label for a preset range type
 */
export function getPresetLabel(
  preset: PresetRangeType,
  locale: CalendarLocale
): string {
  const labels: Record<PresetRangeType, { en: string; fa: string }> = {
    yesterday: { en: 'Yesterday', fa: 'دیروز' },
    last7days: { en: 'Last 7 days', fa: '۷ روز گذشته' },
    last30days: { en: 'Last 30 days', fa: '۳۰ روز گذشته' },
    thisMonth: { en: 'This month', fa: 'این ماه' },
    lastMonth: { en: 'Last month', fa: 'ماه گذشته' }
  }

  return labels[preset][locale === 'fa' ? 'fa' : 'en']
}

/**
 * Get preset ranges based on configuration
 */
export function getPresetRangesFromConfig(
  config: import('../types/calendar').PresetRangesConfig,
  locale: CalendarLocale
): PresetRange[] {
  if (!config) {
    return []
  }

  const presets: PresetRange[] = []
  const allPresetTypes: PresetRangeType[] = [
    'yesterday',
    'last7days',
    'last30days',
    'thisMonth',
    'lastMonth'
  ]

  allPresetTypes.forEach((presetType) => {
    const configValue = config[presetType]
    if (configValue !== undefined) {
      const label =
        typeof configValue === 'string'
          ? configValue
          : getPresetLabel(presetType, locale)
      presets.push({
        label,
        value: presetType,
        range: getPresetRange(presetType, locale)
      })
    }
  })

  // Add custom preset ranges if provided
  if (config.custom && Array.isArray(config.custom)) {
    config.custom.forEach((customPreset) => {
      presets.push({
        label: customPreset.label,
        value: 'custom' as const,
        range: {
          from: customPreset.range.from,
          to: customPreset.range.to
        }
      })
    })
  }

  return presets
}

/**
 * Check if a preset range matches the current selected range
 */
export function isPresetRangeActive(
  presetRange: Range,
  selectedRange: Range | null,
  _locale: CalendarLocale
): boolean {
  if (!selectedRange || !selectedRange.from || !selectedRange.to) {
    return false
  }

  // Compare dates ignoring time
  const presetFrom = presetRange.from
  const presetTo = presetRange.to
  const selectedFrom = selectedRange.from
  const selectedTo = selectedRange.to

  return (
    presetFrom.year === selectedFrom.year &&
    presetFrom.month === selectedFrom.month &&
    presetFrom.day === selectedFrom.day &&
    presetTo.year === selectedTo.year &&
    presetTo.month === selectedTo.month &&
    presetTo.day === selectedTo.day
  )
}
