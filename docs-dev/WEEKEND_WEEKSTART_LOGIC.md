# Weekend and Week Start Logic

This document explains the complex logic for handling weekends and week start days in the calendar component, supporting both Gregorian and Jalali calendar systems.

## Overview

The calendar component supports two key features:

1. **Week Start**: Which day of the week appears first (Sunday, Monday, Saturday, etc.)
2. **Weekend Highlighting**: Which days are visually highlighted as weekends

These features work differently across calendar systems and locales.

## Calendar Systems

### Gregorian Calendar

- **Default Week Start**: Sunday (0)
- **Weekends**: Saturday (6) and Sunday (0)
- **Weekday Order**: Sunday → Monday → Tuesday → Wednesday → Thursday → Friday → Saturday

### Jalali (Persian) Calendar

- **Default Week Start**: Saturday (6)
- **Weekends**: Thursday (4) and Friday (5) in Gregorian terms
- **Weekday Order**: Saturday → Sunday → Monday → Tuesday → Wednesday → Thursday → Friday

## Key Properties

### `calendarSystem`

- `'gregorian'` | `'jalali'`
- Determines default week start and weekend rules

### `weekStart`

- `number` (0-6) | `undefined`
- Explicit first day of week (0 = Sunday, 6 = Saturday)
- If undefined, uses calendar system default

### `showWeekend`

- `boolean`
- Whether to highlight weekend days
- Default: `false`

### `locale`

- `'en'` | `'fa'` | `'de'` | `'es'` | `'fr'`
- Affects weekday name translations
- Some combinations require special handling

## Logic Flow

### 1. Determine Effective Week Start

```typescript
const effectiveWeekStart =
  weekStart !== undefined ? weekStart : calendarSystem === 'jalali' ? 6 : 0
```

### 2. Weekday Name Rotation

Weekday names are stored in Gregorian order (Sunday first) in translations, but need to be rotated to match the effective week start.

```typescript
// Example: Gregorian English with weekStart = 1 (Monday)
// Original: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
// Rotated:  ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
```

### 3. Weekend Detection

Weekends are determined by mapping each position in the rotated array back to its Gregorian day:

```typescript
// For position i in rotated array:
// gregorianDay = (effectiveWeekStart + i) % 7
//
// Gregorian weekends: days 0 (Sunday) and 6 (Saturday)
// Jalali weekends: days 4 (Thursday) and 5 (Friday)
```

## Special Cases

### Gregorian + Persian Locale

Persian weekday names are stored in Jalali order (Saturday first):

```
['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']  // Saturday → Sunday → Monday → ...
```

For Gregorian calendar, these are rotated to start with Sunday:

```
['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش']  // Sunday → Monday → Tuesday → ...
```

### Jalali + English Locale

English weekday names are in Gregorian order (Sunday first), but for Jalali calendar they get rotated to start with Saturday.

## Implementation Details

### Utility Functions

The logic is centralized in `src/utils/weekday-utils.ts`:

- `getEffectiveWeekStart()` - Determines the actual week start to use
- `getRotatedWeekdayNames()` - Rotates weekday names for display
- `getWeekendConfig()` - Provides weekend detection logic
- `isWeekendDay()` - Checks if a Gregorian day is a weekend

### Calendar Grid View

The `CalendarGridView` component uses these utilities to:

1. Rotate weekday names for the header
2. Determine weekend positions for styling
3. Apply consistent logic across both header and grid cells

### Translation Processing

The `mergeTranslations()` function in `src/utils/translations.ts` handles special cases for weekday name ordering based on calendar system and locale combinations.

## Test Coverage

Comprehensive tests cover all combinations:

- Gregorian/Jalali calendar systems
- All supported locales (en, fa, de, es, fr)
- Various weekStart values
- showWeekend enabled/disabled

Test cases ensure weekend highlighting works correctly regardless of rotation.

## Migration Notes

When upgrading from older versions:

- Default behavior for Jalali calendar now uses Saturday as first day
- Weekend detection respects calendar system rules
- Persian locale with Gregorian calendar rotates weekdays appropriately

## Examples

### Gregorian, English, Default

- Week starts: Sunday
- Weekends: Saturday, Sunday
- Display: `Su Mo Tu We Th Fr Sa`

### Gregorian, English, Monday Start

- Week starts: Monday
- Weekends: Saturday, Sunday (positions 5, 6 in rotated array)
- Display: `Mo Tu We Th Fr Sa Su`

### Jalali, Persian, Default

- Week starts: Saturday
- Weekends: Thursday, Friday (Gregorian days 4, 5)
- Display: `ش ی د س چ پ ج`

### Jalali, English, Default

- Week starts: Saturday
- Weekends: Thursday, Friday
- Display: `Sa Su Mo Tu We Th Fr`
