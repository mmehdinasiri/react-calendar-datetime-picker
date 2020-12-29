/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module 'persian-date'

interface SvgrComponent
  extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
  const svgUrl: string
  const svgComponent: SvgrComponent
  export default svgUrl
  export { svgComponent as ReactComponent }
}
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

interface IRange {
  from: IDay | null
  to: IDay | null
}
interface ICalenderProvider {
  type?: string
  initCalender: IDay
  children: React.ReactElement | React.ReactElement[]
}
interface ISelectedDayProvider {
  type?: string
  initState?: IDay | IRange | null
  children: React.ReactElement | React.ReactElement[]
}
interface ISelectedTimeProvider {
  type?: string
  initState?: ITime | ITimeRange | null
  children: React.ReactElement | React.ReactElement[]
}

interface IViewProvider {
  children: React.ReactElement | React.ReactElement[]
}
interface IMinMaxProvider {
  initState: {
    minDate: IDay | null | undefined
    maxDate: IDay | null | undefined
  }
  children: React.ReactElement | React.ReactElement[]
}

interface IDtPickerProps {
  defaultValue?: IDay | IRange
  onChange: (date: any) => void
  onCalenderHide?: any
  onCalenderShow?: any
  type?: string
  withTime?: boolean
  local?: string
  showWeekend?: boolean
  clearBtn?: boolean
  isRequired?: boolean
  todayBtn?: boolean
  isDisabled?: boolean
  maxDate?: IDay
  minDate?: IDay
  placeholder?: string
  nextBtnLabel?: string
  previousBtnLabel?: string
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
interface IWrapper {
  onChange: (date: any) => void
  type: string
  withTime?: boolean
  local: string
  hasDefaultVal: boolean
  showWeekend: boolean
  todayBtn: boolean
  nextBtnLabel?: string
  previousBtnLabel?: string
  clockFromLabel?: string
  clockToLabel?: string
  clockLabel?: string
  nextMonthBtnTitle?: string
  previousMonthBtnTitle?: string
  headerClass?: string
  daysClass?: string
  timeClass?: string
  monthsClass?: string
  yearsClass?: string
  disabledDates?: IDay[]
}
interface IInputPicker {
  placeholder?: string
  type: string
  local: string
  handelComponentVisible: () => void
  onChange: (date: any) => void
  clearBtn?: boolean
  withTime?: boolean
  isDisabled?: boolean
  isRequired?: boolean
  fromLabel?: string
  toLabel?: string
  inputClass?: string
  clearBtnClass?: string
  maxDate: IDay | null | undefined
}
interface ITimeViewProps {
  initHour: number | undefined
  initMinutes: number | undefined
  timeFor?: string
  timeLabel?: string
  timeClass?: string
}
interface IHeaderProps {
  local: string
  nextBtnLabel?: string
  previousBtnLabel?: string
  nextMonthBtnTitle?: string
  previousMonthBtnTitle?: string
  headerClass?: string
}
interface IYearsProps {
  local: string
  yearsClass?: string
}
interface IMonthsProps {
  local: string
  monthsClass?: string
}
interface IDaysProps {
  hasDefaultVal: boolean
  local: string
  type?: string
  showWeekend: boolean
  daysClass?: string
  disabledDates?: IDay[]
}
interface ITodayBtn {
  local: string
  todayBtn: boolean
}
