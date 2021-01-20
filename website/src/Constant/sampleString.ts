export const singleExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
      <DtPicker
        onChange={setDate}
        defaultValue={date}
      />
  )
}
export default DatePicker
`
export const singleInitValueExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState({ year: 2016, month: 6, day: 20 })
  return (
      <DtPicker
        onChange={setDate}
        defaultValue={date}
      />
  )
}
export default DatePicker
`

export const singlePersianExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
      <DtPicker
        onChange={setDate}
        defaultValue={date}
        local="fa"
      />
  )
}
export default DatePicker
`
export const rangeExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
      <DtPicker
        onChange={setDate}
        defaultValue={date}
        type='range'
      />
  )
}
export default DatePicker
`
export const rangeInitValueEExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState({
    from: { year: 2012, month: 5, day: 2 },
    to: { year: 2012, month: 5, day: 23 }
  })
  return (
      <DtPicker
        onChange={setDate}
        defaultValue={date}
        type='range'
      />
  )
}
export default DatePicker
`
export const multiExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
      <DtPicker
        onChange={setDate}
        defaultValue={date}
  )
}
export default DatePicker
`
export const multiInitialValueExampleStr = `
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
        defaultValue={date}
  )
}
export default DatePicker
`
export const singleTimeExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
      <DtPicker
        onChange={setDate}
  )
}
export default DatePicker
`
export const displayingOptionExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
      <DtPicker
        onChange={setDate}
  )
}
export default DatePicker
`
export const callbackApiExampleStr = `


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
  )
}
export default DatePicker
`
export const minMaxExampleStr = `
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
  )
}
export default DatePicker
`
export const disabledExampleStr = `
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
  )
}
export default DatePicker
`
