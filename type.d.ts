interface ITime {
  hours: number
  minutes: number
}
interface ITimeRange {
  from: ITime
  to: ITime
}

interface IDay {
  year: number
  month: number
  day: number
  fullDay?: string
  hours?: number
  minutes?: number
}

type Day = IDay | null

interface IRange {
  from: Day
  to: Day
}

type Multi = IDay[] | null

type local = 'fa' | 'en'
type type = 'single' | 'range' | 'multi'

interface IDtPickerProps {
  initValue?: IDay | Multi | IRange | null | undefined
  onChange: (date: any) => void
  onCalenderChange?: any
  onCalenderHide?: any
  onCalenderShow?: any
  type?: type
  withTime?: boolean
  local?: local
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
}
// export { Day, IRange }
