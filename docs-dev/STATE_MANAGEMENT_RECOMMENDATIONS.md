# State Management & Architecture Recommendations

## Overview

Based on the review of the old implementation and the challenges faced (especially with `initValue` handling), here are comprehensive recommendations for the modern rewrite.

## 1. State Management Strategy

### ❌ Problems with Context-Based Approach (Old Version)

From the CHANGELOG (v1.6.0), we can see:
- Initial value handling was problematic
- Extra state was needed to manage init/update values
- `onChange` was running twice
- Complex synchronization between context and props

### ✅ Recommended Approach: Controlled Component Pattern

**Use a controlled component pattern with local state + `useEffect` for `initValue` synchronization:**

```typescript
// Recommended pattern
const DtPicker: React.FC<DtPickerProps> = (props) => {
  const { initValue, onChange, type = 'single' } = props
  
  // Internal state - always in sync with calendar locale
  const [selectedValue, setSelectedValue] = useState<Day | Range | Multi | null>(null)
  const [currentView, setCurrentView] = useState<'calendar' | 'months' | 'years'>('calendar')
  const [displayMonth, setDisplayMonth] = useState<Day>(getToday(props.local))
  
  // Sync initValue when it changes externally
  useEffect(() => {
    if (initValue !== undefined) {
      const normalized = normalizeInitValue(initValue, props.local)
      setSelectedValue(normalized)
      // Update display month to show selected date
      if (normalized) {
        setDisplayMonth(extractMonthFromValue(normalized))
      }
    }
  }, [initValue, props.local])
  
  // Handle value changes
  const handleChange = (newValue: Day | Range | Multi | null) => {
    setSelectedValue(newValue)
    onChange(newValue) // Single call, no double-firing
  }
  
  // ... rest of component
}
```

### Why This Works Better:

1. **Single Source of Truth**: Internal state is the source of truth, synced with `initValue` via `useEffect`
2. **No Double Firing**: `onChange` is called only when user actually changes the value
3. **External Updates**: When `initValue` prop changes, component updates automatically
4. **No Extra State**: No need for separate "initial" vs "current" state
5. **Simpler Mental Model**: Standard React controlled component pattern

### Alternative: Use `useReducer` for Complex State

For more complex state (especially with range/multi selection), consider `useReducer`:

```typescript
type CalendarState = {
  selectedValue: Day | Range | Multi | null
  currentView: 'calendar' | 'months' | 'years'
  displayMonth: Day
  isOpen: boolean
  // ... other state
}

type CalendarAction = 
  | { type: 'SELECT_DATE'; payload: Day }
  | { type: 'SELECT_RANGE_START'; payload: Day }
  | { type: 'SELECT_RANGE_END'; payload: Day }
  | { type: 'SET_DISPLAY_MONTH'; payload: Day }
  | { type: 'SET_VIEW'; payload: 'calendar' | 'months' | 'years' }
  | { type: 'SYNC_INIT_VALUE'; payload: Day | Range | Multi | null }
  // ... other actions

const calendarReducer = (state: CalendarState, action: CalendarAction): CalendarState => {
  switch (action.type) {
    case 'SELECT_DATE':
      // Handle single date selection
      return { ...state, selectedValue: action.payload }
    case 'SELECT_RANGE_START':
      // Handle range start
      return { ...state, selectedValue: { from: action.payload, to: null } }
    // ... other cases
    case 'SYNC_INIT_VALUE':
      return { 
        ...state, 
        selectedValue: action.payload,
        displayMonth: extractMonthFromValue(action.payload) 
      }
    default:
      return state
  }
}
```

## 2. Initial Value Handling

### Key Principles:

1. **Normalize on Input**: Convert any input format to internal `Day` format immediately
2. **Handle Locale Conversion**: Convert between Gregorian/Jalali based on `local` prop
3. **Validate**: Ensure dates are valid and within min/max constraints
4. **Update Display**: Automatically navigate calendar to show selected date

### Implementation:

```typescript
// utils/normalize.ts
export function normalizeInitValue(
  value: unknown,
  locale: CalendarLocale,
  type: CalendarType
): Day | Range | Multi | null {
  if (!value) return null
  
  // Handle different input formats
  if (isDayObject(value)) {
    return normalizeDay(value, locale)
  }
  
  if (isRangeObject(value)) {
    return {
      from: normalizeDay(value.from, locale),
      to: normalizeDay(value.to, locale)
    }
  }
  
  if (Array.isArray(value)) {
    return value.map(day => normalizeDay(day, locale))
  }
  
  // Handle Date objects, strings, etc.
  if (value instanceof Date) {
    return dateToDay(value, locale)
  }
  
  // ... handle other formats
  return null
}

function normalizeDay(day: unknown, locale: CalendarLocale): Day {
  // Ensure day is in correct calendar system
  // Convert if necessary
  // Validate
  // Return normalized Day object
}
```

