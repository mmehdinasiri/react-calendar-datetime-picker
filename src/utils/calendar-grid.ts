/**
 * Calendar grid generation utilities
 * Generates calendar grids for both Gregorian and Jalali calendars
 */

import type { Day, CalendarLocale } from '../types'
import { getDaysInMonth } from './validation'
import {
  jalaliToGregorian,
  getToday,
  dateToDay,
  dayToDate
} from './date-conversion'

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
 * Gregorian: Sunday (0), Jalali: Saturday (0)
 * Note: Both use 0 as the first day, but the day names arrays are different
 */
function getFirstDayOfWeek(_locale: CalendarLocale): number {
  return 0 // Both calendars start at index 0, but with different day names
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
    // Convert Gregorian day of week to Jalali day of week
    // Jalali week: Saturday=0, Sunday=1, Monday=2, Tuesday=3, Wednesday=4, Thursday=5, Friday=6
    // Gregorian week: Sunday=0, Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6
    // Mapping: Saturday (6) -> 0, Sunday (0) -> 1, Monday (1) -> 2, etc.
    // The correct formula: (gregorianDayOfWeek + 1) % 7
    // But if there's an off-by-one error showing Friday instead of Thursday,
    // we might need to check if the issue is elsewhere. Let's verify the formula is correct.
    // Actually, the formula (d+1)%7 should work: Thursday (4) -> (4+1)%7 = 5 (Thursday) ✓
    // If it's showing as Friday (6), maybe we need: (d+2)%7? But that would be wrong.
    // Let me use the mathematically correct formula: (gregorianDayOfWeek + 1) % 7
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
 * Returns appropriate years based on locale
 * Gregorian: 1900 to current year + 30
 * Jalali: 1300 to current Jalali year + 30
 */
export function getYearRange(
  _centerYear: number,
  _range = 12,
  locale: CalendarLocale = 'en'
): number[] {
  if (locale === 'fa') {
    // Jalali calendar: typically years 1300-1450 (roughly 1921-2071 Gregorian)
    const today = getToday(locale)
    const currentYear = today.year
    const startYear = 1300
    const endYear = currentYear + 30
    const years: number[] = []

    for (let year = startYear; year <= endYear; year++) {
      years.push(year)
    }

    return years
  } else {
    // Gregorian calendar: 1900 to current year + 30
    const currentYear = new Date().getFullYear()
    const startYear = 1900
    const endYear = currentYear + 30
    const years: number[] = []

    for (let year = startYear; year <= endYear; year++) {
      years.push(year)
    }

    return years
  }
}

/**
 * Get a list of months (1-12) for month selection view
 */
export function getMonths(): number[] {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

/**
 * Get the start and end dates of a week containing the given date
 * Week starts on Sunday for Gregorian, Saturday for Jalali
 */
export function getWeekBounds(
  day: Day,
  locale: CalendarLocale
): { from: Day; to: Day } {
  const dayOfWeek = getDayOfWeek(day.year, day.month, day.day, locale)
  const firstDayOfWeek = getFirstDayOfWeek(locale)

  // Calculate days to subtract to get to the start of the week
  const daysToSubtract = (dayOfWeek - firstDayOfWeek + 7) % 7

  // Calculate start of week
  let startDate: Date
  if (locale === 'fa') {
    const jalaliDay: Day = { year: day.year, month: day.month, day: day.day }
    const gregorianDay = jalaliToGregorian(jalaliDay)
    const date = new Date(
      gregorianDay.year,
      gregorianDay.month - 1,
      gregorianDay.day
    )
    date.setDate(date.getDate() - daysToSubtract)
    startDate = date
  } else {
    const date = new Date(day.year, day.month - 1, day.day)
    date.setDate(date.getDate() - daysToSubtract)
    startDate = date
  }

  // Calculate end of week (6 days after start)
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + 6)

  // Convert back to Day objects
  const weekFrom = dateToDay(startDate, locale)
  const weekTo = dateToDay(endDate, locale)

  // Preserve time from the original day if it exists
  if (day.hour !== undefined) {
    weekFrom.hour = day.hour
  }
  if (day.minute !== undefined) {
    weekFrom.minute = day.minute
  }
  // For end date, use the same time as start (or can be set separately)
  if (day.hour !== undefined) {
    weekTo.hour = day.hour
  }
  if (day.minute !== undefined) {
    weekTo.minute = day.minute
  }

  return { from: weekFrom, to: weekTo }
}

/**
 * Get ISO week number for a given date (Gregorian only)
 * For Jalali, returns a simple week number within the year
 */
export function getWeekNumber(day: Day, locale: CalendarLocale): number {
  if (locale === 'fa') {
    // For Jalali, calculate week number from start of year
    const yearStart: Day = { year: day.year, month: 1, day: 1 }
    const yearStartWeek = getWeekBounds(yearStart, locale)
    const currentWeek = getWeekBounds(day, locale)

    // Calculate difference in days
    const startDate = dayToDate(yearStartWeek.from, locale)
    const currentDate = dayToDate(currentWeek.from, locale)
    const diffTime = currentDate.getTime() - startDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const weekNumber = Math.floor(diffDays / 7) + 1

    return weekNumber
  } else {
    // ISO week number for Gregorian
    const date = new Date(day.year, day.month - 1, day.day)
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    )
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  }
}
