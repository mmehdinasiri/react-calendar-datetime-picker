import persianDate from 'persian-date'
export const LOCAL_CONSTANT = {
  fa: {
    NUMBERS: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    WEEK_DAY_SHORT: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    MONTHS: [
      'قرودین',
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
        name: 'شنبه',
        short: 'ش'
      },
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
      }
    ],
    YEARS_RANGE_START: 1302,
    YEARS_RANGE_END: 1450,
    getDay: (date: IDay) => {
      return new persianDate([date.year, date.month, date.day]).day()
    },
    today: () => {
      const pDate = new persianDate()
      return pDate.State.persianAstro
    },
    getDayOfMonth: (date: IDay) => {
      return new persianDate([date.year, date.month, date.day]).date()
    },
    setDayOfMonth: (date: IDay, day: number) => {
      return new persianDate([date.year, date.month, date.day]).date(day)
    }
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
    YEARS_RANGE_START: 1900,
    YEARS_RANGE_END: 2100,
    getDay: (date: IDay) => {
      return new Date(date.year, date.month, date.day).getDay()
    },
    today: () => {
      const pDate = new Date()
      return pDate
    },
    getDayOfMonth: (date: IDay) => {
      return new Date(date.year, date.month, date.day).getDate()
    },
    setDayOfMonth: (date: Date, day: number) => {
      return new Date(new Date(date).setDate(day))
    }
  }
}

export const YEARS_VIEW = 'DYEARS_VIEW'
export const MONTHS_VIEW = 'MONTHS_VIEW'
export const DAYS_VIEW = 'DAYS_VIEW'
