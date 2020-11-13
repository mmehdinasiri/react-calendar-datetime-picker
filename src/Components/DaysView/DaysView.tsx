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
  const today = new Date()
  const calenderState = useCalenderState()
  const selectedDayState = useSelectedDayState()
  // @ts-ignore: Unreachable code error
  let fromTimeStamp, toTimeStamp
  if (type === 'range') {
    // @ts-ignore: Unreachable code error
    fromTimeStamp = new Date(selectedDayState.from).setHours(0, 0, 0, 0)
    // @ts-ignore: Unreachable code error
    toTimeStamp = new Date(selectedDayState.to).setHours(0, 0, 0, 0)
  }
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
  const handelChangeDay = (date: Date) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      calenderState.getHours(),
      calenderState.getMinutes()
    )
    const newDateTimeStamp = new Date(newDate).setHours(0, 0, 0, 0)
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
        fromTimeStamp < newDateTimeStamp
      ) {
        changeSelectedDayRange({ to: newDate })
      } else if (
        // @ts-ignore
        selectedDayState.to === null &&
        // @ts-ignore
        fromTimeStamp > newDateTimeStamp
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
  const checkClass = (day: any) => {
    let classes = ''
    if (day.date.toLocaleDateString() === today.toLocaleDateString()) {
      classes += ' is_today'
    }
    if (
      type === 'single' &&
      // @ts-ignore: Unreachable code error
      day.date.toLocaleDateString() === selectedDayState?.toLocaleDateString()
    ) {
      classes += ' is_selected_day'
    }
    if (
      type === 'range' &&
      // @ts-ignore: Unreachable code error
      selectedDayState?.from &&
      day.date.toLocaleDateString() ===
        // @ts-ignore: Unreachable code error
        selectedDayState.from.toLocaleDateString()
    ) {
      classes += ' is_selected_day_from'
    }
    if (
      type === 'range' &&
      // @ts-ignore: Unreachable code error
      selectedDayState?.to &&
      // @ts-ignore: Unreachable code error
      day.date.toLocaleDateString() === selectedDayState.to.toLocaleDateString()
    ) {
      classes += ' is_selected_day_to'
    }
    if (
      type === 'range' &&
      // @ts-ignore: Unreachable code error
      selectedDayState &&
      // @ts-ignore: Unreachable code error
      fromTimeStamp < day.timeStamp &&
      // @ts-ignore: Unreachable code error
      day.timeStamp < toTimeStamp
    ) {
      classes += ' is_selected_day_range'
    }

    return classes
  }
  const daysForCurrentMonth = createDaysForCurrentMonth(year, month)
  const daysForNextMonth = createDaysForNextMonth(year, month)
  const daysForPreviousMonth = createDaysForPreviousMonth(year, month)

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
          className={`daysList_day pointer ${checkClass(day)}`}
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
