import PersianDate from 'persian-date'
export const LOCAL_CONSTANT = {
  fa: {
    NUMBERS: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    WEEK_DAY_SHORT: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    MONTHS: [
      'فرودین',
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
      return new PersianDate([date.year, date.month + 1, date.day]).day() - 1
    },
    today: () => {
      const pDate = new PersianDate()
      return pDate.State.persianAstro
    },
    todayObject: () => {
      const pDate = new PersianDate().State.persianAstro
      return {
        year: pDate.year,
        month: pDate.month,
        day: pDate.day
      }
    },
    getDayOfMonth: (date: IDay) => {
      return new PersianDate([date.year, date.month + 1, date.day]).date()
    },
    setDayOfMonth: (date: IDay, day: number) => {
      return new PersianDate([date.year, date.month + 1, date.day]).date(day)
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
    YEARS_RANGE_START: 1900,
    YEARS_RANGE_END: 2100,
    getDay: (date: IDay) => {
      return new Date(date.year, date.month, date.day).getDay()
    },
    today: () => {
      return new Date()
    },
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
    setDayOfMonth: (date: Date, day: number) => {
      return new Date(new Date(date).setDate(day))
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
