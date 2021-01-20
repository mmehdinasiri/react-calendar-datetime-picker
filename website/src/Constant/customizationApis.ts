export const CUSTOMIZATION_APIS = [
  {
    property: 'placeholder',
    type: 'string',
    default: '"select"',
    description: 'To change input picker placeholder'
  },
  {
    property: 'inputClass',
    type: 'string',
    default: '',
    description: "Use to pass custom class to calender's input"
  },
  {
    property: 'clearBtnClass',
    type: 'string',
    default: '',
    description: "Use to pass custom class to calender's clear button"
  },
  {
    property: 'calenderModalClass',
    type: 'string',
    default: '',
    description: "Use to pass custom class to calender's main modal"
  },
  {
    property: 'headerClass',
    type: 'string',
    default: '',
    description: "Use to pass custom class to calender's green header"
  },
  {
    property: 'timeClass',
    type: 'string',
    default: '',
    description: "Use to pass custom class to calender's time view"
  },
  {
    property: 'daysClass',
    type: 'string',
    default: '',
    description: "Use to pass custom class to calender's days view"
  },
  {
    property: 'monthsClass',
    type: 'string',
    default: '',
    description: "Use to pass custom class to calender's months view"
  },
  {
    property: 'yearsClass',
    type: 'string',
    default: '',
    description: "Use to pass custom class to calender's years view"
  },

  {
    property: 'NextBtnIcon',
    type: 'svg as component',
    default: '">"',
    description: 'To change next month button.'
  },
  {
    property: 'PreviousBtnIcon',
    type: 'svg as component',
    default: '"<"',
    description: 'To change previous month button.'
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
    description: 'Date start label in input result.It just works in range type'
  },
  {
    property: 'toLabel',
    type: 'string',
    default: '"to"',
    description: 'Date end label in input result.It just works in range type'
  },
  {
    property: 'clockFromLabel',
    type: 'string',
    default: '"from"',
    description:
      'Title for start time in the time component.It just works in range type'
  },
  {
    property: 'clockToLabel',
    type: 'string',
    default: '"to"',
    description:
      'Title for end time in the time component.It just works in range type'
  },
  {
    property: 'clockLabel',
    type: 'string',
    default: '"clock"',
    description:
      'Label for time in the time component.It just works in range type'
  }
]
