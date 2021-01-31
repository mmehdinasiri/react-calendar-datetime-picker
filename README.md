# react-datetime-picker

> Made with create-react-library
### The Simple and fast English and Persian calender for React

version: "1.2.0"

[![NPM](https://img.shields.io/npm/v/react-datetime-picker.svg)](https://www.npmjs.com/package/react-datetime-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![alt text](./website/public/image/react-datetime-picker.jpg?raw=true)

Thanks to [PersianDate](https://github.com/babakhani/PersianDate), the only dependency of this date picker.

## Install

```bash
npm install react-datetime-picker
or
yarn add react-datetime-picker

```

## Documentation 📄

You can find documentation on [the website.](https://mmehdinasiri.github.io/react-datetime-picker/)

The documentation is divided into several sections:

- [Getting Started](https://mmehdinasiri.github.io/react-datetime-picker/docs/getting-started)
- [Examples](https://mmehdinasiri.github.io/react-datetime-picker/docs/Examples)

## Usage

```tsx
import React, { Component } from 'react'

import { DtPicker } from 'react-datetime-picker'
import 'react-datetime-picker/dist/index.css'

const App = () => {
  const [date, setDate] = useState()
  return <DtPicker onChange={handleCalendarChange} initValue={dateEn} />
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
