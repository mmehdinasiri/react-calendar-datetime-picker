/**
 * Content definitions for internationalization categories.
 * Used with CategoryContentDisplay component to render category descriptions.
 */

export const internationalizationContent = {
  Locale: {
    intro: `A locale determines the language and regional settings for the calendar component. When you set the \`locale\` prop, the calendar automatically adapts all UI text, including month names, weekday names, button labels, and number formatting to match the selected language. Each locale also configures the text direction (LTR or RTL) and number system (Latin or Persian numerals).`,
    details: [
      {
        title: 'Supported Locales:',
        content: `• English (en) - Default locale with Latin numbers, LTR direction, and English month/weekday names
• Persian (fa) - Persian/Farsi locale with Persian numerals, RTL direction, and Persian month/weekday names. Uses Jalali calendar system.
• German (de) - German locale with Latin numbers, LTR direction, and German month/weekday names
• Spanish (es) - Spanish locale with Latin numbers, LTR direction, and Spanish month/weekday names
• French (fr) - French locale with Latin numbers, LTR direction, and French month/weekday names`
      }
    ],
    typeDefinitions: [
      `type CalendarUILocale = 'en' | 'fa' | 'de' | 'es' | 'fr'`
    ]
  },
  'Translation Customization': {
    intro: `While the built-in locales provide comprehensive translations for common languages, you may need to customize specific translations to match your application's requirements. You can override any part of the translations by providing a partial \`translations\` object through the \`customization\` prop. This allows you to customize specific labels, month names, or weekday names while keeping the rest of the locale defaults intact.`,
    typeDefinitions: [
      `interface CalendarTranslations {
  months: string[]
  weekdays: string[]
  direction: 'ltr' | 'rtl'
  numbers: 'latin' | 'persian'
  labels: {
    today: string
    clear: string
    ok: string
    nextMonth: string
    previousMonth: string
    selectMonth: string
    selectYear: string
    from: string
    to: string
    timeFrom?: string
    timeTo?: string
    am?: string
    pm?: string
  }
  presetRanges: {
    yesterday: string
    last7days: string
    last30days: string
    thisMonth: string
    lastMonth: string
  }
}

// Usage in customization prop:
customization?: {
  translations?: Partial<CalendarTranslations>
}`
    ],
    details: [
      {
        title: 'Translation Properties:',
        content: `• months - Month names (12 elements, index 0-11 for months 1-12)
• weekdays - Weekday names (7 elements, starting from first day of week)
• direction - Text direction (Left-to-Right or Right-to-Left)
• numbers - Number system (Latin or Persian numerals)
• labels.today - Today button text
• labels.clear - Clear button text aria-label (accessibility only) - DtPicker only
• labels.ok - OK/Confirm button text
• labels.nextMonth - Next month navigation button title (tooltip)
• labels.previousMonth - Previous month navigation button title (tooltip)
• labels.selectMonth - Month selection view aria-label (accessibility only)
• labels.selectYear - Year selection view aria-label (accessibility only)
• labels.from - Input field from label (for date range display in DtPicker)
• labels.to - Input field to label (for date range display in DtPicker)
• labels.timeFrom - Time selector from label (for time input in range selection)
• labels.timeTo - Time selector to label (for time input in range selection)
• labels.am - AM indicator
• labels.pm - PM indicator
• presetRanges.yesterday - Yesterday preset range label
• presetRanges.last7days - Last 7 days preset range label
• presetRanges.last30days - Last 30 days preset range label
• presetRanges.thisMonth - This month preset range label
• presetRanges.lastMonth - Last month preset range label`
      },
      {
        title: 'Merging with Defaults:',
        content: `The CalendarTranslations interface defines all customizable translation properties. You can override any of these properties partially using Partial<CalendarTranslations>, and the component will merge your customizations with the default locale translations.`
      }
    ]
  }
}
