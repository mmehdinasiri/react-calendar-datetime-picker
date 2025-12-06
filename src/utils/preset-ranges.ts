/**
 * Preset date range utilities
 * Calculate common date ranges for quick selection
 */

import type { Range, CalendarLocale } from '../types'
import { getToday } from './date-conversion'
import {
  startOfMonth,
  endOfMonth,
  subtractMonths,
  subtractDays
} from './date-comparison'

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
  calendarSystem: CalendarLocale
): Range {
  const today = getToday(calendarSystem)
  // Ensure time is preserved or set to current time
  // getToday already returns current time in local day

  switch (preset) {
    case 'yesterday': {
      const yesterday = subtractDays(today, 1, calendarSystem)
      return {
        from: yesterday,
        to: yesterday
      }
    }

    case 'last7days': {
      const sevenDaysAgo = subtractDays(today, 6, calendarSystem)
      return {
        from: sevenDaysAgo,
        to: today
      }
    }

    case 'last30days': {
      const thirtyDaysAgo = subtractDays(today, 29, calendarSystem)
      return {
        from: thirtyDaysAgo,
        to: today
      }
    }

    case 'thisMonth': {
      const firstDay = startOfMonth(today, calendarSystem)
      const lastDay = endOfMonth(today, calendarSystem)

      // Preserve time from today if needed, or default to start/end of day
      // Currently getPresetRange implementation returned today's time for end dates
      // But startOfMonth sets time to 00:00.
      // Let's match previous behavior: from has 00:00 (via startOfMonth logic? No, prev impl used dateToDay(new Date(y, m, 1)))
      // Wait, dateToDay(new Date(y, m, 1)) sets time to 00:00 implicitly if not provided.
      // The previous implementation used `todayDate` time for end dates in 'last7days' etc.
      // For 'thisMonth', it used `new Date(y, m, 1)` -> 00:00.

      // Let's check startOfMonth implementation in date-comparison.ts
      // It sets hour: 0, minute: 0.

      return {
        from: firstDay,
        to: lastDay
      }
    }

    case 'lastMonth': {
      const lastMonthToday = subtractMonths(today, 1, calendarSystem)
      const firstDay = startOfMonth(lastMonthToday, calendarSystem)
      const lastDay = endOfMonth(lastMonthToday, calendarSystem)

      return {
        from: firstDay,
        to: lastDay
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
  calendarSystem: CalendarLocale
): string {
  const labels: Record<PresetRangeType, { en: string; fa: string }> = {
    yesterday: { en: 'Yesterday', fa: 'دیروز' },
    last7days: { en: 'Last 7 days', fa: '۷ روز گذشته' },
    last30days: { en: 'Last 30 days', fa: '۳۰ روز گذشته' },
    thisMonth: { en: 'This month', fa: 'این ماه' },
    lastMonth: { en: 'Last month', fa: 'ماه گذشته' }
  }

  return labels[preset][calendarSystem === 'jalali' ? 'fa' : 'en']
}

/**
 * Get preset ranges based on configuration
 */
export function getPresetRangesFromConfig(
  config: import('../types/calendar').PresetRangesConfig,
  calendarSystem: CalendarLocale
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
          : getPresetLabel(presetType, calendarSystem)
      presets.push({
        label,
        value: presetType,
        range: getPresetRange(presetType, calendarSystem)
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
  _calendarSystem: CalendarLocale
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
