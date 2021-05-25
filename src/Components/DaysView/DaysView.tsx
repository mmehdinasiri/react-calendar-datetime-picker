import React, { FC, useMemo } from 'react'
import {
  genDayObject,
  getDateTimeStamp,
  getNumberOfDaysInMonth,
  getWeekday,
  genFullDay,
  toPersianNumber
} from '../../helpers'
import { useLangOption } from '../../hooks/useLangOption'
import { useCalenderState } from '../../store/CalenderProvider'
import {
  useSelectedDayActions,
  useSelectedDayState
} from '../../store/SelectedDaysProvider'
import { useMinMaxState } from '../../store/MinMaxProvider'

interface IDaysProps {
  local: string
  type?: string
  showWeekend: boolean
  daysClass?: string
  disabledDates?: IDay[]
}
const DaysView: FC<IDaysProps> = ({
  type,
  local,
  showWeekend,
  daysClass,
  disabledDates
}) => {
  console.log('--days--')
  const { minDate, maxDate } = useMinMaxState()
  const { todayObject, getDay, WEEK_DAYS } = useLangOption(local)
  const todayTimeStamp = getDateTimeStamp({ ...todayObject() }, local)
  const calenderState = useCalenderState()
  const year = calenderState.year
  const month = calenderState.month
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

  const createDaysForCurrentMonth = (year: number, month: number) => {
    return Array(getNumberOfDaysInMonth(year, month, local))
      .fill(undefined)
      .map((_, index) => {
        const date = genDayObject(year, month, index + 1)
        return {
          date,
          timeStamp: getDateTimeStamp(date, local),
          dayOfMonth: index + 1,
          isCurrentMonth: true
        }
      })
  }
  const createDaysForPreviousMonth = (year: number, month: number) => {
    const firsDayOfMonth = {
      year: daysForCurrentMonth[0].date.year,
      month: daysForCurrentMonth[0].date.month,
      day: daysForCurrentMonth[0].date.day
    }

    const firstDayOfTheMonthWeekday = getWeekday(getDay(firsDayOfMonth), local)
    const visibleNumberOfDaysFromPreviousMonth =
      firstDayOfTheMonthWeekday.weekDayIndex
        ? firstDayOfTheMonthWeekday.weekDayIndex
        : 7
    var previousMonthLastSundayDayOfMonth =
      getNumberOfDaysInMonth(year, month - 1, local) -
      visibleNumberOfDaysFromPreviousMonth

    return Array(visibleNumberOfDaysFromPreviousMonth)
      .fill(undefined)
      .map((_, index) => {
        const date = {
          year: year,
          month: month,
          day: index
        }
        return {
          date,
          timeStamp: getDateTimeStamp(date, local),
          dayOfMonth: previousMonthLastSundayDayOfMonth + index + 1,
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
    const visibleNumberOfDaysFromNextMonth =
      lastDayOfTheMonthWeekday.weekDayIndex === 7
        ? 6
        : 7 - lastDayOfTheMonthWeekday.weekDayIndex - 1

    const x = Array(visibleNumberOfDaysFromNextMonth)
      .fill(undefined)
      .map((_, index) => {
        const date = {
          year: year,
          month: month,
          day: index
        }
        return {
          date,
          timeStamp: getDateTimeStamp(date, local),
          dayOfMonth: index + 1,
          isCurrentMonth: false
        }
      })
    return x
  }
  const handelChangeDay = (date: any) => {
    const newDate = { ...date }
    const newDateTimeStamp = getDateTimeStamp(newDate, local)
    if (type === 'single') {
      if (
        selectedDayState &&
        genFullDay(newDate.year, newDate.month, newDate.day) ===
          genFullDay(
            (selectedDayState as IDay)!.year,
            (selectedDayState as IDay)!.month,
            (selectedDayState as IDay)!.day
          )
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
          (day) =>
            genFullDay(day.year, day.month, day.day) ===
            genFullDay(newDate!.year, newDate!.month, newDate!.day)
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
    if (day.timeStamp === todayTimeStamp) {
      classes += ' is-today'
    }
    if (
      type === 'single' &&
      day.timeStamp ===
        getDateTimeStamp({ ...(selectedDayState as IDay) }, local)
    ) {
      classes += ' is-selected-day'
    }

    if (
      type === 'range' &&
      (selectedDayState as IRange).from &&
      day.timeStamp ===
        getDateTimeStamp({ ...(selectedDayState as IRange).from! }, local)
    ) {
      classes += ' is-selected-day-from'
    }
    if (
      type === 'range' &&
      (selectedDayState as IRange)?.to &&
      day.timeStamp ===
        getDateTimeStamp({ ...(selectedDayState as IRange).to! }, local)
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
        (item) => getDateTimeStamp(item, local) === day.timeStamp
      )
    ) {
      classes += ' is-selected-day'
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
          getDateTimeStamp(
            { year: date.year, month: date.month, day: date.day },
            local
          ) === day.timeStamp
      )
    ) {
      classes += ' is-disabled-by-user'
    }
    return classes
  }

  const daysForCurrentMonth = useMemo(() => {
    return createDaysForCurrentMonth(year, month)
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
        <li key={day.name} className='daysList-day is-week-days'>
          {day.short}
        </li>
      ))}
      {daysForPreviousMonth.length < 7 &&
        daysForPreviousMonth.map((day, index) => (
          <li
            key={day.dayOfMonth}
            className={`daysList-day is-disabled is-prev-month ${
              daysForPreviousMonth.length - 1 === index
                ? 'is-border-right-0'
                : ''
            }`}
          >
            {local === 'fa' ? toPersianNumber(day.dayOfMonth) : day.dayOfMonth}
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
          {local === 'fa' ? toPersianNumber(day.dayOfMonth) : day.dayOfMonth}
        </li>
      ))}
      {daysForNextMonth.length < 7 &&
        daysForNextMonth.map((day, index) => (
          <li
            key={day.dayOfMonth}
            className={`daysList-day is-disabled is-next-month ${
              index === 0 ? 'is-border-left-0' : ''
            }`}
          >
            {local === 'fa' ? toPersianNumber(day.dayOfMonth) : day.dayOfMonth}
          </li>
        ))}
    </ul>
  )
}

export default React.memo(DaysView)
// export default DaysView
