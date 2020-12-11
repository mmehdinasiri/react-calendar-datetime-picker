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
  const handleCalendarChange = (newDate) => {
    console.log('Calendar changed')
    setDate(setDate)
  }
  const handleCalendarClose = () => console.log('Calendar closed')
  const handleCalendarOpen = () => console.log('Calendar opened')
  return (
      <DtPicker
        onChange={setDate}
        defaultValue={date}
        type='single'
        local='en'
        withTim
        showWeekend
        clearBtn
        isRequired
        todayBtn //if min or max date used, todayBtn will shows just when it's between min and max
        onCalenderShow={handleCalendarOpen}
        onCalenderHide={handleCalendarClose}
        maxDate={maxDate}
        minDate={minDate}
        // isDisabled
      />
  )
}
```
### TODO

- [x] max date
- [x] min date
<<<<<<< HEAD
- [x] fix header change view form months to years
- [x] add today button
- [x] check init value and default, min, max, from and to
- [x] add isRequired api
- [x] fix onChange api
- [ ] add placeholders and labels
- [ ] add classes options for different component
=======
- [ ] check init value and min max (max must be greater than min)
- [ ] fix header change view form months to years
- [ ] Portal version ( search portal in https://reactdatepicker.com/)
- [x] add today button
>>>>>>> 6b1edcea92657d2cada2ca6917b8dd0afee4b4cd
- [ ] add auto close form calender without time
- [ ] add list of disabled date feature
- [ ] remove disabled date in range date
- [ ] write test
- [ ] add styles

## License

MIT © [mehdinasiri](https://github.com/mehdinasiri)