### Handling External Updates:

```typescript
// Use a ref to track previous initValue to detect changes
const prevInitValueRef = useRef(initValue)

useEffect(() => {
  // Only update if initValue actually changed
  if (initValue !== prevInitValueRef.current) {
    const normalized = normalizeInitValue(initValue, props.local, props.type)
    dispatch({ type: 'SYNC_INIT_VALUE', payload: normalized })
    prevInitValueRef.current = initValue
  }
}, [initValue, props.local, props.type])
```

## 3. Jalali Calendar Support

### Architecture:

1. **Internal Representation**: Always work with a normalized `Day` object
2. **Conversion Layer**: Convert between Gregorian/Jalali only at boundaries:
   - Input: Convert external input to internal format
   - Display: Convert internal format to display format
   - Output: Convert internal format to output format (based on locale)

### Date Conversion Utilities:

```typescript
// utils/date-conversion.ts
import { toJalaali, toGregorian } from 'jalaali-js'

/**
 * Convert Gregorian Day to Jalali Day
 */
export function gregorianToJalali(day: Day): Day {
  const jDate = toJalaali(day.year, day.month, day.day)
  return {
    year: jDate.jy,
    month: jDate.jm,
    day: jDate.jd,
    hour: day.hour,
    minute: day.minute
  }
}

/**
 * Convert Jalali Day to Gregorian Day
 */
export function jalaliToGregorian(day: Day): Day {
  const gDate = toGregorian(day.year, day.month, day.day)
  return {
    year: gDate.gy,
    month: gDate.gm,
    day: gDate.gd,
    hour: day.hour,
    minute: day.minute
  }
}

/**
 * Normalize day to target locale
 */
export function normalizeToLocale(day: Day, targetLocale: CalendarLocale): Day {
  // If already in target locale, return as-is
  // Otherwise convert
  // This function should be called with a "source locale" context
}
```

### Calendar Grid Generation:

```typescript
// utils/calendar-grid.ts
export function generateCalendarGrid(
  month: Day,
  locale: CalendarLocale
): CalendarDay[][] {
  // Generate 6 weeks × 7 days grid
  // Handle different month lengths (28-31 for Gregorian, 29-31 for Jalali)
  // Handle different week start days (Sunday for Gregorian, Saturday for Jalali)
  // Return array of weeks, each week is array of days
}
```

## 4. RTL Support

### CSS Strategy:

1. **Use `dir` attribute**: Set `dir="rtl"` on root element when `local="fa"`
2. **CSS Logical Properties**: Use `margin-inline-start` instead of `margin-left`
3. **CSS Variables**: Define RTL-aware spacing variables
4. **Conditional Classes**: Add `rtl` class when needed

### Implementation:

```typescript
// Component
const DtPicker: React.FC<DtPickerProps> = (props) => {
  const isRTL = props.local === 'fa'
  
  return (
    <div 
      className={cn('react-calendar-datetime-picker', {
        'rtl': isRTL
      })}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ... */}
    </div>
  )
}
```

### SCSS Structure:

```scss
// styles/variables.scss
:root {
  --calendar-spacing-start: 0; // margin-inline-start
  --calendar-spacing-end: 0;   // margin-inline-end
}

[dir='rtl'] {
  --calendar-spacing-start: 0; // Swapped automatically
  --calendar-spacing-end: 0;
}

// Use logical properties
.calendar-header {
  margin-inline-start: var(--calendar-spacing-start);
  margin-inline-end: var(--calendar-spacing-end);
  text-align: start; // Instead of left/right
}
```

### Layout Considerations:

1. **Navigation Arrows**: Swap left/right arrows for RTL
2. **Week Day Headers**: Reverse order for RTL
3. **Input Alignment**: Right-align text for RTL
4. **Modal Positioning**: Adjust positioning logic for RTL

## 5. Component Architecture

### Two-Component Design

Based on the examples, there are **two main components**:

1. **`DtPicker`**: Date picker with input field that opens a **modal calendar**
   - User clicks input → modal opens
   - Modal can auto-close after selection (`autoClose` prop, default: `true`)
   - Supports all selection types (single, range, multi)
   - Supports time selection
   - Has callbacks: `onCalenderShow`, `onCalenderHide`, `onCalenderChange`

2. **`DtCalendar`**: Standalone calendar **without input** (always visible)
   - No modal - calendar is always rendered
   - Same core calendar functionality
   - Useful for inline calendar displays

### Recommended Structure:

