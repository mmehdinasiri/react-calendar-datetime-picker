/**
 * Internationalization translations for calendar component
 */

import type { CalendarTranslations, CalendarUILocale } from '../types/calendar'
import { persianArabicNumbers, latinNumbers } from '../types/calendar'

/**
 * English translations (default)
 */
export const enTranslations: CalendarTranslations = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  direction: 'ltr',
  numbers: 'latin',
  labels: {
    today: 'Today',
    clear: 'Clear',
    ok: 'OK',
    nextMonth: 'next',
    previousMonth: 'previous',
    selectMonth: 'Select month',
    selectYear: 'Select year',
    from: 'From',
    to: 'To',
    timeFrom: 'From',
    timeTo: 'To',
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

/**
 * Persian/Farsi translations
 */
export const faTranslations: CalendarTranslations = {
  months: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند'
  ],
  weekdays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  direction: 'rtl',
  numbers: 'persian',
  labels: {
    today: 'امروز',
    clear: 'پاک کردن',
    ok: 'تایید',
    nextMonth: 'بعدی',
    previousMonth: 'قبلی',
    selectMonth: 'انتخاب ماه',
    selectYear: 'انتخاب سال',
    from: 'از',
    to: 'تا',
    timeFrom: 'از',
    timeTo: 'تا',
    am: 'ق.ظ',
    pm: 'ب.ظ'
  },
  presetRanges: {
    yesterday: 'دیروز',
    last7days: '۷ روز گذشته',
    last30days: '۳۰ روز گذشته',
    thisMonth: 'این ماه',
    lastMonth: 'ماه گذشته'
  }
}

/**
 * German translations
 */
export const deTranslations: CalendarTranslations = {
  months: [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ],
  weekdays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  direction: 'ltr',
  numbers: 'latin',
  labels: {
    today: 'Heute',
    clear: 'Löschen',
    ok: 'OK',
    nextMonth: 'nächster',
    previousMonth: 'vorheriger',
    selectMonth: 'Monat auswählen',
    selectYear: 'Jahr auswählen',
    from: 'Von',
    to: 'Bis',
    timeFrom: 'Von',
    timeTo: 'Bis',
    am: 'AM',
    pm: 'PM'
  },
  presetRanges: {
    yesterday: 'Gestern',
    last7days: 'Letzte 7 Tage',
    last30days: 'Letzte 30 Tage',
    thisMonth: 'Dieser Monat',
    lastMonth: 'Letzter Monat'
  }
}

/**
 * Spanish translations
 */
export const esTranslations: CalendarTranslations = {
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  weekdays: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
  direction: 'ltr',
  numbers: 'latin',
  labels: {
    today: 'Hoy',
    clear: 'Limpiar',
    ok: 'OK',
    nextMonth: 'siguiente',
    previousMonth: 'anterior',
    selectMonth: 'Seleccionar mes',
    selectYear: 'Seleccionar año',
    from: 'Desde',
    to: 'Hasta',
    timeFrom: 'Desde',
    timeTo: 'Hasta',
    am: 'AM',
    pm: 'PM'
  },
  presetRanges: {
    yesterday: 'Ayer',
    last7days: 'Últimos 7 días',
    last30days: 'Últimos 30 días',
    thisMonth: 'Este mes',
    lastMonth: 'Mes pasado'
  }
}

/**
 * French translations
 */
export const frTranslations: CalendarTranslations = {
  months: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  weekdays: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
  direction: 'ltr',
  numbers: 'latin',
  labels: {
    today: "Aujourd'hui",
    clear: 'Effacer',
    ok: 'OK',
    nextMonth: 'suivant',
    previousMonth: 'précédent',
    selectMonth: 'Sélectionner mois',
    selectYear: 'Sélectionner année',
    from: 'De',
    to: 'À',
    timeFrom: 'De',
    timeTo: 'À',
    am: 'AM',
    pm: 'PM'
  },
  presetRanges: {
    yesterday: 'Hier',
    last7days: '7 derniers jours',
    last30days: '30 derniers jours',
    thisMonth: 'Ce mois',
    lastMonth: 'Mois dernier'
  }
}

/**
 * Map of all translations
 */
