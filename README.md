# <img src="./src/assets/images/android-chrome-96x96.png?raw=true" width="26" height="auto" > react-calendar-datetime-picker

<p align="center">
<img src="./src/assets/images/react-datetime-picker.png?raw=true" width="200" height="auto" >
<img src="./src/assets/images/react-datetime-picker-jalali.png?raw=true" width="200" height="auto" >
</p>

### The Simple and fast English and Persian calender for React

version: "1.7.5"
[![NPM](https://img.shields.io/npm/v/react-calendar-datetime-picker.svg)](https://www.npmjs.com/package/react-calendar-datetime-picker) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## ⚙️ Install

```bash
npm install react-calendar-datetime-picker
or
yarn add react-calendar-datetime-picker

```

## ⚡️ Usage

```tsx
import { DtPicker } from 'react-calendar-datetime-picker'
import 'react-calendar-datetime-picker/dist/style.css'

const App = () => {
  const [date, setDate] = useState(null)
  return <DtPicker onChange={setDate} />
}
```

## 📄 Documentation

[Documentation with examples](https://mmehdinasiri.github.io/react-calendar-datetime-picker/)

- [Getting Started](https://mmehdinasiri.github.io/react-calendar-datetime-picker/docs/get-started)
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


<br>
<br>

## 🔧 Props

|Property|Type|Required|Default|Description|
|--- |--- |--- |--- |--- |
|onChange|func|true|-|A function that returns an object of selected date/dates.|
|initValue|Day | null||null|You can set a default value for your date using this property.|
|type|string||single|You can choose the selection type that you need to use. There exist 3 types: "single", "range", "multi"|
|local|string||en|This date picker supports both Gregorian and Jalali calenders.To select Gregorian calendar you have to set "local" to "en" and to "fa" for Jalali.|
|withTime|boolean||false|Should you need to use time in your date picker you can set this prop to true.This prop works only in single and range types.|
|showTimeInput|boolean||false|Helps you to show time in input date picker|
|showWeekend|boolean||false|Marks weekends by changing the color.|
|clearBtn|boolean||false|Add a button to your input to clear you calendar initial date/dates.|
|isRequired|boolean||false|This prop makes your input as a required field in the form validation|
|todayBtn|boolean||false|A button to move fast to the date of today in the calendar.|
|onCalenderChange|func|||A callback that runs when the calendar value is changed|
|onCalenderShow|func|||A callback that runs when the calendar opens|
|onCalenderHide|func|||A callback that runs when the calendar closes|
|maxDate|Day|||You can set this prop to limit the maximum date that the user can select.Periods partially overlapped by maxDate will also be selectable, although React-calendar-dateTime-picker will ensure that no later date is selected.|
|minDate|Day|||You can set this prop to limit the minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although React-calendar-dateTime-picker will ensure that no earlier date is selected.|
|disabledDates|Day[]|||A list of dates that you want the user not to select.|
|isDisabled|boolean||false|Use to disable the calendar input|
|yearListStyle|string||grid|Use to change year item list style(accepted value: grid, list)|



## 🎨 Customization
|Property|Type|Default|Description|
|--- |--- |--- |--- |
|placeholder|string|"select"|To change input date picker placeholder|
|inputClass|string||To change calendar's input style|
|clearBtnClass|string||To change calendar's clear button style|
|calenderModalClass|string||To change calendar's main modal style|
|headerClass|string||To change calendar's green header style|
|timeClass|string||To change calendar's time view style|
|daysClass|string||To change calendar's days view style|
|monthsClass|string||To change calendar's months view style|
|yearsClass|string||To change calendar's years view style|
|NextBtnIcon|svg as component|">"|To change next month button icon.|
|PreviousBtnIcon|svg as component|"<"|To change previous month button icon.|
|nextMonthBtnTitle|string|"next"|To change next month button title(shows by hover).|
|previousMonthBtnTitle|string|"previous"|To change previous month button title(shows by hover).|
|fromLabel|string|"from"|Starting date label in input result(works only in range type).|
|toLabel|string|"to"|Ending date label in input result(works only in range type).|
|clockFromLabel|string|"from"|Title for starting time in the time component(works only in range type).|
|clockToLabel|string|"to"|Title for ending time in the time component(works only in range type).|
|clockLabel|string|"clock"|Label for time in the time component(works in single and range type).|

<br>
<br>
<br>

## ✔️ bundle size

You can check out this package bundle size in this [Link](https://bundlephobia.com/result?p=react-calendar-datetime-picker@1.7.5)

## 🙇 Special Thanks

Thanks to [jalaali-js](https://github.com/jalaali/jalaali-js), the only dependency of this date picker.

## 📋 License

MIT © [mehdinasiri](https://github.com/mmehdinasiri)

