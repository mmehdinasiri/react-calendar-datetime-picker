import jalaali from 'jalaali-js'
import { IDay } from 'src/type'
const today = new Date()
const jalaaliToday = jalaali.toJalaali(today)
export const LOCAL_CONSTANT = {
  fa: {
    NUMBERS: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    WEEK_DAY_SHORT: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
    MONTHS: [
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
    ],
    WEEK_DAYS: [
      {
        name: 'یکشنبه',
        short: 'ی'
      },
      {
        name: 'دوشنبه',
        short: 'د'
      },
      {
        name: 'سه شنبه',
        short: 'س'
      },
      {
        name: 'چهارشنبه',
        short: 'چ'
      },
      {
        name: 'پنجشنبه',
        short: 'پ'
      },
      {
        name: 'جمعه',
        short: 'ج',
        isWeekend: true
      },
      {
        name: 'شنبه',
        short: 'ش'
      }
    ],
    YEARS_RANGE_START: jalaaliToday.jy - 100,
    YEARS_RANGE_END: jalaaliToday.jy + 100,
    getDay: (date: IDay) => {
      const convertToGregorian = jalaali.toGregorian(
        date.year,
        date.month + 1,
        date.day
      )
      return new Date(
        convertToGregorian.gy,
        convertToGregorian.gm - 1,
        convertToGregorian.gd
      ).getDay()
    },
    // today: () => {
    //   console.log(jalaali.toJalaali(new Date()))
    //   const pDate = new PersianDate()
    //   console.log(pDate)
    //   return pDate.State.persianAstro
    // },
    todayObject: () => {
      const pDate = jalaali.toJalaali(new Date())

      return {
        year: pDate.jy,
        month: pDate.jm - 1,
        day: pDate.jd
      }
    },
    getDayOfMonth: (date: IDay) => {
      return jalaali.jalaaliMonthLength(date.year, date.month + 1)
    },
    inputPlaceholder: 'انتخاب کنید',
    clockFromLB: 'از ساعت',
    clockToLB: 'تا ساعت',
    nextMonthBtnTL: 'ماه بعد',
    previousMonthBtnTL: 'ماه قبل',
    fromLB: 'از',
    toLB: 'تا',
    clockLB: 'ساعت',
    todayBtnTL: 'امروز'
  },
  en: {
    WEEK_DAY: [
      'Sunday',
      'Monday',
      'Thursday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],

    WEEK_DAY_SHORT: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    MONTHS: [
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
    ],
    MONTHS_SHORT: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    WEEK_DAYS: [
      {
        name: 'Sunday',
        short: 'Su',
        isWeekend: true
      },
      {
        name: 'Monday',
        short: 'Mo'
      },
      {
        name: 'Tuesday',
        short: 'Tu'
      },
      {
        name: 'Wednesday',
        short: 'We'
      },
      {
        name: 'Thursday',
        short: 'Th'
      },
      {
        name: 'Friday',
        short: 'Fr'
      },
      {
        name: 'Saturday',
        short: 'Sa',
        isWeekend: true
      }
    ],
    YEARS_RANGE_START: today.getFullYear() - 100,
    YEARS_RANGE_END: today.getFullYear() + 100,
    getDay: (date: IDay) => {
      return new Date(date.year, date.month, date.day).getDay()
    },
    // today: () => {
    //   return new Date()
    // },
    todayObject: () => {
      const date = new Date()
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate()
      }
    },
    getDayOfMonth: (date: IDay) => {
      return new Date(date.year, date.month, date.day).getDate()
    },

    inputPlaceholder: 'select',
    clockFromLB: 'from',
    clockToLB: 'to',
    nextMonthBtnTL: 'next month',
    previousMonthBtnTL: 'previous month',
    fromLB: 'from',
    toLB: 'to',
    clockLB: 'clock',
    todayBtnTL: 'Today'
  }
}

export const YEARS_VIEW = 'YEARS_VIEW'
export const MONTHS_VIEW = 'MONTHS_VIEW'
export const DAYS_VIEW = 'DAYS_VIEW'
