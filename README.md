# react-calendar-datetime-picker

> Made with create-react-library

### The Simple and fast English and Persian calender for React

version: "1.2.2"

[![NPM](https://img.shields.io/npm/v/react-calendar-datetime-picker.svg)](https://www.npmjs.com/package/react-calendar-datetime-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![alt text](./website/public/image/react-datetime-picker.jpg?raw=true)

Thanks to [PersianDate](https://github.com/babakhani/PersianDate), the only dependency of this date picker.

## Install

```bash
npm install react-calendar-datetime-picker
or
yarn add react-calendar-datetime-picker

```

## Documentation 📄

You can find documentation on [the website.](https://mmehdinasiri.github.io/react-datetime-picker/)

## Usage

```tsx
import React, { Component } from 'react'

import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

const App = () => {
  const [date, setDate] = useState(null)
  return <DtPicker onChange={setDate} initValue={date} />
}
```

- Support English and Persian(Jalali) calender
- Use context api to share data
- Support Three type of calender: single day - range dates - multi dates
- Fully customizable
- Support maximum and minimum dates
- Capability to add a list of disable dates
- Support Time for single and range type
- Capability to show days of weekend and today button
- Api for open and close events
- Support Tyepscript

## License

MIT © [mehdinasiri](https://github.com/mehdinasiri)
