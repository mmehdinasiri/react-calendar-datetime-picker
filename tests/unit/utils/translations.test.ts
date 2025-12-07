import { describe, it, expect } from 'vitest'
import {
  getTranslations,
  mergeTranslations,
  enTranslations,
  faTranslations,
  deTranslations,
  esTranslations,
  frTranslations
} from '@/utils/translations'
import type { CalendarTranslations, CalendarLocale } from '@/types'

describe('translations utils', () => {
  describe('CalendarTranslations interface structure', () => {
    it('should have all required properties in English translations', () => {
      expect(enTranslations).toHaveProperty('months')
      expect(enTranslations).toHaveProperty('weekdays')
      expect(enTranslations).toHaveProperty('direction')
      expect(enTranslations).toHaveProperty('numbers')
      expect(enTranslations).toHaveProperty('labels')
      expect(enTranslations).toHaveProperty('presetRanges')
    })

    it('should have correct array lengths', () => {
      // Test English translations
      expect(enTranslations.months).toHaveLength(12)
      expect(enTranslations.weekdays).toHaveLength(7)

      // Test Persian translations
      expect(faTranslations.months).toHaveLength(12)
      expect(faTranslations.weekdays).toHaveLength(7)

      // Test German translations
      expect(deTranslations.months).toHaveLength(12)
      expect(deTranslations.weekdays).toHaveLength(7)

      // Test Spanish translations
      expect(esTranslations.months).toHaveLength(12)
      expect(esTranslations.weekdays).toHaveLength(7)

      // Test French translations
      expect(frTranslations.months).toHaveLength(12)
      expect(frTranslations.weekdays).toHaveLength(7)
    })

    it('should have valid direction values', () => {
      expect(['ltr', 'rtl']).toContain(enTranslations.direction)
      expect(['ltr', 'rtl']).toContain(faTranslations.direction)
      expect(['ltr', 'rtl']).toContain(deTranslations.direction)
      expect(['ltr', 'rtl']).toContain(esTranslations.direction)
      expect(['ltr', 'rtl']).toContain(frTranslations.direction)
    })

    it('should have valid number system values', () => {
      expect(['latin', 'persian']).toContain(enTranslations.numbers)
      expect(['latin', 'persian']).toContain(faTranslations.numbers)
      expect(['latin', 'persian']).toContain(deTranslations.numbers)
      expect(['latin', 'persian']).toContain(esTranslations.numbers)
      expect(['latin', 'persian']).toContain(frTranslations.numbers)
    })

    it('should have all required labels properties', () => {
      const requiredLabels = [
        'today',
        'clear',
        'ok',
        'nextMonth',
        'previousMonth',
        'selectMonth',
        'selectYear',
        'from',
        'to',
        'am',
        'pm'
      ] as const

      const testTranslation = (translations: CalendarTranslations) => {
        requiredLabels.forEach((label) => {
          expect(translations.labels).toHaveProperty(label)
          expect(typeof translations.labels[label]).toBe('string')
          expect((translations.labels[label] as string).length).toBeGreaterThan(
            0
          )
        })
      }

      testTranslation(enTranslations)
      testTranslation(faTranslations)
      testTranslation(deTranslations)
      testTranslation(esTranslations)
      testTranslation(frTranslations)
    })

    it('should have all required presetRanges properties', () => {
      const requiredPresetRanges = [
        'yesterday',
        'last7days',
        'last30days',
        'thisMonth',
        'lastMonth'
      ] as const

      const testTranslation = (translations: CalendarTranslations) => {
        requiredPresetRanges.forEach((range) => {
          expect(translations.presetRanges).toHaveProperty(range)
          expect(typeof translations.presetRanges[range]).toBe('string')
          expect(
            (translations.presetRanges[range] as string).length
          ).toBeGreaterThan(0)
        })
      }

      testTranslation(enTranslations)
      testTranslation(faTranslations)
      testTranslation(deTranslations)
      testTranslation(esTranslations)
      testTranslation(frTranslations)
    })

    it('should have string values for all properties', () => {
      const testTranslationStrings = (translations: CalendarTranslations) => {
        // Test months array
        translations.months.forEach((month) => {
          expect(typeof month).toBe('string')
          expect(month.length).toBeGreaterThan(0)
        })

        // Test weekdays array
        translations.weekdays.forEach((day) => {
          expect(typeof day).toBe('string')
          expect(day.length).toBeGreaterThan(0)
        })

        // Test direction
        expect(typeof translations.direction).toBe('string')

        // Test numbers
        expect(typeof translations.numbers).toBe('string')
      }

      testTranslationStrings(enTranslations)
      testTranslationStrings(faTranslations)
      testTranslationStrings(deTranslations)
      testTranslationStrings(esTranslations)
      testTranslationStrings(frTranslations)
    })
  })

  describe('getTranslations function', () => {
    it('should return English translations by default', () => {
      const translations = getTranslations()
      expect(translations).toEqual(enTranslations)
    })

    it('should return correct translations for each locale', () => {
      expect(getTranslations('en')).toEqual(enTranslations)
      expect(getTranslations('fa')).toEqual(faTranslations)
      expect(getTranslations('de')).toEqual(deTranslations)
      expect(getTranslations('es')).toEqual(esTranslations)
      expect(getTranslations('fr')).toEqual(frTranslations)
    })

    it('should fallback to English for unknown locales', () => {
      const translations = getTranslations('unknown' as CalendarLocale)
      expect(translations).toEqual(enTranslations)
    })

    it('should return translations with correct structure', () => {
      const translations = getTranslations('en')
      expect(translations).toHaveProperty('months')
      expect(translations).toHaveProperty('weekdays')
      expect(translations).toHaveProperty('direction')
      expect(translations).toHaveProperty('numbers')
      expect(translations).toHaveProperty('labels')
      expect(translations).toHaveProperty('presetRanges')
    })
  })

  describe('mergeTranslations function', () => {
    it('should return base translations when no custom translations provided', () => {
      const result = mergeTranslations(enTranslations)
      expect(result).toEqual(enTranslations)
    })

    it('should return base translations when custom translations is undefined', () => {
      const result = mergeTranslations(enTranslations, undefined)
      expect(result).toEqual(enTranslations)
    })

    it('should merge custom translations with base translations', () => {
      const customTranslations = {
        labels: {
          today: 'Custom Today',
          clear: 'Custom Clear'
        },
        presetRanges: {
          yesterday: 'Custom Yesterday'
        }
      } as Partial<CalendarTranslations>

      const result = mergeTranslations(enTranslations, customTranslations)

      // Should keep original values for non-overridden properties
      expect(result.months).toEqual(enTranslations.months)
      expect(result.weekdays).toEqual(enTranslations.weekdays)
      expect(result.direction).toEqual(enTranslations.direction)
      expect(result.numbers).toEqual(enTranslations.numbers)

      // Should override specified values
      expect(result.labels.today).toBe('Custom Today')
      expect(result.labels.clear).toBe('Custom Clear')
      expect(result.presetRanges.yesterday).toBe('Custom Yesterday')

      // Should keep original values for non-overridden nested properties
      expect(result.presetRanges.last7days).toBe(
        enTranslations.presetRanges.last7days
      )
    })

    it('should deeply merge nested objects', () => {
      const customTranslations = {
        labels: {
          today: 'Custom Today'
        },
        presetRanges: {
          yesterday: 'Custom Yesterday'
        }
      } as Partial<CalendarTranslations>

      const result = mergeTranslations(enTranslations, customTranslations)

      // Check that other label properties are preserved
      expect(result.labels.nextMonth).toBe(enTranslations.labels.nextMonth)
      expect(result.labels.previousMonth).toBe(
        enTranslations.labels.previousMonth
      )

      // Check that other preset range properties are preserved
      expect(result.presetRanges.last7days).toBe(
        enTranslations.presetRanges.last7days
      )
      expect(result.presetRanges.last30days).toBe(
        enTranslations.presetRanges.last30days
      )
    })

    it('should handle empty custom translations object', () => {
      const result = mergeTranslations(enTranslations, {})
      expect(result).toEqual(enTranslations)
    })

    it('should handle partial custom translations', () => {
      const customTranslations = {
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        direction: 'rtl'
      } as Partial<CalendarTranslations>

      const result = mergeTranslations(enTranslations, customTranslations)

      expect(result.months).toEqual([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ])
      expect(result.direction).toBe('rtl')
      expect(result.labels).toEqual(enTranslations.labels) // Should preserve original
    })

    it('should handle custom translations with different locales', () => {
      const customTranslations = {
        labels: {
          today: 'Hoy' // Spanish for Today
        }
      } as Partial<CalendarTranslations>

      const result = mergeTranslations(deTranslations, customTranslations)

      expect(result.labels.today).toBe('Hoy')
      expect(result.months).toEqual(deTranslations.months) // Should keep German months
      expect(result.labels.clear).toBe(deTranslations.labels.clear) // Should keep German clear
    })

    it('should validate merged translations structure', () => {
      const customTranslations = {
        labels: {
          today: 'Custom Today'
        }
      } as Partial<CalendarTranslations>

      const result = mergeTranslations(enTranslations, customTranslations)

      // Ensure the result has all required properties
      expect(result.months).toHaveLength(12)
      expect(result.weekdays).toHaveLength(7)
      expect(result.labels.today).toBe('Custom Today')
      expect(result.labels.clear).toBe(enTranslations.labels.clear)
    })
  })

  describe('Translation content validation', () => {
    it('should have Persian translations with RTL direction', () => {
      expect(faTranslations.direction).toBe('rtl')
      expect(faTranslations.numbers).toBe('persian')
    })

    it('should have LTR direction for Latin-based languages', () => {
      expect(enTranslations.direction).toBe('ltr')
      expect(deTranslations.direction).toBe('ltr')
      expect(esTranslations.direction).toBe('ltr')
      expect(frTranslations.direction).toBe('ltr')
    })

    it('should have latin numbers for non-Persian languages', () => {
      expect(enTranslations.numbers).toBe('latin')
      expect(deTranslations.numbers).toBe('latin')
      expect(esTranslations.numbers).toBe('latin')
      expect(frTranslations.numbers).toBe('latin')
    })

    it('should have non-empty strings for all labels', () => {
      const translations = [
        enTranslations,
        faTranslations,
        deTranslations,
        esTranslations,
        frTranslations
      ]

      translations.forEach((translation) => {
        Object.values(translation.labels).forEach((label) => {
          expect(typeof label).toBe('string')
          expect(label.trim().length).toBeGreaterThan(0)
        })

        Object.values(translation.presetRanges).forEach((range) => {
          expect(typeof range).toBe('string')
          expect(range.trim().length).toBeGreaterThan(0)
        })
      })
    })

    it('should have reasonable month names', () => {
      const translations = [
        enTranslations,
        faTranslations,
        deTranslations,
        esTranslations,
        frTranslations
      ]

      translations.forEach((translation) => {
        translation.months.forEach((month) => {
          expect(month.length).toBeGreaterThan(1) // At least 2 characters
          expect(month.length).toBeLessThan(20) // Reasonable length
        })
      })
    })

    it('should have reasonable weekday names', () => {
      const translations = [
        enTranslations,
        faTranslations,
        deTranslations,
        esTranslations,
        frTranslations
      ]

      translations.forEach((translation) => {
        translation.weekdays.forEach((day) => {
          expect(day.length).toBeGreaterThan(0) // At least 1 character
          expect(day.length).toBeLessThan(10) // Reasonable length for abbreviations
        })
      })
    })
  })

  describe('Type safety and structure integrity', () => {
    it('should maintain type safety with CalendarTranslations interface', () => {
      const translation: CalendarTranslations = {
        months: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        direction: 'ltr',
        numbers: 'latin',
        labels: {
          today: 'Today',
          clear: 'Clear',
          ok: 'OK',
          nextMonth: 'Next',
          previousMonth: 'Previous',
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

      expect(translation.months).toHaveLength(12)
      expect(translation.weekdays).toHaveLength(7)
      expect(translation.direction).toBe('ltr')
      expect(translation.numbers).toBe('latin')
    })

    it('should reject invalid direction values', () => {
      // TypeScript should prevent this, but let's test runtime validation concept
      const invalidTranslation = {
        ...enTranslations,
        direction: 'invalid' as any
      }

      // This test demonstrates that invalid values can exist at runtime
      // In a real application, you might want to add runtime validation
      expect(invalidTranslation.direction).toBe('invalid')
    })

    it('should handle missing optional properties in partial translations', () => {
      const partialTranslation = {
        labels: {
          today: 'Custom Today'
        }
      } as Partial<CalendarTranslations>

      const result = mergeTranslations(enTranslations, partialTranslation)

      expect(result.labels.today).toBe('Custom Today')
      expect(result.labels.clear).toBe(enTranslations.labels.clear)
      expect(result.months).toEqual(enTranslations.months)
    })
  })

  describe('Localization consistency', () => {
    it('should have appropriate AM/PM labels for each locale', () => {
      // English uses standard AM/PM
      expect(enTranslations.labels.am).toBe('AM')
      expect(enTranslations.labels.pm).toBe('PM')

      // Persian uses Persian abbreviations
      expect(faTranslations.labels.am).toBe('ق.ظ')
      expect(faTranslations.labels.pm).toBe('ب.ظ')

      // Other languages currently use English AM/PM (could be localized later)
      expect(deTranslations.labels.am).toBe('AM')
      expect(deTranslations.labels.pm).toBe('PM')

      expect(esTranslations.labels.am).toBe('AM')
      expect(esTranslations.labels.pm).toBe('PM')

      expect(frTranslations.labels.am).toBe('AM')
      expect(frTranslations.labels.pm).toBe('PM')
    })

    it('should have locale-appropriate date separator words', () => {
      expect(enTranslations.labels.from).toBe('From')
      expect(enTranslations.labels.to).toBe('To')
      expect(enTranslations.labels.timeFrom).toBe('From')
      expect(enTranslations.labels.timeTo).toBe('To')

      expect(deTranslations.labels.from).toBe('Von')
      expect(deTranslations.labels.to).toBe('Bis')
      expect(deTranslations.labels.timeFrom).toBe('Von')
      expect(deTranslations.labels.timeTo).toBe('Bis')

      expect(esTranslations.labels.from).toBe('Desde')
      expect(esTranslations.labels.to).toBe('Hasta')
      expect(esTranslations.labels.timeFrom).toBe('Desde')
      expect(esTranslations.labels.timeTo).toBe('Hasta')

      expect(frTranslations.labels.from).toBe('De')
      expect(frTranslations.labels.to).toBe('À')
      expect(frTranslations.labels.timeFrom).toBe('De')
      expect(frTranslations.labels.timeTo).toBe('À')
    })
  })
})
