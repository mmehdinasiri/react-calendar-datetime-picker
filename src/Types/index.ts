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

export { ITime, ITimeRange, IDay, IRange }