```
src/
├── components/
│   ├── DtPicker.tsx          # Picker with input + modal
│   ├── DtCalendar.tsx        # Standalone calendar (no input)
│   ├── CalendarCore.tsx      # Shared calendar logic (used by both)
│   ├── CalendarGrid.tsx      # Calendar grid display
│   ├── MonthView.tsx         # Month selection view
│   ├── YearView.tsx          # Year selection view
│   ├── TimePicker.tsx        # Time selection component
│   ├── DateInput.tsx         # Date input field (for DtPicker)
│   └── CalendarModal.tsx     # Modal wrapper (for DtPicker)
├── hooks/
│   ├── useCalendarState.ts   # State management hook (shared)
│   ├── useDateConversion.ts  # Date conversion utilities
│   ├── useCalendarGrid.ts    # Calendar grid generation
│   ├── useModal.ts           # Modal open/close logic (for DtPicker)
│   └── useRTL.ts             # RTL utilities
├── utils/
│   ├── normalize.ts          # Value normalization
│   ├── date-conversion.ts    # Gregorian/Jalali conversion
│   ├── validation.ts         # Date validation
│   └── formatting.ts         # Date formatting (for input display)
└── types/
    └── index.ts              # Type definitions
```

### Shared Core Logic

Both `DtPicker` and `DtCalendar` should share the same calendar core:

```typescript
// components/CalendarCore.tsx
export interface CalendarCoreProps {
  // All calendar-related props (type, local, withTime, etc.)
  selectedValue: Day | Range | Multi | null
  displayMonth: Day
  currentView: 'calendar' | 'months' | 'years'
  onDateSelect: (day: Day) => void
  onMonthSelect: (month: number) => void
  onYearSelect: (year: number) => void
  onViewChange: (view: 'calendar' | 'months' | 'years') => void
  // ... other handlers
}

export const CalendarCore: React.FC<CalendarCoreProps> = (props) => {
  // Shared calendar rendering logic
  // Used by both DtPicker (in modal) and DtCalendar (standalone)
}
```

### Modal Management (DtPicker Only)

```typescript
// hooks/useModal.ts
export function useModal(autoClose: boolean, onClose?: () => void) {
  const [isOpen, setIsOpen] = useState(false)
  
  const open = () => setIsOpen(true)
  const close = () => {
    setIsOpen(false)
    onClose?.()
  }
  
  // Handle auto-close logic
  const handleDateSelect = (callback: () => void) => {
    callback()
    if (autoClose) {
      close()
    }
  }
  
  return { isOpen, open, close, handleDateSelect }
}
```

### Custom Hooks Pattern:

```typescript
// hooks/useCalendarState.ts
export function useCalendarState(props: {
  initValue?: unknown
  onChange: (date: unknown) => void
  onCalenderChange?: (date: unknown) => void  // Note: requires initValue
  type: CalendarType
  local: CalendarLocale
}) {
  const { initValue, onChange, onCalenderChange, type, local } = props
  
  const [state, dispatch] = useReducer(calendarReducer, initialState)
  
  // Sync initValue
  useEffect(() => {
    if (initValue !== undefined) {
      const normalized = normalizeInitValue(initValue, local, type)
      dispatch({ type: 'SYNC_INIT_VALUE', payload: normalized })
    }
  }, [initValue, local, type])
  
  // Handle changes
  const handleDateSelect = (day: Day) => {
    const newValue = calculateNewValue(state.selectedValue, day, type)
    dispatch({ type: 'SELECT_DATE', payload: newValue })
    
    // Call onChange (always called)
    onChange(newValue)
    
    // Call onCalenderChange if provided (only works with initValue)
    // This is for watching changes when you have initValue set
    if (onCalenderChange && initValue !== undefined) {
      onCalenderChange(newValue)
    }
  }
  
  return {
    state,
    actions: {
      selectDate: handleDateSelect,
      setView: (view) => dispatch({ type: 'SET_VIEW', payload: view }),
      // ... other actions
    }
  }
}
```

### Component Implementation Pattern:

