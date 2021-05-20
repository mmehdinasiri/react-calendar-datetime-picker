import { convertToEn, convertToFa } from './Utilities'
import DtCalendar from './DtCalendar'
import DtPicker from './DtPicker'

type Day = IDay | null
type Multi = IDay[] | null
type Range = {
  from: Day
  to: Day
}

export { DtCalendar, convertToEn, convertToFa }
export type { Day, Range, Multi }
export default DtPicker
