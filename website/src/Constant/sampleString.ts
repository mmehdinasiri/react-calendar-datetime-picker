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
export const multiExampleStr = `
const DatePicker = () => {
  const [date, setDate] = useState(null)
  return (
      <DtPicker
        onChange={setDate}
        defaultValue={date}
        type='multi'
      />
  )
}
export default DatePicker
`
