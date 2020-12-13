# react-datetime-picker

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-datetime-picker.svg)](https://www.npmjs.com/package/react-datetime-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-datetime-picker
```

## Usage

```tsx
import React, { Component } from 'react'

import { DtPicker } from 'react-datetime-picker'
import 'react-datetime-picker/dist/index.css'

const App = () => {
  const [date, setDate] = useState()
  const maxDate = {
    year: 2012,
    month: 6,
    day: 23
  }
  const minDate = {
    year: 2012,
    month: 5,
    day: 2
  }
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
  const handleCalendarChange = (newDate) => {
    console.log('Calendar changed')
    setDate(setDate)
  }
  const handleCalendarClose = () => console.log('Calendar closed')
  const handleCalendarOpen = () => console.log('Calendar opened')
  return (
      <DtPicker
        onChange={handleCalendarChange}
        defaultValue={dateEn}
        type='single'
        local='en'
        withTime
        showWeekend
        clearBtn
        isRequired
        todayBtn //if min or max date used, todayBtn will shows just when it's between min and max
        placeholder='seleccccccct'
        nextBtnLabel='next'
        previousBtnLabel='previous'
        fromLabel='from date'
        toLabel='to date'
        clockFromLabel='froom'  // this is just shows in range type
        clockToLabel='too'      // this is just shows in range type
        clockLabel='cloock'     // this is just shows in single type
        nextMonthBtnTitle='next btn Title'
        previousMonthBtnTitle='previous btn Title'
        onCalenderShow={handleCalendarOpen}
        onCalenderHide={handleCalendarClose}
        maxDate={maxDate}
        minDate={minDate}
        inputClass='inputClass'
        clearBtnClass='clearBtnClass'
        calenderModalClass='calenderModalClass'
        headerClass='headerClass'
        timeClass='timeClass'
        daysClass='daysClass'
        monthsClass='monthClass'
        yearsClass='yearClass'
        disabledDates={disabledDates}
        // isDisabled
      />
  )
}
```
### TODO

- [x] max date
- [x] min date
- [x] fix header change view form months to years
- [x] add today button
- [x] check init value and default, min, max, from and to
- [x] add isRequired api
- [x] fix onChange api
- [x] add placeholders and labels
- [x] add classes options for different component
- [x] add list of disabled date feature
- [ ] write test
- [ ] add styles

## License

MIT © [mehdinasiri](https://github.com/mehdinasiri)
