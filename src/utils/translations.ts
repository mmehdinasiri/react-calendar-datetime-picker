/**
 * Internationalization translations for calendar component
 * Refactored for better maintainability, performance, and extensibility
 */

import type { CalendarTranslations, CalendarUILocale } from '../types/calendar'

// ============================================================================
// TRANSLATION CONSTANTS
// ============================================================================

/**
 * Month names - Gregorian
 */
export const gregorianMonths = {
  en: [
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
  fa: [
    'ژانویه',
    'فوریه',
    'مارس',
    'آوریل',
    'مه',
    'ژوئن',
    'ژوئیه',
    'اوت',
    'سپتامبر',
    'اکتبر',
    'نوامبر',
    'دسامبر'
  ],
  de: [
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
  es: [
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
  fr: [
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
  ]
}

/**
 * Month names - Jalali/Persian
 */
export const jalaliMonths = {
  fa: [
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
  en: [
    'Farvardin',
    'Ordibehesht',
    'Khordad',
    'Tir',
    'Mordad',
    'Shahrivar',
    'Mehr',
    'Aban',
    'Azar',
    'Dey',
    'Bahman',
    'Esfand'
  ]
}

/**
 * Weekday names
 */
const weekdayNames = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  fa: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  es: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
  fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa']
}

/**
 * Translation labels
 */
const translationLabels = {
  en: {
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
  fa: {
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
  de: {
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
  es: {
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
  fr: {
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
  }
}

/**
 * Preset ranges translation
 */
const presetRangesLabels = {
  en: {
    yesterday: 'Yesterday',
    last7days: 'Last 7 days',
    last30days: 'Last 30 days',
    thisMonth: 'This month',
    lastMonth: 'Last month'
  },
  fa: {
    yesterday: 'دیروز',
    last7days: '۷ روز گذشته',
    last30days: '۳۰ روز گذشته',
    thisMonth: 'این ماه',
    lastMonth: 'ماه گذشته'
  },
  de: {
    yesterday: 'Gestern',
    last7days: 'Letzte 7 Tage',
    last30days: 'Letzte 30 Tage',
    thisMonth: 'Dieser Monat',
    lastMonth: 'Letzter Monat'
  },
  es: {
    yesterday: 'Ayer',
    last7days: 'Últimos 7 días',
    last30days: 'Últimos 30 días',
    thisMonth: 'Este mes',
    lastMonth: 'Mes pasado'
  },
  fr: {
    yesterday: 'Hier',
    last7days: '7 derniers jours',
    last30days: '30 derniers jours',
    thisMonth: 'Ce mois',
    lastMonth: 'Mois dernier'
  }
}

// ============================================================================
// LOCALE CONFIGURATION
// ============================================================================

/**
 * Locale configuration with direction and number system
 */
const localeConfig = {
  en: { direction: 'ltr' as const, numberSystem: 'latin' as const },
  fa: { direction: 'rtl' as const, numberSystem: 'persian' as const },
  de: { direction: 'ltr' as const, numberSystem: 'latin' as const },
  es: { direction: 'ltr' as const, numberSystem: 'latin' as const },
  fr: { direction: 'ltr' as const, numberSystem: 'latin' as const }
}

/**
 * LTR (Left-to-Right) locales
 */
export const ltrLocales: string[] = ['en', 'de', 'es', 'fr']

/**
 * RTL (Right-to-Left) locales
 */
export const rtlLocales: string[] = ['fa']

// ============================================================================
// DYNAMIC TRANSLATION FACTORY
// ============================================================================

/**
 * Create a translation object for a given locale
 * @param locale - The locale code
 * @returns The translation object for the locale
 */
function createTranslation(
  locale: keyof typeof localeConfig
): CalendarTranslations {
  const config = localeConfig[locale]
  const labels = translationLabels[locale]
  const presets = presetRangesLabels[locale]
  // For Persian locale, default to Jalali months; for others, use Gregorian
  const months = locale === 'fa' ? jalaliMonths.fa : gregorianMonths[locale]
  const weekdays = weekdayNames[locale]

  return {
    months,
    weekdays,
    direction: config.direction,
    numbers: config.numberSystem,
    labels,
    presetRanges: presets
  }
}

// ============================================================================
// MEMOIZED TRANSLATIONS MAP
// ============================================================================

/**
 * Map of all translations (created once for performance)
 */
export const translations: Record<string, CalendarTranslations> = {
  en: createTranslation('en'),
  fa: createTranslation('fa'),
  de: createTranslation('de'),
  es: createTranslation('es'),
  fr: createTranslation('fr')
}

// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

/**
 * English translations (default)
 */
export const enTranslations: CalendarTranslations = translations.en

/**
 * Persian/Farsi translations
 */
export const faTranslations: CalendarTranslations = translations.fa

/**
 * German translations
 */
export const deTranslations: CalendarTranslations = translations.de

/**
 * Spanish translations
 */
export const esTranslations: CalendarTranslations = translations.es

/**
 * French translations
 */
export const frTranslations: CalendarTranslations = translations.fr

/**
 * English transliterations of Jalali month names
 */
export const jalaliEnglishMonths: string[] = [...jalaliMonths.en]

/**
 * Persian translations of Gregorian month names
 */
export const gregorianPersianMonths: string[] = [...gregorianMonths.fa]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get text direction for a locale
 * @param locale - The locale code
 * @returns 'ltr' or 'rtl'
 */
export function getTextDirection(locale: string): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr'
}

/**
 * Get number system for a locale
 * @param locale - The locale code
 * @returns 'latin' or 'persian'
 */
export function getNumberSystem(
  locale: CalendarUILocale | string
): 'latin' | 'persian' {
  return (
    localeConfig[locale as keyof typeof localeConfig]?.numberSystem || 'latin'
  )
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
 * Get month names based on calendar system and locale
 * @param calendarSystem - The calendar system ('gregorian' or 'jalali')
 * @param locale - The locale code (optional, defaults to 'en' for gregorian, 'fa' for jalali)
 * @returns Array of month names for the calendar system
 */
export function getMonthNamesByCalendarSystem(
  calendarSystem: 'gregorian' | 'jalali',
  locale?: string
): string[] {
  if (calendarSystem === 'jalali') {
    const months =
      jalaliMonths[locale as keyof typeof jalaliMonths] || jalaliMonths.fa
    return [...months]
  }
  // For Gregorian calendar: only Persian locale has its own translations,
  // all other locales use English months
  if (locale === 'fa') {
    return [...gregorianMonths.fa]
  }
  const months = gregorianMonths[locale as keyof typeof gregorianMonths]
  return months ? [...months] : [...gregorianMonths.en]
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
  // If locale and calendarSystem are not provided, preserve original translations
  // (backward compatibility for simple merge operations)
  if (locale === undefined && calendarSystem === undefined) {
    if (!customTranslations) {
      return defaultTranslations
    }
    return {
      months: customTranslations.months || defaultTranslations.months,
      weekdays: customTranslations.weekdays || defaultTranslations.weekdays,
      direction: customTranslations.direction || defaultTranslations.direction,
      numbers: customTranslations.numbers || defaultTranslations.numbers,
      labels: {
        ...defaultTranslations.labels,
        ...customTranslations.labels
      },
      presetRanges: {
        ...defaultTranslations.presetRanges,
        ...customTranslations.presetRanges
      }
    }
  }

  // 🎯 IMPORTANT: Apply calendar system logic when locale/calendarSystem are provided
  // This ensures correct month names for Jalali/Gregorian calendars
  const calendar = calendarSystem || 'gregorian'
  const effectiveLocale = locale || (calendar === 'jalali' ? 'fa' : 'en')
  const baseLocale =
    calendar === 'jalali' && effectiveLocale !== 'en' ? 'fa' : effectiveLocale

  // 🎯 For Jalali calendar with non-English locales, use Persian translations
  const isJalaliNonEnglish = calendar === 'jalali' && effectiveLocale !== 'en'
  const translationLocale = isJalaliNonEnglish ? 'fa' : effectiveLocale

  // 🎯 Determine weekdays based on calendar system
  // For Jalali calendar: use English weekday names only when locale is 'en', otherwise use Persian
  // For Gregorian calendar: use locale-based weekday names
  let defaultWeekdays =
    calendar === 'jalali'
      ? effectiveLocale === 'en'
        ? weekdayNames.en
        : weekdayNames.fa
      : weekdayNames[effectiveLocale as keyof typeof weekdayNames] ||
        weekdayNames.en

  // 🎯 Special case: For any calendar with Persian locale,
  // rotate Persian weekdays to start with Sunday (یکشنبه) instead of Saturday (شنبه)
  // This ensures all weekday arrays are in Gregorian order (Sunday first)
  if (effectiveLocale === 'fa') {
    // Persian Jalali weekdays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] (Saturday first)
    // Rotate to: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'] (Sunday first)
    const persianJalali = weekdayNames.fa
    defaultWeekdays = [
      persianJalali[1], // Sunday (یکشنبه)
      persianJalali[2], // Monday (دوشنبه)
      persianJalali[3], // Tuesday (سه‌شنبه)
      persianJalali[4], // Wednesday (چهارشنبه)
      persianJalali[5], // Thursday (پنج‌شنبه)
      persianJalali[6], // Friday (جمعه)
      persianJalali[0] // Saturday (شنبه)
    ]
  }

  // Get labels and presetRanges based on calendar system and locale
  const labels = isJalaliNonEnglish
    ? translationLabels.fa
    : translationLabels[translationLocale as keyof typeof translationLabels] ||
      translationLabels.en
  const presetRanges = isJalaliNonEnglish
    ? presetRangesLabels.fa
    : presetRangesLabels[
        translationLocale as keyof typeof presetRangesLabels
      ] || presetRangesLabels.en

  // Determine direction and numbers based on calendar system
  const direction = isJalaliNonEnglish
    ? 'rtl'
    : getTextDirection(effectiveLocale)
  const numbers = isJalaliNonEnglish
    ? 'persian'
    : effectiveLocale === 'en' && calendar === 'jalali'
      ? 'latin'
      : getNumberSystem(effectiveLocale)

  // If no customizations, use defaults with calendar system applied
  if (!customTranslations) {
    return {
      months: getMonthNamesByCalendarSystem(calendar, baseLocale),
      weekdays: defaultWeekdays,
      direction,
      numbers,
      labels,
      presetRanges
    }
  }

  // Merge custom translations with defaults, respecting calendar system
  return {
    months:
      customTranslations.months ||
      getMonthNamesByCalendarSystem(calendar, baseLocale),
    weekdays: customTranslations.weekdays || defaultWeekdays,
    direction: customTranslations.direction || direction,
    numbers: customTranslations.numbers || numbers,
    labels: {
      ...labels,
      ...customTranslations.labels
    },
    presetRanges: {
      ...presetRanges,
      ...customTranslations.presetRanges
    }
  }
}
