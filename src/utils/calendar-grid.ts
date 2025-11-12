/**
 * Calendar grid generation utilities
 * Generates calendar grids for both Gregorian and Jalali calendars
 */

import type { Day, CalendarLocale } from '../types'
import { getDaysInMonth } from './validation'
import { jalaliToGregorian, getToday } from './date-conversion'

/**
 * Calendar day with metadata
 */
export interface CalendarDay {
  /** The day value (1-31) */
  day: number
  /** The month this day belongs to (1-12) */
  month: number
  /** The year this day belongs to */
  year: number
  /** Whether this day is in the current displayed month */
  isCurrentMonth: boolean
  /** Whether this day is today */
  isToday: boolean
  /** Full Day object for this date */
  dayObject: Day
}

/**
 * Get the first day of the week for a given locale
 * Gregorian: Sunday (0), Jalali: Saturday (6)
 */
function getFirstDayOfWeek(locale: CalendarLocale): number {
  return locale === 'fa' ? 6 : 0 // Saturday for Jalali, Sunday for Gregorian
}

/**
 * Get day names for a given locale
 */
export function getDayNames(locale: CalendarLocale): string[] {
  if (locale === 'fa') {
    // Jalali: Saturday to Friday
    return ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] // ش = Saturday, ج = Friday
  } else {
    // Gregorian: Sunday to Saturday
    return ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  }
}

/**
 * Get month names for a given locale
 */
export function getMonthNames(locale: CalendarLocale): string[] {
  if (locale === 'fa') {
    return [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند'
    ]
  } else {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }
}

/**
 * Get the day of week for a given date (0 = Sunday, 6 = Saturday for Gregorian)
 * For Jalali: 0 = Saturday, 6 = Friday
 */
function getDayOfWeek(
  year: number,
  month: number,
  day: number,
  locale: CalendarLocale
): number {
  if (locale === 'fa') {
    // For Jalali, convert to Gregorian first to use JavaScript Date
    const jalaliDay: Day = { year, month, day }
    const gregorianDay = jalaliToGregorian(jalaliDay)
    const date = new Date(
      gregorianDay.year,
      gregorianDay.month - 1,
      gregorianDay.day
    )
    // Jalali calendar starts on Saturday, so we adjust
    const gregorianDayOfWeek = date.getDay() // 0 = Sunday, 6 = Saturday
    // Convert: Saturday (6) -> 0, Sunday (0) -> 1, ..., Friday (5) -> 6
    return (gregorianDayOfWeek + 1) % 7
  } else {
    // Gregorian: use JavaScript Date directly
    const date = new Date(year, month - 1, day)
    return date.getDay() // 0 = Sunday, 6 = Saturday
  }
}

/**
 * Generate calendar grid for a given month
 * Returns a 6x7 grid (6 weeks × 7 days)
 */
export function generateCalendarGrid(
  month: Day,
  locale: CalendarLocale
): CalendarDay[][] {
  const { year, month: monthNum } = month
  const firstDayOfWeek = getFirstDayOfWeek(locale)
  const daysInMonth = getDaysInMonth(year, monthNum, locale)

  // Get the first day of the month's day of week
  const firstDayWeekday = getDayOfWeek(year, monthNum, 1, locale)

  // Calculate how many days from previous month to show
  const daysFromPrevMonth = (firstDayWeekday - firstDayOfWeek + 7) % 7

  // Calculate previous month/year
  let prevMonth = monthNum - 1
  let prevYear = year
  if (prevMonth < 1) {
    prevMonth = 12
    prevYear = year - 1
  }
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth, locale)

  // Get today's date for comparison
  const todayDayObj = getToday(locale)

  const grid: CalendarDay[][] = []
  let currentWeek: CalendarDay[] = []

  // Add days from previous month
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    currentWeek.push({
      day,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
      isToday: false,
      dayObject: { year: prevYear, month: prevMonth, day }
    })
  }

  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      year === todayDayObj.year &&
      monthNum === todayDayObj.month &&
      day === todayDayObj.day

    currentWeek.push({
      day,
      month: monthNum,
      year,
      isCurrentMonth: true,
      isToday,
      dayObject: { year, month: monthNum, day }
    })

    // If week is complete (7 days), start a new week
    if (currentWeek.length === 7) {
      grid.push(currentWeek)
      currentWeek = []
    }
  }

  // Add days from next month to fill the last week
  let nextMonth = monthNum + 1
  let nextYear = year
  if (nextMonth > 12) {
    nextMonth = 1
    nextYear = year + 1
  }

  let nextMonthDay = 1
  while (currentWeek.length < 7) {
    currentWeek.push({
      day: nextMonthDay,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
      isToday: false,
      dayObject: { year: nextYear, month: nextMonth, day: nextMonthDay }
    })
    nextMonthDay++
  }

  // Add the last week if it has any days
  if (currentWeek.length > 0) {
    grid.push(currentWeek)
  }

  // Ensure we have 6 weeks (some months might only need 5)
  while (grid.length < 6) {
    const lastWeek = grid[grid.length - 1]
    const lastDay = lastWeek[lastWeek.length - 1]
    const nextDay = lastDay.day + 1
    const nextMonth = lastDay.month
    const nextYear = lastDay.year

    const newWeek: CalendarDay[] = []
    for (let i = 0; i < 7; i++) {
      newWeek.push({
        day: nextDay + i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        isToday: false,
        dayObject: {
          year: nextYear,
          month: nextMonth,
          day: nextDay + i
        }
      })
    }
    grid.push(newWeek)
  }

  return grid
}

/**
 * Get a list of years for year selection view
 */
export function getYearRange(centerYear: number, range = 12): number[] {
  const startYear = centerYear - Math.floor(range / 2)
  const years: number[] = []
  for (let i = 0; i < range; i++) {
    years.push(startYear + i)
  }
  return years
}

/**
 * Get a list of months (1-12) for month selection view
 */
export function getMonths(): number[] {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}
