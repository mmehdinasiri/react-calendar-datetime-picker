export interface ITime {
  hour: number
  minute: number
}
export interface ITimeRange {
  from: ITime
  to: ITime
}

export interface IDay {
  year: number
  month: number
  day: number
  fullDay?: string
  hour?: number
  minute?: number
}

export interface IRange {
  from: Day
  to: Day
}

export type Day = IDay | null
export type Multi = IDay[] | null
export type calendarLocal = 'fa' | 'en'
export type calendarType = 'single' | 'range' | 'multi'
export type calendarListStyle = 'grid' | 'list'

export interface IDtPickerProps {
  initValue?: IDay | Multi | IRange | null | undefined
  onChange: (date: any) => void
  onCalenderChange?: any
  onCalenderHide?: any
  onCalenderShow?: any
  type?: calendarType
  withTime?: boolean
  showTimeInput?: boolean
  local?: calendarLocal
  showWeekend?: boolean
  clearBtn?: boolean
  isRequired?: boolean
  todayBtn?: boolean
  isDisabled?: boolean
  maxDate?: IDay
  minDate?: IDay
  placeholder?: string
  NextBtnIcon?: any
  PreviousBtnIcon?: any
  fromLabel?: string
  toLabel?: string
  clockFromLabel?: string
  clockToLabel?: string
  clockLabel?: string
  nextMonthBtnTitle?: string
  previousMonthBtnTitle?: string
  inputClass?: string
  clearBtnClass?: string
  calenderModalClass?: string
  headerClass?: string
  daysClass?: string
  timeClass?: string
  monthsClass?: string
  yearsClass?: string
  disabledDates?: IDay[]
  yearListStyle?: calendarListStyle
  autoClose?: boolean
  inputId?: string
}
// export { Day, IRange }
