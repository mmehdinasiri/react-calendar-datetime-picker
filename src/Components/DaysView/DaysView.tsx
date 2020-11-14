import React from 'react'
import {
  getDateTimeStamp,
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
  const todayFullDay = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
  const calenderState = useCalenderState()
  const selectedDayState = useSelectedDayState()
  const {
    changeSelectedDay,
    changeSelectedDayRange,
    removeSelectedDay,
    changeSelectedDayMulti,
    removeSelectedDayMulti
  } = useSelectedDayActions()

  const year = calenderState.getFullYear()
  const month = calenderState.getMonth()
  let fromTimeStamp: number, toTimeStamp: number
  if (type === 'range' && (selectedDayState as IRange).from) {
    // @ts-ignore: Unreachable code error
    fromTimeStamp = getDateTimeStamp((selectedDayState as IRange).from)
  }
  if (type === 'range' && (selectedDayState as IRange).to) {
    // @ts-ignore: Unreachable code error
    toTimeStamp = getDateTimeStamp((selectedDayState as IRange).to)
  }

  const createDaysForCurrentMonth = (year: number, month: number) => {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
      const date = {
        year: year,
        month: month,
        day: index + 1,
        fullDay: `${year}${month}${index + 1}`
      }
      return {
        date,
        timeStamp: getDateTimeStamp(date),
        dayOfMonth: index + 1,
        isCurrentMonth: true
      }
    })
  }
  const createDaysForPreviousMonth = (year: number, month: number) => {
    const firsDayOfMonth = new Date(
      daysForCurrentMonth[0].date.year,
      daysForCurrentMonth[0].date.month,
      daysForCurrentMonth[0].date.day
    )
    const firstDayOfTheMonthWeekday = getWeekday(firsDayOfMonth.getDay())
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday.weekDayIndex
      ? firstDayOfTheMonthWeekday.weekDayIndex
      : 7
    const previousMonth = new Date(year, month - 1)
    var previousMonthLastMondayDayOfMonth = getPreviousSundayDay(firsDayOfMonth)

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
      const date = {
        year: year,
        month: month,
        day: index,
        fullDay: `${previousMonth.getFullYear()}${previousMonth.getMonth()}${index}`
      }
      return {
        date,
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
      const date = {
        year: year,
        month: month,
        day: index,
        fullDay: `${nextMonth.getFullYear()}${nextMonth.getMonth()}${index + 1}`
      }
      return {
        date,
        dayOfMonth: index + 1,
        isCurrentMonth: false
      }
    })
  }
  const handelChangeDay = (date: any) => {
    const newDate = { ...date }
    const newDateTimeStamp = getDateTimeStamp(newDate)
    if (type === 'single') {
      if (
        selectedDayState &&
        newDate.fullDay === (selectedDayState as IDay).fullDay
      ) {
        removeSelectedDay()
      } else {
        changeSelectedDay(newDate)
      }
    }
    if (type === 'range' && selectedDayState) {
      if (!(selectedDayState as IRange).from?.year) {
        changeSelectedDayRange('from', newDate)
      } else if (
        !(selectedDayState as IRange).to?.year &&
        fromTimeStamp < newDateTimeStamp
      ) {
        changeSelectedDayRange('to', newDate)
      } else if (
        !(selectedDayState as IRange).to?.year &&
        fromTimeStamp > newDateTimeStamp
      ) {
        const newTo = (selectedDayState as IRange).from
        changeSelectedDayRange('from', newDate)
        changeSelectedDayRange('to', newTo)
      } else if (
        (selectedDayState as IRange).from &&
        (selectedDayState as IRange).to
      ) {
        changeSelectedDayRange('from', newDate)
        changeSelectedDayRange('to', null)
      }
    }
    if (type === 'multi') {
      if (
        (selectedDayState as IDay[]).find(
          (day) => day.fullDay === newDate?.fullDay
        )
      ) {
        removeSelectedDayMulti(newDate)
      } else {
        changeSelectedDayMulti(newDate)
      }
    }
  }
  const checkClass = (day: any) => {
    let classes = ''
    if (day.date.fullDay === todayFullDay) {
      classes += ' is_today'
    }
    if (
      type === 'single' &&
      day.date.fullDay === (selectedDayState as IDay)?.fullDay
    ) {
      classes += ' is_selected_day'
    }

    if (
      type === 'range' &&
      (selectedDayState as IRange).from &&
      day.date.fullDay === (selectedDayState as IRange).from?.fullDay
    ) {
      classes += ' is_selected_day_from'
    }
    if (
      type === 'range' &&
      (selectedDayState as IRange)?.to &&
      day.date.fullDay === (selectedDayState as IRange).to?.fullDay
    ) {
      classes += ' is_selected_day_to'
    }
    if (
      type === 'range' &&
      selectedDayState &&
      fromTimeStamp < day.timeStamp &&
      day.timeStamp < toTimeStamp
    ) {
      classes += ' is_selected_day_range'
    }
    if (
      type === 'multi' &&
      (selectedDayState as IDay[]).find(
        (item) => item.fullDay === day.date.fullDay
      )
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
