import React from 'react'
import styles from './styles.module.css'
import { getNumberOfDaysInMonth, getWeekday } from '../../Helpers'
import { WEEK_DAY_SHORT } from '../../Constant'

const DayList = ({ year, month, day }: IMonthList) => {
  const createDaysForCurrentMonth = (year: number, month: number) => {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
      return {
        date: new Date(year, month, index + 1),
        dayOfMonth: index + 1,
        isCurrentMonth: true
      }
    })
  }
  const daysForCurrentMonth = createDaysForCurrentMonth(year, month)
  const createDaysForPreviousMonth = (year: number, month: number) => {
    console.log(year)
    console.log(month)
    console.log('----------')
    const firstDayOfTheMonthWeekday = getWeekday(
      daysForCurrentMonth[0].date.getDay()
    )
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday.weekDayIndex
      ? firstDayOfTheMonthWeekday.weekDayIndex - 1
      : 6

    console.log(visibleNumberOfDaysFromPreviousMonth)
    // const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month')
    // const previousMonthLastMondayDayOfMonth = new Date(
    //   daysForCurrentMonth[0].date
    // )
    //   .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
    //   .date()
    // return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
    //   (day, index) => {
    //     return {
    //       date: dayjs(
    //         `${previousMonth.year()}-${previousMonth.month() + 1}-${
    //           previousMonthLastMondayDayOfMonth + index
    //         }`
    //       ).format('YYYY-MM-DD'),
    //       dayOfMonth: previousMonthLastMondayDayOfMonth + index,
    //       isCurrentMonth: false
    //     }
    //   }
    // )
  }

  console.log(day)
  console.log(daysForCurrentMonth)
  createDaysForPreviousMonth(year, month)
  return (
    <ul className={styles.daysList}>
      {WEEK_DAY_SHORT.map((day) => (
        <li key={day} className={styles.daysList_day}>
          {day}
        </li>
      ))}
      {daysForCurrentMonth.map((day) => (
        <li
          key={day.dayOfMonth}
          className={`${styles.daysList_day} ${styles.pointer}`}
        >
          {day.dayOfMonth}
        </li>
      ))}
    </ul>
  )
}

export default DayList
