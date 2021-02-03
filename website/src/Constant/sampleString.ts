export const singleExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
    <DtPicker
      onChange={setDate}
      initValue={date}
    />
  )
}
export default DatePicker
`
export const singleInitValueExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState({ year: 2016, month: 6, day: 20 })
  return (
    <DtPicker
      onChange={setDate}
      initValue={date}
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
      initValue={date}
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
      initValue={date}
      type='range'
    />
  )
}
export default DatePicker
`
export const rangeInitValueEExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState({
    from: { year: 2012, month: 5, day: 2 },
    to: { year: 2012, month: 5, day: 23 }
  })
  return (
    <DtPicker
      onChange={setDate}
      initValue={date}
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
      initValue={date}
      type='multi'
    />
  )
}
export default DatePicker
`
export const multiInitialValueExampleStr = `
import DtPicker from 'react-calendar-datetime-picker'
const DatePicker = () => {
  const [date, setDate] = useState([
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
  ])
  return (
    <DtPicker
      onChange={setDate}
      initValue={date}
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
      initValue={date}
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
      initValue={date}
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
      initValue={callBackApi}
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
      initValue={date}
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
      initValue={date}
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
      initValue={data}
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
      initValue={date}
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
        initValue={date}
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
        initValue={date}
        withTime
        local="fa"
      />
      <p>convertToEn(date,'-')</p>
    </div>
  )
}
export default DatePicker
`
