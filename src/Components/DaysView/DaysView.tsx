import React from 'react'
import persianDate from 'persian-date'

import {
  addZero,
  genDayObject,
  getDateTimeStamp,
  getNumberOfDaysInMonth,
  getPreviousSundayDay,
  getWeekday
} from '../../Helpers'
import { LOCAL_CONSTANT } from '../../Constant'
import { useCalenderState } from '../../store/CalenderProvider'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'

const DaysView = ({ type, local, hasDefaultVal, showWeekend }: IDaysProps) => {
  const today = LOCAL_CONSTANT[local].todayObject()
  const todayFullDay = `${today.year}${addZero(today.month)}${addZero(
    today.day
  )}`
  const calenderState = useCalenderState()
  const selectedDayState = useSelectedDayState()
  const {
    changeSelectedDay,
    changeSelectedDayRange,
    removeSelectedDay,
    changeSelectedDayMulti,
    removeSelectedDayMulti
  } = useSelectedDayActions()
  const year = calenderState.year
  const month = calenderState.month
  const day = calenderState.day
  let fromTimeStamp: number, toTimeStamp: number
  if (type === 'range' && (selectedDayState as IRange).from) {
    // @ts-ignore: Unreachable code error
    fromTimeStamp = getDateTimeStamp((selectedDayState as IRange).from, local)
  }
  if (type === 'range' && (selectedDayState as IRange).to) {
    // @ts-ignore: Unreachable code error
    toTimeStamp = getDateTimeStamp((selectedDayState as IRange).to, local)
  }

  const createDaysForCurrentMonth = (
    year: number,
    month: number,
    day: number
  ) => {
    if (local === 'fa' && !hasDefaultVal) {
      const dayP = new persianDate([year, month + 1, day]).State.persianAstro
      year = dayP.year
      month = dayP.month
      day = dayP.day
    }
    return [...Array(getNumberOfDaysInMonth(year, month, local))].map(
      (_, index) => {
        const date = genDayObject(year, month, index + 1)
        date.fullDay = `${date.year}${addZero(date.month)}${addZero(index + 1)}`
        return {
          date,
          timeStamp: getDateTimeStamp(date, local),
          dayOfMonth: index + 1,
          isCurrentMonth: true
        }
      }
    )
  }
  const createDaysForPreviousMonth = (year: number, month: number) => {
    const firsDayOfMonth = {
      year: daysForCurrentMonth[0].date.year,
      month: daysForCurrentMonth[0].date.month,
      day: daysForCurrentMonth[0].date.day
    }

    const firstDayOfTheMonthWeekday = getWeekday(
      LOCAL_CONSTANT[local].getDay(firsDayOfMonth),
      local
    )
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday.weekDayIndex
      ? firstDayOfTheMonthWeekday.weekDayIndex
      : 7
    const previousMonth = new Date(year, month - 1)
    var previousMonthLastSundayDayOfMonth = getPreviousSundayDay(
      firsDayOfMonth,
      local
    )

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
      const date = {
        year: year,
        month: month,
        day: index,
        fullDay: `${previousMonth.getFullYear()}${addZero(
          previousMonth.getMonth()
        )}${addZero(index)}`
      }
      return {
        date,
        dayOfMonth: previousMonthLastSundayDayOfMonth + index,
        isCurrentMonth: false
      }
    })
  }
  const createDaysForNextMonth = (year: number, month: number) => {
    const lastDayOfTheMonthWeekday = getWeekday(
      LOCAL_CONSTANT[local].getDay({
        year,
        month,
        day: daysForCurrentMonth.length
      }),
      local
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
        fullDay: `${nextMonth.getFullYear()}${addZero(
          nextMonth.getMonth()
        )}${addZero(index + 1)}`
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
    const newDateTimeStamp = getDateTimeStamp(newDate, local)
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
  const checkClass = (day: any, index: number) => {
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
    if (showWeekend) {
      if (
        local === 'fa' &&
        ((index + daysForPreviousMonth.length) % 7 === 6 ||
          (index + daysForPreviousMonth.length) % 7 === 5)
      ) {
        classes += ' is_weekends'
      } else if (
        local === 'en' &&
        (index + daysForPreviousMonth.length) % 7 === 0
      ) {
        classes += ' is_weekends'
      }
    }

    return classes
  }
  const daysForCurrentMonth = createDaysForCurrentMonth(year, month, day)
  const daysForPreviousMonth = createDaysForPreviousMonth(year, month)
  const daysForNextMonth = createDaysForNextMonth(year, month)

  return (
    <ul className={`daysList ${local === 'fa' ? 'is-rtl' : ''}`}>
      {LOCAL_CONSTANT[local].WEEK_DAYS.map((day: any) => (
        <li key={day.name} className='daysList_day'>
          {day.short}
        </li>
      ))}
      {daysForPreviousMonth.length < 7 &&
        daysForPreviousMonth.map((day) => (
          <li key={day.dayOfMonth} className='daysList_day is_disabled'>
            {day.dayOfMonth}
          </li>
        ))}
      {daysForCurrentMonth.map((day, index) => (
        <li
          key={day.dayOfMonth}
          className={`daysList_day pointer ${checkClass(day, index)}`}
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
