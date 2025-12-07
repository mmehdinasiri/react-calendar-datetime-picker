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
 * Get the first day of the week for a given calendar system
 * @param calendarSystem - The calendar system ('gregorian' or 'jalali')
 * @param weekStart - Optional explicit week start day (0-6). If provided, uses this value.
 * @returns The first day of the week (0 = Sunday, 6 = Saturday)
 */
function getFirstDayOfWeek(
  calendarSystem: CalendarLocale,
  weekStart?: number
): number {
  // If weekStart is explicitly provided, use it
  if (weekStart !== undefined) {
    return weekStart
  }
  // Otherwise, default based on calendar system
  // Gregorian: Sunday (0), Jalali: Saturday (6)
  return calendarSystem === 'jalali' ? 6 : 0
}

/**
 * Get the day of week for a given date
 * Always returns in Gregorian format: 0 = Sunday, 6 = Saturday
 * This ensures consistency regardless of calendar system or locale
 */
function getDayOfWeek(
  year: number,
  month: number,
  day: number,
  calendarSystem: CalendarLocale
): number {
  if (calendarSystem === 'jalali') {
    // For Jalali, convert to Gregorian first to use JavaScript Date
    const jalaliDay: Day = { year, month, day }
    const gregorianDay = jalaliToGregorian(jalaliDay)
    const date = new Date(
      gregorianDay.year,
      gregorianDay.month - 1,
      gregorianDay.day
    )
    // Return in Gregorian format (0 = Sunday, 6 = Saturday)
    // The grid generation will handle weekStart alignment
    return date.getDay() // 0 = Sunday, 6 = Saturday
  } else {
    // Gregorian: use JavaScript Date directly
    const date = new Date(year, month - 1, day)
    return date.getDay() // 0 = Sunday, 6 = Saturday
  }
}

/**
 * Generate calendar grid for a given month
 * Returns a 6x7 grid (6 weeks × 7 days)
 * @param month - The month to generate grid for
 * @param calendarSystem - The calendar system ('gregorian' or 'jalali')
 * @param weekStart - Optional first day of the week (0-6). If not provided, defaults based on calendar system.
 */
export function generateCalendarGrid(
  month: Day,
  calendarSystem: CalendarLocale,
  weekStart?: number
): CalendarDay[][] {
  const { year, month: monthNum } = month
  const firstDayOfWeek = getFirstDayOfWeek(calendarSystem, weekStart)
  const daysInMonth = getDaysInMonth(year, monthNum, calendarSystem)

  // Get the first day of the month's day of week
  const firstDayWeekday = getDayOfWeek(year, monthNum, 1, calendarSystem)

  // Calculate how many days from previous month to show
  const daysFromPrevMonth = (firstDayWeekday - firstDayOfWeek + 7) % 7

  // Calculate previous month/year
  let prevMonth = monthNum - 1
  let prevYear = year
  if (prevMonth < 1) {
    prevMonth = 12
    prevYear = year - 1
  }
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth, calendarSystem)

  // Get today's date for comparison
  const todayDayObj = getToday(calendarSystem)

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
 * Calculate the months to display based on the base month and number of months
 * Returns an array of Day objects representing the months to display
 */
export function getMonthsToDisplay(
  baseMonth: Day,
  numberOfMonths: number,
  _calendarSystem: CalendarLocale
): Day[] {
  const months: Day[] = []

  for (let i = 0; i < numberOfMonths; i++) {
    let year = baseMonth.year
    let month = baseMonth.month + i

    // Handle month overflow
    while (month > 12) {
      month -= 12
      year += 1
    }

    months.push({
      year,
      month,
      day: 1 // Use first day of month for month representation
    })
  }

  return months
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
  calendarSystem: CalendarLocale = 'gregorian'
): number[] {
  if (calendarSystem === 'jalali') {
    // Jalali calendar: typically years 1300-1450 (roughly 1921-2071 Gregorian)
    const today = getToday(calendarSystem)
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
 * Week starts on Sunday for Gregorian, Saturday for Jalali (unless weekStart is specified)
 * @param day - The day to get week bounds for
 * @param calendarSystem - The calendar system ('gregorian' or 'jalali')
 * @param weekStart - Optional first day of the week (0-6). If not provided, defaults based on calendar system.
 */
export function getWeekBounds(
  day: Day,
  calendarSystem: CalendarLocale,
  weekStart?: number
): { from: Day; to: Day } {
  const dayOfWeek = getDayOfWeek(day.year, day.month, day.day, calendarSystem)
  const firstDayOfWeek = getFirstDayOfWeek(calendarSystem, weekStart)

  // Calculate days to subtract to get to the start of the week
  const daysToSubtract = (dayOfWeek - firstDayOfWeek + 7) % 7

  // Calculate start of week
  let startDate: Date
  if (calendarSystem === 'jalali') {
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
  const weekFrom = dateToDay(startDate, calendarSystem)
  const weekTo = dateToDay(endDate, calendarSystem)

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
export function getWeekNumber(
  day: Day,
  calendarSystem: CalendarLocale
): number {
  if (calendarSystem === 'jalali') {
    // For Jalali, calculate week number from start of year
    // Note: weekStart is not available here, so we use default (Saturday for Jalali)
    const defaultWeekStart = 6
    const yearStart: Day = { year: day.year, month: 1, day: 1 }
    const yearStartWeek = getWeekBounds(
      yearStart,
      calendarSystem,
      defaultWeekStart
    )
    const currentWeek = getWeekBounds(day, calendarSystem, defaultWeekStart)

    // Calculate difference in days
    const startDate = dayToDate(yearStartWeek.from, calendarSystem)
    const currentDate = dayToDate(currentWeek.from, calendarSystem)
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
