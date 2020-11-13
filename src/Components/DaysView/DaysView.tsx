import React from 'react'
import {
  getNumberOfDaysInMonth,
  getPreviousSundayDay,
  getWeekday
} from '../../Helpers'
import { WEEK_DAY_SHORT } from '../../Constant'
import { useCalenderState } from '../../store/CalenderProvider'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'

const DaysView = ({ type }: IDaysProps) => {
  const today = new Date().setHours(0, 0, 0, 0)
  const calenderState = useCalenderState()
  const selectedDayState = useSelectedDayState()
  const { changeSelectedDay, changeSelectedDayRange } = useSelectedDayActions()
  const year = calenderState.getFullYear()
  const month = calenderState.getMonth()

  const createDaysForCurrentMonth = (year: number, month: number) => {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
      const date = new Date(year, month, index + 1)
      return {
        date,
        timeStamp: date.setHours(0, 0, 0, 0),
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
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      calenderState.getHours(),
      calenderState.getMinutes()
    )
    if (type === 'single') {
      changeSelectedDay(newDate)
    }

    if (type === 'range' && selectedDayState) {
      // @ts-ignore
      if (selectedDayState.from === null) {
        changeSelectedDayRange({ from: newDate })
      } else if (
        // @ts-ignore
        selectedDayState.to === null &&
        // @ts-ignore
        selectedDayState.from.setHours(0, 0, 0, 0) <
          newDate.setHours(0, 0, 0, 0)
      ) {
        changeSelectedDayRange({ to: newDate })
      } else if (
        // @ts-ignore
        selectedDayState.to === null &&
        // @ts-ignore
        selectedDayState.from.setHours(0, 0, 0, 0) >
          newDate.setHours(0, 0, 0, 0)
      ) {
        // @ts-ignore
        const newTo = selectedDayState.from
        changeSelectedDayRange({ from: newDate, to: newTo })
        // @ts-ignore
      } else if (selectedDayState.from && selectedDayState.to) {
        changeSelectedDayRange({ from: newDate, to: null })
      }
    }
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
          className={`daysList_day pointer ${
            day.timeStamp === today ? 'is_today' : ''
          }
          ${
            type === 'single' &&
            day.timeStamp ===
              // @ts-ignore: Unreachable code error
              selectedDayState?.setHours(0, 0, 0, 0)
              ? 'is_selected_day'
              : ''
          }
          ${
            type === 'range' &&
            // @ts-ignore: Unreachable code error
            selectedDayState?.from &&
            day.timeStamp ===
              // @ts-ignore: Unreachable code error
              selectedDayState.from.setHours(0, 0, 0, 0)
              ? 'is_selected_day_from'
              : ''
          }
          ${
            type === 'range' &&
            // @ts-ignore: Unreachable code error
            selectedDayState?.to &&
            day.timeStamp ===
              // @ts-ignore: Unreachable code error
              selectedDayState.to?.setHours(0, 0, 0, 0)
              ? 'is_selected_day_to'
              : ''
          }
          ${
            type === 'range' &&
            // @ts-ignore: Unreachable code error
            selectedDayState &&
            // @ts-ignore: Unreachable code error
            selectedDayState.from?.setHours(0, 0, 0, 0) < day.timeStamp &&
            // @ts-ignore: Unreachable code error
            day.timeStamp < selectedDayState.to?.setHours(0, 0, 0, 0)
              ? 'is_selected_day_range'
              : ''
          }
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