```typescript
// components/DtPicker.tsx
export const DtPicker: React.FC<DtPickerProps> = (props) => {
  const { autoClose = true, onCalenderShow, onCalenderHide } = props
  
  // Modal state
  const { isOpen, open, close, handleDateSelect } = useModal(
    autoClose,
    onCalenderHide
  )
  
  // Calendar state (shared logic)
  const { state, actions } = useCalendarState({
    initValue: props.initValue,
    onChange: props.onChange,
    onCalenderChange: props.onCalenderChange,
    type: props.type || 'single',
    local: props.local || 'en'
  })
  
  // Handle modal open
  const handleOpen = () => {
    open()
    onCalenderShow?.()
  }
  
  // Format display value for input
  const displayValue = formatDateForInput(
    state.selectedValue,
    props.local || 'en',
    props.type || 'single',
    props.showTimeInput
  )
  
  return (
    <div className="react-calendar-datetime-picker">
      <DateInput
        value={displayValue}
        placeholder={props.placeholder}
        onClick={handleOpen}
        clearBtn={props.clearBtn}
        onClear={() => {
          actions.selectDate(null)
          onChange(null)
        }}
        // ... other props
      />
      
      {isOpen && (
        <CalendarModal
          onClose={close}
          className={props.calenderModalClass}
        >
          <CalendarCore
            selectedValue={state.selectedValue}
            displayMonth={state.displayMonth}
            currentView={state.currentView}
            onDateSelect={(day) => handleDateSelect(() => actions.selectDate(day))}
            // ... other props
          />
        </CalendarModal>
      )}
    </div>
  )
}

// components/DtCalendar.tsx
export const DtCalendar: React.FC<DtCalendarProps> = (props) => {
  // Same calendar state (no modal)
  const { state, actions } = useCalendarState({
    initValue: props.initValue,
    onChange: props.onChange,
    onCalenderChange: props.onCalenderChange,
    type: props.type || 'single',
    local: props.local || 'en'
  })
  
  return (
    <div className="react-calendar-datetime-picker">
      <CalendarCore
        selectedValue={state.selectedValue}
        displayMonth={state.displayMonth}
        currentView={state.currentView}
        onDateSelect={actions.selectDate}
        // ... other props
      />
    </div>
  )
}
```

## 6. Key Recommendations Summary

### ✅ Do:

1. **Use controlled component pattern** with local state + `useEffect` for `initValue`
2. **Normalize all inputs** to internal `Day` format immediately
3. **Single `onChange` call** - only when user actually changes value
4. **Use `useReducer`** for complex state (range, multi selection)
5. **Separate concerns**: Conversion, validation, formatting in separate utils
6. **Use `dir` attribute** for RTL support
7. **CSS logical properties** for RTL-aware styling
8. **Custom hooks** for reusable logic

### ❌ Don't:

1. **Don't use Context** for component-internal state (only if sharing across multiple separate components)
2. **Don't duplicate state** - avoid separate "initial" vs "current" state
3. **Don't call `onChange`** on mount or when syncing `initValue`
4. **Don't mix calendar systems** - normalize to one system internally
5. **Don't hardcode RTL** - use CSS and `dir` attribute
6. **Don't convert dates unnecessarily** - only at boundaries

## 7. Migration Path

1. **Phase 1**: Implement core utilities (date conversion, normalization, formatting)
2. **Phase 2**: Implement calendar grid generation (Gregorian + Jalali)
3. **Phase 3**: Create `CalendarCore` component with basic date selection
4. **Phase 4**: Implement `useCalendarState` hook with `useReducer`
5. **Phase 5**: Add RTL support (CSS + layout logic)
6. **Phase 6**: Implement `DtCalendar` (standalone, no modal)
7. **Phase 7**: Implement `DtPicker` (with input + modal)
8. **Phase 8**: Add all selection types (single, range, multi)
9. **Phase 9**: Add time picker support
10. **Phase 10**: Add all callbacks and edge cases
11. **Phase 11**: Polish, optimize, and test

## 8. Key Insights from Examples

### Important Behaviors:

1. **`onCalenderChange` requires `initValue`**: 
   - This callback only works when `initValue` is provided
   - It's meant to watch changes when you have an initial value set
   - Alternative: Use `useEffect` to watch your date state

2. **Auto-close behavior**:
   - Defaults to `true` (modal closes after selection)
   - When `false`, modal stays open (useful for multi-select or range selection)
   - Only applies to `DtPicker` (not `DtCalendar`)

3. **Input formatting**:
   - Input shows formatted date based on locale
   - For range: shows "from X to Y" format
   - For multi: shows count or list
   - `showTimeInput` prop controls whether time is shown in input

4. **Modal positioning**:
   - Modal should be positioned relative to input (not fixed)
   - Should handle overflow/scroll scenarios
   - Should close on outside click or Escape key

5. **Initial value updates**:
   - Component should react to external `initValue` changes
   - Calendar should navigate to show selected date
   - Input should update to reflect new value

## 9. Testing Strategy

### Key Test Cases:

1. **Initial Value**: Test `initValue` prop updates
2. **Locale Conversion**: Test Gregorian ↔ Jalali conversion
3. **RTL Layout**: Test RTL rendering and interactions
4. **Selection Types**: Test single, range, multi selection
5. **Validation**: Test min/max date constraints
6. **Disabled Dates**: Test disabled date handling
7. **Time Selection**: Test time picker functionality

## Conclusion

The recommended approach avoids the pitfalls of the old Context-based implementation while providing:
- ✅ Cleaner state management
- ✅ Better `initValue` handling
- ✅ No double-firing of `onChange`
- ✅ Proper Jalali calendar support
- ✅ Built-in RTL support
- ✅ More maintainable code structure

