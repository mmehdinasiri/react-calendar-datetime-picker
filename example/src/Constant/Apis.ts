export const APIS = [
  {
    property: 'defaultValue',
    type: 'IDay | null',
    default: 'null',
    description: 'You can set default value for your date by this property.'
  },
  {
    property: 'onChange',
    type: 'func',
    default: 'null',
    description:
      'A function that return the object of selected date/dates. The type returned object can be one of these are: IDay | IRange | IDay[]'
  },
  {
    property: 'type',
    type: 'string',
    default: 'single',
    description:
      'You can choose which type of calender that you want to use. There are 3 types of calender exist: single, range, multi'
  },
  {
    property: 'local',
    type: 'string',
    default: 'en',
    description:
      'This date picker support both English and Persian(Jalali) calender.To select English calender you have to set "local" to "en" and "fa"for Persian.'
  },
  {
    property: 'withTime',
    type: 'boolean',
    default: 'false',
    description:
      'If you want to use Time in you date picker you must set this prop to true.This prop works just in single and range type.'
  },
  {
    property: 'showWeekend',
    type: 'boolean',
    default: 'false',
    description: 'Bold weekends with changing color of weekends.'
  },
  {
    property: 'clearBtn',
    type: 'boolean',
    default: 'false',
    description: 'Add clear button to your input to reset you calender dates.'
  },
  {
    property: 'isRequired',
    type: 'boolean',
    default: 'false',
    description:
      "It' props make your input as required field in you form validation"
  },
  {
    property: 'todayBtn',
    type: 'boolean',
    default: 'false',
    description: 'A button to move fast to current date in the calender'
  },
  {
    property: 'onCalenderShow',
    type: 'func',
    default: '',
    description: 'A callback that runs when the calender opens'
  },
  {
    property: 'onCalenderHide',
    type: 'func',
    default: '',
    description: 'A callback that runs when the calender closes'
  },
  {
    property: 'maxDate',
    type: 'IDay',
    default: '',
    description:
      'Maximum date that the user can select. Periods partially overlapped by maxDate will also be selectable, although React-DateTime-Picker will ensure that no later date is selected.'
  },
  {
    property: 'minDate',
    type: 'IDay',
    default: '',
    description:
      'Minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although React-DateTime-Picker will ensure that no earlier date is selected.	'
  },
  {
    property: 'disabledDates',
    type: 'IDay[]',
    default: '',
    description: "A list of that you want user can't selected them."
  },
  {
    property: 'isDisabled',
    type: 'boolean',
    default: 'false',
    description: 'Use to disable input of React-DateTime-Picker'
  }
]
