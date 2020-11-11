import React from 'react'
import {
  getNumberOfDaysInMonth,
  getPreviousSundayDay,
  getWeekday
} from '../../Helpers'
import { WEEK_DAY_SHORT } from '../../Constant'
import { useDayState } from '../../store/DayProvider'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'

const DaysView = () => {
  const today = new Date().setHours(0, 0, 0, 0)
  const dayState = useDayState()
  const selectedDayState = useSelectedDayState()
  const { changeSelectedDay } = useSelectedDayActions()
  const selectedDay = new Date(selectedDayState).setHours(0, 0, 0, 0)
  const year = dayState.getFullYear()
  const month = dayState.getMonth()

  const createDaysForCurrentMonth = (year: number, month: number) => {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
      const date = new Date(year, month, index + 1)
      return {
        date,
        time: date.setHours(0, 0, 0, 0),
        dayOfMonth: index + 1,
        isCurrentMonth: true
      }
    })
  }
  const createDaysForPreviousMonth = (year: number, month: number) => {
    const firstDayOfTheMonthWeekday = getWeekday(
      daysForCurrentMonth[0].date.getDay()
    )
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday.weekDayIndex
      ? firstDayOfTheMonthWeekday.weekDayIndex
      : 7
    const previousMonth = new Date(year, month - 1)
    var previousMonthLastMondayDayOfMonth = getPreviousSundayDay(
      daysForCurrentMonth[0].date
    )
    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
      return {
        date: new Date(
          previousMonth.getFullYear(),
          previousMonth.getMonth(),
          previousMonthLastMondayDayOfMonth + index
        ),
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false
      }
    })
  }
  const createDaysForNextMonth = (year: number, month: number) => {
    const lastDayOfTheMonthWeekday = getWeekday(
      new Date(year, month, daysForCurrentMonth.length).getDay()
    )
    const nextMonth = new Date(year, month + 1)
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday.weekDayIndex
      ? 6 - lastDayOfTheMonthWeekday.weekDayIndex
      : 6

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => {
      return {
        date: new Date(
          nextMonth.getFullYear(),
          nextMonth.getMonth(),
          index + 1
        ),
        dayOfMonth: index + 1,
        isCurrentMonth: false
      }
    })
  }
  const daysForCurrentMonth = createDaysForCurrentMonth(year, month)
  const daysForPreviousMonth = createDaysForPreviousMonth(year, month)
  const daysForNextMonth = createDaysForNextMonth(year, month)

  const handelChangeDay = (date: Date) => {
    changeSelectedDay(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        dayState.getHours(),
        dayState.getMinutes()
      )
    )
  }
  return (
    <ul className='daysList'>
      {WEEK_DAY_SHORT.map((day) => (
        <li key={day} className='daysList_day'>
          {day}
        </li>
      ))}
      {daysForPreviousMonth.length < 7 &&
        daysForPreviousMonth.map((day) => (
          <li key={day.dayOfMonth} className='daysList_day is_disabled'>
            {day.dayOfMonth}
          </li>
        ))}
      {daysForCurrentMonth.map((day) => (
        <li
          key={day.dayOfMonth}
          className={`daysList_day pointer} ${
            day.time === today ? 'is_today' : null
          }
          ${day.time === selectedDay ? 'is_selected_day' : null}
          `}
          onClick={() => {
            handelChangeDay(day.date)
          }}
        >
          {day.dayOfMonth}
        </li>
      ))}
      {daysForNextMonth.length < 7 &&
        daysForNextMonth.map((day) => (
          <li key={day.dayOfMonth} className='daysList_day is_disabled'>
            {day.dayOfMonth}
          </li>
        ))}
    </ul>
  )
}

export default DaysView
