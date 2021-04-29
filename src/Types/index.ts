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

type Range = IRange | null
type Multi = IDay[] | null

export { ITime, ITimeRange, IDay, Day, IRange, Range, Multi }
