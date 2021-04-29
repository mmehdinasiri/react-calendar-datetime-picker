export const APIS = [
	{
		property: 'onChange',
		type: 'func',
		default: '-',
		required: 'true',
		description: 'A function that returns an object of selected date/dates.'
	},
	{
		property: 'initValue',
		type: 'Day | null',
		default: 'null',
		description:
			'You can set a default value for your date using this property.'
	},
	{
		property: 'type',
		type: 'string',
		default: 'single',
		description:
			'You can choose the selection type that you need to use. There exist 3 types: "single", "range", "multi"'
	},
	{
		property: 'local',
		type: 'string',
		default: 'en',
		description:
			'This date picker supports both Gregorian and Jalali calenders.To select Gregorian calender you have to set "local" to "en" and to "fa" for Persian.'
	},
	{
		property: 'withTime',
		type: 'boolean',
		default: 'false',
		description:
			'Should you need to use time in your date picker you can set this prop to true.This prop works only in single and range types.'
	},
	{
		property: 'showWeekend',
		type: 'boolean',
		default: 'false',
		description: 'Marks weekends by changing the color.'
	},
	{
		property: 'clearBtn',
		type: 'boolean',
		default: 'false',
		description:
			'Add a button to your input to clear you calender initial date/dates.'
	},
	{
		property: 'isRequired',
		type: 'boolean',
		default: 'false',
		description:
			'This prop makes your input as a required field in the form validation'
	},
	{
		property: 'todayBtn',
		type: 'boolean',
		default: 'false',
		description: 'A button to move fast to the date of today in the calender.'
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
		type: 'Day',
		default: '',
		description:
			'You can set this prop to limit the maximum date that the user can select.Periods partially overlapped by maxDate will also be selectable, although React-calendar-dateTime-picker will ensure that no later date is selected.'
	},
	{
		property: 'minDate',
		type: 'Day',
		default: '',
		description:
			'You can set this prop to limit the minimum date that the user can select. Periods partially overlapped by minDate will also be selectable, although React-calendar-dateTime-picker will ensure that no earlier date is selected.	'
	},
	{
		property: 'disabledDates',
		type: 'Day[]',
		default: '',
		description: 'A list of dates that you want the user not to select.'
	},
	{
		property: 'isDisabled',
		type: 'boolean',
		default: 'false',
		description: 'Use to disable the calendar input'
	}
]
