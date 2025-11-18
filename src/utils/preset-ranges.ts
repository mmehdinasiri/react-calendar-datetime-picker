/**
 * Preset date range utilities
 * Calculate common date ranges for quick selection
 */

import type { Day, Range, CalendarLocale } from '../types'
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
  value: PresetRangeType
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
      return {
        from: sevenDaysAgo,
        to: today
      }
    }

    case 'last30days': {
      const thirtyDaysAgoDate = new Date(todayDate)
      thirtyDaysAgoDate.setDate(thirtyDaysAgoDate.getDate() - 29) // 29 days ago + today = 30 days
      const thirtyDaysAgo = dateToDay(thirtyDaysAgoDate, locale)
      return {
        from: thirtyDaysAgo,
        to: today
      }
    }

    case 'thisMonth': {
      const firstDayOfMonth: Day = {
        year: today.year,
        month: today.month,
        day: 1
      }
      // Get the last day of the current month
      const daysInMonth = getDaysInMonth(today.year, today.month, locale)
      const lastDayOfMonth: Day = {
        year: today.year,
        month: today.month,
        day: daysInMonth
      }
      return {
        from: firstDayOfMonth,
        to: lastDayOfMonth
      }
    }

    case 'lastMonth': {
      // Calculate last month
      let lastMonth = today.month - 1
      let lastMonthYear = today.year
      if (lastMonth < 1) {
        lastMonth = 12
        lastMonthYear = today.year - 1
      }

      // Get days in last month
      const lastMonthFirstDay: Day = {
        year: lastMonthYear,
        month: lastMonth,
        day: 1
      }

      // Calculate last day of last month
      const lastMonthFirstDate = dayToDate(lastMonthFirstDay, locale)
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
        from: today,
        to: today
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

  return presets
}
