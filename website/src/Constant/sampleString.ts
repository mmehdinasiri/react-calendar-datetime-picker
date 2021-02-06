export const singleExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
    />
  )
}
export default DatePicker
`
export const singleInitValueExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      initValue={{ year: 2016, month: 6, day: 20 }}
    />
  )
}
export default DatePicker
`

export const singlePersianExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      local="fa"
    />
  )
}
export default DatePicker
`
export const rangeExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      type='range'
    />
  )
}
export default DatePicker
`
export const rangeInitValueEExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      initValue={{
        from: { year: 2012, month: 5, day: 2 },
        to: { year: 2012, month: 5, day: 23 }
      }}
      type='range'
    />
  )
}
export default DatePicker
`
export const multiExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      type='multi'
    />
  )
}
export default DatePicker
`
export const multiInitialValueExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      initValue={[
        {
          year: 2012,
          month: 5,
          day: 29,
          hours: 18,
          minutes: 11
        },
        {
          year: 2012,
          month: 5,
          day: 2,
          hours: 18,
          minutes: 11
        },
        {
          year: 2012,
          month: 6,
          day: 3,
          hours: 18,
          minutes: 11
        }
      ]}
      type='multi'
    />
  )
}
export default DatePicker
`
export const singleTimeExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      withTime
    />
  )
}
export default DatePicker
`
export const displayingOptionExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      showWeekend
      clearBtn
      todayBtn
    />
  )
}
export default DatePicker
`
export const callbackApiExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  const handleCalendarChange = (newDate: any) => {
    console.log('Calendar changed')
    setDateEn(newDate)
  }
  const handleCalendarClose = () => {
    console.log('Calendar closed')
  }
  const handleCalendarOpen = () => {
    console.log('Calendar opened')
  }
  return (
    <DtPicker
      onChange={handleCalendarChange}
      onChange={handleCalendarChange}
      onCalenderShow={handleCalendarOpen}
      onCalenderHide={handleCalendarClose}
    />
  )
}
export default DatePicker
`
export const minMaxExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
const maxDate = {
    year: 2016,
    month: 6,
    day: 23
  }
  const minDate = {
    year: 2012,
    month: 5,
    day: 2
  }
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      minDate={minDate}
      maxDate={maxDate}
    />
  )
}
export default DatePicker
`
export const disabledExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  const disabledDates = [
    {
      year: 2015,
      month: 6,
      day: 23
    },
    {
      year: 2015,
      month: 6,
      day: 12
    },
    {
      year: 2015,
      month: 6,
      day: 10
    }
  ]
  return (
    <DtPicker
      onChange={setDate}
      disabledDates={disabledDatesList}
      minDate={minDate}
      maxDate={maxDate}
    />
  )
}
export default DatePicker
`
export const withoutInputStr = `
import  { DtCalendar } from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtCalendar
      onChange={setDate}
    />
  )
}
export default DatePicker
`
export const customCalender = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      NextBtnIcon={arrowRight}
      PreviousBtnIcon={arrowLeft}
      placeholder='select date'
      fromLabel='From date'
      toLabel='To date'
      type='range'
      inputClass='custom-input'
      daysClass='custom-days'
      headerClass='custom-header'
    />
  )
}
export default DatePicker
`
export const customCalenderStyle = `
.custom-input {
  text-align: right;
  color: #009a17;
  height: 46px !important;
  line-height: 46px !important;
  &::placeholder {
    color: #009a17;
  }
}
.custom-days {
  background-color: #c8daff;
  .is-week-days {
    color: #d20000;
  }
  .is-disabled {
    color: #444;
  }
}
.custom-header {
  background-color: #538bff;
}
`
export const convertToFaStr = `
import DtPicker, {
  convertToFa
} from 'react-calendar-datetime-picker'

const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <div>
      <DtPicker
        onChange={setDate}
      />
      <p>convertToFa(date)</p>
    </div>
  )
}
export default DatePicker
`
export const convertToEnStr = `
import DtPicker, {
  convertToEn
} from 'react-calendar-datetime-picker'

const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <div>
      <DtPicker
        onChange={setDate}
        withTime
        local="fa"
      />
      <p>convertToEn(date,'-')</p>
    </div>
  )
}
export default DatePicker
`
export const typescriptStr = `
import DtPicker, { Day, Range, Multi  } from 'react-calendar-datetime-picker'

const DatePicker = () => {
  const [date, setDate] = useState<Day>(null)
  const [dateRange, setDateRange] = useState<Range>(null)
  const [dateMulti, setDateMulti] = useState<Multi>(null)

  return (
    <div>
      <DtPicker 
        onChange={setDate} 
        type="single"
        placeholder='select single day'
      />
      <DtPicker 
        onChange={setDateRange} 
        type="range"
        placeholder='select range of days' 
      />
      <DtPicker 
        onChange={setDateMulti} 
        type='multi'
        placeholder='select multi days'
      />
    </div>
  )
}
export default DatePicker
`
