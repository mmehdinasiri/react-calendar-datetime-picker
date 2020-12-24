import React, { useMemo } from 'react'
import persianDate from 'persian-date'

import {
  addZero,
  genDayObject,
  getDateTimeStamp,
  getNumberOfDaysInMonth,
  getPreviousSundayDay,
  getWeekday,
  genFullDay
} from '../../Helpers'
import { useLangOption } from '../../hooks/useLangOption'
import { useCalenderState } from '../../store/CalenderProvider'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'
import { useMinMaxState } from '../../store/MinMaxProvider'

const DaysView = ({
  type,
  local,
  hasDefaultVal,
  showWeekend,
  daysClass,
  disabledDates
}: IDaysProps) => {
  const { minDate, maxDate } = useMinMaxState()
  const { todayObject, getDay, WEEK_DAYS } = useLangOption(local)
  const todayFullDay = `${todayObject().year}${addZero(
    todayObject().month
  )}${addZero(todayObject().day)}`
  const calenderState = useCalenderState()
  const year = calenderState.year
  const month = calenderState.month
  const day = calenderState.day
  const selectedDayState = useSelectedDayState()
  const {
    changeSelectedDay,
    changeSelectedDayRange,
    removeSelectedDay,
    changeSelectedDayMulti,
    removeSelectedDayMulti
  } = useSelectedDayActions()

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

    const firstDayOfTheMonthWeekday = getWeekday(getDay(firsDayOfMonth), local)
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
      getDay({
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
        fromTimeStamp <= newDateTimeStamp
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
      classes += ' is-today'
    }
    if (
      type === 'single' &&
      day.date.fullDay === (selectedDayState as IDay)?.fullDay
    ) {
      classes += ' is-selected-day'
    }

    if (
      type === 'range' &&
      (selectedDayState as IRange).from &&
      day.date.fullDay === (selectedDayState as IRange).from?.fullDay
    ) {
      classes += ' is-selected-day-from'
    }
    if (
      type === 'range' &&
      (selectedDayState as IRange)?.to &&
      day.date.fullDay === (selectedDayState as IRange).to?.fullDay
    ) {
      classes += ' is-selected-day-to'
    }
    if (
      type === 'range' &&
      selectedDayState &&
      fromTimeStamp < day.timeStamp &&
      day.timeStamp < toTimeStamp
    ) {
      classes += ' is-selected-day-range'
    }
    if (
      type === 'multi' &&
      (selectedDayState as IDay[]).find(
        (item) => item.fullDay === day.date.fullDay
      )
    ) {
      classes += ' is-selected-day-range'
    }
    if (showWeekend) {
      if (local === 'fa' && (index + daysForPreviousMonth.length) % 7 === 6) {
        classes += ' is_weekends'
      } else if (
        local === 'en' &&
        (index + daysForPreviousMonth.length) % 7 === 0
      ) {
        classes += ' is_weekends'
      }
    }
    if (
      minDate &&
      minDate.year === day.date.year &&
      minDate.month === day.date.month &&
      minDate.day > day.date.day
    ) {
      classes += ' is-minMaxDisabled'
    }
    if (
      maxDate &&
      maxDate.year === day.date.year &&
      maxDate.month === day.date.month &&
      maxDate.day < day.date.day
    ) {
      classes += ' is-minMaxDisabled'
    }
    if (
      disabledDates?.find(
        (date) =>
          genFullDay(date.year, date.month, date.day) === day.date.fullDay
      )
    ) {
      classes += ' is-disabled-by-user'
    }
    return classes
  }

  const daysForCurrentMonth = useMemo(() => {
    return createDaysForCurrentMonth(year, month, day)
  }, [year, month])
  const daysForPreviousMonth = useMemo(() => {
    return createDaysForPreviousMonth(year, month)
  }, [year, month])
  const daysForNextMonth = useMemo(() => {
    return createDaysForNextMonth(year, month)
  }, [year, month])

  return (
    <ul className={`daysList ${local === 'fa' ? 'is-rtl' : ''} ${daysClass}`}>
      {WEEK_DAYS.map((day: any) => (
        <li key={day.name} className='daysList-day'>
          {day.short}
        </li>
      ))}
      {daysForPreviousMonth.length < 7 &&
        daysForPreviousMonth.map((day) => (
          <li key={day.dayOfMonth} className='daysList-day is-disabled'>
            {day.dayOfMonth}
          </li>
        ))}
      {daysForCurrentMonth.map((day, index) => (
        <li
          key={day.dayOfMonth}
          className={`daysList-day is-pointer ${checkClass(day, index)}`}
          onClick={() => {
            handelChangeDay(day.date)
          }}
        >
          {day.dayOfMonth}
        </li>
      ))}
      {daysForNextMonth.length < 7 &&
        daysForNextMonth.map((day) => (
          <li key={day.dayOfMonth} className='daysList-day is-disabled'>
            {day.dayOfMonth}
          </li>
        ))}
    </ul>
  )
}

export default DaysView
