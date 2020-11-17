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
interface IDtPickerProps {
  defaultValue?: IDay | IRange
  onChange: () => void
  type?: string
  withTime?: boolean
  local?: string
}

interface ITimeViewProps {
  initHour: number | undefined
  initMinutes: number | undefined
  timeFor?: string
}
interface IHeaderProps {
  local: string
}
interface IYearsProps {
  local: string
}
interface IMonthsProps {
  local: string
}
interface IDaysProps {
  hasDefaultVal: boolean
  local: string
  type?: string
}
