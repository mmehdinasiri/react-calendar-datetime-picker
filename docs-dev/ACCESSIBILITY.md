# Accessibility Features

This document describes the comprehensive accessibility features implemented in the React Calendar DateTime Picker.

## Overview

The calendar component now includes full keyboard navigation, ARIA labels, focus management, and screen reader support to ensure WCAG 2.1 Level AA compliance.

## Features Implemented

### 1. Keyboard Navigation

#### Arrow Keys

- **Up Arrow**: Navigate to the same day in the previous week
- **Down Arrow**: Navigate to the same day in the next week
- **Left Arrow**: Navigate to the previous day (RTL-aware)
- **Right Arrow**: Navigate to the next day (RTL-aware)
- **Note**: Arrow keys automatically handle month boundaries

#### Selection Keys

- **Enter**: Select the currently focused date
- **Space**: Select the currently focused date

#### Navigation Shortcuts

- **T**: Jump to today's date
- **PageUp**: Navigate to the previous month
- **PageDown**: Navigate to the next month
- **Home**: Jump to the first day of the current month
- **End**: Jump to the last day of the current month
- **Escape**: Close the picker modal (DtPicker only)

#### RTL Support

The keyboard navigation automatically adjusts for Right-to-Left locales (e.g., Persian/Jalali calendar):

- Right arrow moves backward (previous day)
- Left arrow moves forward (next day)

### 2. Focus Management

#### Visual Focus Indicators

- Currently focused date is highlighted with a focus ring
- Tab index management ensures only one date is tabbable at a time
- Focus is maintained when navigating with arrow keys

#### Focus Trap (Modal Picker)

- When the picker modal opens, focus is automatically moved inside
- Tab and Shift+Tab cycle through interactive elements within the modal
- Focus cannot escape the modal until it's closed
- Focus is restored to the trigger element when modal closes

#### Smart Focus Behavior

- Selected date receives initial focus
- When navigating across months, focus follows to the new month
- Disabled dates are skipped during keyboard navigation

### 3. ARIA Labels and Roles

#### Semantic Structure

- Calendar grid uses proper `role="grid"` and `role="gridcell"`
- Day names have `role="columnheader"`
- Week rows have `role="row"`
- Picker modal uses `role="dialog"` with `aria-modal="true"`

#### Descriptive Labels

- Each date cell has a full aria-label: "25 December 2024, Today"
- Calendar grid has aria-label with current month/year
- Input field has `aria-haspopup="dialog"` and `aria-expanded` states
- Month and year selection views have proper labels

#### State Information

- `aria-selected` indicates selected dates
- `aria-disabled` indicates non-selectable dates
- `aria-current="date"` marks today's date
- `aria-activedescendant` tracks the focused date

#### Persian/Jalali Support

All ARIA labels are properly localized for Persian:

- "امروز" for today
- "انتخاب ماه" for select month
- "انتخاب سال" for select year

### 4. Screen Reader Support

The calendar provides comprehensive information to screen reader users:

#### Date Announcements

When navigating with arrow keys, screen readers announce:

- The date (day, month, year)
- Whether it's today
- Whether it's selected
- Whether it's disabled

#### State Changes

Screen readers are notified when:

- The picker modal opens/closes
- A date is selected
- The month/year changes
- Focus moves to a different date

#### Context Information

- Current month and year are announced when entering the grid
- Selection type (single, range, multiple) is indicated
- Date constraints are communicated through disabled states

## Implementation Details

### New Hooks

#### `useKeyboardNavigation`

Located: `src/hooks/useKeyboardNavigation.ts`

Handles all keyboard interactions:

- Arrow key navigation with date calculations
- Keyboard shortcuts (T, PageUp/Down, Home/End)
- Month boundary crossing
- Disabled date handling

```typescript
const { focusedDate, navigateToDate } = useKeyboardNavigation({
  focusedDate,
  locale,
  type,
  containerRef,
  enabled: true,
  onFocusedDateChange: setFocusedDate,
  onDateSelect,
  onGoToToday,
  onMonthNavigate,
  isDateSelectable
})
```

#### `useFocusManagement`

Located: `src/hooks/useFocusManagement.ts`

Manages focus state and cell references:

- Tracks currently focused date
- Maintains refs to all date cells
- Provides methods to focus specific dates
- Handles focus reset on selection

```typescript
const { focusedDate, setFocusedDate, getCellRef, focusDate, resetFocus } =
  useFocusManagement({
    initialDate: displayMonth,
    selectedDate: getSelectedDate()
  })
```

#### `useFocusTrap`

Located: `src/hooks/useFocusTrap.ts`

Implements focus trapping for modals:

- Finds all focusable elements
- Traps Tab/Shift+Tab within container
- Auto-focuses first element
- Restores focus on unmount

```typescript
useFocusTrap({
  containerRef: modalRef,
  enabled: isOpen,
  autoFocus: true,
  restoreFocus: true
})
```

### Updated Components

#### CalendarGridView

- Added keyboard navigation integration
- ARIA labels on all date cells
- Role attributes for semantic structure
- Focus management for date grid

#### DtPicker

- Focus trap for modal
- ARIA attributes on input and modal
- Proper dialog semantics

#### MonthView & YearView

- ARIA labels for month/year grids
- Proper roles and states

## Testing Accessibility

### Keyboard Navigation Testing

1. Tab to focus the calendar/input
2. Use arrow keys to navigate dates
3. Press Enter/Space to select
4. Try keyboard shortcuts (T, PageUp, Home, End)
5. Verify focus is visible at all times
6. Test with date constraints (min/max/disabled dates)

### Screen Reader Testing

Tested with:

- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

Verify:

- All dates are announced with full context
- State changes are communicated
- Navigation instructions are clear
- No unnecessary verbosity

### Focus Trap Testing (DtPicker)

1. Open the picker modal
2. Press Tab repeatedly - focus should cycle within modal
3. Press Shift+Tab - focus should cycle backward
4. Press Escape - modal closes and focus returns to input
5. Click outside - same behavior as Escape

### RTL Testing

1. Switch to Persian locale (`local="fa"`)
2. Verify arrow keys work correctly (left/right reversed)
3. Verify all ARIA labels are in Persian
4. Verify visual layout is RTL

## Examples

See the "Accessibility" section in the examples app for live demonstrations:

1. **Keyboard Navigation - Basic**: Arrow key navigation
2. **Keyboard Navigation - Picker**: Full picker experience
3. **Keyboard Shortcuts - Today**: T key functionality
4. **Keyboard Shortcuts - PageUp/PageDown**: Month navigation
5. **Keyboard Shortcuts - Home/End**: First/last day navigation
6. **Keyboard Navigation - Range**: Range selection with keyboard
7. **Keyboard Navigation - Multi**: Multiple selection with keyboard
8. **Keyboard Navigation - Persian**: RTL navigation
9. **Focus Trap - Picker**: Modal focus trapping
10. **ARIA Labels**: Screen reader compatibility
11. **Accessibility with Constraints**: Navigating with disabled dates
12. **Complete Accessibility**: All features combined

## Browser Compatibility

Keyboard navigation and accessibility features work on:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Potential improvements for future versions:

- Voice control support
- High contrast mode detection and styling
- Reduced motion preference support
- More granular keyboard shortcuts
- Customizable keyboard shortcuts

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices - Date Picker](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/)
- [Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
