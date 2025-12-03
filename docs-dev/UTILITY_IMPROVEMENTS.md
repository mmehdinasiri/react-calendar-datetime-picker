# Utility Functions - Suggested Improvements

## Critical Issues to Fix

### 1. `convertToLocale` - Missing Source Locale

**Problem**: Function doesn't know if input is Gregorian or Jalali
**Solution**: Add source locale parameter or use a tagged type

### 2. `dayToDate` - Missing Locale Parameter

**Problem**: Assumes Gregorian, but Day might be Jalali
**Solution**: Add locale parameter

### 3. Normalization Validation

**Problem**: Uses loose validation (day <= 31)
**Solution**: Use `isValidDay()` for proper month length validation

## Nice-to-Have Additions

### Date Manipulation Utilities

- `addDays(day, count, locale)`
- `addMonths(day, count, locale)`
- `addYears(day, count, locale)`
- `subtractDays(day, count, locale)`
- etc.

### Date Comparison Utilities

- `isSameDay(day1, day2, locale)`
- `isSameMonth(day1, day2, locale)`
- `isSameYear(day1, day2, locale)`
- `isBefore(day1, day2, locale)`
- `isAfter(day1, day2, locale)`

### Date Range Utilities

- `getStartOfWeek(day, locale)`
- `getEndOfWeek(day, locale)`
- `getStartOfMonth(day, locale)`
- `getEndOfMonth(day, locale)`

### Error Handling

- Wrap `jalaali-js` conversions in try/catch
- Return null or throw descriptive errors

### Performance Optimizations

- Cache month length calculations
- Cache leap year checks