export const translations: Record<string, CalendarTranslations> = {
  en: enTranslations,
  fa: faTranslations,
  de: deTranslations,
  es: esTranslations,
  fr: frTranslations
}

/**
 * Get month names based on calendar system
 * @param calendarSystem - The calendar system ('gregorian' or 'jalali')
 * @returns Array of month names for the calendar system
 */
export function getMonthNamesByCalendarSystem(
  calendarSystem: 'gregorian' | 'jalali'
): string[] {
  if (calendarSystem === 'jalali') {
    // Return Jalali month names (Persian)
    return faTranslations.months
  }
  // Return Gregorian month names (English as default)
  return enTranslations.months
}

/**
 * LTR (Left-to-Right) locales
 */
export const ltrLocales: string[] = ['en', 'de', 'es', 'fr']

/**
 * RTL (Right-to-Left) locales
 */
export const rtlLocales: string[] = ['fa']

/**
 * Get text direction for a locale
 * @param locale - The locale code
 * @returns 'ltr' or 'rtl'
 */
export function getTextDirection(locale: string): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}

/**
 * Get effective locale based on provided locale and calendar system
 * If locale is provided, returns it. Otherwise, defaults based on calendar system:
 * - Jalali calendar defaults to 'fa' (Persian)
 * - Gregorian calendar defaults to 'en' (English)
 * @param locale - The provided locale (optional)
 * @param calendarSystem - The calendar system ('gregorian' or 'jalali')
 * @returns The effective locale to use
 */
export function getEffectiveLocale(
  locale: CalendarUILocale | undefined,
  calendarSystem: 'gregorian' | 'jalali'
): CalendarUILocale {
  if (locale) {
    return locale
  }
  return calendarSystem === 'jalali' ? 'fa' : 'en'
}

/**
 * Get number system for a locale
 * @param locale - The locale code
 * @returns 'latin' or 'persian'
 */
export function getNumberSystem(
  locale: CalendarUILocale | string
): 'latin' | 'persian' {
  if (persianArabicNumbers.includes(locale as CalendarUILocale)) {
    return 'persian'
  }
  if (latinNumbers.includes(locale as CalendarUILocale)) {
    return 'latin'
  }
  // Default to latin if locale is not in either list
  return 'latin'
}

/**
 * Get translations for a specific locale
 * @param locale - The locale to get translations for
 * @returns The translation object for the locale, defaults to English if not found
 */
export function getTranslations(locale: string = 'en'): CalendarTranslations {
  return translations[locale] || translations.en
}

/**
 * Merge custom translations with default translations
 * @param defaultTranslations - The default translations for the locale
 * @param customTranslations - Custom translations to override defaults
 * @param locale - The locale code to determine default direction if not provided
 * @param calendarSystem - The calendar system to determine month names ('gregorian' or 'jalali')
 * @returns Merged translations object
 */
export function mergeTranslations(
  defaultTranslations: CalendarTranslations,
  customTranslations?: Partial<CalendarTranslations>,
  locale?: string,
  calendarSystem?: 'gregorian' | 'jalali'
): CalendarTranslations {
  // Use custom direction if provided, otherwise use default from translations,
  // or fallback to locale-based direction
  const direction =
    customTranslations?.direction !== undefined
      ? customTranslations.direction
      : defaultTranslations.direction ||
        (locale ? getTextDirection(locale) : 'ltr')

  // Month names: custom translations override, otherwise use locale-specific months
  // For Jalali calendar, always use Persian month names regardless of locale
  // For Gregorian calendar, use locale-specific month names (French, German, etc.)
  const months =
    customTranslations?.months ||
    (calendarSystem === 'jalali'
      ? getMonthNamesByCalendarSystem(calendarSystem)
      : defaultTranslations.months)

  // Number system: use custom if provided, otherwise determine from locale
  const numbers =
    customTranslations?.numbers ||
    (locale ? getNumberSystem(locale) : defaultTranslations.numbers)

  return {
    months,
    weekdays: customTranslations?.weekdays || defaultTranslations.weekdays,
    direction,
    numbers,
    labels: {
      ...defaultTranslations.labels,
      ...customTranslations?.labels
    },
    presetRanges: {
      ...defaultTranslations.presetRanges,
      ...customTranslations?.presetRanges
    }
  }
}
