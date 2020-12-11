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
- [x] fix header change view form months to years
- [x] add today button
- [x] check init value and default, min, max,from and to
- [ ] add onChange api
- [ ] add auto close form calender without time
- [ ] add list of disabled date feature
- [ ] remove disabled date in range date
- [ ] write test
- [ ] add styles

## License

MIT © [mehdinasiri](https://github.com/mehdinasiri)
