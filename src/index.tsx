import { convertToEn, convertToFa } from './Utilities'
import DtCalendar from './DtCalendar'
import DtPicker from './DtPicker'
interface IDay {
  year: number
  month: number
  day: number
  fullDay?: string
  hour?: number
  minute?: number
}

interface IRange {
  from: Day
  to: Day
}
type Day = IDay | null
type Range = IRange | null
type Multi = IDay[] | null

export { DtCalendar, convertToEn, convertToFa }
export type { Day, Range, Multi }
export default DtPicker
