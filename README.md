# <img src="./website/public/favicon/android-chrome-96x96.png?raw=true" width="26" height="auto" > react-calendar-datetime-picker

<p align="center">
<img src="./website/public/image/react-datetime-picker.png?raw=true" width="200" height="auto" >
<img src="./website/public/image/react-datetime-picker-jalali.png?raw=true" width="200" height="auto" >
</p>

### The Simple and fast English and Persian calender for React

version: "1.5.0"

[![NPM](https://img.shields.io/npm/v/react-calendar-datetime-picker.svg)](https://www.npmjs.com/package/react-calendar-datetime-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## ⚙️ Install

```bash
npm install react-calendar-datetime-picker
or
yarn add react-calendar-datetime-picker

```

## ⚡️ Usage

```tsx
import React from 'react'

import DtPicker from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/index.css'

const App = () => {
  const [date, setDate] = useState(null)
  return <DtPicker onChange={setDate} />
}
```

## 📄 Documentation

[Documentation with examples](https://mmehdinasiri.github.io/react-calendar-datetime-picker/)

- [Getting Started](https://mmehdinasiri.github.io/react-calendar-datetime-picker/docs/quick-start)
- [Props](https://mmehdinasiri.github.io/react-calendar-datetime-picker/docs/props)
- [Customization](https://mmehdinasiri.github.io/react-calendar-datetime-picker/docs/customization)
- [Utilities](https://mmehdinasiri.github.io/react-calendar-datetime-picker/docs/utilities)
- [Typescript](https://mmehdinasiri.github.io/react-calendar-datetime-picker/docs/typescript)
- [Examples](https://mmehdinasiri.github.io/react-calendar-datetime-picker/docs/examples)

## 🎯 Features

- Supports Gregorian and Jalali calender
- Uses context api to share data
- Supports three types of calender: single day - date range - multiple dates
- Fully customizable
- Supports maximum and minimum dates
- Capability to add a list of disabled dates
- Supports time for single and range type
- Capability to mark weekends
- Function called for change, open and close events
- Supports Typescript

## ✔️ bundle size

You can check out this package bundle size in this [link](https://bundlephobia.com/result?p=react-calendar-datetime-picker)

## 🙇 Special Thanks

Thanks to [jalaali-js](https://github.com/jalaali/jalaali-js), the only dependency of this date picker.

## 👨🏽‍💻 Team

| [![Mehdi Nasiri](https://avatars.githubusercontent.com/u/24561712?v=3&s=144)](https://github.com/mmehdinasiri) | [![Omid Rafiee](https://avatars.githubusercontent.com/u/25098596?v=3&s=144)](https://github.com/OmidRafiee) | [![Esmaeil jafari](https://avatars.githubusercontent.com/u/40715465?v=3&s=144)](https://github.com/pokerface71) |
| -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Mehdi Nasiri ](https://github.com/iharsh234)                                                                  | [Omid Rafiee](https://github.com/OmidRafiee)                                                                | [Esmaeil jafari](https://github.com/pokerface71)                                                                |

## 📋 License

MIT © [mehdinasiri](https://github.com/mehdinasiri)
