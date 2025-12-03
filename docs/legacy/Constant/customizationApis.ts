export const CUSTOMIZATION_APIS = [
  {
    property: 'placeholder',
    type: 'string',
    default: '"select"',
    description: 'To change input date picker placeholder'
  },
  {
    property: 'inputClass',
    type: 'string',
    default: '',
    description: "To change calendar's input style"
  },
  {
    property: 'clearBtnClass',
    type: 'string',
    default: '',
    description: "To change calendar's clear button style"
  },
  {
    property: 'calenderModalClass',
    type: 'string',
    default: '',
    description: "To change calendar's main modal style"
  },
  {
    property: 'headerClass',
    type: 'string',
    default: '',
    description: "To change calendar's green header style"
  },
  {
    property: 'timeClass',
    type: 'string',
    default: '',
    description: "To change calendar's time view style"
  },
  {
    property: 'daysClass',
    type: 'string',
    default: '',
    description: "To change calendar's days view style"
  },
  {
    property: 'monthsClass',
    type: 'string',
    default: '',
    description: "To change calendar's months view style"
  },
  {
    property: 'yearsClass',
    type: 'string',
    default: '',
    description: "To change calendar's years view style"
  },

  {
    property: 'NextBtnIcon',
    type: 'svg as component',
    default: '">"',
    description: 'To change next month button icon.'
  },
  {
    property: 'PreviousBtnIcon',
    type: 'svg as component',
    default: '"<"',
    description: 'To change previous month button icon.'
  },
  {
    property: 'nextMonthBtnTitle',
    type: 'string',
    default: '"next"',
    description: 'To change next month button title(shows by hover).'
  },
  {
    property: 'previousMonthBtnTitle',
    type: 'string',
    default: '"previous"',
    description: 'To change previous month button title(shows by hover).'
  },
  {
    property: 'fromLabel',
    type: 'string',
    default: '"from"',
    description:
      'Starting date label in input result(works only in range type).'
  },
  {
    property: 'toLabel',
    type: 'string',
    default: '"to"',
    description: 'Ending date label in input result(works only in range type).'
  },
  {
    property: 'clockFromLabel',
    type: 'string',
    default: '"from"',
    description:
      'Title for starting time in the time component(works only in range type).'
  },
  {
    property: 'clockToLabel',
    type: 'string',
    default: '"to"',
    description:
      'Title for ending time in the time component(works only in range type).'
  },
  {
    property: 'clockLabel',
    type: 'string',
    default: '"clock"',
    description:
      'Label for time in the time component(works in single and range type).'
  }
]
