import { convertToEn, convertToFa } from '@/utils/helpers'
import DtCalendar from './DtCalendar'
import DtPicker from './DtPicker'
import { IDay, IRange } from '@/types/type'

type Day = IDay | null
type Range = IRange | null
type Multi = IDay[] | null

export { DtCalendar, convertToEn, convertToFa }
export type { Day, Range, Multi }
export default DtPicker
