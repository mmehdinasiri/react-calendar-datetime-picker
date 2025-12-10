/**
 * Content definitions for customization categories.
 * Used with CategoryContentDisplay component to render category descriptions.
 */

export const customizationContent = {
  'Custom Trigger Elements': {
    intro:
      'Bind the calendar modal to any HTML element instead of just input fields. Use the `triggerElement` prop to create custom-styled triggers like buttons, divs, or any interactive element. When provided, the default input field will not be rendered.',
    typeDefinitions: ['triggerElement?: ReactNode'],
    details: [
      {
        title: 'Props:',
        content: `• triggerElement - Accepts any React node (button, div, input, etc.). When provided, replaces the default input field. The element will trigger the calendar modal when clicked.`
      }
    ]
  },
  Themes: {
    intro:
      'The calendar supports light and dark themes, as well as custom themes using CSS variables. The `dark` prop enables the dark theme for both DtPicker and DtCalendar components.',
    typeDefinitions: ['dark?: boolean'],
    details: [
      {
        title: 'Props:',
        content: `• dark - When set to \`true\`, enables the dark theme. Default is \`false\` (light theme).`
      }
    ]
  },
  'CSS Variables': {
    intro:
      'The easiest way to customize the calendar appearance is by overriding CSS variables. Apply custom variables using the `calenderModalClass` prop. This class is applied to the calendar component, allowing you to override any CSS variable.',
    typeDefinitions: ['calenderModalClass?: string'],
    details: [
      {
        title: 'Props:',
        content: `• calenderModalClass - A CSS class name that will be applied to the calendar component. Use this class to override CSS variables for colors, spacing, fonts, and more.`
      }
    ]
  },
  'Custom CSS Classes': {
    intro:
      'Override specific calendar elements using the `customization` prop with the `classes` property. This allows you to add custom CSS classes to specific calendar components.',
    typeDefinitions: [
      `interface CalendarClasses {
  header?: string
  days?: string
  months?: string
  years?: string
}

customization?: {
  classes?: CalendarClasses
}`
    ],
    details: [
      {
        title: 'Properties:',
        content: `• header - Custom CSS class for the calendar header
• days - Custom CSS class for the days grid container
• months - Custom CSS class for the months selection view
• years - Custom CSS class for the years selection view`
      }
    ],
    codeExample: `<DtCalendar
  calenderModalClass="my-custom-calendar"
  // ... other props
/>`,
    cssClasses: {
      calendarStructure: [
        {
          class: '.react-calendar-datetime-picker',
          description: 'Root container'
        },
        { class: '.calendar-header', description: 'Header section' },
        { class: '.calendar-days-grid', description: 'Days grid container' },
        {
          class: '.calendar-months-view',
          description: 'Months selection view'
        },
        { class: '.calendar-years-view', description: 'Years selection view' }
      ],
      interactiveElements: [
        { class: '.calendar-day', description: 'Individual day cells' },
        { class: '.calendar-day--selected', description: 'Selected days' },
        { class: '.calendar-day--today', description: "Today's date" },
        { class: '.calendar-day--disabled', description: 'Disabled days' },
        { class: '.calendar-nav-button', description: 'Navigation buttons' }
      ]
    }
  },
  'Custom Icons': {
    intro:
      'Customize navigation icons using the `customization` prop with the `icons` property. Replace the default chevron icons with your own React components.',
    typeDefinitions: [
      `interface CalendarIcons {
  next?: React.ComponentType<{ className?: string }>
  previous?: React.ComponentType<{ className?: string }>
}

customization?: {
  icons?: CalendarIcons
}`
    ],
    details: [
      {
        title: 'Properties:',
        content: `• next - React component for the next month navigation button. Receives a \`className\` prop.
• previous - React component for the previous month navigation button. Receives a \`className\` prop.`
      }
    ]
  },
  Internationalization: {
    intro:
      'Full internationalization support with locale-based translations, RTL support, and customizable text.',
    details: [
      {
        title: 'Supported Locales:',
        content: `• English (en) - Default - Latin numbers, Left-to-right (LTR), English month/weekday names
• Persian/Farsi (fa) - Persian numbers, Right-to-left (RTL), Persian month/weekday names
• German (de) - Latin numbers, Left-to-right (LTR), German month/weekday names
• Spanish (es) - Latin numbers, Left-to-right (LTR), Spanish month/weekday names
• French (fr) - Latin numbers, Left-to-right (LTR), French month/weekday names`
      },
      {
        title: 'Custom Translations:',
        content: `Override any text in the calendar using the \`translations\` property in customization.`
      },
      {
        title: 'RTL Support:',
        content: `Automatic right-to-left layout support for RTL languages. RTL support is tied to the \`locale\` prop, not the calendar system. Currently, the \`fa\` (Persian) locale is the only locale that provides RTL support, even when used with the Gregorian calendar system (\`calendarSystem="ge"\`).`
      }
    ],
    supportedLocales: {
      description: 'The calendar supports multiple locales out of the box:',
      locales: [
        {
          name: 'English (en) - Default',
          features: [
            'Latin numbers',
            'Left-to-right (LTR)',
            'English month/weekday names'
          ]
        },
        {
          name: 'Persian/Farsi (fa)',
          features: [
            'Persian numbers',
            'Right-to-left (RTL)',
            'Persian month/weekday names'
          ]
        },
        {
          name: 'German (de)',
          features: [
            'Latin numbers',
            'Left-to-right (LTR)',
            'German month/weekday names'
          ]
        },
        {
          name: 'Spanish (es)',
          features: [
            'Latin numbers',
            'Left-to-right (LTR)',
            'Spanish month/weekday names'
          ]
        },
        {
          name: 'French (fr)',
          features: [
            'Latin numbers',
            'Left-to-right (LTR)',
            'French month/weekday names'
          ]
        }
      ],
      codeExample: `// Basic locale usage
<DtPicker locale="fa" onChange={setDate} />

// German locale
<DtCalendar locale="de" onChange={setDate} />

// French locale
<DtPicker locale="fr" onChange={setDate} />`
    },
    customTranslations: {
      description:
        'Override any text in the calendar using the `translations` property in customization.',
      interfaceCode: `export interface CalendarTranslations {
  /** Month names (12 elements, index 0-11 for months 1-12) */
  months: string[]

  /** Weekday names (7 elements, starting from first day of week) */
  weekdays: string[]

  /** Text direction */
  direction: 'ltr' | 'rtl'

  /** Number system */
  numbers: 'latin' | 'persian'

  /** Common labels */
  labels: {
    /** Today button text */
    today: string
    /** Clear button text - aria-label (ACCESSIBILITY ONLY) - DtPicker only */
    clear: string
    /** Cancel button text */
    cancel: string
    /** OK/Confirm button text */
    ok: string
    /** Next month button title */
    nextMonth: string
    /** Previous month button title */
    previousMonth: string
    /** Month selection view label */
    selectMonth: string
    /** Year selection view label */
    selectYear: string
    /** Time selector from label (for ranges) */
    from: string
    /** Time selector to label (for ranges) */
    to: string
    /** AM indicator */
    am: string
    /** PM indicator */
    pm: string
  }

  /** Preset range labels */
  presetRanges: {
    yesterday: string
    last7days: string
    last30days: string
    thisMonth: string
    lastMonth: string
  }
}`,
      exampleCode: `// Complete custom translations example
<DtPicker
  locale="en"
  customization={{
    translations: {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      direction: 'ltr',
      numbers: 'latin',
      labels: {
        today: 'Today',
        clear: 'Clear',
        cancel: 'Cancel',
        ok: 'OK',
        nextMonth: 'Next',
        previousMonth: 'Previous',
        selectMonth: 'Select month',
        selectYear: 'Select year',
        from: 'From',
        to: 'To',
        am: 'AM',
        pm: 'PM'
      },
      presetRanges: {
        yesterday: 'Yesterday',
        last7days: 'Last 7 days',
        last30days: 'Last 30 days',
        thisMonth: 'This month',
        lastMonth: 'Last month'
      }
    }
  }}
  onChange={setDate}
/>`
    },
    rtlSupport: {
      description: `Automatic right-to-left layout support for RTL languages. RTL support is tied to the \`locale\` prop, not the calendar system. Currently, the \`fa\` (Persian) locale is the only locale that provides RTL support, even when used with the Gregorian calendar system (\`calendarSystem="ge"\`).`,
      features: [
        '• Automatic text direction detection',
        '• Persian/Arabic numerals in dates and times',
        '• RTL calendar layout',
        '• Localized month and weekday names',
        '• RTL time picker interface'
      ]
    }
  }
}
